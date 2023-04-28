<!--
 * @Author: lxiang
 * @Date: 2023-04-23 08:47:02
 * @LastEditors: lxiang
 * @LastEditTime: 2023-04-28 09:34:09
 * @description: 聚光灯
 * @FilePath: \sea_mobile\src\views\threejs\demo\t.vue
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
import { onMounted, ref, onUnmounted } from "vue";
import * as dat from "dat.gui";

export default {
  components: {
    Header,
  },
  setup() {
    const route = useRoute();
    const title = route?.query?.title;
    const box = ref(null);
    const gui = new dat.GUI();

    const draw = () => {
      // 1. 创建场景
      const scene = new THREE.Scene();
      // 2. 创建相机 视场角,宽高比,近平面,远平面
      const camera = new THREE.PerspectiveCamera(
        75,
        box.value.offsetWidth / box.value.offsetHeight,
        0.1,
        1000
      );

      // 3. 设置相机位置
      camera.position.set(0, 0, 10); // 默认相机位置是(0,0,0)
      scene.add(camera); // 将相机添加到场景中

      const sphereGeometry = new THREE.SphereGeometry(1, 20, 20); // 设置一个球
      const material = new THREE.MeshStandardMaterial(); // 设置材质
      const sphere = new THREE.Mesh(sphereGeometry, material); // 创建一个球体
      sphere.castShadow = true; // 设置为true，可以投射阴影
      scene.add(sphere);

      // // 创建平面
      const planeGeometry = new THREE.PlaneGeometry(50, 50);
      const plane = new THREE.Mesh(planeGeometry, material);
      plane.position.set(0, -1, 0);
      plane.rotation.x = -Math.PI / 2;
      plane.receiveShadow = true; // 设置为true，可以接收阴影
      scene.add(plane);

      // 灯光
      // 环境光
      const light = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
      scene.add(light);
      //直线光源
      const spotLight = new THREE.SpotLight(0xffffff, 1);
      spotLight.position.set(10, 10, 10);
      spotLight.castShadow = true; // 设置为true，可以投射阴影
      spotLight.intensity = 2; // 设置灯光的强度
      scene.add(spotLight);

      // 设置阴影贴图模糊度
      spotLight.shadow.radius = 10;
      // 设置阴影贴图的分辨率
      spotLight.shadow.mapSize.set(4096, 4096);
      spotLight.target = sphere; // 设置聚光灯的目标为球体
      spotLight.angle = Math.PI / 4; // 设置聚光灯的角度
      spotLight.distance = 0; // 设置聚光灯的距离
      spotLight.penumbra = 0; // 设置聚光灯的边缘模糊度
      spotLight.decay = 0; // 设置聚光灯的衰减度

      //设置透视相机的属性

      scene.add(spotLight); // 将灯光添加到场景中
      // 设置GUI的位置
      const navheight = window
        .getComputedStyle(document.body)
        .getPropertyValue("--nav-bar-height");
      gui.domElement.style.position = "absolute";
      gui.domElement.style.left = "0px";
      gui.domElement.style.top = navheight;
      gui.add(sphere.position, "x", -5, 5, 0.1).name("球体x轴位置");
      gui.add(spotLight, "angle", 0, Math.PI / 2, 0.01).name("聚光灯角度");
      gui.add(spotLight, "distance", 0, 50, 0.1).name("聚光灯距离");
      gui.add(spotLight, "penumbra", 0, 1, 0.01).name("聚光灯边缘模糊度");
      gui.add(spotLight, "decay", 0, 5, 0.01).name("聚光灯衰减度");
      // 初始化渲染器
      const renderer = new THREE.WebGLRenderer();
      renderer.useLegacyLights = false; // 设置为true，可以使用旧版的光照模型,false则使用新版的光照模型
      // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
      renderer.setSize(box.value.offsetWidth, box.value.offsetHeight);
      // 开启场景中的阴影贴图
      renderer.shadowMap.enabled = true;
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

      function animate() {
        controls.update(); // 更新控制器
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }
      animate();
      // 监听窗口变化
      const resize = () => {
        // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
        renderer.setSize(box.value.offsetWidth, box.value.offsetHeight);
        // 设置相机的宽高比
        camera.aspect = box.value.offsetWidth / box.value.offsetHeight;
        // 更新相机投影矩阵
        camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", resize);
    };

    const dbclick = () => {
      // 全屏和退出全屏
      if (document.fullscreenElement) {
        document.exitFullscreen(); // 退出全屏
      } else {
        box.value.requestFullscreen(); // 全屏
      }
    };
    window.addEventListener("dblclick", dbclick);

    onMounted(() => {
      draw();
    });
    onUnmounted(() => {
      gui.destroy(); // 销毁GUI
      document.removeEventListener("dblclick", dbclick);
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
/deep/ .van-popup {
  background: rgba(0, 0, 0, 0.5);
}
</style>
