<!--
 * @Author: lxiang
 * @Date: 2023-05-09 09:00:34
 * @LastEditors: lxiang
 * @LastEditTime: 2023-05-09 16:07:17
 * @description: 分片上传
 * @FilePath: \sea_mobile\src\views\project\upload\UploadSplit.vue
-->

<template>
  <div>
    <h1>分片上传和断点续传</h1>
    <input type="file" ref="fileInput" @change="onFileChange" />
    <button @click="upload">上传</button>
    <p>上传进度：{{ progress }}%</p>
  </div>
</template>

<script>
import { ref, getCurrentInstance, computed } from "vue";
import { Toast } from "vant";

export default {
  setup() {
    const { proxy } = getCurrentInstance();

    const fileInput = ref(null); // 用于获取文件
    const file = ref(null); // 用于存储文件
    const progress = ref(0); // 用于存储上传进度
    const chunks = ref([]); // 用于存储文件分片
    const hash = ref(""); // 用于存储文件hash
    const totalSize = computed(() => {
      // 计算文件总大小
      if (!chunks.value) return 0;
      return chunks.value.length;
    });

    const chunkSize = 1024 * 1024; // 每个分片的大小

    // 创建文件分片
    const createChunks = (file, size) => {
      const chunks = [];
      let cur = 0;
      while (cur < file.size) {
        chunks.push({ file: file.slice(cur, cur + size) });
        cur += size;
      }
      return chunks;
    };

    // 计算文件hash
    const sha1 = (chunks) => {
      return new Promise((resolve) => {
        const buffer = new ArrayBuffer(chunks.length * 20); // 将chunks的长度*20，创建一个ArrayBuffer
        // q: 这里为什么要*20？
        // a: 因为SHA-1算法的hash值是20个字节，每个字节占8位，所以总共是160位，也就是20个字节
        // q: 如果不*20会怎么样？
        // a: 如果不*20，那么buffer的大小就是chunks.length，也就是chunks的长度，这样就会导致chunks中的每个分片的hash值都会被覆盖，最终得到的hash值就是最后一个分片的hash值
        crypto.subtle.digest("SHA-1", buffer).then((hash) => {
          const hashArray = Array.from(new Uint8Array(hash)); //将ArrayBuffer转换为Array
          const hashHex = hashArray
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
          resolve(hashHex);
        });
      });
    };

    // 选择文件
    const onFileChange = async () => {
      file.value = fileInput.value.files[0]; // 获取文件
      if (!file.value) return;
      chunks.value = createChunks(file.value, chunkSize); // 创建文件分片
      hash.value = await sha1(chunks.value); // 计算文件hash
      console.log("hash==", hash.value);
    };

    const upload = async () => {
      if (!file.value) {
        Toast.fail("请选择要上传的文件");
        return;
      }

      let uploadedChunks = 0; // 已上传的分片数
      let uploadedSize = 0; // 已上传的文件大小
      const uploadedChunksList = []; // 已上传的分片索引

      for (let i = 0; i < totalSize.value; i++) {
        const formData = new FormData();
        formData.append("chunk", chunks.value[i].file);
        formData.append("filename", file.value.name);
        formData.append("chunkIndex", i.toString()); // 当前分片的索引
        formData.append("chunkCount", totalSize.value); // 分片总数
        formData.append("hash", hash.value); // 文件hash

        try {
          const res = await proxy.$http.post("/api/upload/split", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            // 上传进度
            onUploadProgress: (progressEvent) => {
              const { loaded } = progressEvent;
              uploadedSize += loaded;
              const currentProgress = Math.round(
                (uploadedSize / file.value.size) * 100
              );
              progress.value = currentProgress >= 100 ? 100 : currentProgress;
            },
          });
          uploadedChunks++;
          uploadedChunksList.push(res.data.chunkIndex);
        } catch (error) {
          console.error(error);
        }
      }
      // 上传完成后，通知服务端合并文件
      if (uploadedChunks === totalSize.value) {
        await proxy.$http.post(
          "/api/upload//merge",
          {
            filename: file.value.name,
            hash: hash.value,
            uploadedChunks: uploadedChunksList,
          },
          {
            timeout: 60000,
          }
        );
        Toast.success("上传成功");
      }
    };

    return {
      fileInput,
      file,
      progress,
      onFileChange,
      upload,
    };
  },
};
</script>
