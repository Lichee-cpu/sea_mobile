<!--
 * @Author: lxiang
 * @Date: 2023-04-23 08:47:02
 * @LastEditors: lxiang
 * @LastEditTime: 2023-07-26 10:16:20
 * @description: VR看房切换房间
 * @FilePath: \sea_mobile\src\views\threejs\demo\Bg.vue
-->
<template>
  <div class="info">
    <Header :title="title" transparent :nav="true" :defaultNav="true" />
    <div class="box" ref="box"></div>
    <div class="map">
      <div class="tag" ref="tagDiv"></div>
      <img src="@/assets/textures/map.gif" alt="" />
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/header/Header.vue";
import * as THREE from "three";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import gsap from "gsap";

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
// 设置相机位置
camera.position.set(0, 0, 0);
// 初始化渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
  logarithmicDepthBuffer: true,
});

const box = ref(null);
const tagDiv = ref(null);

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

class Room {
  constructor(
    name,
    roomIndex,
    textureUrl,
    position = new THREE.Vector3(0, 0, 0),
    euler = new THREE.Euler(0, 0, 0)
  ) {
    this.name = name;
    // 创建立方体
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    geometry.scale(1, 1, -1);
    // let textureUrl = textureUrl;
    // let roomIndex = 0;
    var arr = [
      `${roomIndex}_l`,
      `${roomIndex}_r`,
      `${roomIndex}_u`,
      `${roomIndex}_d`,
      `${roomIndex}_b`,
      `${roomIndex}_f`,
    ];
    let boxMaterials = [];
    arr.forEach((item) => {
      // 纹理加载
      const texture = new THREE.TextureLoader().load(
        textureUrl + item + ".jpg"
      );
      if (item === `${roomIndex}_d` || item === `${roomIndex}_u`) {
        texture.rotation = Math.PI;
        texture.center = new THREE.Vector2(0.5, 0.5);
      }
      boxMaterials.push(
        new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          opacity: 0.8,
          depthWrite: true,
          depthTest: true,
        })
      );
    });

    const cube = new THREE.Mesh(geometry, boxMaterials);
    cube.position.copy(position);
    cube.rotation.copy(euler);
    scene.add(cube);
  }
}
class SpriteText {
  constructor(text, position) {
    this.callbacks = [];
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const context = canvas.getContext("2d");
    context.fillStyle = "rgba(100, 100, 100, 0.7)";
    context.fillRect(0, 256, 1024, 512);
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "bold 200px Arial";
    context.fillStyle = "white";
    context.fillText(text, 512, 512);
    let texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthWrite: true,
    });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(0.5, 0.5, 0.5);
    sprite.position.copy(position);
    this.sprite = sprite;
    sprite.renderOrder = 1;
    scene.add(sprite);
    let mouse = new THREE.Vector2();
    let raycaster = new THREE.Raycaster();
    window.addEventListener("click", (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      let intersects = raycaster.intersectObject(sprite);
      if (intersects.length > 0) {
        this.callbacks.forEach((callback) => {
          callback();
        });
      }
    });
  }
  onClick(callback) {
    this.callbacks.push(callback);
  }
}

const progress = ref(0);
THREE.DefaultLoadingManager.onProgress = function (item, loaded, total) {
  console.log(item, loaded, total);
  console.log("进度:", new Number((loaded / total) * 100).toFixed(2));
  progress.value = new Number((loaded / total) * 100).toFixed(2);
};

