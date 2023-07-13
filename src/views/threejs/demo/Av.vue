<!--
 * @Author: lxiang
 * @Date: 2023-04-23 08:47:02
 * @LastEditors: lxiang
 * @LastEditTime: 2023-04-28 14:41:24
 * @description: VR看房
 * @FilePath: \sea_mobile\src\views\threejs\demo\v.vue
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
const camera = new THREE.PerspectiveCamera();
// 设置相机位置
camera.position.z = 0.5;
// 初始化渲染器
const renderer = new THREE.WebGLRenderer();

const box = ref(null);

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

// 添加立方体
// const geometry = new THREE.BoxGeometry(10, 10, 10);
// // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// // const cube = new THREE.Mesh(geometry, material);
// // scene.add(cube);

// // 4_b,
// var arr = ["4_l", "4_r", "4_u", "4_d", "4_b", "4_f"];
// var boxMaterials = [];

// arr.forEach((item) => {
//   // 纹理加载
//   let texture = new THREE.TextureLoader().load(
//     require(`@/assets/textures/living/${item}.jpg`)
//   );
//   // 创建材质
//   if (item === "4_u" || item === "4_d") {
//     texture.rotation = Math.PI; // 旋转180度
//     texture.center = new THREE.Vector2(0.5, 0.5); // 设置纹理中心点
//     boxMaterials.push(new THREE.MeshBasicMaterial({ map: texture }));
//   } else {
//     boxMaterials.push(new THREE.MeshBasicMaterial({ map: texture }));
//   }
// });
// const cube = new THREE.Mesh(geometry, boxMaterials);
// cube.geometry.scale(1, 1, -1); // 翻转几何体反过来,否则内部看不到
// scene.add(cube);

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
  camera.aspect = box.value.offsetWidth / box.value.offsetHeight; // 设置相机视口的宽高比
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
