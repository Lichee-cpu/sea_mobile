<!--
 * @Author: lxiang
 * @Date: 2023-04-23 08:47:02
 * @LastEditors: lxiang
 * @LastEditTime: 2023-07-13 14:39:34
 * @description: 选中目标
 * @FilePath: \sea_mobile\src\views\threejs\demo\Bb.vue
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
import { onMounted, ref } from "vue";
// 导入threejs
import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const route = useRoute();
const title = route?.query?.title;
const box = ref(null);

const draw = () => {
  // 1、创建场景
  const scene = new THREE.Scene();

  // 2、创建相机
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    300
  );

  // 设置相机位置
  camera.position.set(0, 0, 20);
  scene.add(camera);

  const cubeGeometry = new THREE.BoxBufferGeometry(1, 1, 1); // 立方体
  const material = new THREE.MeshBasicMaterial({
    wireframe: true, // 线框模式
  });
  const redMaterial = new THREE.MeshBasicMaterial({
    color: "#ff0000",
  }); // 红色材质

  // 10*10立方体
  let cubeArr = [];
  for (let i = -5; i < 5; i++) {
    for (let j = -5; j < 5; j++) {
      for (let z = -5; z < 5; z++) {
        const cube = new THREE.Mesh(cubeGeometry, material);
        cube.position.set(i, j, z);
        scene.add(cube);
        cubeArr.push(cube);
      }
    }
  }

  // 创建投射光线对象
  const raycaster = new THREE.Raycaster();

  // 鼠标的位置对象
  const mouse = new THREE.Vector2();

  // 监听鼠标的位置
  // window.addEventListener("mousemove", (event) => {
  //   //   console.log(event);
  //   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  //   mouse.y = -((event.clientY / window.innerHeight) * 2 - 1);
  //   raycaster.setFromCamera(mouse, camera);
  //   let result = raycaster.intersectObjects(cubeArr);
  //   //   console.log(result);
  //   //   result[0].object.material = redMaterial;
  //   result.forEach((item) => {
  //     item.object.material = redMaterial;
  //   });
  // });

  // 监听鼠标的位置
  window.addEventListener("click", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -((event.clientY / window.innerHeight) * 2 - 1);
    raycaster.setFromCamera(mouse, camera); // 通过相机和鼠标位置更新射线
    let result = raycaster.intersectObjects(cubeArr); // 获取射线和立方体相交的数组
    result.forEach((item) => {
      item.object.material = redMaterial;
    });
  });

  // 初始化渲染器
  const renderer = new THREE.WebGLRenderer();
  // 设置渲染的尺寸大小
  renderer.setSize(box.value.offsetWidth, box.value.offsetHeight);
  // 开启场景中的阴影贴图
  renderer.shadowMap.enabled = true;
  renderer.physicallyCorrectLights = true;

  // 将webgl渲染的canvas内容添加到body
  box.value.appendChild(renderer.domElement);

  // // 使用渲染器，通过相机将场景渲染进来
  // renderer.render(scene, camera);

  // 创建轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  // 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
  controls.enableDamping = true;

  // 添加坐标轴辅助器
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  function render() {
    controls.update();
    renderer.render(scene, camera);
    //   渲染下一帧的时候就会调用render函数
    requestAnimationFrame(render);
  }

  render();

  // 监听画面变化，更新渲染画面
  window.addEventListener("resize", () => {
    // 更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight;
    //   更新摄像机的投影矩阵
    camera.updateProjectionMatrix();

    //   更新渲染器
    renderer.setSize(box.value.offsetWidth, box.value.offsetHeight);
    //   设置渲染器的像素比
    renderer.setPixelRatio(window.devicePixelRatio);
  });
};
onMounted(() => {
  draw();
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
