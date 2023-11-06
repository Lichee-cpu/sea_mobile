<template>
  <div class="image-acquisition-wrap">
    <div class="content-wrap">
      <div class="upload-files-wrap">
        <!-- 标题 -->
        <div class="upload-files-title">
          <div class="title-left fz-400">资料信息</div>
        </div>
        <!-- 附件 -->
        <div class="upload-files-content">
          <van-collapse v-model="activenames">
            <!-- 上传图片 -->
            <van-collapse-item>
              <template #title>
                <!-- 接口数据长度 -->
                <div class="content-title">
                  图片({{ fileListImage.length || 0 }})
                </div>
              </template>
              <div class="image-wrap">
                <div
                  class="van-uploader__preview"
                  v-for="(item, index) in fileListImage"
                  :key="index"
                >
                  <div
                    class="van-uploader__preview-image"
                    @click="viewImg(item.fileURL)"
                  >
                    <img :src="item.fileURL" alt="" class="van-image__img" />
                  </div>
                  <div class="check-box">
                    <van-checkbox
                      v-model="item.checked"
                      @change="delList(item)"
                    />
                  </div>
                </div>

                <!-- 上传 -->
                <div class="van-uploader__preview" v-if="!readonly">
                  <div
                    class="van-uploader__preview-image"
                    @click="uploadFile('img')"
                  >
                    <input
                      type="file"
                      ref="uploadImg"
                      name="avatar"
                      accept="image/png, image/jpeg"
                      style="display: none"
                    />
                    <img
                      src="@/assets/icon/image-collection/icon_ziliaoshangchuan.png"
                      alt="添加"
                      class="van-image__img"
                    />
                  </div>
                </div>
              </div>
            </van-collapse-item>
            <!-- 上传视频 -->
            <van-collapse-item>
              <template #title>
                <!-- 接口数据长度 -->
                <div class="content-title">
                  视频({{ fileListVideo.length || 0 }})
                </div>
              </template>
              <div class="image-wrap">
                <div
                  class="van-uploader__preview"
                  v-for="(item, index) in fileListVideo"
                  :key="index"
                >
                  <div
                    v-if="item.firstImg"
                    class="van-uploader__preview-image"
                    @click="viewVideo(item.fileURL)"
                  >
                    <img :src="item.firstImg" alt="" class="van-image__img" />
                  </div>
                  <div
                    v-else
                    class="van-uploader__file"
                    @click="viewVideo(item.fileURL)"
                  >
                    <van-icon name="description" size="20" />
                    <div class="van-uploader__file-name van-ellipsis">
                      {{ item.fileName }}
                    </div>
                  </div>

                  <div class="check-box">
                    <van-checkbox
                      v-model="item.checked"
                      @change="delList(item)"
                    />
                  </div>
                </div>
                <div class="van-uploader__preview" v-if="!readonly">
                  <div
                    class="van-uploader__preview-image"
                    @click="uploadFile('video')"
                  >
                    <input
                      type="file"
                      ref="uploadVideo"
                      name="avatar"
                      accept="video/*"
                      style="display: none"
                    />
                    <img
                      src="@/assets/icon/image-collection/icon_ziliaoshangchuan.png"
                      alt="添加"
                      class="van-image__img"
                    />
                  </div>
                </div>
              </div>
            </van-collapse-item>
            <!-- 上传音頻 -->
            <van-collapse-item>
              <template #title>
                <!-- 接口数据长度 -->
                <div class="content-title">
                  音频({{ fileListAudio.length || 0 }})
                </div>
              </template>
              <div class="image-wrap">
                <div
                  class="van-uploader__preview"
                  v-for="(item, index) in fileListAudio"
                  :key="index"
                >
                  <div
                    class="van-uploader__preview-image"
                    @click="viewAudio(item.fileURL)"
                  >
                    <img
                      src="@/assets/icon/image-collection/icon_yinpin.png"
                      alt=""
                      class="van-image__img"
                    />
                  </div>
                  <div class="check-box">
                    <van-checkbox
                      v-model="item.checked"
                      @change="delList(item)"
                    />
                  </div>
                </div>
                <div class="van-uploader__preview" v-if="!readonly">
                  <div
                    class="van-uploader__preview-image"
                    @click="uploadFile('audio')"
                  >
                    <input
                      type="file"
                      ref="uploadAudio"
                      name="avatar"
                      accept="audio/*"
                      style="display: none"
                    />
                    <img
                      src="@/assets/icon/image-collection/icon_ziliaoshangchuan.png"
                      alt="添加"
                      class="van-image__img"
                    />
                  </div>
                </div>
              </div>
            </van-collapse-item>
            <!-- 其他资料 -->
            <van-collapse-item>
              <template #title>
                <!-- 接口数据长度 -->
                <div class="content-title">
                  其他({{ fileListOther.length || 0 }})
                </div>
              </template>
              <div class="image-wrap">
                <div
                  class="van-uploader__preview"
                  v-for="(item, index) in fileListOther"
                  :key="index"
                >
                  <div class="van-uploader__file" @click="viewOther(item)">
                    <van-icon name="description" size="20" />
                    <div class="van-uploader__file-name van-ellipsis">
                      {{ item.fileName }}
                    </div>
                  </div>
                  <div class="check-box">
                    <van-checkbox
                      v-model="item.checked"
                      @change="delList(item)"
                    />
                  </div>
                </div>
                <div class="van-uploader__preview" v-if="!readonly">
                  <div
                    class="van-uploader__preview-image"
                    @click="uploadFile('other')"
                  >
                    <input
                      type="file"
                      ref="uploadOther"
                      name="avatar"
                      style="display: none"
                    />
                    <img
                      src="@/assets/icon/image-collection/icon_ziliaoshangchuan.png"
                      alt="添加"
                      class="van-image__img"
                    />
                  </div>
                </div>
              </div>
            </van-collapse-item>
          </van-collapse>
        </div>
      </div>
      <!-- 底部按钮 -->
      <div class="global-btn-con-p" v-if="!readonly">
        <!-- 提交 -->
        <div class="global-btn-con">
          <van-button type="primary" class="global-btn clear" @click="clear">
            取消
          </van-button>
          <van-button
            type="primary"
            class="global-btn"
            v-show="!isBatchDelete"
            @click="submit"
          >
            提交
          </van-button>
          <van-button
            type="primary"
            class="global-btn"
            v-show="isBatchDelete"
            @click="delFile"
          >
            删除
          </van-button>
        </div>
      </div>
    </div>

    <!-- 预览视频或音频 -->
    <van-popup
      v-if="showVideo"
      v-model:show="showVideo"
      teleport="#app"
      :style="{ maxWidth: '100%', maxHeight: '90%' }"
    >
      <div class="video-wrap">
        <video
          :src="showVideoList[0]"
          controls
          autoplay
          style="width: 100%; height: auto"
          v-if="showVideo && showType === 'video'"
        ></video>
        <audio
          :src="showVideoList[0]"
          controls
          autoplay
          v-if="showVideo && showType === 'audio'"
        ></audio>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { ref, reactive, getCurrentInstance, onMounted } from "vue";
