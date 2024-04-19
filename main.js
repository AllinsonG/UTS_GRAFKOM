function normalizeScreen(x,y,width,height){
    var nx = 2*x/width - 1
    var ny = -2*y/height + 1
   
    return [nx,ny]
  }
   
  function generateBSpline(controlPoint, m, degree){
    var curves = [];
    var knotVector = [];
   
    var n = controlPoint.length/2;
   
   
    // Calculate the knot values based on the degree and number of control points
    for (var i = 0; i < n + degree+1; i++) {
      if (i < degree + 1) {
        knotVector.push(0);
      } else if (i >= n) {
        knotVector.push(n - degree);
      } else {
        knotVector.push(i - degree);
      }
    }
   
   
   
    var basisFunc = function(i,j,t){
        if (j == 0){
          if(knotVector[i] <= t && t<(knotVector[(i+1)])){ 
            return 1;
          }else{
            return 0;
          }
        }
   
        var den1 = knotVector[i + j] - knotVector[i];
        var den2 = knotVector[i + j + 1] - knotVector[i + 1];
   
        var term1 = 0;
        var term2 = 0;
   
   
        if (den1 != 0 && !isNaN(den1)) {
          term1 = ((t - knotVector[i]) / den1) * basisFunc(i,j-1,t);
        }
   
        if (den2 != 0 && !isNaN(den2)) {
          term2 = ((knotVector[i + j + 1] - t) / den2) * basisFunc(i+1,j-1,t);
        }
   
        return term1 + term2;
    }
   
   
    for(var t=0;t<m;t++){
      var x=0;
      var y=0;
   
      var u = (t/m * (knotVector[controlPoint.length/2] - knotVector[degree]) ) + knotVector[degree] ;
   
      //C(t)
      for(var key =0;key<n;key++){
   
        var C = basisFunc(key,degree,u);
        console.log(C);
        x+=(controlPoint[key*2] * C);
        y+=(controlPoint[key*2+1] * C);
        console.log(t+" "+degree+" "+x+" "+y+" "+C);
      }
      curves.push(x);
      curves.push(y);
   
    }
    console.log(curves)
    return curves;
  }
