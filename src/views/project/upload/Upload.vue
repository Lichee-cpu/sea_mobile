<!--
 * @Author: lxiang
 * @Date: 2023-03-31 16:16:34
 * @LastEditors: lxiang
 * @LastEditTime: 2023-04-11 10:54:41
 * @description: 文件上传压缩对比
 * @FilePath: \sea_mobile\src\views\project\upload\Upload.vue
-->

<template>
  <div class="uplaod">
    <Header title="文件上传" transparent :nav="true" :defaultNav="true" />
    <div class="upload-box">
      <div class="title">直接上传</div>
      <div class="uploader">
        <van-uploader
          v-model="fileList2"
          capture="camera"
          :max-count="1"
          :after-read="afterRead2"
        >
          <div class="image">
            <img src="@/assets/login/sea.png" alt="" />
          </div>
        </van-uploader>
      </div>

      <div class="title">压缩上传</div>
      <div class="uploader">
        <van-uploader
          v-model="fileList1"
          capture="camera"
          :max-count="1"
          :after-read="afterRead1"
          :before-read="compressImage"
        >
          <div class="image">
            <img src="@/assets/login/sea.png" alt="" />
          </div>
        </van-uploader>
      </div>
    </div>
    <div class="compare">
      <!-- 原图 -->
      <div class="original" v-if="original" @click="previewImage(original)">
        <span>原图：{{ originalSize }}KB</span>
        <img :src="original" alt="原图" />
      </div>
      <!-- 压缩 -->
      <div
        class="compressed"
        v-if="compressed"
        @click="previewImage(compressed)"
      >
        <span>压缩：{{ compressedSize }}KB </span>
        <img :src="compressed" alt="压缩图" />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import { ref, getCurrentInstance } from "vue";
import { Toast, ImagePreview } from "vant";

export default {
  components: {
    Header,
  },
  setup() {
    const { proxy } = getCurrentInstance();

    const fileList1 = ref([]); // 上传的文件列表要压缩
    const fileList2 = ref([]); // 上传的文件列表不压缩
    const original = ref(""); // 原图
    const compressed = ref(""); // 压缩图
    const originalSize = ref(""); // 原图大小
    const compressedSize = ref(""); // 压缩图大小

    // 压缩
    const afterRead1 = (file) => {
      console.log("压缩后实际上传", file.file.size / 1024 + "KB");
      let formData = new FormData();
      formData.append("file", file.file);
      formData.append("type", "1"); //压缩类型   1：压缩  2：不压缩
      Toast.loading({
        message: "上传中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0,
      });
      proxy.$http
        .post("/api/upload/add", formData, {
          timeout: 60000,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          const { url, size } = res.data;
          compressed.value = url; // 压缩图在线链接
          compressedSize.value = Math.round(size / 1024); // 压缩图大小
          Toast.clear();
          console.log("上传返回", res);
        });
    };

    // 不压缩
    const afterRead2 = (file) => {
      let formData = new FormData();
      formData.append("file", file.file);
      formData.append("type", "2"); //压缩类型   1：压缩  2：不压缩
      Toast.loading({
        message: "上传中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0,
      });
      proxy.$http
        .post("/api/upload/add", formData, {
          timeout: 60000,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          Toast.clear();
          const { url, size } = res.data;
          original.value = url; // 原图在线链接
          originalSize.value = Math.round(size / 1024); // 原图大小
          console.log("上传返回", res);
        });
    };

    // 压缩图片
    const compressImage = (file) => {
      console.log("压缩前", file.size / 1024 + "KB");
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file); // 将文件转换为图片路径
        img.onload = () => {
          // 创建一个canvas元素来进行图片压缩
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          let width = img.width;
          let height = img.height;
          // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
          if (file.size > 5 * 1024 * 1024) {
            console.log("大于5M");
            let ratio;
            if ((ratio = (width * height) / 4000000) > 1) {
              ratio = Math.sqrt(ratio);
              width /= ratio;
              height /= ratio;
            } else {
              ratio = 1;
            }
          }
          // 设置画布尺寸
          canvas.width = width;
          canvas.height = height;
          // 将图片画到画布上
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          // 将画布内容转换为Blob
          canvas.toBlob(
            (blob) => {
              // 使用新的Blob对象替换原文件
              // blob.name = file.name;
              const compressedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              const newfile =
                compressedFile.size < file.size ? compressedFile : file;
              console.log("压缩后的文件", newfile.size / 1024 + "KB");
              resolve(newfile);
            },
            file.type,
            0.8 // 设置压缩质量，范围从0到1，1表示最高质量
          );
        };
        img.onerror = (error) => {
          reject(error);
        };
      });
    };

    // 图片预览
    const previewImage = (url) => {
      console.log("预览图片", url);
      ImagePreview([url]);
    };

    return {
      original,
      originalSize,
      compressed,
      compressedSize,
      fileList1,
      fileList2,
      afterRead1,
      afterRead2,
      compressImage,
      previewImage,
    };
  },
};
</script>

<style lang="less" scoped>
.uplaod {
  padding-top: var(--nav-bar-height);
}
.upload-box {
  padding: 16px;
  .title {
    margin: 12px 0;
  }
  .uploader {
    text-align: center;
    :deep(.van-image) {
      width: 85vw;
      height: 45vw;
    }
  }
  .image {
    background: #e3e3e3;
    width: 100%;
    border-radius: 24px;
    img {
      width: 85vw;
      height: 45vw;
    }
  }
}
.compare {
  margin-top: 30px;
  margin-top: 30px;
  display: flex;
  padding: 16px;
  flex-direction: row;
  justify-content: space-evenly;
  .original {
    width: 48%;
  }
  .compressed {
    width: 48%;
  }
  img {
    width: 100%;
  }
}
</style>
