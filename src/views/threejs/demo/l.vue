<!--
 * @Author: lxiang
 * @Date: 2023-04-23 08:47:02
 * @LastEditors: lxiang
 * @LastEditTime: 2023-04-25 15:46:50
 * @description: 纹理显示算法/透明纹理
 * @FilePath: \sea_mobile\src\views\threejs\demo\l.vue
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

      // 导入纹理
      const textureLoader = new THREE.TextureLoader();
      // const imgMaterial = textureLoader.load(require("@/assets/home/16x16.jpg"));
      const imgMaterial = textureLoader.load(
        require("@/assets/textures/door/color.jpg")
      ); // 透明纹理
      const imgMaterial2 = textureLoader.load(
        require("@/assets/textures/door/alpha.jpg")
      ); // 透明纹理(蒙版)

      // 添加物体
      const cubeGeometry = new THREE.BoxGeometry(1, 1, 1); // 创建一个立方体几何体
      // 材质
      const cubeMaterial = new THREE.MeshBasicMaterial({
        color: "#ffffff", // 材质颜色
        map: imgMaterial, // 纹理贴图
        alphaMap: imgMaterial2, // 透明纹理
        transparent: true, // 透明
        opacity: 0.5, // 透明度
        side: THREE.DoubleSide, // 双面渲染
      });
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial); // 创建一个立方体网格模型
      scene.add(cube); // 将立方体网格模型添加到场景中

      // 添加平面
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), cubeMaterial);
      plane.position.set(3, 0, 0);
      scene.add(plane);

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

      window.addEventListener("dblclick", () => {
        // 全屏和退出全屏
        if (document.fullscreenElement) {
          document.exitFullscreen(); // 退出全屏
        } else {
          box.value.requestFullscreen(); // 全屏
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
