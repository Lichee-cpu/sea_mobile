<!--
 * @Author: lxiang
 * @Date: 2023-04-23 08:47:02
 * @LastEditors: lxiang
 * @LastEditTime: 2023-04-25 09:15:35
 * @description: 几何体法向属性
 * @FilePath: \sea_mobile\src\views\threejs\demo\i.vue
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
import gsap from "gsap";
import * as dat from "dat.gui";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { onBeforeUnmount, onMounted, ref } from "vue";
export default {
  components: {
    Header,
  },
  setup() {
    const route = useRoute();
    const title = route?.query?.title;
    const box = ref(null);
    // 初始化GUI
    const gui = new dat.GUI();

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
      const geometry = new THREE.BufferGeometry(); // 创建一个几何体
      const vertices = new Float32Array([
       -1.0,-1.0,1.0, // 顶点1
        1.0,-1.0,1.0, // 顶点2
        1.0,1.0,1.0, // 顶点3
        -1.0,1.0,1.0, // 顶点4
        -1.0,-1.0,1.0, // 顶点5
        1.0,1.0,1.0, // 顶点6
      ]);
      geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3)); // 设置几何体的顶点属性
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // 创建一个绿色的材质
      const cube = new THREE.Mesh(geometry, material); 
      scene.add(cube); // 将几何体添加到场景中

      // 设置GUI的位置
      const navheight = window
        .getComputedStyle(document.body)
        .getPropertyValue("--nav-bar-height");
      gui.domElement.style.position = "absolute";
      gui.domElement.style.left = "0px";
      gui.domElement.style.top = navheight;
      const param = {
        color: 0x00ff00,
        tweenObj: null, // 保存 Tween 对象的变量
        isMoving: false, // 布尔值类型的开关
        actived: false, //是否激活过
        move: function () {
          if (param.isMoving) {
            param.actived = true;
            // 检查 isMoving 的值
            param.tweenObj = gsap.to(cube.position, {
              duration: 2,
              x: 5,
              ease: "power1.inOut",
              repeat: -1,
              yoyo: true,
            });
          }
        },
      };

      // gui文件夹
      const folder = gui.addFolder("物体属性");
      folder.add(cube, "visible").name("显示物体");
      folder.add(cube.material, "wireframe").name("显示线框");
      folder
        .addColor(param, "color")
        .name("物体颜色")
        .onChange(() => {
          material.color.set(param.color);
        });
      const folder1 = gui.addFolder("事件");
      folder1
        .add(cube.position, "x", 0, 5, 0.01)
        .name("移动x轴")
        .onChange((vale) => {
          console.log("修改值为", vale);
        })
        .onFinishChange((value) => {
          console.log("修改完成", value);
        });
      folder1
        .add(param, "isMoving")
        .name("移动物体")
        .onChange(function (value) {
          if (value) {
            param.isMoving = value;
            if (!param.actived) {
              param.move();
            } else {
              param.tweenObj.paused(!value); // paused() 方法用于暂停或恢复动画
            }
          } else {
            param.isMoving = value;
            param.tweenObj.paused(!value); // paused() 方法用于暂停或恢复动画
          }
        });

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

      // 监听双击事件，全屏和退出全屏
      window.addEventListener("dblclick", () => {
        // 全屏和退出全屏
        if (document.fullscreenElement) {
          document.exitFullscreen(); // 退出全屏
        } else {
          if (box.value) {
            box.value.requestFullscreen(); // 全屏
          }
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
    onBeforeUnmount(() => {
      gui.destroy(); // 销毁GUI
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