// 挂载完毕之后获取dom
onMounted(() => {
  camera.aspect = box.value.offsetWidth / box.value.offsetHeight; // 设置相机视口的宽高比
  camera.updateProjectionMatrix(); // 更新相机投影矩阵
  renderer.setSize(box.value.offsetWidth, box.value.offsetHeight); // 设置渲染器的宽高
  box.value.appendChild(renderer.domElement);
  render();

  let isMouseDown = false;
  // 监听鼠标按下事件
  box.value.addEventListener(
    "mousedown",
    () => {
      isMouseDown = true;
    },
    false
  );
  box.value.addEventListener(
    "mouseup",
    () => {
      isMouseDown = false;
    },
    false
  );
  box.value.addEventListener("mouseout", () => {
    isMouseDown = false;
  });
  let clock = new THREE.Clock();
  clock.start();
  // 是否按下鼠标,移动鼠标
  box.value.addEventListener("mousemove", (event) => {
    camera.rotation.order = "YXZ";

    let delta = clock.getDelta();
    if (isMouseDown) {
      gsap.to(camera.rotation, {
        y: camera.rotation.y + event.movementX * 0.001,
        x: camera.rotation.x + event.movementY * 0.001,
        duration: delta,
      });
      camera.rotation.order = "YXZ";
    }
  });

  tagDiv.value.style.cssText = `transform:translate(100px,110px)`;

  function moveTag(name) {
    let positions = {
      客厅: [100, 110],
      厨房: [180, 190],
      阳台: [50, 50],
    };
    if (positions[name]) {
      gsap.to(tagDiv.value, {
        duration: 0.5,
        x: positions[name][0],
        y: positions[name][1],
        ease: "power3.inOut",
      });
    }
  }
  // 创建客厅
  new Room("客厅", 0, "./texture/vrRoom/livingroom/");

  // 创建厨房
  let kitchenPostion = new THREE.Vector3(-5, 0, -10); // 厨房位置
  let kitEuler = new THREE.Euler(0, -Math.PI / 2, 0); // 厨房旋转角度
  new Room("厨房", 3, "./texture/vrRoom/kitchen/", kitchenPostion, kitEuler);

  // 创建厨房精灵文字
  let kitchenTextPosition = new THREE.Vector3(-1, 0, -3);
  let kitchenText = new SpriteText("厨房", kitchenTextPosition);
  kitchenText.onClick(() => {
    // 让相机移动到厨房
    gsap.to(camera.position, {
      duration: 1,
      x: kitchenPostion.x,
      y: kitchenPostion.y,
      z: kitchenPostion.z,
    });
    moveTag("厨房");
  });

  // 创建厨房回客厅精灵文字
  let kitchenBackTextPosition = new THREE.Vector3(-4, 0, -6);
  let kitchenBackText = new SpriteText("客厅", kitchenBackTextPosition);
  kitchenBackText.onClick(() => {
    // 让相机移动到客厅
    gsap.to(camera.position, {
      duration: 1,
      x: 0,
      y: 0,
      z: 0,
    });
    moveTag("客厅");
  });

  // 创建阳台
  let balconyPosition = new THREE.Vector3(0, 0, 15);
  new Room("阳台", 8, "./texture/vrRoom/balcony/", balconyPosition);
  // 创建阳台精灵文字
  let balconyTextPosition = new THREE.Vector3(0, 0, 3);
  let balconyText = new SpriteText("阳台", balconyTextPosition);
  balconyText.onClick(() => {
    // 让相机移动到阳台
    gsap.to(camera.position, {
      duration: 1,
      x: balconyPosition.x,
      y: balconyPosition.y,
      z: balconyPosition.z,
    });
    moveTag("阳台");
  });

  // 创建阳台回客厅精灵文字
  let balconyBackTextPosition = new THREE.Vector3(-1, 0, 11);
  let balconyBackText = new SpriteText("客厅", balconyBackTextPosition);
  balconyBackText.onClick(() => {
    // 让相机移动到客厅
    // console.log("客厅");
    gsap.to(camera.position, {
      duration: 1,
      x: 0,
      y: 0,
      z: 0,
    });
    moveTag("客厅");
  });

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
.map {
  width: 300px;
  height: 260px;
  position: absolute;
  left: 0;
  bottom: 0;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .tag {
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 30px;
    background-image: url(../../../assets/textures/location.png);
    background-size: cover;
    z-index: 1;
  }
}
</style>
