<!--
 * @Author: lxiang
 * @Date: 2023-04-23 08:47:02
 * @LastEditors: lxiang
 * @LastEditTime: 2023-04-25 11:09:17
 * @description: 材质
 * @FilePath: \sea_mobile\src\views\threejs\demo\k.vue
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
      const imgMaterial = textureLoader.load(require("@/assets/home/fish.jpg"));
      // 纹理偏移
      // imgMaterial.offset.set(-0.2,0);
      // 纹理旋转
      // imgMaterial.rotation = -Math.PI / 4;
      // 纹理旋转中心
      imgMaterial.center.set(0.5, 0.5);
      // 纹理重复
      imgMaterial.repeat.set(2, 2);
      // 纹理重复包裹方式
      imgMaterial.wrapS = THREE.MirroredRepeatWrapping; //水平镜像重复
      imgMaterial.wrapT = THREE.RepeatWrapping; //垂直重复

      // 添加物体
      const cubeGeometry = new THREE.BoxGeometry(1, 1, 1); // 创建一个立方体几何体
      // 材质
      const cubeMaterial = new THREE.MeshBasicMaterial({
        color: "#ffff00",
        map: imgMaterial,
      });
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial); // 创建一个立方体网格模型
      scene.add(cube); // 将立方体网格模型添加到场景中

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