import { ImagePreview } from "vant";

export default {
  setup() {
    const { proxy } = getCurrentInstance();
    const activenames = ref([0, 1, 2, 3]);
    const getImages = reactive({ image: [], audio: [], video: [], other: [] }); // 后台获取影像资料
    const isBatchDelete = ref(false); // 是否批量删除
    const readonly = ref(false); // 影像是否可编辑
    const fileListImage = ref([]); // 上传的文件列表--图片
    const fileListVideo = ref([]); // 上传的文件列表--视频
    const fileListAudio = ref([]); // 上传的文件列表--音频
    const fileListOther = ref([]); // 上传的文件列表--其他
    const imgSuffix = ["jpg", "png", "jpeg"]; // 图片后缀
    const videoSuffix = [
      "mp4",
      "mov",
      "avi",
      "wmv",
      "mpg",
      "mpeg",
      "ram",
      "3gp",
      "mkv",
    ]; // 视频后缀
    const audioSuffix = ["mp3", "wma", "rm", "wav", "midi", "aac"]; // 音频后缀
    onMounted(() => {
      const fileList = [
        {
          fileURL:
            "http://lichee-img.oss-cn-hangzhou.aliyuncs.com/test/20231031152858-%E5%8E%9F%E5%9B%BE-%E4%B8%8B%E8%BD%BD.png",
          fileName: "图片.png",
        },
        {
          fileURL:
            "http://lichee-img.oss-cn-hangzhou.aliyuncs.com/test/20231031153945-%E5%8E%9F%E5%9B%BE-test.mp4",
          fileName: "视频.mp4",
        },
        {
          fileURL:
            "https://lichee-img.oss-cn-hangzhou.aliyuncs.com/test/%E6%88%90%E9%83%BD%E5%85%AC%E4%BA%A4%E7%94%B5%E5%AD%90%E8%A1%8C%E7%A8%8B%E5%8D%95.pdf",
          fileName: "文件.pdf",
        },
        {
          fileURL:
            "https://lichee-img.oss-cn-hangzhou.aliyuncs.com/test/H5%E6%8E%A5%E5%85%A5.docx",
          fileName: "H5接入.docx",
        },
      ];
      fileList.forEach((item) => {
        addImages(item);
      });
    });

    // 影响资料分类
    const addImages = (item, file) => {
      if (file) {
        console.log("待后续使用");
      } else {
        const url = item.fileURL;
        const fileName = url.substring(url.lastIndexOf("/") + 1); // 分割链接，获取文件名部分
        const suffix = fileName.substring(fileName.lastIndexOf(".") + 1); // 提取文件名后缀
        //根据url文件后缀添加到获取影像资料中
        console.log(suffix);
        if (imgSuffix.includes(suffix)) {
          fileListImage.value.push(item);
        } else if (videoSuffix.includes(suffix)) {
          fileListVideo.value.push(item);
        } else if (audioSuffix.includes(suffix)) {
          fileListAudio.value.push(item);
        } else {
          fileListOther.value.push(item);
        }
      }
    };
    const uploadImg = ref();
    const uploadVideo = ref();
    const uploadAudio = ref();
    const uploadOther = ref();
    const uploadFile = (type) => {
      if (type === "img") {
        uploadImg.value.click();
        // 将图片添加到待上传列表中
        uploadImg.value.onchange = (e) => {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function (e) {
            const content = e.target.result;
            const suffix = file.name.split(".")[1];
            const fileName = file.name;
            const fileURL = URL.createObjectURL(file);
            const obj = {
              file,
              content,
              suffix,
              fileName,
              fileURL,
            };
            fileListImage.value.push(obj);
          };
        };
      }
      if (type === "video") {
        uploadVideo.value.click();
        // 将视频添加到待上传列表中
        uploadVideo.value.onchange = (e) => {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function (e) {
            const fileURL = URL.createObjectURL(file);
            const content = e.target.result;
            const suffix = file.name.split(".")[1];
            const fileName = file.name;
            // 获取视频第十帧的图片
            getVideoImage(file).then((res) => {
              console.log("视频缩略图", res);
              const obj = {
                file,
                content,
                suffix,
                fileName,
                fileURL,
                firstImg: res,
              };
              fileListVideo.value.push(obj);
            });
          };
        };
      }
      if (type === "audio") {
        uploadAudio.value.click();
        // 将音频添加到待上传列表中
        uploadAudio.value.onchange = (e) => {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function (e) {
            const fileURL = URL.createObjectURL(file);
            const content = e.target.result;
            const suffix = file.name.split(".")[1];
            const fileName = file.name;
            const obj = {
              file,
              content,
              suffix,
              fileName,
              fileURL,
            };
            fileListAudio.value.push(obj);
          };
        };
      }
      if (type === "other") {
        uploadOther.value.click();
        // 将其他文件添加到待上传列表中
        uploadOther.value.onchange = (e) => {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function (e) {
            const fileURL = URL.createObjectURL(file);
            const content = e.target.result;
            const suffix = file.name.split(".")[1];
            const fileName = file.name;
            const obj = {
              file,
              content,
              suffix,
              fileName,
              fileURL,
            };
            fileListOther.value.push(obj);
          };
        };
      }
    };
    //传入视频文件返回视频缩略图
    const getVideoImage = (fileURL) => {
      return new Promise((resolve) => {
        let reader = new FileReader();
        reader.readAsDataURL(fileURL);
        reader.onload = () => {
          let video = document.createElement("video"); // 让页面中的img标签的src指向读取的路径
          video.src = reader.result;
          video.currentTime = 0.1; //截取缩略图时的视频时长，一定要设置，不然大概率白屏
          video.oncanplay = () => {
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas
              .getContext("2d")
              .drawImage(video, 0, 0, canvas.width, canvas.height);
            const imgSrc = canvas.toDataURL("image/png");
            resolve(imgSrc);
          };
        };
      });
    };

    const localNeedUpload = ref([]);
    const submit = () => {
      // 本地需要上传到服务器的文件
      fileListImage.value.forEach((item) => {
        if (item.file) localNeedUpload.value.push(item);
      });
      fileListVideo.value.forEach((item) => {
        if (item.file) localNeedUpload.value.push(item);
      });
      fileListAudio.value.forEach((item) => {
        if (item.file) localNeedUpload.value.push(item);
      });
      fileListOther.value.forEach((item) => {
        if (item.file) localNeedUpload.value.push(item);
      });
      console.log("需要把本地上传的有", localNeedUpload.value);
      // 循环上传到服务器
      localNeedUpload.value.forEach((item) => {
        const formData = new FormData();
        formData.append("file", item.file);
        formData.append("type", "2"); //压缩类型   1：压缩  2：不压缩
        upSystem(formData);
      });
    };
    // 上传到服务器
    const upSystem = (formData) => {
      proxy.$http
        .post("/api/upload/add", formData, {
          timeout: 60000,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          const { url } = res.data;
          //   在线链接添加到后台获取影像资料中
          addImages(url);
        });
    };

    // 取消
    const clear = () => {
      if (isBatchDelete.value) {
        // 取消批量删除
        isBatchDelete.value = false;
        delListData.value.forEach((item) => {
          item.checked = false;
        });
        delListData.value = [];
      } else {
        console.log("返回上一页");
      }
    };

    // 批量删除
    const onlineFileNeedDel = ref([]); // 线上文件
    const delFile = () => {
      // 区分是本地还是线上
      if (delListData.value.length > 0) {
        // 本地删除
        delListData.value.forEach((item) => {
          if (item.file) {
            // 本地文件
            if (imgSuffix.includes(item.suffix)) {
              // 图片
              fileListImage.value = fileListImage.value.filter(
                (list) => list.fileName !== item.fileName
              );
            } else if (videoSuffix.includes(item.suffix)) {
              // 视频
              fileListVideo.value = fileListVideo.value.filter(
                (list) => list.fileName !== item.fileName
              );
            } else if (audioSuffix.includes(item.suffix)) {
              // 音频
              fileListAudio.value = fileListAudio.value.filter(
                (list) => list.fileName !== item.fileName
              );
            } else {
              // 其他
              fileListOther.value = fileListOther.value.filter(
                (list) => list.fileName !== item.fileName
              );
            }
          } else {
            // 线上文件
            onlineFileNeedDel.value.push(item);
          }
        });
        console.log("需要删除的线上文件", onlineFileNeedDel.value);
        // 清空待删除列表
        clear();
      } else {
        console.log("没有选中数据");
      }
    };

    //预览图片
    const viewImg = (url) => {
      ImagePreview([url]);
    };

    // 预览视频
    const showVideo = ref(false);
    const showVideoList = ref([]);
    const showType = ref("");
    const viewVideo = (url) => {
      console.log(url);
      showType.value = "video";
      showVideoList.value = [url];
      showVideo.value = true;
    };
    // 预览音频
    const viewAudio = (url) => {
      console.log(url);
      showType.value = "audio";
      showVideoList.value = [url];
      showVideo.value = true;
    };
    // 其他文件就下载
    const viewOther = (item) => {
      console.log(item);
      // 资源下载
      const a = document.createElement("a");
      a.href = item.fileURL;
      a.download = item.fileName;
      a.click();
    };

    // 删除列表
    const delListData = ref([]);
    const delList = (item) => {
      if (item.checked) {
        // 将选中的数据添加到待删除列表中
        delListData.value.push(item);
      } else {
        // 创建一个新的数组，过滤掉取消选中的数据
        delListData.value = delListData.value.filter(
          (list) => list.fileName !== item.fileName
        );
      }
      isBatchDelete.value = delListData.value.length > 0;
    };

    return {
      uploadImg,
      uploadFile,
      uploadVideo,
      uploadAudio,
      uploadOther,

      activenames,
      getImages,
      isBatchDelete,
      readonly,
      fileListImage,
      fileListVideo,
      fileListAudio,
      fileListOther,
      submit,
      viewImg,
      showVideo,
      showVideoList,
      showType,
      viewVideo,
      viewAudio,
      viewOther,
      delList,
      clear,
      delFile,
    };
  },
};
</script>
<style lang="less" scoped src="./Uploader.less"></style>
