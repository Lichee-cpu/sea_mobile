precision lowp float;

varying vec4 vPosition;
varying vec4 gPosition;
void main(){
    vec4 modelPosition = modelMatrix * vec4( position, 1.0 ); // 定义模型坐标
    vPosition = modelPosition; // 传递模型坐标
    gPosition = vec4( position, 1.0 ); // 传递世界坐标
    gl_Position =  projectionMatrix * viewMatrix * modelPosition; // 定义裁剪坐标

}

