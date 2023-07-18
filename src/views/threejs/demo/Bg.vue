<!--
 * @Author: lxiang
 * @Date: 2023-04-23 08:47:02
 * @LastEditors: lxiang
 * @LastEditTime: 2023-07-17 14:10:16
 * @description: VR看房切换房间
 * @FilePath: \sea_mobile\src\views\threejs\demo\Bg.vue
-->
<template>
  <div class="info">
    <Header :title="title" transparent :nav="true" :defaultNav="true" />
    <div class="box" ref="box"></div>
  </div>
</template>

<script setup>
import Header from "@/components/header/Header.vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const title = route?.query?.title;

// 初始化场景
const scene = new THREE.Scene();
// 初始化相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
//相机位置
camera.position.set(0, 0, 0);

// 初始化渲染器
const renderer = new THREE.WebGLRenderer();

const box = ref(null);

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

// 添加球
const geometry = new THREE.SphereGeometry(5, 32, 32);
const loader = new RGBELoader();
loader.load("./threejsModules/Living.hdr", (texture) => {
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.geometry.scale(1, 1, -1);
  scene.add(sphere);
});

// 挂载完毕之后获取dom
onMounted(() => {
  camera.updateProjectionMatrix(); // 更新相机投影矩阵
  renderer.setSize(box.value.offsetWidth, box.value.offsetHeight); // 设置渲染器的宽高

  // 添加控制器
  const controls = new OrbitControls(camera, box.value);
  controls.enableDamping = true;
  box.value.appendChild(renderer.domElement);
  render();

  // 监听窗口变化
  window.addEventListener("resize", () => {
    // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
    renderer.setSize(box.value.offsetWidth, box.value.offsetHeight);
    // 设置相机的宽高比
    camera.aspect = box.value.offsetWidth / box.value.offsetHeight;
    // 更新相机投影矩阵
    camera.updateProjectionMatrix();
  });
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", () => {});
});
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
