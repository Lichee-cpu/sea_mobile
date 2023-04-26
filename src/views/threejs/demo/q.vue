<!--
 * @Author: lxiang
 * @Date: 2023-04-23 08:47:02
 * @LastEditors: lxiang
 * @LastEditTime: 2023-04-26 19:01:31
 * @description: 环境纹理
 * @FilePath: \sea_mobile\src\views\threejs\demo\q.vue
-->
<template>
  <div class="info">
    <Header :title="title" transparent :nav="true" :defaultNav="true" />
    <div class="box" ref="box"></div>
    <van-popup v-model:show="show" round>
      <van-circle
        v-model:current-rate="currentRate"
        :speed="100"
        :text="text"
      />
    </van-popup>
  </div>
</template>

<script>
import Header from "@/components/header/Header.vue";
import { useRoute } from "vue-router";
import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { onMounted, ref, computed } from "vue";
export default {
  components: {
    Header,
  },
  setup() {
    const route = useRoute();
    const title = route?.query?.title;
    const box = ref(null);
    const currentRate = ref(0);
    const text = computed(() => currentRate.value.toFixed(0) + "%");
    const show = ref(false);

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

      // 事件
      const event = {};
      event.onLoad = () => {
        console.log("纹理加载完成");
        show.value = false;
      };
      event.onProgress = (url, num, total) => {
        console.log("纹理加载进度", url);
        console.log(
          "总数:" + total,
          "第" + num + "张",
          (num / total) * 100 + "%"
        );
        currentRate.value = (num / total) * 100;
      };
      event.onError = (xhr) => {
        console.log("纹理加载失败", xhr);
      };

      // 设置加载管理器
      const loadingManager = new THREE.LoadingManager(
        event.onLoad,
        event.onProgress,
        event.onError
      );

      // 设置cube纹理加载器
      const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager);
      const envMapTexture = cubeTextureLoader.load([
        require("@/assets/textures/environmentMaps/1/px.jpg"),
        require("@/assets/textures/environmentMaps/1/nx.jpg"),
        require("@/assets/textures/environmentMaps/1/py.jpg"),
        require("@/assets/textures/environmentMaps/1/ny.jpg"),
        require("@/assets/textures/environmentMaps/1/pz.jpg"),
        require("@/assets/textures/environmentMaps/1/nz.jpg"),
      ]);

      const spereGeometry = new THREE.SphereGeometry(1, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.7, // 金属感
        roughness: 0.1, // 粗糙度
        // envMap: envMapTexture,
      });

      const sphere = new THREE.Mesh(spereGeometry, material);
      scene.add(sphere);

      scene.background = envMapTexture; // 给场景添加背景
      scene.environment = envMapTexture; // 设置默认环境纹理(同上面的envMap: envMapTexture)

      // 灯光
      // 环境光
      const light = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
      scene.add(light);
      //直线光源
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(10, 10, 10);
      scene.add(directionalLight);

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
      show.value = true;
      draw();
    });

    return { title, box, currentRate, show, text };
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
