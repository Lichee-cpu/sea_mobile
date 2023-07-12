<!--
 * @Author: lxiang
 * @Date: 2023-04-23 08:47:02
 * @LastEditors: lxiang
 * @LastEditTime: 2023-07-11 14:59:37
 * @description: 边缘几何矩阵与线框几何体
 * @FilePath: \sea_mobile\src\views\threejs\demo\y.vue
-->
<template>
  <div class="info">
    <Header :title="title" transparent :nav="true" :defaultNav="true" />
    <div class="box" ref="box"></div>
  </div>
</template>

<script setup>
import Header from "@/components/header/Header.vue";
import { useRoute } from "vue-router";
import { onBeforeUnmount, onMounted, ref } from "vue";
// 导入threejs
import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// 导入lil.gui
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
// 导入hdr加载器
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
// 导入gltf加载器
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// 导入draco解码器
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

const route = useRoute();
const title = route?.query?.title;
const box = ref(null);

// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(
  45, // 视角
  window.innerWidth / window.innerHeight, // 宽高比
  0.1, // 近平面
  1000 // 远平面
);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// box.value.appendChild(renderer.domElement);

// 设置相机位置
camera.position.z = 5;
camera.position.y = 2;
camera.position.x = 2;
camera.lookAt(0, 0, 0);

// 添加世界坐标辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 渲染函数
function animate() {
  //   controls.update();
  requestAnimationFrame(animate);
  // 渲染
  renderer.render(scene, camera);
}
animate();

// 监听窗口变化
window.addEventListener("resize", () => {
  // 重置渲染器宽高比
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 重置相机宽高比
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新相机投影矩阵
  camera.updateProjectionMatrix();
});

let eventObj = {
  Fullscreen: function () {
    // 全屏
    document.body.requestFullscreen();
    console.log("全屏");
  },
  ExitFullscreen: function () {
    document.exitFullscreen();
    console.log("退出全屏");
  },
};

// 创建GUI
const gui = new GUI();
// 添加按钮
gui.add(eventObj, "Fullscreen").name("全屏");
gui.add(eventObj, "ExitFullscreen").name("退出全屏");
const navheight = window
  .getComputedStyle(document.body)
  .getPropertyValue("--nav-bar-height");
gui.domElement.style.position = "absolute";
gui.domElement.style.left = "0px";
gui.domElement.style.top = navheight;

// rgbeLoader 加载hdr贴图
let rgbeLoader = new RGBELoader();
rgbeLoader.load("./texture/Alex_Hart-Nature_Lab_Bones_2k.hdr", (envMap) => {
  // 设置球形贴图
  envMap.mapping = THREE.EquirectangularReflectionMapping;
  // 设置环境贴图
  // scene.background = envMap;
  // 设置环境贴图
  scene.environment = envMap;
});

// 实例化加载器gltf
const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
// 设置draco路径
dracoLoader.setDecoderPath("./draco/");
// 设置gltf加载器draco解码器
gltfLoader.setDRACOLoader(dracoLoader);

// 加载模型
// gltfLoader.load(
//   // 模型路径
//   "./threejsModules/building.glb",
//   // 加载完成回调
//   (gltf) => {
//     // console.log(gltf);
//     // scene.add(gltf.scene);
//     let building = gltf.scene.children[0];
//     let geometry = building.geometry;

//     // 获取边缘geometry
//     let edgesGeometry = new THREE.EdgesGeometry(geometry);
//     // // 创建线段材质
//     let edgesMaterial = new THREE.LineBasicMaterial({
//       color: 0xffffff,
//     });

//     // 线框geometry 所有三角形组成的线框
//     // let edgesGeometry = new THREE.WireframeGeometry(geometry);
//     // 创建线段
//     let edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);

//     // 更新建筑物世界转换矩阵
//     building.updateWorldMatrix(true, true);
//     edges.matrix.copy(building.matrixWorld);
//     edges.matrix.decompose(edges.position, edges.quaternion, edges.scale);

//     // 添加到场景
//     scene.add(edges);
//   }
// );

gltfLoader.load(
  // 模型路径
  "./threejsModules/city.glb",
  // 加载完成回调
  (gltf) => {
    // scene.add(gltf.scene);
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        let building = child;
        let geometry = building.geometry;

        // 获取边缘geometry
        let edgesGeometry = new THREE.EdgesGeometry(geometry);
        // // 创建线段材质
        let edgesMaterial = new THREE.LineBasicMaterial({
          color: 0xffffff,
        });

        // 线框geometry
        // let edgesGeometry = new THREE.WireframeGeometry(geometry);
        // 创建线段
        let edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);

        // 更新建筑物世界转换矩阵
        building.updateWorldMatrix(true, true);
        edges.matrix.copy(building.matrixWorld);
        edges.matrix.decompose(edges.position, edges.quaternion, edges.scale);

        // 添加到场景
        scene.add(edges);
      }
    });
  }
);

onMounted(() => {
  camera.aspect = box.value.offsetWidth / box.value.offsetHeight; // 设置相机视口的宽高比
  camera.updateProjectionMatrix(); // 更新相机投影矩阵

  renderer.setSize(box.value.offsetWidth, box.value.offsetHeight); // 设置渲染器的宽高
  box.value.appendChild(renderer.domElement);

  // 添加轨道控制器
  const controls = new OrbitControls(camera, box.value);
  // 设置带阻尼的惯性
  controls.enableDamping = true;
  // 设置阻尼系数
  controls.dampingFactor = 0.05;
  // 设置旋转速度
  // controls.autoRotate = true;
});

onBeforeUnmount(() => {
  gui.destroy(); // 销毁GUI
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
