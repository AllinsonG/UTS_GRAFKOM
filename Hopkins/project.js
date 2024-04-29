var GL;
class MyObject{
    
    OBJECT_VERTEX = GL.createBuffer();
 //mungkin ada komanya

    object_vertex = [];
    object_faces = [];
    object_color = [];
    OBJECT_FACES = GL.createBuffer();
    OBJECT_COLOR = GL.createBuffer();


    shader_vertex_source;

    shader_fragment_source;
    child = [];
    compile_shader = function(source, type, typeString){
        var shader =  GL.createShader(type);
        GL.shaderSource(shader, source);
        GL.compileShader(shader);
        if(!GL.getShaderParameter(shader, GL.COMPILE_STATUS)){
            alert("ERROR IN " + typeString + " SHADER: " + GL.getShaderInfoLog(shader));
            return false;
        }
        return shader;
    };
    shader_vertex;
    shader_fragment;
    SHADER_PROGRAM;
    _Pmatrix;
    _Vmatrix;
    _Mmatrix;
    _greyscality;
    _color;
    _position;
    

    MOVEMATRIX = LIBS.get_I4();
    constructor(object_vertex,object_faces,object_color,shader_vertex_source,shader_fragment_source){
        this.object_vertex = object_vertex;
        this.object_faces = object_faces;
        this.object_color = object_color;
        this.shader_vertex_source = shader_vertex_source;
        this.shader_fragment_source = shader_fragment_source;
        this.shader_vertex = this.compile_shader(this.shader_vertex_source,GL.VERTEX_SHADER,"VERTEX");
        this.shader_fragment = this.compile_shader(this.shader_fragment_source,GL.FRAGMENT_SHADER,"FRAGMENT");
        this.SHADER_PROGRAM  = GL.createProgram();
        GL.attachShader(this.SHADER_PROGRAM,this.shader_vertex);
        GL.attachShader(this.SHADER_PROGRAM,this.shader_fragment);
        GL.linkProgram(this.SHADER_PROGRAM);
    
        this._Pmatrix = GL.getUniformLocation(this.SHADER_PROGRAM,"Pmatrix");
        this._Vmatrix = GL.getUniformLocation(this.SHADER_PROGRAM,"Vmatrix");
        this._Mmatrix = GL.getUniformLocation(this.SHADER_PROGRAM,"Mmatrix");
        this._greyscality = GL.getUniformLocation(this.SHADER_PROGRAM,"greyscality");
    
        this._color = GL.getAttribLocation(this.SHADER_PROGRAM,"color");
        this._position = GL.getAttribLocation(this.SHADER_PROGRAM,"position");
        GL.enableVertexAttribArray(this._color);
        GL.enableVertexAttribArray(this._position);
        GL.useProgram(this.SHADER_PROGRAM);

        this.initializeBuffer();
    }
    initializeBuffer(){
        GL.bindBuffer(GL.ARRAY_BUFFER,this.OBJECT_VERTEX);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(this.object_vertex),GL.STATIC_DRAW);
        GL.bindBuffer(GL.ARRAY_BUFFER,this.OBJECT_COLOR);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(this.object_color),GL.STATIC_DRAW);
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER,this.OBJECT_FACES);
        GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array (this.object_faces),GL.STATIC_DRAW);
    }
    setUniformmatrix4(PROJMATRIX,VIEWMATRIX){
        GL.useProgram(this.SHADER_PROGRAM);
        GL.uniformMatrix4fv(this._Pmatrix,false,PROJMATRIX);
        GL.uniformMatrix4fv(this._Vmatrix,false,VIEWMATRIX);
        GL.uniformMatrix4fv(this._Mmatrix,false,this.MOVEMATRIX);
    }
    draw(){
        GL.useProgram(this.SHADER_PROGRAM);
        GL.bindBuffer(GL.ARRAY_BUFFER,this.OBJECT_VERTEX);
        GL.vertexAttribPointer(this._position, 3, GL.FLOAT, false, 4*(3+3),0)  
        GL.bindBuffer(GL.ARRAY_BUFFER, this.OBJECT_COLOR);
        GL.vertexAttribPointer(this._color, 3, GL.FLOAT, false, 0,0)
        
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER,this.OBJECT_FACES);
        GL.drawElements(GL.TRIANGLES,this.object_faces.length,GL.UNSIGNED_SHORT,0);
        for(var i  =0;i<this.child.length;i++){
            this.child[i].draw();
        }
    }
    setRotateMove(PHI,THETA,r){
        LIBS.rotateX(this.MOVEMATRIX,PHI);
        LIBS.rotateY(this.MOVEMATRIX,THETA);
        LIBS.rotateY(this.MOVEMATRIX,r);
    }
    setTranslateMove(x,y,z){
        LIBS.translateZ(this.MOVEMATRIX,z);
        LIBS.translateY(this.MOVEMATRIX,y);
        LIBS.translateX(this.MOVEMATRIX,x);
    }

    setIdentifyMove(){
        LIBS.set_I4(this.MOVEMATRIX);
    }
    addChild(child){
        this.child.push(child);
    }
    drawLine (x1, y1,z1, x2, y2,z2, color){
        x1 += -1.55;
        x2 += -1.55;
        y1 += -0.75;
        y2 += -0.75;

        var dx = x2 - x1;
        var dy = y2 - y1;
        var angle = Math.atan2(dy, dx);

        // Set ketebalan garis yang diinginkan
        var lineThickness = 0.1;

        // Hitung offset dari garis asli untuk membentuk segitiga
        var offsetX = Math.cos(angle + Math.PI / 2) * lineThickness;
        var offsetY = Math.sin(angle + Math.PI / 2) * lineThickness;

        // Hitung koordinat titik untuk dua segitiga yang membentuk bagian dari garis
        var x3 = x1 + offsetX;
        var y3 = y1 + offsetY;
        var x4 = x1 - offsetX;
        var y4 = y1 - offsetY;
        var x5 = x2 + offsetX;
        var y5 = y2 + offsetY;
        var x6 = x2 - offsetX;
        var y6 = y2 - offsetY;
        // z1 = 9.71 ;
        // z2 = 9.71 ;
        GL.bindBuffer(GL.ARRAY_BUFFER, this.OBJECT_VERTEX);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array([x3, y3,z1, x4, y4,z1, x5, y5,z2, x4, y4,z1, x5, y5,z2, x6, y6,z2]), GL.STATIC_DRAW);   
        GL.vertexAttribPointer(this._position, 3, GL.FLOAT, false, 0, 0);
    
        GL.bindBuffer(GL.ARRAY_BUFFER, this.OBJECT_COLOR);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(color),GL.STATIC_DRAW);
        GL.vertexAttribPointer(this._color, 3, GL.FLOAT, false, 0,0);
    
        GL.drawArrays(GL.TRIANGLES, 0, 6);
        // z1 = 9.7 ;
        // z2 = 9.7;
        GL.bindBuffer(GL.ARRAY_BUFFER, this.OBJECT_VERTEX);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array([x3, y3,z1, x4, y4,z1, x5, y5,z2, x4, y4,z1, x5, y5,z2, x6, y6,z2]), GL.STATIC_DRAW);   
        GL.vertexAttribPointer(this._position, 3, GL.FLOAT, false, 0, 0);
    
        GL.bindBuffer(GL.ARRAY_BUFFER, this.OBJECT_COLOR);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(color),GL.STATIC_DRAW);
        GL.vertexAttribPointer(this._color, 3, GL.FLOAT, false, 0,0);
    
        GL.drawArrays(GL.TRIANGLES, 0, 6);
      }

      drawLine2 (x1, y1,z1, x2, y2,z2, color){
        x1 += -1.55;
        x2 += -1.55;
        y1 += -0.75;
        y2 += -0.75;

        var dx = x2 - x1;
        var dy = y2 - y1;
        var angle = Math.atan2(dy, dx);

        // Set ketebalan garis yang diinginkan
        var lineThickness = 0.1;

        // Hitung offset dari garis asli untuk membentuk segitiga
        var offsetX = Math.cos(angle + Math.PI / 2) * lineThickness;
        var offsetY = Math.sin(angle + Math.PI / 2) * lineThickness;

        // Hitung koordinat titik untuk dua segitiga yang membentuk bagian dari garis
        var x3 = x1 - offsetX;
        var y3 = y1 - offsetY;
        var x4 = x1 + offsetX;
        var y4 = y1 + offsetY;
        var x5 = x2 - offsetX;
        var y5 = y2 - offsetY;
        var x6 = x2 + offsetX;
        var y6 = y2 + offsetY;
        // z1 = 9.71 ;
        // z2 = 9.71 ;
        GL.bindBuffer(GL.ARRAY_BUFFER, this.OBJECT_VERTEX);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array([x3, y3,z1, x4, y4,z1, x5, y5,z2, x4, y4,z1, x5, y5,z2, x6, y6,z2]), GL.STATIC_DRAW);   
        GL.vertexAttribPointer(this._position, 3, GL.FLOAT, false, 0, 0);
    
        GL.bindBuffer(GL.ARRAY_BUFFER, this.OBJECT_COLOR);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(color),GL.STATIC_DRAW);
        GL.vertexAttribPointer(this._color, 3, GL.FLOAT, false, 0,0);
    
        GL.drawArrays(GL.TRIANGLES, 0, 6);
        // z1 = 9.7 ;
        // z2 = 9.7;
        GL.bindBuffer(GL.ARRAY_BUFFER, this.OBJECT_VERTEX);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array([x3, y3,z1, x4, y4,z1, x5, y5,z2, x4, y4,z1, x5, y5,z2, x6, y6,z2]), GL.STATIC_DRAW);   
        GL.vertexAttribPointer(this._position, 3, GL.FLOAT, false, 0, 0);
    
        GL.bindBuffer(GL.ARRAY_BUFFER, this.OBJECT_COLOR);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(color),GL.STATIC_DRAW);
        GL.vertexAttribPointer(this._color, 3, GL.FLOAT, false, 0,0);
    
        GL.drawArrays(GL.TRIANGLES, 0, 6);
      }
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


    
    try{
        GL = CANVAS.getContext("webgl",{antialias: false});
    }catch(error){
        alert("webgl context cannot be initialized");
        return false;
    }


    //Faces
    var faceHP = new facesHP.facesHP();
    var leftEyeHP = new facesHP.eye1HP();
    var rightEyeHP = new facesHP.eye1HP();
    var leftEye1HP = new facesHP.eye2HP();
    var rightEye1HP = new facesHP.eye2HP();
    var lefthandHP = new handHP.left_handHP();
    var leftClothHP = new handHP.left_clothHP();
    var rightClothHP = new handHP.right_clothHP();
    var lefthand2HP = new handHP.left_hand2HP();
    var lefthand3HP = new handHP.elbowHP();
    var lefthand4HP = new handHP.elbow1HP();
    var righthandHP = new handHP.right_handHP();
    var righthand2HP = new handHP.right_hand2HP();
    var righthand3HP = new handHP.elbowHP();
    var righthand4HP = new handHP.elbow1HP();
    var leftpalmHP = new handHP.left_palmHP();
    var rightpalmHP = new handHP.right_palmHP();
    var leftLegHP = new legsHP.left_legHP();
    var rightLegHP = new legsHP.right_legHP();
    var bodyHP = new bodysHP.bodiesHP();
    var clothHP = new bodysHP.clothHP();
    var tailHP = new bodysHP.tailsHP();
    var rightEarHP = new earsHP.right_earHP();
    var baloonHP = new baloonsHP.baloonHP();
    var leftEarHP = new earsHP.left_earHP();
    var rightEar2HP = new earsHP.right_ear2HP();
    var leftEar2HP = new earsHP.left_ear2HP();
    var browLeftHP = new facesHP.brow_leftHP();
    var browRightHP = new facesHP.brow_rightHP();
    var mouthHP = new facesHP.mouthHP();

    

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
    varying vec3 vColor;
    void main(void){
        gl_FragColor = vec4(vColor,1.0);
    }
    `

    
    var wajahHP = new MyObject(faceHP[0],faceHP[1],faceHP[2],shader_vertex_source,shader_fragment_source);
    var mataLHP = new MyObject(leftEyeHP[0],leftEyeHP[1],leftEyeHP[2],shader_vertex_source,shader_fragment_source);
    var mataRHP = new MyObject(rightEyeHP[0],rightEyeHP[1],rightEyeHP[2],shader_vertex_source,shader_fragment_source);
    var mata2LHP = new MyObject(leftEye1HP[0],leftEye1HP[1],leftEye1HP[2],shader_vertex_source,shader_fragment_source);
    var mata2RHP = new MyObject(rightEye1HP[0],rightEye1HP[1],rightEye1HP[2],shader_vertex_source,shader_fragment_source);
    //var hidung = new MyObject(nose[0],nose[1],nose[2],shader_vertex_source,shader_fragment_source);
    var tanganLHP = new MyObject(lefthandHP[0],lefthandHP[1],lefthandHP[2],shader_vertex_source,shader_fragment_source);
    var tangan2LHP = new MyObject(lefthand2HP[0],lefthand2HP[1],lefthand2HP[2],shader_vertex_source,shader_fragment_source);
    var tangan3LHP = new MyObject(leftpalmHP[0],leftpalmHP[1],leftpalmHP[2],shader_vertex_source,shader_fragment_source);
    var tangan4LHP = new MyObject(lefthand3HP[0],lefthand3HP[1],lefthand3HP[2],shader_vertex_source,shader_fragment_source);
    var tangan5LHP = new MyObject(lefthand4HP[0],lefthand4HP[1],lefthand4HP[2],shader_vertex_source,shader_fragment_source);
    var bajuTLHP = new MyObject(leftClothHP[0],leftClothHP[1],leftClothHP[2],shader_vertex_source,shader_fragment_source);

    var tanganRHP = new MyObject(righthandHP[0],righthandHP[1],righthandHP[2],shader_vertex_source,shader_fragment_source);
    var tangan2RHP = new MyObject(righthand2HP[0],righthand2HP[1],righthand2HP[2],shader_vertex_source,shader_fragment_source);
    var tangan3RHP = new MyObject(rightpalmHP[0],rightpalmHP[1],rightpalmHP[2],shader_vertex_source,shader_fragment_source);
    var tangan4RHP = new MyObject(righthand3HP[0],righthand3HP[1],righthand3HP[2],shader_vertex_source,shader_fragment_source);
    var tangan5RHP = new MyObject(righthand4HP[0],righthand4HP[1],righthand4HP[2],shader_vertex_source,shader_fragment_source);
    var bajuTRHP = new MyObject(rightClothHP[0],rightClothHP[1],rightClothHP[2],shader_vertex_source,shader_fragment_source);

    var kakiLHP = new MyObject(leftLegHP[0],leftLegHP[1],leftLegHP[2],shader_vertex_source,shader_fragment_source);
    var kakiRHP = new MyObject(rightLegHP[0],rightLegHP[1],rightLegHP[2],shader_vertex_source,shader_fragment_source);
    var badanHP = new MyObject(bodyHP[0],bodyHP[1],bodyHP[2],shader_vertex_source,shader_fragment_source);
    var bajuHP = new MyObject(clothHP[0],clothHP[1],clothHP[2],shader_vertex_source,shader_fragment_source);
    var telingaRHP = new MyObject(rightEarHP[0],rightEarHP[1],rightEarHP[2],shader_vertex_source,shader_fragment_source);
    var telingaLHP = new MyObject(leftEarHP[0],leftEarHP[1],leftEarHP[2],shader_vertex_source,shader_fragment_source);
    var balonHP = new MyObject(baloonHP[0],baloonHP[1],baloonHP[2],shader_vertex_source,shader_fragment_source);

    var telinga2LHP = new MyObject(leftEar2HP[0],leftEar2HP[1],leftEar2HP[2],shader_vertex_source,shader_fragment_source);
    var telinga2RHP = new MyObject(rightEar2HP[0],rightEar2HP[1],rightEar2HP[2],shader_vertex_source,shader_fragment_source);
    var ekorHP = new MyObject(tailHP[0],tailHP[1],tailHP[2],shader_vertex_source,shader_fragment_source);
    var mulutHP = new MyObject(mouthHP[0],mouthHP[1],mouthHP[2],shader_vertex_source,shader_fragment_source);
    var alisLeftHP = new MyObject(browLeftHP[0],browLeftHP[1],browLeftHP[2],shader_vertex_source,shader_fragment_source);
    var alisRightHP = new MyObject(browRightHP[0],browRightHP[1],browRightHP[2],shader_vertex_source,shader_fragment_source);




    tanganLHP.addChild(tangan2LHP);
    tanganRHP.addChild(tangan2RHP);
    tanganLHP.addChild(tangan3LHP);
    tanganRHP.addChild(tangan3RHP);
    tanganLHP.addChild(tangan4LHP);
    tanganRHP.addChild(tangan4RHP);
    tanganLHP.addChild(tangan5LHP);
    tanganRHP.addChild(tangan5RHP);
    telingaLHP.addChild(telinga2LHP);
    telingaRHP.addChild(telinga2RHP);

    var PROJMATRIX =  LIBS.get_projection(40,CANVAS.width/CANVAS.height,1,100);
    
    var VIEWMATRIX = LIBS.get_I4();

    LIBS.translateZ(VIEWMATRIX,-30);
    var slowHP = 0;
    var slow1 = 0;
    var slow2HP = 0;
    var slow3HP = 0;
    var slow4HP = 0;
    var slow5HP = 0;
    var slow5HP = 0;
    var x = 1.5;
    var y = 1;
    var z = 0.5;
    var d = 0.1;
    var chcc = 500 * 0.005;
    var u = 0;
    var tempHP = 0;
    var temp1 = 0;
    var temp2HP = 0;
    var temp3HP = 0;
    var temp4HP = 0;
    var temp5HP = 0;
    var temp6HP = 0;


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
          
        }
    time_prev = time;


    wajahHP.setIdentifyMove();
    tanganLHP.setIdentifyMove();
    tanganRHP.setIdentifyMove();
    bajuTLHP.setIdentifyMove();
    bajuTRHP.setIdentifyMove();
    kakiLHP.setIdentifyMove();
    kakiRHP.setIdentifyMove();
    badanHP.setIdentifyMove();
    bajuHP.setIdentifyMove();
    telingaRHP.setIdentifyMove();
    telingaRHP.child[0].setIdentifyMove();
    telingaLHP.setIdentifyMove();
    telingaLHP.child[0].setIdentifyMove();
    tanganLHP.child[0].setIdentifyMove();
    tanganRHP.child[0].setIdentifyMove();
    tanganLHP.child[1].setIdentifyMove();
    tanganRHP.child[1].setIdentifyMove();
    tanganLHP.child[2].setIdentifyMove();
    tanganRHP.child[2].setIdentifyMove();
    tanganLHP.child[3].setIdentifyMove();
    tanganRHP.child[3].setIdentifyMove();
    mataLHP.setIdentifyMove();
    mataRHP.setIdentifyMove();
    mata2LHP.setIdentifyMove();
    mata2RHP.setIdentifyMove();
    ekorHP.setIdentifyMove();
    mulutHP.setIdentifyMove();
    balonHP.setIdentifyMove();

    var temps = LIBS.get_I4();
    LIBS.rotateY(temps,THETA);
    LIBS.rotateX(temps,PHI);

    wajahHP.MOVEMATRIX = LIBS.mul(wajahHP.MOVEMATRIX, temps);
    alisLeftHP.MOVEMATRIX = LIBS.mul(alisLeftHP.MOVEMATRIX, temps);
    alisRightHP.MOVEMATRIX = LIBS.mul(alisRightHP.MOVEMATRIX, temps);
    tanganLHP.MOVEMATRIX = LIBS.mul(tanganLHP.MOVEMATRIX, temps);
    tanganLHP.child[0].MOVEMATRIX = LIBS.mul(tanganLHP.child[0].MOVEMATRIX,temps);
    tanganLHP.child[1].MOVEMATRIX = LIBS.mul(tanganLHP.child[1].MOVEMATRIX,temps);
    tanganLHP.child[2].MOVEMATRIX = LIBS.mul(tanganLHP.child[2].MOVEMATRIX,temps);
    tanganLHP.child[3].MOVEMATRIX = LIBS.mul(tanganLHP.child[3].MOVEMATRIX,temps);
    bajuTLHP.MOVEMATRIX = LIBS.mul(bajuTLHP.MOVEMATRIX, temps);
    tanganRHP.MOVEMATRIX = LIBS.mul(tanganRHP.MOVEMATRIX, temps);
    tanganRHP.child[0].MOVEMATRIX = LIBS.mul(tanganRHP.child[0].MOVEMATRIX, temps);
    tanganRHP.child[1].MOVEMATRIX = LIBS.mul(tanganRHP.child[1].MOVEMATRIX, temps);
    tanganRHP.child[2].MOVEMATRIX = LIBS.mul(tanganRHP.child[2].MOVEMATRIX, temps);
    tanganRHP.child[3].MOVEMATRIX = LIBS.mul(tanganRHP.child[3].MOVEMATRIX, temps);
    bajuTRHP.MOVEMATRIX = LIBS.mul(bajuTRHP.MOVEMATRIX, temps);
    kakiLHP.MOVEMATRIX = LIBS.mul(kakiLHP.MOVEMATRIX, temps);
    kakiRHP.MOVEMATRIX = LIBS.mul(kakiRHP.MOVEMATRIX, temps);
    badanHP.MOVEMATRIX = LIBS.mul(badanHP.MOVEMATRIX, temps);
    bajuHP.MOVEMATRIX = LIBS.mul(bajuHP.MOVEMATRIX, temps);
    telingaRHP.MOVEMATRIX = LIBS.mul(telingaRHP.MOVEMATRIX, temps);
    telingaRHP.child[0].MOVEMATRIX = LIBS.mul(telingaRHP.child[0].MOVEMATRIX,temps);
    telingaLHP.MOVEMATRIX = LIBS.mul(telingaLHP.MOVEMATRIX, temps);
    telingaLHP.child[0].MOVEMATRIX = LIBS.mul(telingaLHP.child[0].MOVEMATRIX,temps);
    mataLHP.MOVEMATRIX = LIBS.mul(mataLHP.MOVEMATRIX, temps);
    mataRHP.MOVEMATRIX = LIBS.mul(mataRHP.MOVEMATRIX, temps);
    mata2LHP.MOVEMATRIX = LIBS.mul(mata2LHP.MOVEMATRIX, temps);
    mata2RHP.MOVEMATRIX = LIBS.mul(mata2RHP.MOVEMATRIX, temps);
    ekorHP.MOVEMATRIX = LIBS.mul(ekorHP.MOVEMATRIX, temps);
    mulutHP.MOVEMATRIX = LIBS.mul(mulutHP.MOVEMATRIX,temps);
    balonHP.MOVEMATRIX = LIBS.mul(balonHP.MOVEMATRIX, temps);


    // default 
    glMatrix.mat4.rotateZ(tanganLHP.MOVEMATRIX, tanganLHP.MOVEMATRIX, LIBS.degToRad(-45+temp4HP));
    glMatrix.mat4.rotateX(tanganLHP.MOVEMATRIX, tanganLHP.MOVEMATRIX, LIBS.degToRad(90));
    glMatrix.mat4.rotateZ(tanganLHP.child[0].MOVEMATRIX, tanganLHP.child[0].MOVEMATRIX, LIBS.degToRad(-45+temp4HP));
    glMatrix.mat4.rotateX(tanganLHP.child[0].MOVEMATRIX, tanganLHP.child[0].MOVEMATRIX, LIBS.degToRad(90));
    glMatrix.mat4.rotateZ(tanganLHP.child[1].MOVEMATRIX, tanganLHP.child[1].MOVEMATRIX, LIBS.degToRad(-45+temp4HP));
    glMatrix.mat4.rotateX(tanganLHP.child[1].MOVEMATRIX, tanganLHP.child[1].MOVEMATRIX, LIBS.degToRad(90));
    glMatrix.mat4.rotateZ(tanganLHP.child[2].MOVEMATRIX, tanganLHP.child[2].MOVEMATRIX, LIBS.degToRad(-45+temp4HP));
    glMatrix.mat4.rotateX(tanganLHP.child[2].MOVEMATRIX, tanganLHP.child[2].MOVEMATRIX, LIBS.degToRad(90));
    glMatrix.mat4.rotateZ(bajuTLHP.MOVEMATRIX, bajuTLHP.MOVEMATRIX, LIBS.degToRad(-45+temp4HP));
    glMatrix.mat4.rotateX(bajuTLHP.MOVEMATRIX, bajuTLHP.MOVEMATRIX, LIBS.degToRad(90));
    glMatrix.mat4.translate(tanganLHP.MOVEMATRIX, tanganLHP.MOVEMATRIX, [-0.6, 0.0, 0.8]);
    glMatrix.mat4.translate(tanganLHP.child[0].MOVEMATRIX, tanganLHP.child[0].MOVEMATRIX, [-0.6, 0.0, 0.8]);
    glMatrix.mat4.translate(tanganLHP.child[1].MOVEMATRIX, tanganLHP.child[1].MOVEMATRIX, [-0.6, 0.0, 3.75]);
    glMatrix.mat4.translate(tanganLHP.child[2].MOVEMATRIX, tanganLHP.child[2].MOVEMATRIX, [-0.6, 0.0, 2.35]);
    glMatrix.mat4.translate(tanganLHP.child[3].MOVEMATRIX, tanganLHP.child[3].MOVEMATRIX, [-1.05, -0.2, 0]);
    glMatrix.mat4.translate(bajuTLHP.MOVEMATRIX,bajuTLHP.MOVEMATRIX,[-0.6,0.0,0.8]);


    // Tangan R transformations
    glMatrix.mat4.rotateZ(tanganRHP.MOVEMATRIX, tanganRHP.MOVEMATRIX, LIBS.degToRad(45-temp4HP));
    glMatrix.mat4.rotateX(tanganRHP.MOVEMATRIX, tanganRHP.MOVEMATRIX, LIBS.degToRad(90));
    glMatrix.mat4.rotateZ(tanganRHP.child[0].MOVEMATRIX, tanganRHP.child[0].MOVEMATRIX, LIBS.degToRad(45-temp4HP));
    glMatrix.mat4.rotateX(tanganRHP.child[0].MOVEMATRIX, tanganRHP.child[0].MOVEMATRIX, LIBS.degToRad(90));
    glMatrix.mat4.rotateZ(tanganRHP.child[1].MOVEMATRIX, tanganRHP.child[1].MOVEMATRIX, LIBS.degToRad(45-temp4HP));
    glMatrix.mat4.rotateX(tanganRHP.child[1].MOVEMATRIX, tanganRHP.child[1].MOVEMATRIX, LIBS.degToRad(90));
    glMatrix.mat4.rotateZ(tanganRHP.child[2].MOVEMATRIX, tanganRHP.child[2].MOVEMATRIX, LIBS.degToRad(45-temp4HP));
    glMatrix.mat4.rotateX(tanganRHP.child[2].MOVEMATRIX, tanganRHP.child[2].MOVEMATRIX, LIBS.degToRad(90));
    glMatrix.mat4.rotateZ(bajuTRHP.MOVEMATRIX, bajuTRHP.MOVEMATRIX, LIBS.degToRad(45-temp4HP));
    glMatrix.mat4.rotateX(bajuTRHP.MOVEMATRIX, bajuTRHP.MOVEMATRIX, LIBS.degToRad(90));
    glMatrix.mat4.translate(tanganRHP.MOVEMATRIX, tanganRHP.MOVEMATRIX, [0.6, 0.0, 0.8]);
    glMatrix.mat4.translate(tanganRHP.child[0].MOVEMATRIX, tanganRHP.child[0].MOVEMATRIX, [0.6, 0.0, 0.8]);
    glMatrix.mat4.translate(tanganRHP.child[1].MOVEMATRIX, tanganRHP.child[1].MOVEMATRIX, [0.6, 0.0, 3.75]);
    glMatrix.mat4.translate(tanganRHP.child[2].MOVEMATRIX, tanganRHP.child[2].MOVEMATRIX, [0.6, 0.0, 2.35]);
    glMatrix.mat4.translate(tanganRHP.child[3].MOVEMATRIX, tanganRHP.child[3].MOVEMATRIX, [1.05, -0.2, 0]);
    glMatrix.mat4.translate(bajuTRHP.MOVEMATRIX,bajuTRHP.MOVEMATRIX,[0.6,0.0,0.8]);


    // Kaki transformations
    glMatrix.mat4.rotateX(kakiLHP.MOVEMATRIX, kakiLHP.MOVEMATRIX, LIBS.degToRad(90));
    glMatrix.mat4.rotateX(kakiRHP.MOVEMATRIX, kakiRHP.MOVEMATRIX, LIBS.degToRad(90));
    glMatrix.mat4.translate(kakiLHP.MOVEMATRIX, kakiLHP.MOVEMATRIX, [-0.95, 0.0, 3.0]);
    glMatrix.mat4.translate(kakiRHP.MOVEMATRIX, kakiRHP.MOVEMATRIX, [0.95, 0.0, 3.0]);

    // Badan transformations
    glMatrix.mat4.rotateX(badanHP.MOVEMATRIX, badanHP.MOVEMATRIX, LIBS.degToRad(-90));
    glMatrix.mat4.translate(badanHP.MOVEMATRIX, badanHP.MOVEMATRIX, [0.0, 0.0, -2.8]);

    // Baju transformations
    glMatrix.mat4.rotateX(bajuHP.MOVEMATRIX, bajuHP.MOVEMATRIX, LIBS.degToRad(-90));
    glMatrix.mat4.translate(bajuHP.MOVEMATRIX, bajuHP.MOVEMATRIX, [0.0, 0.0, -2.8]);

    // Telinga transformations
    glMatrix.mat4.rotateX(telingaRHP.MOVEMATRIX, telingaRHP.MOVEMATRIX, LIBS.degToRad(-90));
    glMatrix.mat4.translate(telingaRHP.MOVEMATRIX, telingaRHP.MOVEMATRIX, [2, 0.0, 4.8]);
    glMatrix.mat4.rotateY(telingaRHP.MOVEMATRIX, telingaRHP.MOVEMATRIX, 0);
    glMatrix.mat4.rotateX(telingaRHP.child[0].MOVEMATRIX, telingaRHP.child[0].MOVEMATRIX, LIBS.degToRad(-90));
    glMatrix.mat4.translate(telingaRHP.child[0].MOVEMATRIX, telingaRHP.child[0].MOVEMATRIX, [2, -0.05, 4.8]);
    glMatrix.mat4.rotateY(telingaRHP.child[0].MOVEMATRIX, telingaRHP.child[0].MOVEMATRIX, 0);
    glMatrix.mat4.rotateX(telingaLHP.MOVEMATRIX, telingaLHP.MOVEMATRIX, LIBS.degToRad(-90));
    glMatrix.mat4.translate(telingaLHP.MOVEMATRIX, telingaLHP.MOVEMATRIX, [-1.8, 0.0, 4.8]);
    glMatrix.mat4.rotateY(telingaLHP.MOVEMATRIX, telingaLHP.MOVEMATRIX, 0);
    glMatrix.mat4.rotateX(telingaLHP.child[0].MOVEMATRIX, telingaLHP.child[0].MOVEMATRIX, LIBS.degToRad(-90));
    glMatrix.mat4.translate(telingaLHP.child[0].MOVEMATRIX, telingaLHP.child[0].MOVEMATRIX, [-1.8, -0.05, 4.8]);
    glMatrix.mat4.rotateY(telingaLHP.child[0].MOVEMATRIX, telingaLHP.child[0].MOVEMATRIX, 0);


    // Wajah transformations
    glMatrix.mat4.translate(wajahHP.MOVEMATRIX, wajahHP.MOVEMATRIX, [0.0, 3.0, 0.0]);

    // Mata transformations
    glMatrix.mat4.translate(mataLHP.MOVEMATRIX, mataLHP.MOVEMATRIX, [-2, 3.87, 2.05]);
    glMatrix.mat4.rotateY(mataLHP.MOVEMATRIX, mataLHP.MOVEMATRIX, LIBS.degToRad(-200));
    glMatrix.mat4.rotateX(mataLHP.MOVEMATRIX, mataLHP.MOVEMATRIX, LIBS.degToRad(12-temp3HP));
    glMatrix.mat4.translate(mata2LHP.MOVEMATRIX, mata2LHP.MOVEMATRIX, [-2, 3.87, 2.1]);
    glMatrix.mat4.rotateY(mata2LHP.MOVEMATRIX, mata2LHP.MOVEMATRIX, LIBS.degToRad(-200));
    glMatrix.mat4.rotateX(mata2LHP.MOVEMATRIX, mata2LHP.MOVEMATRIX, LIBS.degToRad(12-temp3HP));
    glMatrix.mat4.translate(mataRHP.MOVEMATRIX, mataRHP.MOVEMATRIX, [2, 3.87, 2.05]);
    glMatrix.mat4.rotateY(mataRHP.MOVEMATRIX, mataRHP.MOVEMATRIX, LIBS.degToRad(200));
    glMatrix.mat4.rotateX(mataRHP.MOVEMATRIX, mataRHP.MOVEMATRIX, LIBS.degToRad(12-temp3HP));
    glMatrix.mat4.translate(mata2RHP.MOVEMATRIX, mata2RHP.MOVEMATRIX, [2, 3.87, 2.1]);
    glMatrix.mat4.rotateY(mata2RHP.MOVEMATRIX, mata2RHP.MOVEMATRIX, LIBS.degToRad(200));
    glMatrix.mat4.rotateX(mata2RHP.MOVEMATRIX, mata2RHP.MOVEMATRIX, LIBS.degToRad(12-temp3HP));

    // Ekor transformations
    glMatrix.mat4.translate(ekorHP.MOVEMATRIX, ekorHP.MOVEMATRIX, [0, -2.3, -2.5]);
    glMatrix.mat4.rotateZ(ekorHP.MOVEMATRIX, ekorHP.MOVEMATRIX, LIBS.degToRad(180));
    // balon
    
    glMatrix.mat4.rotateY(balonHP.MOVEMATRIX, mulutHP.MOVEMATRIX, LIBS.degToRad(-180+temp5HP));
    glMatrix.mat4.rotateX(balonHP.MOVEMATRIX, mulutHP.MOVEMATRIX, LIBS.degToRad(-90+temp6HP));


    glMatrix.mat4.translate(balonHP.MOVEMATRIX, balonHP.MOVEMATRIX, [3.2, -9.5, -4.5]);
    

    // Mulut transformations
    glMatrix.mat4.rotateZ(mulutHP.MOVEMATRIX, mulutHP.MOVEMATRIX, LIBS.degToRad(180));
    glMatrix.mat4.translate(mulutHP.MOVEMATRIX, mulutHP.MOVEMATRIX, [0, 0.7, -8.59]);

    

    


    var xMataFix = chcc/2.8;
    var yMataFix = chcc/4.7;
    var cMataFix = chcc*0.92;

    // animasistart
    if (time > 0){
    // Tangan L transformations
    glMatrix.mat4.translate(tanganLHP.MOVEMATRIX, tanganLHP.MOVEMATRIX, [0, chcc, -u]);
    glMatrix.mat4.translate(tanganLHP.child[0].MOVEMATRIX, tanganLHP.child[0].MOVEMATRIX, [0, chcc, -u]);
    glMatrix.mat4.translate(tanganLHP.child[1].MOVEMATRIX, tanganLHP.child[1].MOVEMATRIX, [0, chcc, -u]);
    glMatrix.mat4.translate(tanganLHP.child[2].MOVEMATRIX, tanganLHP.child[2].MOVEMATRIX, [0, chcc, u]);
    glMatrix.mat4.translate(tanganLHP.child[3].MOVEMATRIX, tanganLHP.child[3].MOVEMATRIX, [0, u, chcc]);
    glMatrix.mat4.translate(bajuTLHP.MOVEMATRIX,bajuTLHP.MOVEMATRIX,[0, chcc, -u]);


    // Tangan R transformations
    glMatrix.mat4.translate(tanganRHP.MOVEMATRIX, tanganRHP.MOVEMATRIX, [0, chcc, -u]);
    glMatrix.mat4.translate(tanganRHP.child[0].MOVEMATRIX, tanganRHP.child[0].MOVEMATRIX, [0, chcc, -u]);
    glMatrix.mat4.translate(tanganRHP.child[1].MOVEMATRIX, tanganRHP.child[1].MOVEMATRIX, [0, chcc, -u]);
    glMatrix.mat4.translate(tanganRHP.child[2].MOVEMATRIX, tanganRHP.child[2].MOVEMATRIX, [0, chcc, u]);
    glMatrix.mat4.translate(tanganRHP.child[3].MOVEMATRIX, tanganRHP.child[3].MOVEMATRIX, [0, u, chcc]);
    glMatrix.mat4.translate(bajuTRHP.MOVEMATRIX,bajuTRHP.MOVEMATRIX,[0, chcc, -u]);
 

    // Kaki transformations
    glMatrix.mat4.translate(kakiLHP.MOVEMATRIX, kakiLHP.MOVEMATRIX, [0, chcc, -u]);
    glMatrix.mat4.translate(kakiRHP.MOVEMATRIX, kakiRHP.MOVEMATRIX, [0, chcc, -u]);

    // Badan transformations
    glMatrix.mat4.translate(badanHP.MOVEMATRIX, badanHP.MOVEMATRIX, [0, -chcc, u]);

    // Baju transformations
    glMatrix.mat4.translate(bajuHP.MOVEMATRIX, bajuHP.MOVEMATRIX, [0, -chcc, u]);

    // Telinga transformations
    glMatrix.mat4.translate(telingaRHP.MOVEMATRIX, telingaRHP.MOVEMATRIX, [0, -chcc, u]);
    glMatrix.mat4.translate(telingaRHP.child[0].MOVEMATRIX, telingaRHP.child[0].MOVEMATRIX, [0, -chcc, u]);
    glMatrix.mat4.translate(telingaLHP.MOVEMATRIX, telingaLHP.MOVEMATRIX, [0, -chcc, u]);
    glMatrix.mat4.translate(telingaLHP.child[0].MOVEMATRIX, telingaLHP.child[0].MOVEMATRIX, [0, -chcc, u]);


    // Wajah transformations
    glMatrix.mat4.translate(wajahHP.MOVEMATRIX, wajahHP.MOVEMATRIX, [0, u, chcc]);

    // Mata transformations
    glMatrix.mat4.translate(mataLHP.MOVEMATRIX, mataLHP.MOVEMATRIX, [-xMataFix,-yMataFix + u*1.2,-cMataFix*1.05]);
    glMatrix.mat4.translate(mata2LHP.MOVEMATRIX, mata2LHP.MOVEMATRIX, [-xMataFix,-yMataFix + u*1.2,-cMataFix*1.05]);
    glMatrix.mat4.translate(mataRHP.MOVEMATRIX, mataRHP.MOVEMATRIX, [xMataFix,-yMataFix + u*1.2,-cMataFix*1.05]);
    glMatrix.mat4.translate(mata2RHP.MOVEMATRIX, mata2RHP.MOVEMATRIX, [xMataFix,-yMataFix + u*1.2,-cMataFix*1.05]);

    // Ekor transformations
    glMatrix.mat4.translate(ekorHP.MOVEMATRIX, ekorHP.MOVEMATRIX, [0,-u,chcc]);

    // balon transfo
    glMatrix.mat4.translate(balonHP.MOVEMATRIX, balonHP.MOVEMATRIX, [0, 0, u]);
    glMatrix.mat4.scale(balonHP.MOVEMATRIX, balonHP.MOVEMATRIX, [1,1,1]);

    


    // Mulut transformations
    glMatrix.mat4.translate(mulutHP.MOVEMATRIX, mulutHP.MOVEMATRIX, [0,-u,chcc]);
    }

    toff = 9600;



    if (time >= 250 + toff && time <500 + toff){
        tempHP = 0.8;
        slowHP += -x;
        slow2HP += y;

        glMatrix.mat4.rotateX(kakiLHP.MOVEMATRIX,kakiLHP.MOVEMATRIX,LIBS.degToRad(y));
        glMatrix.mat4.rotateX(tanganLHP.MOVEMATRIX, tanganLHP.MOVEMATRIX, LIBS.degToRad(y));
        glMatrix.mat4.rotateX(tanganLHP.child[0].MOVEMATRIX, tanganLHP.child[0].MOVEMATRIX, LIBS.degToRad(y));
        glMatrix.mat4.rotateX(tanganLHP.child[1].MOVEMATRIX, tanganLHP.child[1].MOVEMATRIX, LIBS.degToRad(y));
        glMatrix.mat4.rotateX(tanganLHP.child[2].MOVEMATRIX, tanganLHP.child[2].MOVEMATRIX, LIBS.degToRad(y));
        glMatrix.mat4.rotateX(tanganLHP.child[3].MOVEMATRIX, tanganLHP.child[3].MOVEMATRIX, LIBS.degToRad(y));
        glMatrix.mat4.rotateX(bajuTLHP.MOVEMATRIX, bajuTLHP.MOVEMATRIX, LIBS.degToRad(y));
        glMatrix.mat4.rotateX(kakiRHP.MOVEMATRIX,kakiRHP.MOVEMATRIX,LIBS.degToRad(x));
        glMatrix.mat4.rotateX(tanganRHP.MOVEMATRIX, tanganRHP.MOVEMATRIX, LIBS.degToRad(x));
        glMatrix.mat4.rotateX(tanganRHP.child[0].MOVEMATRIX, tanganRHP.child[0].MOVEMATRIX, LIBS.degToRad(x));
        glMatrix.mat4.rotateX(tanganRHP.child[1].MOVEMATRIX, tanganRHP.child[1].MOVEMATRIX, LIBS.degToRad(x));
        glMatrix.mat4.rotateX(tanganRHP.child[2].MOVEMATRIX, tanganRHP.child[2].MOVEMATRIX, LIBS.degToRad(x));
        glMatrix.mat4.rotateX(tanganRHP.child[3].MOVEMATRIX, tanganRHP.child[3].MOVEMATRIX, LIBS.degToRad(x));
        glMatrix.mat4.rotateX(bajuTRHP.MOVEMATRIX, bajuTRHP.MOVEMATRIX, LIBS.degToRad(x));

    }
    glMatrix.mat4.scale(balonHP.MOVEMATRIX, balonHP.MOVEMATRIX, [tempHP,tempHP,tempHP]);

    glMatrix.mat4.rotateX(kakiLHP.MOVEMATRIX,kakiLHP.MOVEMATRIX,LIBS.degToRad(slow2HP));
    glMatrix.mat4.rotateX(tanganLHP.MOVEMATRIX, tanganLHP.MOVEMATRIX, LIBS.degToRad(slow2HP));
    glMatrix.mat4.rotateX(tanganLHP.child[0].MOVEMATRIX, tanganLHP.child[0].MOVEMATRIX, LIBS.degToRad(slow2HP));
    glMatrix.mat4.rotateX(tanganLHP.child[1].MOVEMATRIX, tanganLHP.child[1].MOVEMATRIX, LIBS.degToRad(slow2HP));
    glMatrix.mat4.rotateX(tanganLHP.child[2].MOVEMATRIX, tanganLHP.child[2].MOVEMATRIX, LIBS.degToRad(slow2HP));
    glMatrix.mat4.rotateX(tanganLHP.child[3].MOVEMATRIX, tanganLHP.child[3].MOVEMATRIX, LIBS.degToRad(slow2HP));
    glMatrix.mat4.rotateX(bajuTLHP.MOVEMATRIX, bajuTLHP.MOVEMATRIX, LIBS.degToRad(slow2HP));
    glMatrix.mat4.translate(tanganLHP.child[1].MOVEMATRIX, tanganLHP.child[1].MOVEMATRIX, [0, 0, -3.75]);


    glMatrix.mat4.rotateX(kakiRHP.MOVEMATRIX,kakiRHP.MOVEMATRIX,LIBS.degToRad(slowHP));
    glMatrix.mat4.rotateX(tanganRHP.MOVEMATRIX, tanganRHP.MOVEMATRIX, LIBS.degToRad(slowHP));
    glMatrix.mat4.rotateX(tanganRHP.child[0].MOVEMATRIX, tanganRHP.child[0].MOVEMATRIX, LIBS.degToRad(slowHP));
    glMatrix.mat4.rotateX(tanganRHP.child[1].MOVEMATRIX, tanganRHP.child[1].MOVEMATRIX, LIBS.degToRad(slowHP));
    glMatrix.mat4.rotateX(tanganRHP.child[2].MOVEMATRIX, tanganRHP.child[2].MOVEMATRIX, LIBS.degToRad(slowHP));
    glMatrix.mat4.rotateX(tanganRHP.child[3].MOVEMATRIX, tanganRHP.child[3].MOVEMATRIX, LIBS.degToRad(slowHP));
    glMatrix.mat4.rotateX(bajuTRHP.MOVEMATRIX, bajuTRHP.MOVEMATRIX, LIBS.degToRad(slowHP));

    glMatrix.mat4.translate(tanganRHP.child[1].MOVEMATRIX, tanganRHP.child[1].MOVEMATRIX, [0, 0, -3.75]);
    glMatrix.mat4.translate(tanganRHP.child[2].MOVEMATRIX, tanganRHP.child[2].MOVEMATRIX, [0, 0, -4.4]);




    if (time >= 250  + toff && time < 500  + toff){
        slow3HP += x;
        chcc = (time - toff) * 0.005;
        
        glMatrix.mat4.rotateX(kakiLHP.MOVEMATRIX,kakiLHP.MOVEMATRIX,LIBS.degToRad(x));
    }

            
    glMatrix.mat4.rotateX(kakiLHP.MOVEMATRIX,kakiLHP.MOVEMATRIX,LIBS.degToRad(slow3HP));
    if (time >= 500  + toff && time <1000  + toff && slow3HP != 0){
        slow3HP += -x;
        chcc = (time - toff) * 0.005;


    }



    if (time >= 500  + toff && time <1000  + toff && slow2HP != 0){

        slow2HP += -y;
        glMatrix.mat4.rotateX(kakiLHP.MOVEMATRIX,kakiLHP.MOVEMATRIX,LIBS.degToRad(-y));
        glMatrix.mat4.rotateX(tanganLHP.MOVEMATRIX, tanganLHP.MOVEMATRIX, LIBS.degToRad(-y));
        glMatrix.mat4.rotateX(tanganLHP.child[0].MOVEMATRIX, tanganLHP.child[0].MOVEMATRIX, LIBS.degToRad(-y));
        glMatrix.mat4.rotateX(tanganLHP.child[1].MOVEMATRIX, tanganLHP.child[1].MOVEMATRIX, LIBS.degToRad(-y));
        glMatrix.mat4.rotateX(tanganLHP.child[2].MOVEMATRIX, tanganLHP.child[2].MOVEMATRIX, LIBS.degToRad(-y));
        glMatrix.mat4.rotateX(bajuTLHP.MOVEMATRIX, bajuTLHP.MOVEMATRIX, LIBS.degToRad(-y));
    }

    
    if (time >= 500  + toff && time <1000 + toff && slowHP != 0){
        slowHP += x;

        glMatrix.mat4.rotateX(kakiRHP.MOVEMATRIX,kakiRHP.MOVEMATRIX,LIBS.degToRad(x));
        glMatrix.mat4.rotateX(tanganRHP.MOVEMATRIX, tanganRHP.MOVEMATRIX, LIBS.degToRad(x));
        glMatrix.mat4.rotateX(tanganRHP.child[0].MOVEMATRIX, tanganRHP.child[0].MOVEMATRIX, LIBS.degToRad(x));
        glMatrix.mat4.rotateX(tanganRHP.child[1].MOVEMATRIX, tanganRHP.child[1].MOVEMATRIX, LIBS.degToRad(x));
        glMatrix.mat4.rotateX(tanganRHP.child[2].MOVEMATRIX, tanganRHP.child[2].MOVEMATRIX, LIBS.degToRad(x));
        glMatrix.mat4.rotateX(tanganRHP.child[3].MOVEMATRIX, tanganRHP.child[3].MOVEMATRIX, LIBS.degToRad(x));
        glMatrix.mat4.rotateX(bajuTRHP.MOVEMATRIX, bajuTRHP.MOVEMATRIX, LIBS.degToRad(x));

    


    }

    glMatrix.mat4.rotateX(kakiLHP.MOVEMATRIX,kakiLHP.MOVEMATRIX,LIBS.degToRad(slow2HP*0.1));
    glMatrix.mat4.rotateX(tanganLHP.MOVEMATRIX, tanganLHP.MOVEMATRIX, LIBS.degToRad(slow2HP));
    glMatrix.mat4.rotateX(tanganLHP.child[0].MOVEMATRIX, tanganLHP.child[0].MOVEMATRIX, LIBS.degToRad(slow2HP));
    glMatrix.mat4.rotateX(tanganLHP.child[1].MOVEMATRIX, tanganLHP.child[1].MOVEMATRIX, LIBS.degToRad(slow2HP));
    glMatrix.mat4.rotateX(tanganLHP.child[2].MOVEMATRIX, tanganLHP.child[2].MOVEMATRIX, LIBS.degToRad(slow2HP));
    glMatrix.mat4.rotateX(tanganLHP.child[3].MOVEMATRIX, tanganLHP.child[3].MOVEMATRIX, LIBS.degToRad(slow2HP));
    glMatrix.mat4.rotateX(bajuTLHP.MOVEMATRIX, bajuTLHP.MOVEMATRIX, LIBS.degToRad(slow2HP));


    glMatrix.mat4.rotateX(kakiRHP.MOVEMATRIX,kakiRHP.MOVEMATRIX,LIBS.degToRad(slowHP*0.1));
    glMatrix.mat4.rotateX(tanganRHP.MOVEMATRIX, tanganRHP.MOVEMATRIX, LIBS.degToRad(slowHP*0.1));
    glMatrix.mat4.rotateX(tanganRHP.child[0].MOVEMATRIX, tanganRHP.child[0].MOVEMATRIX, LIBS.degToRad(slowHP*0.4));
    glMatrix.mat4.rotateX(tanganRHP.child[1].MOVEMATRIX, tanganRHP.child[1].MOVEMATRIX, LIBS.degToRad(slowHP*0.4));
    glMatrix.mat4.rotateX(tanganRHP.child[2].MOVEMATRIX, tanganRHP.child[2].MOVEMATRIX, LIBS.degToRad(slowHP*0.4));
    glMatrix.mat4.rotateX(tanganRHP.child[3].MOVEMATRIX, tanganRHP.child[3].MOVEMATRIX, LIBS.degToRad(slowHP*0.4));
    glMatrix.mat4.rotateX(bajuTRHP.MOVEMATRIX, bajuTRHP.MOVEMATRIX, LIBS.degToRad(slowHP*0.1));




    if (time >= 1000  + toff && time <1250  + toff ){
        slowHP += y;
        slow2HP += -z;
        chcc = time * 0.005;
        glMatrix.mat4.rotateX(kakiLHP.MOVEMATRIX,kakiLHP.MOVEMATRIX,LIBS.degToRad(-z));
        glMatrix.mat4.rotateX(tanganLHP.MOVEMATRIX, tanganLHP.MOVEMATRIX, LIBS.degToRad(-z));
        glMatrix.mat4.rotateX(tanganLHP.child[0].MOVEMATRIX, tanganLHP.child[0].MOVEMATRIX, LIBS.degToRad(-z));
        glMatrix.mat4.rotateX(tanganLHP.child[1].MOVEMATRIX, tanganLHP.child[1].MOVEMATRIX, LIBS.degToRad(-z));
        glMatrix.mat4.rotateX(tanganLHP.child[2].MOVEMATRIX, tanganLHP.child[2].MOVEMATRIX, LIBS.degToRad(-z));
        glMatrix.mat4.rotateX(bajuTLHP.MOVEMATRIX, bajuTLHP.MOVEMATRIX, LIBS.degToRad(-z));
        glMatrix.mat4.rotateX(kakiRHP.MOVEMATRIX,kakiRHP.MOVEMATRIX,LIBS.degToRad(y));
        glMatrix.mat4.rotateX(tanganRHP.MOVEMATRIX, tanganRHP.MOVEMATRIX, LIBS.degToRad(y));
        glMatrix.mat4.rotateX(tanganRHP.child[0].MOVEMATRIX, tanganRHP.child[0].MOVEMATRIX, LIBS.degToRad(y));
        glMatrix.mat4.rotateX(tanganRHP.child[1].MOVEMATRIX, tanganRHP.child[1].MOVEMATRIX, LIBS.degToRad(y));
        glMatrix.mat4.rotateX(tanganRHP.child[2].MOVEMATRIX, tanganRHP.child[2].MOVEMATRIX, LIBS.degToRad(y));
        glMatrix.mat4.rotateX(tanganRHP.child[3].MOVEMATRIX, tanganRHP.child[3].MOVEMATRIX, LIBS.degToRad(y));
        glMatrix.mat4.rotateX(bajuTRHP.MOVEMATRIX, bajuTRHP.MOVEMATRIX, LIBS.degToRad(y));

    }

    glMatrix.mat4.rotateX(kakiLHP.MOVEMATRIX,kakiLHP.MOVEMATRIX,LIBS.degToRad(slow2HP*0.1));
    glMatrix.mat4.rotateX(kakiRHP.MOVEMATRIX,kakiRHP.MOVEMATRIX,LIBS.degToRad(slowHP*0.1));
    glMatrix.mat4.rotateX(tanganRHP.MOVEMATRIX, tanganRHP.MOVEMATRIX, LIBS.degToRad(slowHP*0.1));
    glMatrix.mat4.rotateX(tanganRHP.child[0].MOVEMATRIX, tanganRHP.child[0].MOVEMATRIX, LIBS.degToRad(slowHP*0.1));
    glMatrix.mat4.rotateX(tanganRHP.child[1].MOVEMATRIX, tanganRHP.child[1].MOVEMATRIX, LIBS.degToRad(slowHP*0.1));
    glMatrix.mat4.rotateX(tanganRHP.child[2].MOVEMATRIX, tanganRHP.child[2].MOVEMATRIX, LIBS.degToRad(slowHP*0.1));
    glMatrix.mat4.rotateX(tanganRHP.child[3].MOVEMATRIX, tanganRHP.child[3].MOVEMATRIX, LIBS.degToRad(slowHP*0.1));
    glMatrix.mat4.rotateX(bajuTRHP.MOVEMATRIX, bajuTRHP.MOVEMATRIX, LIBS.degToRad(slowHP*0.1));


    if (time >=1000  + toff && time < 1250  + toff){
        slow4HP += x;
    }
    if (time >=1250  + toff && time < 1600  + toff && slow4HP != 0){
        slow4HP += -x;
        chcc = (time - toff) * 0.005;
        
    }

    if (time >= 1250 + toff && time <1600 + toff && slow2HP != 0){

        slow2HP += z;
        glMatrix.mat4.rotateX(kakiLHP.MOVEMATRIX,kakiLHP.MOVEMATRIX,LIBS.degToRad(0.5));
        glMatrix.mat4.rotateX(tanganLHP.MOVEMATRIX, tanganLHP.MOVEMATRIX, LIBS.degToRad(0.5));
        glMatrix.mat4.rotateX(tanganLHP.child[0].MOVEMATRIX, tanganLHP.child[0].MOVEMATRIX, LIBS.degToRad(0.5));
        glMatrix.mat4.rotateX(tanganLHP.child[1].MOVEMATRIX, tanganLHP.child[1].MOVEMATRIX, LIBS.degToRad(0.5));
        glMatrix.mat4.rotateX(tanganLHP.child[2].MOVEMATRIX, tanganLHP.child[2].MOVEMATRIX, LIBS.degToRad(0.5));
        glMatrix.mat4.rotateX(bajuTLHP.MOVEMATRIX, bajuTLHP.MOVEMATRIX, LIBS.degToRad(0.5));

        
    }

    if (time >= 1250 + toff && time <1600 + toff && slowHP != 0){
        slowHP += -y;


        glMatrix.mat4.rotateX(kakiRHP.MOVEMATRIX,kakiRHP.MOVEMATRIX,LIBS.degToRad(-y));

    }

    glMatrix.mat4.rotateX(kakiLHP.MOVEMATRIX,kakiLHP.MOVEMATRIX,LIBS.degToRad(slow2HP*0.1));
    glMatrix.mat4.rotateX(kakiRHP.MOVEMATRIX,kakiRHP.MOVEMATRIX,LIBS.degToRad(slowHP*0.1));
    glMatrix.mat4.rotateX(tanganRHP.MOVEMATRIX, tanganRHP.MOVEMATRIX, LIBS.degToRad(slowHP**0.1));
    glMatrix.mat4.rotateX(tanganRHP.child[0].MOVEMATRIX, tanganRHP.child[0].MOVEMATRIX, LIBS.degToRad(slowHP*0.1));
    glMatrix.mat4.rotateX(tanganRHP.child[1].MOVEMATRIX, tanganRHP.child[1].MOVEMATRIX, LIBS.degToRad(slowHP*0.1));
    glMatrix.mat4.rotateX(tanganRHP.child[2].MOVEMATRIX, tanganRHP.child[2].MOVEMATRIX, LIBS.degToRad(slowHP*0.1));
    glMatrix.mat4.rotateX(tanganRHP.child[3].MOVEMATRIX, tanganRHP.child[3].MOVEMATRIX, LIBS.degToRad(slowHP*0.1));
    glMatrix.mat4.rotateX(bajuTRHP.MOVEMATRIX, bajuTRHP.MOVEMATRIX, LIBS.degToRad(slowHP*0.1));

    if (time >= 1600 + toff && time <1850 + toff ){
            
        slowHP += -x;
        slow2HP += y

        glMatrix.mat4.rotateX(kakiLHP.MOVEMATRIX,kakiLHP.MOVEMATRIX,LIBS.degToRad(y));
        glMatrix.mat4.rotateX(tanganLHP.MOVEMATRIX, tanganLHP.MOVEMATRIX, LIBS.degToRad(y));
        glMatrix.mat4.rotateX(tanganLHP.child[0].MOVEMATRIX, tanganLHP.child[0].MOVEMATRIX, LIBS.degToRad(y));
        glMatrix.mat4.rotateX(tanganLHP.child[1].MOVEMATRIX, tanganLHP.child[1].MOVEMATRIX, LIBS.degToRad(y));
        glMatrix.mat4.rotateX(tanganLHP.child[2].MOVEMATRIX, tanganLHP.child[2].MOVEMATRIX, LIBS.degToRad(y));
        glMatrix.mat4.rotateX(tanganLHP.child[3].MOVEMATRIX, tanganLHP.child[3].MOVEMATRIX, LIBS.degToRad(y));

        glMatrix.mat4.rotateX(bajuTLHP.MOVEMATRIX, bajuTLHP.MOVEMATRIX, LIBS.degToRad(y));
        glMatrix.mat4.rotateX(kakiRHP.MOVEMATRIX,kakiRHP.MOVEMATRIX,LIBS.degToRad(-x));
        glMatrix.mat4.rotateX(tanganRHP.MOVEMATRIX, tanganRHP.MOVEMATRIX, LIBS.degToRad(-x));
        glMatrix.mat4.rotateX(tanganRHP.child[0].MOVEMATRIX, tanganRHP.child[0].MOVEMATRIX, LIBS.degToRad(-x));
        glMatrix.mat4.rotateX(tanganRHP.child[1].MOVEMATRIX, tanganRHP.child[1].MOVEMATRIX, LIBS.degToRad(-x));
        glMatrix.mat4.rotateX(tanganRHP.child[2].MOVEMATRIX, tanganRHP.child[2].MOVEMATRIX, LIBS.degToRad(-x));
        glMatrix.mat4.rotateX(tanganRHP.child[3].MOVEMATRIX, tanganRHP.child[3].MOVEMATRIX, LIBS.degToRad(-x));
        glMatrix.mat4.rotateX(bajuTRHP.MOVEMATRIX, bajuTRHP.MOVEMATRIX, LIBS.degToRad(-x));
    }

    glMatrix.mat4.rotateX(kakiLHP.MOVEMATRIX,kakiLHP.MOVEMATRIX,LIBS.degToRad(slow2HP*0.1));
    glMatrix.mat4.rotateX(kakiRHP.MOVEMATRIX,kakiRHP.MOVEMATRIX,LIBS.degToRad(slowHP*0.1));

    if (time >= 1600 + toff && time <1850 + toff ){
        slow3HP += x;
        chcc = (time - toff) * 0.005;

    }

    if (time >= 1850 + toff && time <2200 + toff && slow3HP != 0){
        slow3HP += -x;
        chcc = (time - toff) * 0.005;
    
    }

    if (time >= 1850 + toff && time <2200 + toff && slow2HP != 0){

        slow2HP += -y;
        glMatrix.mat4.rotateX(kakiLHP.MOVEMATRIX,kakiLHP.MOVEMATRIX,LIBS.degToRad(-y));
        glMatrix.mat4.rotateX(tanganLHP.MOVEMATRIX, tanganLHP.MOVEMATRIX, LIBS.degToRad(-y));
        glMatrix.mat4.rotateX(tanganLHP.child[0].MOVEMATRIX, tanganLHP.child[0].MOVEMATRIX, LIBS.degToRad(-y));
        glMatrix.mat4.rotateX(tanganLHP.child[1].MOVEMATRIX, tanganLHP.child[1].MOVEMATRIX, LIBS.degToRad(-y));
        glMatrix.mat4.rotateX(tanganLHP.child[2].MOVEMATRIX, tanganLHP.child[2].MOVEMATRIX, LIBS.degToRad(-y));
        glMatrix.mat4.rotateX(tanganLHP.child[3].MOVEMATRIX, tanganLHP.child[3].MOVEMATRIX, LIBS.degToRad(-y));
        glMatrix.mat4.rotateX(bajuTLHP.MOVEMATRIX, bajuTLHP.MOVEMATRIX, LIBS.degToRad(-y));


    }
    if (time >= 1850 + toff && time <2200 + toff && slowHP != 0){
        slowHP += x;


        glMatrix.mat4.rotateX(kakiRHP.MOVEMATRIX,kakiRHP.MOVEMATRIX,LIBS.degToRad(x));
        glMatrix.mat4.rotateX(tanganRHP.child[0].MOVEMATRIX, tanganRHP.child[0].MOVEMATRIX, LIBS.degToRad(x));
        glMatrix.mat4.rotateX(tanganRHP.child[1].MOVEMATRIX, tanganRHP.child[1].MOVEMATRIX, LIBS.degToRad(x));
        glMatrix.mat4.rotateX(tanganRHP.child[2].MOVEMATRIX, tanganRHP.child[2].MOVEMATRIX, LIBS.degToRad(x));
        glMatrix.mat4.rotateX(tanganRHP.child[3].MOVEMATRIX, tanganRHP.child[3].MOVEMATRIX, LIBS.degToRad(x));
        glMatrix.mat4.rotateX(bajuTRHP.MOVEMATRIX, bajuTRHP.MOVEMATRIX, LIBS.degToRad(x));
    }

    glMatrix.mat4.rotateX(kakiLHP.MOVEMATRIX,kakiLHP.MOVEMATRIX,LIBS.degToRad(slow2HP*0.1));

    
    

    glMatrix.mat4.rotateX(kakiRHP.MOVEMATRIX,kakiRHP.MOVEMATRIX,LIBS.degToRad(slowHP*0.1));
    glMatrix.mat4.rotateX(tanganRHP.MOVEMATRIX, tanganRHP.MOVEMATRIX, LIBS.degToRad(slowHP*0.1));
    glMatrix.mat4.rotateX(tanganRHP.child[0].MOVEMATRIX, tanganRHP.child[0].MOVEMATRIX, LIBS.degToRad(slowHP*0.1));
    glMatrix.mat4.rotateX(tanganRHP.child[1].MOVEMATRIX, tanganRHP.child[1].MOVEMATRIX, LIBS.degToRad(slowHP*0.1));
    glMatrix.mat4.rotateX(tanganRHP.child[2].MOVEMATRIX, tanganRHP.child[2].MOVEMATRIX, LIBS.degToRad(slowHP*0.1));
    glMatrix.mat4.rotateX(tanganRHP.child[3].MOVEMATRIX, tanganRHP.child[3].MOVEMATRIX, LIBS.degToRad(slowHP*0.1));
    glMatrix.mat4.rotateX(bajuTRHP.MOVEMATRIX, bajuTRHP.MOVEMATRIX, LIBS.degToRad(slowHP*0.1));





        // loncat hopkin
    if (time >= 2200 + toff && time <2500 + toff){
        temp1 += z;
        temp2HP += 2*z;


        // reset tangan + mata
    glMatrix.mat4.rotateX(badanHP.MOVEMATRIX, badanHP.MOVEMATRIX, LIBS.degToRad(z));
    glMatrix.mat4.rotateX(bajuHP.MOVEMATRIX, bajuHP.MOVEMATRIX, LIBS.degToRad(z));
    glMatrix.mat4.rotateX(ekorHP.MOVEMATRIX, ekorHP.MOVEMATRIX, LIBS.degToRad(-z));
    glMatrix.mat4.rotateX(telingaRHP.MOVEMATRIX, telingaRHP.MOVEMATRIX, LIBS.degToRad(-z));
    glMatrix.mat4.rotateX(telingaRHP.child[0].MOVEMATRIX, telingaRHP.child[0].MOVEMATRIX, LIBS.degToRad(-z));
    glMatrix.mat4.rotateX(telingaLHP.MOVEMATRIX, telingaLHP.MOVEMATRIX, LIBS.degToRad(-z));
    glMatrix.mat4.rotateX(telingaLHP.child[0].MOVEMATRIX, telingaLHP.child[0].MOVEMATRIX, LIBS.degToRad(-z));
    glMatrix.mat4.rotateX(mulutHP.MOVEMATRIX, mulutHP.MOVEMATRIX, LIBS.degToRad(z));
    glMatrix.mat4.rotateX(mataLHP.MOVEMATRIX, mataLHP.MOVEMATRIX, LIBS.degToRad(-z));
	glMatrix.mat4.rotateX(mataRHP.MOVEMATRIX, mataRHP.MOVEMATRIX, LIBS.degToRad(-z));
    glMatrix.mat4.rotateX(mata2LHP.MOVEMATRIX, mata2LHP.MOVEMATRIX, LIBS.degToRad(-z));
    glMatrix.mat4.rotateX(mata2RHP.MOVEMATRIX, mata2RHP.MOVEMATRIX, LIBS.degToRad(-z));

    glMatrix.mat4.rotateX(tanganLHP.MOVEMATRIX, tanganLHP.MOVEMATRIX, LIBS.degToRad(z));
    glMatrix.mat4.rotateX(tanganLHP.child[0].MOVEMATRIX, tanganLHP.child[0].MOVEMATRIX, LIBS.degToRad(z));
    glMatrix.mat4.rotateX(tanganLHP.child[1].MOVEMATRIX, tanganLHP.child[1].MOVEMATRIX, LIBS.degToRad(z));
    glMatrix.mat4.rotateX(tanganLHP.child[2].MOVEMATRIX, tanganLHP.child[2].MOVEMATRIX, LIBS.degToRad(z));
    glMatrix.mat4.rotateX(tanganLHP.child[3].MOVEMATRIX, tanganLHP.child[3].MOVEMATRIX, LIBS.degToRad(z));
    glMatrix.mat4.rotateX(bajuTLHP.MOVEMATRIX, bajuTLHP.MOVEMATRIX, LIBS.degToRad(z));

    glMatrix.mat4.rotateX(tanganRHP.MOVEMATRIX, tanganRHP.MOVEMATRIX, LIBS.degToRad(z));
    glMatrix.mat4.rotateX(tanganRHP.child[0].MOVEMATRIX, tanganRHP.child[0].MOVEMATRIX, LIBS.degToRad(z));
    glMatrix.mat4.rotateX(tanganRHP.child[1].MOVEMATRIX, tanganRHP.child[1].MOVEMATRIX, LIBS.degToRad(z));
    glMatrix.mat4.rotateX(tanganRHP.child[2].MOVEMATRIX, tanganRHP.child[2].MOVEMATRIX, LIBS.degToRad(z));
    glMatrix.mat4.rotateX(tanganRHP.child[3].MOVEMATRIX, tanganRHP.child[3].MOVEMATRIX, LIBS.degToRad(z));    
    glMatrix.mat4.rotateX(bajuTLHP.MOVEMATRIX, bajuTLHP.MOVEMATRIX, LIBS.degToRad(z));
    }

    glMatrix.mat4.translate(ekorHP.MOVEMATRIX, ekorHP.MOVEMATRIX, [0, 0, 2]);
    glMatrix.mat4.rotateX(badanHP.MOVEMATRIX, badanHP.MOVEMATRIX, LIBS.degToRad( temp1));
    glMatrix.mat4.rotateX(bajuHP.MOVEMATRIX, bajuHP.MOVEMATRIX, LIBS.degToRad( temp1));
    glMatrix.mat4.rotateX(ekorHP.MOVEMATRIX, ekorHP.MOVEMATRIX, LIBS.degToRad(-temp1));
    glMatrix.mat4.rotateX(telingaRHP.MOVEMATRIX, telingaRHP.MOVEMATRIX, LIBS.degToRad( temp1));
    glMatrix.mat4.rotateX(telingaRHP.child[0].MOVEMATRIX, telingaRHP.child[0].MOVEMATRIX, LIBS.degToRad( temp1));
    glMatrix.mat4.rotateX(telingaLHP.MOVEMATRIX, telingaLHP.MOVEMATRIX, LIBS.degToRad( temp1));
    glMatrix.mat4.rotateX(telingaLHP.child[0].MOVEMATRIX, telingaLHP.child[0].MOVEMATRIX, LIBS.degToRad( temp1));
    glMatrix.mat4.rotateX(mulutHP.MOVEMATRIX, mulutHP.MOVEMATRIX, LIBS.degToRad(- temp1*0.05));
    

    glMatrix.mat4.rotateX(mataLHP.MOVEMATRIX, mataLHP.MOVEMATRIX, LIBS.degToRad(- temp1));
	glMatrix.mat4.rotateX(mataRHP.MOVEMATRIX, mataRHP.MOVEMATRIX, LIBS.degToRad(- temp1));
    glMatrix.mat4.rotateX(mata2LHP.MOVEMATRIX, mata2LHP.MOVEMATRIX, LIBS.degToRad(- temp1));
    glMatrix.mat4.rotateX(mata2RHP.MOVEMATRIX, mata2RHP.MOVEMATRIX, LIBS.degToRad(- temp1));

    glMatrix.mat4.rotateX(tanganLHP.MOVEMATRIX, tanganLHP.MOVEMATRIX, LIBS.degToRad(temp2HP));
    glMatrix.mat4.rotateX(tanganLHP.child[0].MOVEMATRIX, tanganLHP.child[0].MOVEMATRIX, LIBS.degToRad(temp2HP));
    glMatrix.mat4.rotateX(tanganLHP.child[1].MOVEMATRIX, tanganLHP.child[1].MOVEMATRIX, LIBS.degToRad(temp2HP));
    glMatrix.mat4.rotateX(tanganLHP.child[2].MOVEMATRIX, tanganLHP.child[2].MOVEMATRIX, LIBS.degToRad(temp2HP));
    glMatrix.mat4.rotateX(tanganLHP.child[3].MOVEMATRIX, tanganLHP.child[3].MOVEMATRIX, LIBS.degToRad(temp2HP));
    glMatrix.mat4.rotateX(bajuTLHP.MOVEMATRIX, bajuTLHP.MOVEMATRIX, LIBS.degToRad(temp2HP));

    glMatrix.mat4.rotateX(tanganRHP.MOVEMATRIX, tanganRHP.MOVEMATRIX, LIBS.degToRad(temp2HP));
    glMatrix.mat4.rotateX(tanganRHP.child[0].MOVEMATRIX, tanganRHP.child[0].MOVEMATRIX, LIBS.degToRad(temp2HP));
    glMatrix.mat4.rotateX(tanganRHP.child[1].MOVEMATRIX, tanganRHP.child[1].MOVEMATRIX, LIBS.degToRad(temp2HP));
    glMatrix.mat4.rotateX(tanganRHP.child[2].MOVEMATRIX, tanganRHP.child[2].MOVEMATRIX, LIBS.degToRad(temp2HP));
    glMatrix.mat4.rotateX(tanganRHP.child[3].MOVEMATRIX, tanganRHP.child[3].MOVEMATRIX, LIBS.degToRad(temp2HP));    
    glMatrix.mat4.rotateX(bajuTRHP.MOVEMATRIX, bajuTRHP.MOVEMATRIX, LIBS.degToRad(temp2HP));



    glMatrix.mat4.translate(ekorHP.MOVEMATRIX, ekorHP.MOVEMATRIX, [0, 0, -2]);


    if (time >= 2500 + toff && time < 2800 + toff){
        temp1 += -z;
        temp2HP += -2*z;


        glMatrix.mat4.rotateX(tanganLHP.MOVEMATRIX, tanganLHP.MOVEMATRIX, LIBS.degToRad(z));
        glMatrix.mat4.rotateX(tanganLHP.child[0].MOVEMATRIX, tanganLHP.child[0].MOVEMATRIX, LIBS.degToRad(z));
        glMatrix.mat4.rotateX(tanganLHP.child[1].MOVEMATRIX, tanganLHP.child[1].MOVEMATRIX, LIBS.degToRad(z));
        glMatrix.mat4.rotateX(tanganLHP.child[2].MOVEMATRIX, tanganLHP.child[2].MOVEMATRIX, LIBS.degToRad(z));
        glMatrix.mat4.rotateX(tanganLHP.child[3].MOVEMATRIX, tanganLHP.child[3].MOVEMATRIX, LIBS.degToRad(z));
        glMatrix.mat4.rotateX(bajuTLHP.MOVEMATRIX, bajuTLHP.MOVEMATRIX, LIBS.degToRad(z));

        glMatrix.mat4.rotateX(tanganRHP.MOVEMATRIX, tanganRHP.MOVEMATRIX, LIBS.degToRad(z));
        glMatrix.mat4.rotateX(tanganRHP.child[0].MOVEMATRIX, tanganRHP.child[0].MOVEMATRIX, LIBS.degToRad(z));
        glMatrix.mat4.rotateX(tanganRHP.child[1].MOVEMATRIX, tanganRHP.child[1].MOVEMATRIX, LIBS.degToRad(z));
        glMatrix.mat4.rotateX(tanganRHP.child[2].MOVEMATRIX, tanganRHP.child[2].MOVEMATRIX, LIBS.degToRad(z));
        glMatrix.mat4.rotateX(tanganRHP.child[3].MOVEMATRIX, tanganRHP.child[3].MOVEMATRIX, LIBS.degToRad(z));    
        glMatrix.mat4.rotateX(bajuTLHP.MOVEMATRIX, bajuTLHP.MOVEMATRIX, LIBS.degToRad(z));

    }

    if (time >= 2800 + toff && time < 3200 + toff){
        u += z;

        temp3HP = 12;
        temp4HP = 45;
        temp5HP = 0;
        temp6HP = 0;
    }


    glMatrix.mat4.translate(tanganLHP.child[1].MOVEMATRIX, tanganLHP.child[1].MOVEMATRIX, [0, 0, 3.75]);
    glMatrix.mat4.translate(tanganRHP.child[1].MOVEMATRIX, tanganRHP.child[1].MOVEMATRIX, [0, 0, 3.75]);

    if (time >= 3200  + toff && time < 3550 + toff && u >= 0){
        u += -z;

        tempHP += d*0.2;
        temp3HP = 12;
        temp4HP = 45;
        temp5HP = 0;
        temp6HP = 0;
    }
    

    if (time >= 3550 + toff && time < 3600 + toff && u >= 0){
        u += -z;
        tempHP += d*0.2;
        temp3HP = 0;
        temp4HP = 0;
        temp5HP = 0;
        temp6HP = 0;
    }
    glMatrix.mat4.scale(balonHP.MOVEMATRIX, balonHP.MOVEMATRIX, [tempHP,tempHP,tempHP]);




    


    GL.viewport(0,0,CANVAS.width,CANVAS.height);
    GL.clear(GL.COLOR_BUFFER_BIT);


    wajahHP.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
    alisLeftHP.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
    alisRightHP.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);


    tanganLHP.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
    tanganLHP.child[0].setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
    tanganLHP.child[1].setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
    tanganLHP.child[2].setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
    tanganLHP.child[3].setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
    bajuTLHP.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);

    tanganRHP.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
    tanganRHP.child[0].setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
    tanganRHP.child[1].setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
    tanganRHP.child[2].setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
    tanganRHP.child[3].setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
    bajuTRHP.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);

    kakiLHP.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
    kakiRHP.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
    badanHP.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
    bajuHP.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
    telingaRHP.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
    telingaRHP.child[0].setUniformmatrix4(PROJMATRIX,VIEWMATRIX);

    telingaLHP.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
    telingaLHP.child[0].setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
    mataLHP.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
    mata2LHP.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
    mataRHP.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
    mata2RHP.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
    ekorHP.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
    balonHP.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
    mulutHP.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
   



    for (var i = 3; i < mouthHP[0].length; i += 3) {
        mulutHP.drawLine(
            -mouthHP[0][i - 3] * 7.5,  // x1
            -mouthHP[0][i - 2] * 7.5,  // y1
            -mouthHP[0][i - 1] * 7.5,  // z1 (multiplied by -7.5 but not used for depth)
            -mouthHP[0][i] * 7.5,      // x2
            -mouthHP[0][i + 1] * 7.5,  // y2
            -mouthHP[0][i + 2] * 7.5,  // z2 (multiplied by -7.5 but not used for depth)
            mouthHP[1]                 // color array
        );
    };
    for (var i = 3; i < browLeftHP[0].length; i += 3) {
        alisLeftHP.drawLine(
            -browLeftHP[0][i - 3] * 7.5,  // x1
            -browLeftHP[0][i - 2] * 7.5,  // y1
            -browLeftHP[0][i - 1] * 7.5,  // z1 (multiplied by -7.5 but not used for depth)
            -browLeftHP[0][i] * 7.5,      // x2
            -browLeftHP[0][i + 1] * 7.5,  // y2
            -browLeftHP[0][i + 2] * 7.5,  // z2 (multiplied by -7.5 but not used for depth)
            browLeftHP[1]                 // color array
        );
    };

    for (var i = 3; i < browRightHP[0].length; i += 3) {
        alisRightHP.drawLine(
            -browRightHP[0][i - 3] * 7.5,  // x1
            -browRightHP[0][i - 2] * 7.5,  // y1
            -browRightHP[0][i - 1] * 7.5,  // z1 (multiplied by -7.5 but not used for depth)
            -browRightHP[0][i] * 7.5,      // x2
            -browRightHP[0][i + 1] * 7.5,  // y2
            -browRightHP[0][i + 2] * 7.5,  // z2 (multiplied by -7.5 but not used for depth)
            browRightHP[1]                 // color array
        );
    };

    

    
    wajahHP.draw();
    mataLHP.draw();
    mataRHP.draw();
    mata2LHP.draw();
    mata2RHP.draw();
    tanganLHP.draw(); 
    bajuTLHP.draw(); 
    tanganRHP.draw();
    bajuTRHP.draw();
    kakiLHP.draw();
    kakiRHP.draw();
    badanHP.draw();
    bajuHP.draw();
    telingaRHP.draw();
    telingaLHP.draw();
    balonHP.draw();
    tanganLHP.draw();
    ekorHP.draw();



    GL.flush();
    window.requestAnimationFrame(animate);

    }




    animate();
}
window.addEventListener("load",main);
