<!--
 * @Author: lxiang
 * @Date: 2023-04-23 08:47:02
 * @LastEditors: lxiang
 * @LastEditTime: 2023-04-25 09:31:12
 * @description: 几何体法向属性
 * @FilePath: \sea_mobile\src\views\threejs\demo\j.vue
-->
<template>
  <div class="info">
    <Header :title="title" transparent :nav="true" :defaultNav="true" />
    <div class="box" ref="box"></div>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import { useRoute } from "vue-router";
import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { onMounted, ref } from "vue";
export default {
  components: {
    Header,
  },
  setup() {
    const route = useRoute();
    const title = route?.query?.title;
    const box = ref(null);

    const draw = () => {
      // 创建场景
      const scene = new THREE.Scene();
      // 创建相机 视场角,宽高比,近平面,远平面
      const camera = new THREE.PerspectiveCamera(
        75,
        box.value.offsetWidth / box.value.offsetHeight,
        0.1,
        1000
      );
      // 设置相机位置
      camera.position.set(0, 0, 10); // 默认相机位置是(0,0,0)
      scene.add(camera); // 将相机添加到场景中
      // 添加物体
      for (let i = 0; i < 50; i++) {
        // 每一个三角形都是由三个顶点组成的
        const geometry = new THREE.BufferGeometry(); // 创建一个几何体
        const positionArray = new Float32Array(9);
        for (let j = 0; j < 9; j++) {
          positionArray[j] = Math.random() * 10 - 5;
        }
        geometry.setAttribute(
          "position",
          new THREE.BufferAttribute(positionArray, 3)
        ); // 设置几何体的顶点属性
        const color = new THREE.Color(
          Math.random(),
          Math.random(),
          Math.random()
        ); // 随机颜色
        const material = new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.5,
        }); // 创建一个绿色的材质
        const mesh = new THREE.Mesh(geometry, material);
        console.log(mesh);
        scene.add(mesh); // 将几何体添加到场景中
      }

      // 初始化渲染器
      const renderer = new THREE.WebGLRenderer();
      // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
      renderer.setSize(box.value.offsetWidth, box.value.offsetHeight);
      // 将渲染器的dom元素（renderer.domElement）添加到我们的HTML文档中。
      box.value.appendChild(renderer.domElement);
      // 使用相机和场景来渲染
      // renderer.render(scene, camera);

      // 创建轨道控制器
      const controls = new OrbitControls(camera, renderer.domElement);
      // 设置阻尼，防止控制器过快,必须在动画循环中upadte
      controls.dampingFactor = true;

      // 添加坐标辅助器
      const axesHelper = new THREE.AxesHelper(5);
      scene.add(axesHelper);

      // 监听双击事件，全屏和退出全屏
      window.addEventListener("dblclick", () => {
        // 全屏和退出全屏
        if (document.fullscreenElement) {
          document.exitFullscreen(); // 退出全屏
        } else {
          if (box.value) {
            box.value.requestFullscreen(); // 全屏
          }
        }
      });

      function animate() {
        controls.update(); // 更新控制器
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }

      animate();
      // 监听窗口变化
      window.addEventListener("resize", () => {
        // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
        renderer.setSize(box.value.offsetWidth, box.value.offsetHeight);
        // 设置相机的宽高比
        camera.aspect = box.value.offsetWidth / box.value.offsetHeight;
        // 更新相机投影矩阵
        camera.updateProjectionMatrix();
      });
    };

    onMounted(() => {
      draw();
    });

    return { title, box };
  },
};
</script>

<style lang="less" scoped>
.info {
  padding-top: var(--nav-bar-height);
  background: #e5e5e530;
  height: 100%;
  .box {
    height: 100%;
  }
}
</style>
