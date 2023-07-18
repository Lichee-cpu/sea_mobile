<!--
 * @Author: lxiang
 * @Date: 2023-04-23 08:47:02
 * @LastEditors: lxiang
 * @LastEditTime: 2023-07-14 13:45:38
 * @description: webGL与原理
 * @FilePath: \sea_mobile\src\views\threejs\demo\Bd.vue
-->
<template>
  <div class="info">
    <Header :title="title" transparent :nav="true" :defaultNav="true" />
    <div class="box" ref="box">
      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/header/Header.vue";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";

const route = useRoute();
const title = route?.query?.title;
const box = ref(null);
const canvas = ref(null);

const draw = () => {
  //生成一个canvas元素添加到box中
  canvas.value.width = box.value.offsetWidth;
  canvas.value.height = box.value.offsetHeight;
  //获取webGL上下文
  const gl = canvas.value.getContext("webgl");
  //第一次创建webgl绘制上下文，需要设置视口大小
  gl.viewport(0, 0, canvas.value.width, canvas.value.height);

  //创建顶点着色器
  const vertexShader = gl.createShader(gl.VERTEX_SHADER); // 创建顶点着色器

  gl.shaderSource(
    vertexShader,
    `
        attribute vec4 v_position;
        void main(){
          gl_Position = v_position;
        }
      `
  ); //为顶点着色器添加源码

  gl.compileShader(vertexShader); //编译顶点着色器

  //创建片元着色器
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(
    fragmentShader,
    `
        void main(){
            gl_FragColor = vec4(1.0,0.0,0.0,1.0);
        }
    `
  ); //为片元着色器添加源码
  gl.compileShader(fragmentShader); //编译片元着色器

  //创建着色器程序进行关联
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader); //关联顶点着色器
  gl.attachShader(program, fragmentShader); //关联片元着色器
  gl.linkProgram(program); //链接着色器程序

  //使用着色器程序
  gl.useProgram(program);

  //创建顶点缓冲区对象
  const vertexBuffer = gl.createBuffer();
  //绑定缓冲区对象
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  //向缓冲区对象写入数据
  const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  //获取顶点着色器中的变量
  const v_Position = gl.getAttribLocation(program, "v_position");

  //将缓冲区对象分配给v_Position变量
  gl.vertexAttribPointer(v_Position, 2, gl.FLOAT, false, 0, 0);
  //连接v_Position变量与分配给它的缓冲区对象
  gl.enableVertexAttribArray(v_Position);

  //绘制三角形
  gl.drawArrays(gl.TRIANGLES, 0, 3);
};
onMounted(() => {
  draw();
});
</script>
<style lang="less" scoped>
.info {
  padding-top: var(--nav-bar-height);
  height: 100%;
  .box {
    height: 100%;
  }
}
</style>
