precision lowp float; //指定默认浮点精度
varying vec4 vPosition; // 顶点着色器传递过来的顶点位置
varying vec4 gPosition; // 顶点着色器传递过来的世界坐标

void main(){
    vec4 redColor = vec4(1,0,0,1); // 定义红色
    vec4 yellowColor = vec4(1,1,0.5,1); // 定义黄色
    vec4 mixColor = mix(yellowColor,redColor,gPosition.y/3.0); // 根据世界坐标的y值进行颜色混合

    if(gl_FrontFacing){
        gl_FragColor = vec4(mixColor.xyz-(vPosition.y-20.0)/80.0-0.1,1); // 根据顶点位置的y值进行颜色混合
        // gl_FragColor = vec4(1,1,1,1);
    }else{
        gl_FragColor = vec4(mixColor.xyz,1); // 根据顶点位置的y值进行颜色混合
    }
}