function main(){
    var CANVAS = document.getElementById("mycanvas");
    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;

    var drag = false;
    var x_prev, y_prev; 
    var dX = 0, dY = 0;
    var THETA = 0, PHI = 0;
    var AMORTIZATION = 0.95;
    var keyPoint = false;
    var mouseDown = function(e){
        drag = true;
        x_prev = e.pageX;
        y_prev = e.pageY;
        e.preventDefault();
        return false;
    }
    var mouseUp = function(e){
        drag = false;
    }
    var mouseMove = function(e){
        if(!drag) return false;

        // var dX = e.pageX - x_prev;
        // var dY = e.pageY - y_prev;
        
        // THETA += dX * 2 * Math.PI / CANVAS.width;
        // PHI += dY * 2 * Math.PI / CANVAS.height;
        dX = (e.pageX - x_prev) * 2 * Math.PI/ CANVAS.width;
        dY = (e.pageY - y_prev) * 2 * Math.PI / CANVAS.height;
        THETA +=  dX;
        PHI += dY;
        x_prev = e.pageX;
        y_prev = e.pageY;
        e.preventDefault();
    }
    var keyDown = function(e){

        keyPoint = true;
        x_prev = e.pageX;
        y_prev = e.pageY;
        e.preventDefault();
        if (e.key == "w" || e.key == "W"){
       
            dY = -0.01; // Atur nilai perubahan untuk maju
        }
        if (e.key == "a" || e.key == "A"){
            dX = -0.01; // Atur nilai perubahan untuk bergerak ke kiri
        }
        if (e.key == "s" || e.key == "S"){
            dY = 0.01; // Atur nilai perubahan untuk mundur
        }
        if (e.key == "d" || e.key == "D"){
            dX = 0.01; // Atur nilai perubahan untuk bergerak ke kanan
        }
        return false;
        
    }

    var keyUp = function(e){
        keyPoint = false;
        dX = 0;
        dY = 0;
    }
    var keyPress = function(e){
        if(!keyPoint) return false;


        if (e.key == "w" || e.key == "W"){
            dY = -0.01; // Atur nilai perubahan untuk maju
        }
        if (e.key == "a" || e.key == "A"){
            dX = -0.01; // Atur nilai perubahan untuk bergerak ke kiri
        }
        if (e.key == "s" || e.key == "S"){
            dY = 0.01; // Atur nilai perubahan untuk mundur
        }
        if (e.key == "d" || e.key == "D"){
            dX = 0.01; // Atur nilai perubahan untuk bergerak ke kanan
        }
    }
   
    CANVAS.addEventListener("mousedown", mouseDown, false);
    CANVAS.addEventListener("mouseup", mouseUp, false);
    CANVAS.addEventListener("mouseout", mouseUp, false);
    CANVAS.addEventListener("mousemove", mouseMove, false);

    window.addEventListener("keydown", keyDown, false);
    window.addEventListener("keyup", keyUp, false);
    window.addEventListener("keypress", keyPress, false);


    var GL;
    try{
        GL = CANVAS.getContext("webgl",{antialias: false});
    }catch(error){
        alert("webgl context cannot be initialized");
        return false;
    }


    //SHADERS
    var shader_vertex_source = `
    attribute vec3 position; 
    attribute vec3 color;

    uniform mat4 Pmatrix;
    uniform mat4 Vmatrix;
    uniform mat4 Mmatrix;

    varying vec3 vColor;
    void main(void){
        gl_Position = Pmatrix * Vmatrix * Mmatrix * vec4(position, 1.0); 
        vColor = color;
    }
    `

    var shader_fragment_source = `
    precision mediump float;
    uniform float greyscality;
    
    varying vec3 vColor;
    void main(void){
        float greyscaleValue = (vColor.r + vColor.g + vColor.b)/3.0;
        vec3 greyscaleColor = vec3(greyscaleValue,greyscaleValue,greyscaleValue);

        vec3 color = mix(greyscaleColor,vColor,greyscality);
        gl_FragColor = vec4(color,1.0);
    }
    `
    
    var compile_shader = function(source, type, typeString){
        var shader =  GL.createShader(type);
        GL.shaderSource(shader, source);
        GL.compileShader(shader);
        if(!GL.getShaderParameter(shader, GL.COMPILE_STATUS)){
            alert("ERROR IN " + typeString + " SHADER: " + GL.getShaderInfoLog(shader));
            return false;
        }
        return shader;
    };

    var shader_vertex = compile_shader(shader_vertex_source,GL.VERTEX_SHADER,"VERTEX");
    var shader_fragment = compile_shader(shader_fragment_source,GL.FRAGMENT_SHADER,"FRAGMENT");
    var SHADER_PROGRAM  = GL.createProgram();
    GL.attachShader(SHADER_PROGRAM,shader_vertex);
    GL.attachShader(SHADER_PROGRAM,shader_fragment);
    GL.linkProgram(SHADER_PROGRAM);

    var _Pmatrix = GL.getUniformLocation(SHADER_PROGRAM,"Pmatrix");
    var _Vmatrix = GL.getUniformLocation(SHADER_PROGRAM,"Vmatrix");
    var _Mmatrix = GL.getUniformLocation(SHADER_PROGRAM,"Mmatrix");
    var _greyscality = GL.getUniformLocation(SHADER_PROGRAM,"greyscality");

    var _color = GL.getAttribLocation(SHADER_PROGRAM,"color");
    var _position = GL.getAttribLocation(SHADER_PROGRAM,"position");
    GL.enableVertexAttribArray(_color);
    GL.enableVertexAttribArray(_position);
    GL.useProgram(SHADER_PROGRAM);
    //TRIANGLE
    
    // var triangle_vertex = [
    //     -1,-1,0.0,   //index-0 -> mengacu ke bottom left viewport
    //     0,0,1,   //biru
    //     1,-1,0.0,    //omdex 1-> bottom right viewport
    //     0,1,0,   //hijau
    //     1,1,0.0,    //index 2-> top right viewport
    //     1,0,0
    //     // ,
    //     // -1,1,0.0,
    //     // 1,0,0
    //     //selalu berlawanan arah jarum jam, kalau ngak ada error yang terjadi
    // ];

    //cube
    // var triangle_vertex = [
    //     -1,-1,-1,   0,0,0,
    //     1,-1,-1,   1,0,0,
    //     1,1,-1,   1,1,0,
    //     -1,1,-1,   0,1,0,
    //     -1,-1,1,   0,0,1,
    //     1,-1,1,   1,0,1,
    //     1,1,1,   1,1,1,
    //     -1,1,1,   0,1,1
    // ];

    // var triangle_vertex = [
    //     -1,-1,-1,   0,0,0,
    //     1,-1,-1,   1,0,0,
    //     1,1,-1,   1,1,0,
    //     -1,1,-1,   0,1,0,
    //     -1,-1,1,   0,0,1,
    //     1,-1,1,   1,0,1,
    //     1,1,1,   1,1,1,
    //     -1,1,1,   0,1,1
    // ];

    var triangle_vertex = [
        -1, -1, -1,     1, 1, 0,
        1, -1, -1,     1, 1, 0,
        1,  1, -1,     1, 1, 0,
        -1,  1, -1,     1, 1, 0,
 
        -1, -1, 1,     0, 0, 1,
        1, -1, 1,     0, 0, 1,
        1,  1, 1,     0, 0, 1,
        -1,  1, 1,     0, 0, 1,
 
        -1, -1, -1,     0, 1, 1,
        -1,  1, -1,     0, 1, 1,
        -1,  1,  1,     0, 1, 1,
        -1, -1,  1,     0, 1, 1,
 
        1, -1, -1,     1, 0, 0,
        1,  1, -1,     1, 0, 0,
        1,  1,  1,     1, 0, 0,
        1, -1,  1,     1, 0, 0,
 
        -1, -1, -1,     1, 0, 1,
        -1, -1,  1,     1, 0, 1,
        1, -1,  1,     1, 0, 1,
        1, -1, -1,     1, 0, 1,
 
        -1, 1, -1,     0, 1, 0,
        -1, 1,  1,     0, 1, 0,
        1, 1,  1,     0, 1, 0,
        1, 1, -1,     0, 1, 0
    ];
    var TRIANGLE_VERTEX = GL.createBuffer();
    GL.bindBuffer(GL.ARRAY_BUFFER,TRIANGLE_VERTEX);
    GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(triangle_vertex),GL.STATIC_DRAW); //mungkin ada komanya

    //FACES
    
    // var triangle_faces = [0,1,2,3];
    var triangle_faces = [0, 1, 2,
        0, 2, 3,
   
        4, 5, 6,
        4, 6, 7,
   
        8, 9, 10,
        8, 10, 11,
   
        12, 13, 14,
        12, 14, 15,
   
        16, 17, 18,
        16, 18, 19,
   
        20, 21, 22,
        20, 22, 23];
    var TRIANGLE_FACES = GL.createBuffer();
    GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER,TRIANGLE_FACES);
    GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array (triangle_faces),GL.STATIC_DRAW); //pakai integer karena indeksnya tidak mungkin ada komanya

    //MATRIX
    var PROJMATRIX =  LIBS.get_projection(40,CANVAS.width/CANVAS.height,1,100);
    var MOVEMATRIX = LIBS.get_I4();
    var VIEWMATRIX = LIBS.get_I4();
    var MOVEMATRIX2 = LIBS.get_I4();

    LIBS.translateZ(VIEWMATRIX,-5);

    //DRAWING
    GL.clearColor(0.0,0.0,0.0,0.0);
    GL.enable(GL.DEPTH_TEST);
    GL.depthFunc(GL.LEQUAL);
    GL.clearDepth(1.0);

    var time_prev = 0;
    var animate = function(time){
        if (time>0){
            var dt = (time-time_prev);
            if(!drag){
                dX *= AMORTIZATION;
                dY *= AMORTIZATION;
                THETA += dX;
                PHI += dY;
            }
            console.log(dt);
            // LIBS.rotateX(MOVEMATRIX,dt*0.001);
            // LIBS.rotateY(MOVEMATRIX,dt*0.001);
            // LIBS.rotateZ(MOVEMATRIX,dt*0.001);
            LIBS.set_I4(MOVEMATRIX);
            LIBS.set_I4(MOVEMATRIX2);
            // LIBS.translateX(MOVEMATRIX, -2);
            // LIBS.translateX(MOVEMATRIX2,2);
            // LIBS.rotateX(MOVEMATRIX,PHI);
            // LIBS.rotateY(MOVEMATRIX,THETA);
            // LIBS.rotateX(MOVEMATRIX2,-PHI);
            // LIBS.rotateY(MOVEMATRIX2,-THETA);

            var radius = 2;
            var pos_x = radius * Math.cos(PHI) * Math.cos(THETA);
            var pos_y = -radius * Math.sin(PHI);
            var pos_z = -radius * Math.cos(PHI) * Math.sin(THETA);
            LIBS.set_position(MOVEMATRIX,pos_x,pos_y,pos_z);
            LIBS.set_position(MOVEMATRIX2,-pos_x,-pos_y,-pos_z);
            time_prev = time;
        }



        GL.viewport(0,0,CANVAS.width,CANVAS.height);
        GL.clear(GL.COLOR_BUFFER_BIT);


        GL.uniformMatrix4fv(_Pmatrix,false,PROJMATRIX);
        GL.uniformMatrix4fv(_Vmatrix,false,VIEWMATRIX);
        GL.uniformMatrix4fv(_Mmatrix,false,MOVEMATRIX);
        GL.bindBuffer(GL.ARRAY_BUFFER,TRIANGLE_VERTEX);
        GL.vertexAttribPointer(_position, 3, GL.FLOAT, false, 4*(3+3),0)  //dua dari position 3 dari warnanya sesuai dengan color dan position
        GL.vertexAttribPointer(_color, 3, GL.FLOAT, false, 4*(3+3),3*4)
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER,TRIANGLE_FACES);
        GL.uniform1f(_greyscality,0);
        
        GL.drawElements(GL.TRIANGLES,36,GL.UNSIGNED_SHORT,0);
        //dikarenakan tidak merubah data triangle vertex dan faces maka tidak memanggil buffer lagi
        GL.uniformMatrix4fv(_Mmatrix,false,MOVEMATRIX2);
        GL.uniform1f(_greyscality,0.5);
        GL.drawElements(GL.TRIANGLES,36,GL.UNSIGNED_SHORT,0);
        GL.flush();
        window.requestAnimationFrame(animate);
    }
    animate();
}
window.addEventListener("load",main);
