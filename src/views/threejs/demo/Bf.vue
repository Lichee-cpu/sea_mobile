<!--
 * @Author: lxiang
 * @Date: 2023-04-23 08:47:02
 * @LastEditors: lxiang
 * @LastEditTime: 2023-07-17 13:38:22
 * @description: webGL--云雾
 * @FilePath: \sea_mobile\src\views\threejs\demo\Bf.vue
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
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vertexShader from "@/views/threejs/demo/shaders/water/vertex.glsl"; // 顶点着色器
import fragmentShader from "@/views/threejs/demo/shaders/water/fragment.glsl"; // 片元着色器
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";

const route = useRoute();
const title = route?.query?.title;
const box = ref(null);

const gui = new GUI();

const draw = () => {
  // 初始化场景
  const scene = new THREE.Scene();
  // 创建透视相机
  const camera = new THREE.PerspectiveCamera(
    90,
    window.innerHeight / window.innerHeight,
    0.1,
    1000
  );
  // 设置相机位置
  // object3d具有position，属性是1个3维的向量
  camera.position.set(0, 0, 2);
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  //   更新摄像机的投影矩阵
  camera.updateProjectionMatrix();
  scene.add(camera);

  // 加入辅助轴，帮助我们查看3维坐标轴
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  const params = {
    uWaresFrequency: 14,
    uScale: 0.03,
    uXzScale: 1.5,
    uNoiseFrequency: 10,
    uNoiseScale: 1.5,
    uLowColor: "#ff0000",
    uHighColor: "#ffff00",
    uXspeed: 1,
    uZspeed: 1,
    uNoiseSpeed: 1,
    uOpacity: 1,
  };

  const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    side: THREE.DoubleSide,
    uniforms: {
      uWaresFrequency: {
        value: params.uWaresFrequency,
      },
      uScale: {
        value: params.uScale,
      },
      uNoiseFrequency: {
        value: params.uNoiseFrequency,
      },
      uNoiseScale: {
        value: params.uNoiseScale,
      },
      uXzScale: {
        value: params.uXzScale,
      },
      uTime: {
        value: params.uTime,
      },
      uLowColor: {
        value: new THREE.Color(params.uLowColor),
      },
      uHighColor: {
        value: new THREE.Color(params.uHighColor),
      },
      uXspeed: {
        value: params.uXspeed,
      },
      uZspeed: {
        value: params.uZspeed,
      },
      uNoiseSpeed: {
        value: params.uNoiseSpeed,
      },
      uOpacity: {
        value: params.uOpacity,
      },
    }, // 自定义着色器
    transparent: true,
  });

  // 设置gui的位置
  const navheight = window
    .getComputedStyle(document.body)
    .getPropertyValue("--nav-bar-height");
  gui.domElement.style.position = "absolute";
  gui.domElement.style.left = "0px";
  gui.domElement.style.top = navheight;

  gui
    .add(params, "uWaresFrequency")
    .min(1)
    .max(100)
    .step(0.1)
    .onChange((value) => {
      shaderMaterial.uniforms.uWaresFrequency.value = value;
    }); // 控制频次

  gui
    .add(params, "uScale")
    .min(0)
    .max(0.2)
    .step(0.001)
    .onChange((value) => {
      shaderMaterial.uniforms.uScale.value = value;
    }); // 控制尺度/深度

  gui
    .add(params, "uNoiseFrequency")
    .min(1)
    .max(100)
    .step(0.1)
    .onChange((value) => {
      shaderMaterial.uniforms.uNoiseFrequency.value = value;
    }); // 控制噪声频次

  gui
    .add(params, "uNoiseScale")
    .min(0)
    .max(5)
    .step(0.001)
    .onChange((value) => {
      shaderMaterial.uniforms.uNoiseScale.value = value;
    }); // 控制噪声尺度

  gui
    .add(params, "uXzScale")
    .min(0)
    .max(5)
    .step(0.1)
    .onChange((value) => {
      shaderMaterial.uniforms.uXzScale.value = value;
    }); // 控制xz方向的尺度

  gui.addColor(params, "uLowColor").onFinishChange((value) => {
    shaderMaterial.uniforms.uLowColor.value = new THREE.Color(value);
  }); // 控制低色
  gui.addColor(params, "uHighColor").onFinishChange((value) => {
    shaderMaterial.uniforms.uHighColor.value = new THREE.Color(value);
  }); // 控制高色

  gui
    .add(params, "uXspeed")
    .min(0)
    .max(5)
    .step(0.001)
    .onChange((value) => {
      shaderMaterial.uniforms.uXspeed.value = value;
    }); // 控制x方向的速度

  gui
    .add(params, "uZspeed")
    .min(0)
    .max(5)
    .step(0.001)
    .onChange((value) => {
      shaderMaterial.uniforms.uZspeed.value = value;
    }); // 控制z方向的速度

  gui
    .add(params, "uNoiseSpeed")
    .min(0)
    .max(5)
    .step(0.001)
    .onChange((value) => {
      shaderMaterial.uniforms.uNoiseSpeed.value = value;
    }); // 控制噪声的速度

  gui
    .add(params, "uOpacity")
    .min(0)
    .max(1)
    .step(0.01)
    .onChange((value) => {
      shaderMaterial.uniforms.uOpacity.value = value;
    }); // 控制透明度

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 1024, 1024),
    shaderMaterial
  );
  plane.rotation.x = -Math.PI / 2;

  scene.add(plane);

  // 初始化渲染器
  const renderer = new THREE.WebGLRenderer({ alpha: true });

  // 设置渲染尺寸大小
  renderer.setSize(box.value.offsetWidth, box.value.offsetHeight);

  // 监听屏幕大小改变的变化，设置渲染的尺寸
  window.addEventListener("resize", () => {
    //   console.log("resize");
    // 更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight;
    //   更新摄像机的投影矩阵
    camera.updateProjectionMatrix();

    //   更新渲染器
    renderer.setSize(box.value.offsetWidth, box.value.offsetHeight);
    //   设置渲染器的像素比例
    renderer.setPixelRatio(window.devicePixelRatio);
  });

  // 将渲染器添加到body
  box.value.appendChild(renderer.domElement);

  // 初始化控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  // 设置控制器阻尼
  controls.enableDamping = true;

  const clock = new THREE.Clock();
  function animate() {
    const elapsedTime = clock.getElapsedTime();
    shaderMaterial.uniforms.uTime.value = elapsedTime;
    requestAnimationFrame(animate);
    // 使用渲染器渲染相机看这个场景的内容渲染出来
    renderer.render(scene, camera);
  }

  animate();
};
onMounted(() => {
  draw();
});
onBeforeUnmount(() => {
  gui.destroy(); // 销毁GUI
});
</script>
<style lang="less" scoped>
.info {
  padding-top: var(--nav-bar-height);
  height: 100%;
  .box {
    height: 100%;
    background: black;
  }
}
</style>
