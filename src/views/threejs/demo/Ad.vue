<!--
 * @Author: lxiang
 * @Date: 2023-04-23 08:47:02
 * @LastEditors: lxiang
 * @LastEditTime: 2023-04-23 09:01:06
 * @description: 缩放与旋转
 * @FilePath: \sea_mobile\src\views\threejs\demo\d.vue
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
      const geometry = new THREE.BoxGeometry(1, 1, 1); // 创建一个立方体
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // 创建一个绿色的材质
      const cube = new THREE.Mesh(geometry, material); // 创建一个立方体网格
      // 位置 position
      // cube.position.set(0, 1, 0); // 设置立方体网格的位置
      // cube.position.x = 3; // 设置立方体网格的x轴位置
      // 缩放 scale
      // cube.scale.set(3, 2, 1); // 设置立方体网格的缩放
      // cube.scale.x = 3; // 设置立方体网格的x轴缩放
      // 旋转 rotation
      cube.rotation.set(Math.PI / 4, 0, 0, "XYZ"); // 设置立方体网格的旋转
      // cube.rotation.x = 0.5; // 设置立方体网格的x轴旋转

      scene.add(cube); // 将立方体网格添加到场景中
      console.log("cube", cube); // q:cube是一个什么东西？a:一个网格，网格是什么？网格是一个几何体加上一个材质
      // 初始化渲染器
      const renderer = new THREE.WebGLRenderer();
      // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
      renderer.setSize(box.value.offsetWidth, box.value.offsetHeight);
      // 将渲染器的dom元素（renderer.domElement）添加到我们的HTML文档中。
      box.value.appendChild(renderer.domElement);
      // 使用相机和场景来渲染
      // renderer.render(scene, camera);

      // 创建轨道控制器
      new OrbitControls(camera, renderer.domElement);
      // 添加坐标辅助器
      const axesHelper = new THREE.AxesHelper(5);
      scene.add(axesHelper);

      function animate() {
        cube.position.x += 0.01;
        cube.rotation.x += 0.01;
        if (cube.position.x > 5) {
          cube.position.x = 0;
        }
        if (cube.rotation.x > Math.PI) {
          cube.rotation.x = 0;
        }
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }

      animate();
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
