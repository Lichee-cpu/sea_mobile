<!--
 * @Author: home 1400256031@qq.com
 * @Date: 2023-08-02 22:04:06
 * @LastEditors: lxiang
 * @LastEditTime: 2023-08-08 16:51:53
 * @FilePath: \sea_mobile\src\views\project\online-read\pdf-chrome-84.vue
 * @Description: 84版浏览器 使用这个pdfjs-dist@2.0.943
-->
<template>
  <div class="pdfcontainer">
    <div
      class="pdfcanvas"
      ref="pdfCanvasContainer"
      :style="'transform:scale(' + canvasScale + ')'"
    ></div>
    <div class="zoom">
      <i class="el-icon-zoom-out cursor" @click="zoom('out')">—</i>
      <i class="el-icon-zoom-in cursor" @click="zoom('in')">+</i>
    </div>
  </div>
</template>

<script>
import { getDocument } from "pdfjs-dist";

export default {
  name: "Pdf",
  props: {
    src: {
      type: String,
    },
  },
  data() {
    return {
      scale: 3,
      canvasScale: 0.5,
    };
  },
  mounted() {
    this.loadPdf();
  },
  methods: {
    /**
     * @description: 加载pdf
     */
    loadPdf() {
      let base64Data = this.src.replace(/^data:application\/pdf;base64,/, "");
      let pdfData = window.atob(base64Data);
      let arrayBuffer = new Uint8Array(pdfData.length);
      for (let i = 0; i < pdfData.length; i++) {
        arrayBuffer[i] = pdfData.charCodeAt(i);
      }
      const loadingTask = getDocument({ data: arrayBuffer });

      loadingTask.promise.then((pdf) => {
        const numPages = pdf.numPages;
        const canvasContainer = this.$refs.pdfCanvasContainer;
        canvasContainer.innerHTML = ""; // 清空容器
        for (let pageNumber = 1; pageNumber <= numPages; pageNumber++) {
          pdf.getPage(pageNumber).then((page) => {
            const viewport = page.getViewport(this.scale);
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.height = viewport.height || page.view[3];
            canvas.width = viewport.width || page.view[2];
            // 将canvas添加到容器中
            canvasContainer.appendChild(canvas);
            // 渲染PDF到canvas
            const renderContext = {
              canvasContext: context,
              viewport: viewport,
            };
            page.render(renderContext);
          });
        }
      });
    },
    /**
     * @description: 缩放
     * @param {String} type 类型
     */
    zoom(type) {
      if (type) {
        if (type === "out" && this.canvasScale.toFixed(2) > 0.1) {
          this.canvasScale -= 0.05;
        } else if (type === "in") {
          this.canvasScale += 0.05;
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
.pdfcontainer {
  position: relative;
}
.pdfcanvas {
  position: absolute;
  top: 12px;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 100%;
  max-height: 100%;
}
.scale {
  position: fixed;
  bottom: 24px;
  right: 24px;
  font-size: 24px;
  .cursor {
    margin: 24px;
    cursor: pointer;
  }
}
</style>
