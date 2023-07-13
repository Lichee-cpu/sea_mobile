<!--
 * @Author: lxiang
 * @Date: 2023-04-23 08:47:02
 * @LastEditors: lxiang
 * @LastEditTime: 2023-07-13 10:34:48
 * @description: 雪花
 * @FilePath: \sea_mobile\src\views\threejs\demo\z.vue
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
    30
  );

  // 设置相机位置
  camera.position.set(0, 0, 40);
  scene.add(camera);

  function createPoints(url, size = 0.5) {
    const particlesGeometry = new THREE.BufferGeometry();
    const count = 10000;

    // 设置缓冲区数组
    const positions = new Float32Array(count * 3);
    // 设置粒子顶点颜色
    const colors = new Float32Array(count * 3);
    // 设置顶点
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 100;
      colors[i] = Math.random();
    }
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );

    // 设置点材质
    const pointsMaterial = new THREE.PointsMaterial();
    pointsMaterial.size = size;
    pointsMaterial.color.set(0xfff000);
    // 相机深度而衰减
    pointsMaterial.sizeAttenuation = true;

    // 载入纹理
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(
      `lichee-img.oss-cn-hangzhou.aliyuncs.com/threejs/${url}.png`
    );
    // 设置点材质纹理
    pointsMaterial.map = texture;
    pointsMaterial.alphaMap = texture;
    pointsMaterial.transparent = true;
    pointsMaterial.depthWrite = false;
    pointsMaterial.blending = THREE.AdditiveBlending;
    // 设置启动顶点颜色
    pointsMaterial.vertexColors = true;

    const points = new THREE.Points(particlesGeometry, pointsMaterial);

    scene.add(points);
    return points;
  }

  const points = createPoints("11", 1.5);
  const points2 = createPoints("xh", 1);
  const points3 = createPoints("xh", 2);

  // 初始化渲染器
  const renderer = new THREE.WebGLRenderer();
  // 设置渲染的尺寸大小
  renderer.setSize(box.value.offsetWidth, box.value.offsetHeight);
  // 开启场景中的阴影贴图
  renderer.shadowMap.enabled = true;

  // console.log(renderer);
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
  // 设置时钟
  const clock = new THREE.Clock();

  function render() {
    let time = clock.getElapsedTime();
    points.rotation.x = time * 0.3;
    points2.rotation.x = time * 0.5;
    points2.rotation.y = time * 0.4;
    points3.rotation.x = time * 0.2;
    points3.rotation.y = time * 0.2;
    controls.update();
    renderer.render(scene, camera);
    //   渲染下一帧的时候就会调用render函数
    requestAnimationFrame(render);
  }

  render();

  // 监听画面变化，更新渲染画面
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(box.value.offsetWidth, box.value.offsetHeight);
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
