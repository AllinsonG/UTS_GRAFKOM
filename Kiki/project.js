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
        z1 = 9.71 ;
        z2 = 9.71 ;
        GL.bindBuffer(GL.ARRAY_BUFFER, this.OBJECT_VERTEX);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array([x3, y3,z1, x4, y4,z1, x5, y5,z2, x4, y4,z1, x5, y5,z2, x6, y6,z2]), GL.STATIC_DRAW);   
        GL.vertexAttribPointer(this._position, 3, GL.FLOAT, false, 0, 0);
    
        GL.bindBuffer(GL.ARRAY_BUFFER, this.OBJECT_COLOR);
        GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(color),GL.STATIC_DRAW);
        GL.vertexAttribPointer(this._color, 3, GL.FLOAT, false, 0,0);
    
        GL.drawArrays(GL.TRIANGLES, 0, 6);
        z1 = 9.7 ;
        z2 = 9.6;
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
    var face = new faces.faces();
    var nose = new faces.noses();
    var leftEye = new faces.eye1();
    var rightEye = new faces.eye1();
    var leftEye1 = new faces.eye2();
    var rightEye1 = new faces.eye2();
    var leftHand = new hand.left_hand();
    var leftHand2 = new hand.left_hand2();
    var leftHand3 = new hand.elbow();
    var leftHand4 = new hand.elbow1();
    var rightHand = new hand.right_hand();
    var rightHand2 = new hand.right_hand2();
    var rightHand3 = new hand.elbow();
    var rightHand4 = new hand.elbow1();
    var leftPalm = new hand.left_palm();
    var rightPalm = new hand.right_palm();
    var leftLeg = new legs.left_leg();
    var rightLeg = new legs.right_leg();
    var leftLeg2 = new legs.left_leg2();
    var rightLeg2 = new legs.right_leg2();
    var body = new bodys.bodies();
    var tail = new bodys.tails();
    var rightEar = new ears.right_ear();
    var leftEar = new ears.left_ear();
    var rightEar2 = new ears.right_ear2();
    var leftEar2 = new ears.left_ear2();
    var mulut = new faces.mouth();
    var tail1 = new bodys.tails1();
    var mouth = new faces.mouth();
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

    
    var wajah = new MyObject(face[0],face[1],face[2],shader_vertex_source,shader_fragment_source);
    var mataL = new MyObject(leftEye[0],leftEye[1],leftEye[2],shader_vertex_source,shader_fragment_source);
    var mataR = new MyObject(rightEye[0],rightEye[1],rightEye[2],shader_vertex_source,shader_fragment_source);
    var mata2L = new MyObject(leftEye1[0],leftEye1[1],leftEye1[2],shader_vertex_source,shader_fragment_source);
    var mata2R = new MyObject(rightEye1[0],rightEye1[1],rightEye1[2],shader_vertex_source,shader_fragment_source);
    var hidung = new MyObject(nose[0],nose[1],nose[2],shader_vertex_source,shader_fragment_source);
    var tanganL = new MyObject(leftHand[0],leftHand[1],leftHand[2],shader_vertex_source,shader_fragment_source);
    var tangan2L = new MyObject(leftHand2[0],leftHand2[1],leftHand2[2],shader_vertex_source,shader_fragment_source);
    var tangan3L = new MyObject(leftPalm[0],leftPalm[1],leftPalm[2],shader_vertex_source,shader_fragment_source);
    var tangan4L = new MyObject(leftHand3[0],leftHand3[1],leftHand3[2],shader_vertex_source,shader_fragment_source);
    var tangan5L = new MyObject(leftHand4[0],leftHand4[1],leftHand4[2],shader_vertex_source,shader_fragment_source);
    var tanganR = new MyObject(rightHand[0],rightHand[1],rightHand[2],shader_vertex_source,shader_fragment_source);
    var tangan2R = new MyObject(rightHand2[0],rightHand2[1],rightHand2[2],shader_vertex_source,shader_fragment_source);
    var tangan3R = new MyObject(rightPalm[0],rightPalm[1],rightPalm[2],shader_vertex_source,shader_fragment_source);
    var tangan4R = new MyObject(rightHand3[0],rightHand3[1],rightHand3[2],shader_vertex_source,shader_fragment_source);
    var tangan5R = new MyObject(rightHand4[0],rightHand4[1],rightHand4[2],shader_vertex_source,shader_fragment_source);
    var kakiL = new MyObject(leftLeg[0],leftLeg[1],leftLeg[2],shader_vertex_source,shader_fragment_source);
    var kaki2L = new MyObject(leftLeg2[0],leftLeg2[1],leftLeg2[2],shader_vertex_source,shader_fragment_source);
    var kakiR = new MyObject(rightLeg[0],rightLeg[1],rightLeg[2],shader_vertex_source,shader_fragment_source);
    var kaki2R = new MyObject(rightLeg2[0],rightLeg2[1],rightLeg2[2],shader_vertex_source,shader_fragment_source);
    var badan = new MyObject(body[0],body[1],body[2],shader_vertex_source,shader_fragment_source);
    var telingaR = new MyObject(rightEar[0],rightEar[1],rightEar[2],shader_vertex_source,shader_fragment_source);
    var telingaL = new MyObject(leftEar[0],leftEar[1],leftEar[2],shader_vertex_source,shader_fragment_source);
    var telinga2L = new MyObject(leftEar2[0],leftEar2[1],leftEar2[2],shader_vertex_source,shader_fragment_source);
    var telinga2R = new MyObject(rightEar2[0],rightEar2[1],rightEar2[2],shader_vertex_source,shader_fragment_source);
    var ekor = new MyObject(tail[0],tail[1],tail[2],shader_vertex_source,shader_fragment_source);
    var ekor1 = new MyObject(tail1[0],tail1[1],tail1[2],shader_vertex_source,shader_fragment_source);
    var mulut = new MyObject(mouth[0],mouth[1],mouth[2],shader_vertex_source,shader_fragment_source);

    tanganL.addChild(tangan2L);
    tanganR.addChild(tangan2R);
    tanganL.addChild(tangan3L);
    tanganR.addChild(tangan3R);
    tanganL.addChild(tangan4L);
    tanganR.addChild(tangan4R);
    tanganL.addChild(tangan5L);
    tanganR.addChild(tangan5R);
    kakiL.addChild(kaki2L);
    kakiR.addChild(kaki2R);
    var PROJMATRIX =  LIBS.get_projection(40,CANVAS.width/CANVAS.height,1,100);
    
    var VIEWMATRIX = LIBS.get_I4();

    LIBS.translateZ(VIEWMATRIX,-30);

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
        wajah.setIdentifyMove();
        tanganL.setIdentifyMove();
        tanganR.setIdentifyMove();
        kakiL.setIdentifyMove();
        kakiR.setIdentifyMove();
        badan.setIdentifyMove();
        telingaR.setIdentifyMove();
        telingaL.setIdentifyMove();
        telinga2L.setIdentifyMove();
        telinga2R.setIdentifyMove();
        tanganL.child[0].setIdentifyMove();
        tanganR.child[0].setIdentifyMove();
        tanganL.child[1].setIdentifyMove();
        tanganR.child[1].setIdentifyMove();
        tanganL.child[2].setIdentifyMove();
        tanganR.child[2].setIdentifyMove();
        tanganL.child[3].setIdentifyMove();
        tanganR.child[3].setIdentifyMove();
        kakiL.child[0].setIdentifyMove();
        kakiR.child[0].setIdentifyMove();
        hidung.setIdentifyMove();
        mataL.setIdentifyMove();
        mataR.setIdentifyMove();
        mata2L.setIdentifyMove();
        mata2R.setIdentifyMove();
        ekor.setIdentifyMove();
        ekor1.setIdentifyMove();
        mulut.setIdentifyMove();
        

        temps = LIBS.get_I4();
        LIBS.rotateY(temps,THETA);
        LIBS.rotateX(temps,PHI);

        wajah.MOVEMATRIX = LIBS.mul(wajah.MOVEMATRIX, temps);
        tanganL.MOVEMATRIX = LIBS.mul(tanganL.MOVEMATRIX, temps);
        tanganL.child[0].MOVEMATRIX = LIBS.mul(tanganL.child[0].MOVEMATRIX,temps);
        tanganL.child[1].MOVEMATRIX = LIBS.mul(tanganL.child[1].MOVEMATRIX,temps);
        tanganL.child[2].MOVEMATRIX = LIBS.mul(tanganL.child[2].MOVEMATRIX,temps);
        tanganL.child[3].MOVEMATRIX = LIBS.mul(tanganL.child[3].MOVEMATRIX,temps);
        tanganR.MOVEMATRIX = LIBS.mul(tanganR.MOVEMATRIX, temps);
        tanganR.child[0].MOVEMATRIX = LIBS.mul(tanganR.child[0].MOVEMATRIX, temps);
        tanganR.child[1].MOVEMATRIX = LIBS.mul(tanganR.child[1].MOVEMATRIX, temps);
        tanganR.child[2].MOVEMATRIX = LIBS.mul(tanganR.child[2].MOVEMATRIX, temps);
        tanganR.child[3].MOVEMATRIX = LIBS.mul(tanganR.child[3].MOVEMATRIX, temps);
        kakiL.MOVEMATRIX = LIBS.mul(kakiL.MOVEMATRIX, temps);
        kakiL.child[0].MOVEMATRIX = LIBS.mul(kakiL.child[0].MOVEMATRIX, temps);
        kakiR.child[0].MOVEMATRIX = LIBS.mul(kakiR.child[0].MOVEMATRIX, temps);
        kakiR.MOVEMATRIX = LIBS.mul(kakiR.MOVEMATRIX, temps);
        badan.MOVEMATRIX = LIBS.mul(badan.MOVEMATRIX, temps);
        telingaR.MOVEMATRIX = LIBS.mul(telingaR.MOVEMATRIX, temps);
        telingaL.MOVEMATRIX = LIBS.mul(telingaL.MOVEMATRIX, temps);
        telinga2L.MOVEMATRIX = LIBS.mul(telinga2L.MOVEMATRIX, temps);
        telinga2R.MOVEMATRIX = LIBS.mul(telinga2R.MOVEMATRIX, temps);
        hidung.MOVEMATRIX = LIBS.mul(hidung.MOVEMATRIX, temps);
        mataL.MOVEMATRIX = LIBS.mul(mataL.MOVEMATRIX, temps);
        mataR.MOVEMATRIX = LIBS.mul(mataR.MOVEMATRIX, temps);
        mata2L.MOVEMATRIX = LIBS.mul(mata2L.MOVEMATRIX, temps);
        mata2R.MOVEMATRIX = LIBS.mul(mata2R.MOVEMATRIX, temps);
        ekor.MOVEMATRIX = LIBS.mul(ekor.MOVEMATRIX, temps);
        ekor1.MOVEMATRIX = LIBS.mul(ekor1.MOVEMATRIX, temps);
        mulut.MOVEMATRIX = LIBS.mul(mulut.MOVEMATRIX,temps);

        // rotate = LIBS.get_I4();
        // LIBS.rotateZ(rotate, LIBS.degToRad(-45));
        // tanganL.MOVEMATRIX = LIBS.mul(tanganL.MOVEMATRIX,rotate);
        // tanganL.child[0].MOVEMATRIX = LIBS.mul(tanganL.child[0].MOVEMATRIX,rotate);
        // tanganL.child[1].MOVEMATRIX = LIBS.mul(tanganL.child[1].MOVEMATRIX,rotate);
        // tanganL.child[2].MOVEMATRIX = LIBS.mul(tanganL.child[2].MOVEMATRIX,rotate);
        // tanganL.child[3].MOVEMATRIX = LIBS.mul(tanganL.child[3].MOVEMATRIX,rotate);

        glMatrix.mat4.rotateZ(tanganL.MOVEMATRIX,tanganL.MOVEMATRIX,LIBS.degToRad(-45));
        glMatrix.mat4.rotateX(tanganL.MOVEMATRIX,tanganL.MOVEMATRIX,LIBS.degToRad(90));
        glMatrix.mat4.rotateZ(tanganL.child[0].MOVEMATRIX,tanganL.child[0].MOVEMATRIX,LIBS.degToRad(-45));
        glMatrix.mat4.rotateX(tanganL.child[0].MOVEMATRIX,tanganL.child[0].MOVEMATRIX,LIBS.degToRad(90));
        glMatrix.mat4.rotateZ(tanganL.child[1].MOVEMATRIX,tanganL.child[1].MOVEMATRIX,LIBS.degToRad(-45));
        glMatrix.mat4.rotateX(tanganL.child[1].MOVEMATRIX,tanganL.child[1].MOVEMATRIX,LIBS.degToRad(90));
        glMatrix.mat4.rotateZ(tanganL.child[2].MOVEMATRIX,tanganL.child[2].MOVEMATRIX,LIBS.degToRad(-45));
        glMatrix.mat4.rotateX(tanganL.child[2].MOVEMATRIX,tanganL.child[2].MOVEMATRIX,LIBS.degToRad(90));
        // glMatrix.mat4.rotateZ(tanganL.child[3].MOVEMATRIX,tanganL.child[3].MOVEMATRIX,LIBS.degToRad(-45));
        // glMatrix.mat4.rotateX(tanganL.child[3].MOVEMATRIX,tanganL.child[3].MOVEMATRIX,LIBS.degToRad(90));
        glMatrix.mat4.rotateZ(tanganR.MOVEMATRIX,tanganR.MOVEMATRIX,LIBS.degToRad(45));
        glMatrix.mat4.rotateX(tanganR.MOVEMATRIX,tanganR.MOVEMATRIX,LIBS.degToRad(90));
        glMatrix.mat4.rotateZ(tanganR.child[0].MOVEMATRIX,tanganR.child[0].MOVEMATRIX,LIBS.degToRad(45));
        glMatrix.mat4.rotateX(tanganR.child[0].MOVEMATRIX,tanganR.child[0].MOVEMATRIX,LIBS.degToRad(90));
        glMatrix.mat4.rotateZ(tanganR.child[1].MOVEMATRIX,tanganR.child[1].MOVEMATRIX,LIBS.degToRad(45));
        glMatrix.mat4.rotateX(tanganR.child[1].MOVEMATRIX,tanganR.child[1].MOVEMATRIX,LIBS.degToRad(90));
        glMatrix.mat4.rotateZ(tanganR.child[2].MOVEMATRIX,tanganR.child[2].MOVEMATRIX,LIBS.degToRad(45));
        glMatrix.mat4.rotateX(tanganR.child[2].MOVEMATRIX,tanganR.child[2].MOVEMATRIX,LIBS.degToRad(90));
        // glMatrix.mat4.rotateZ(tanganR.child[3].MOVEMATRIX,tanganR.child[3].MOVEMATRIX,LIBS.degToRad(45));
        // glMatrix.mat4.rotateX(tanganR.child[3].MOVEMATRIX,tanganR.child[3].MOVEMATRIX,LIBS.degToRad(90));
        glMatrix.mat4.rotateX(kakiL.MOVEMATRIX,kakiL.MOVEMATRIX,LIBS.degToRad(90));
        glMatrix.mat4.rotateX(kakiL.child[0].MOVEMATRIX,kakiL.child[0].MOVEMATRIX,LIBS.degToRad(90));
        glMatrix.mat4.rotateX(kakiR.child[0].MOVEMATRIX,kakiR.child[0].MOVEMATRIX,LIBS.degToRad(90));
        glMatrix.mat4.rotateX(kakiR.MOVEMATRIX,kakiR.MOVEMATRIX,LIBS.degToRad(90));
        glMatrix.mat4.rotateX(badan.MOVEMATRIX,badan.MOVEMATRIX,LIBS.degToRad(-90));
        glMatrix.mat4.rotateX(telingaR.MOVEMATRIX,telingaR.MOVEMATRIX,LIBS.degToRad(-90));
        glMatrix.mat4.rotateY(telingaR.MOVEMATRIX,telingaR.MOVEMATRIX,0.2);
        glMatrix.mat4.rotateX(telingaL.MOVEMATRIX,telingaL.MOVEMATRIX,LIBS.degToRad(-90));
        glMatrix.mat4.rotateY(telingaL.MOVEMATRIX,telingaL.MOVEMATRIX,-0.2);
        glMatrix.mat4.rotateX(telinga2R.MOVEMATRIX,telinga2R.MOVEMATRIX,LIBS.degToRad(-90));
        glMatrix.mat4.rotateY(telinga2R.MOVEMATRIX,telinga2R.MOVEMATRIX,0.2);
        glMatrix.mat4.rotateX(telinga2L.MOVEMATRIX,telinga2L.MOVEMATRIX,LIBS.degToRad(-90));
        glMatrix.mat4.rotateY(telinga2L.MOVEMATRIX,telinga2L.MOVEMATRIX,-0.2);
        
        glMatrix.mat4.rotateX(mulut.MOVEMATRIX,mulut.MOVEMATRIX,LIBS.degToRad(30));
        // glMatrix.mat4.rotateY(mataL.MOVEMATRIX,mataL.MOVEMATRIX,LIBS.degToRad(-210));
        // glMatrix.mat4.rotateY(mata2L.MOVEMATRIX,mata2L.MOVEMATRIX,LIBS.degToRad(-30));
        // glMatrix.mat4.rotateY(mataR.MOVEMATRIX,mataR.MOVEMATRIX,LIBS.degToRad(30));
        // glMatrix.mat4.rotateY(mata2R.MOVEMATRIX,mata2R.MOVEMATRIX,LIBS.degToRad(30));







        glMatrix.mat4.translate(wajah.MOVEMATRIX,wajah.MOVEMATRIX,[0.0,3.0,0.0]);
        glMatrix.mat4.translate(tanganL.MOVEMATRIX,tanganL.MOVEMATRIX,[-0.6,0.0,0.8]);
        glMatrix.mat4.translate(tanganL.child[0].MOVEMATRIX,tanganL.child[0].MOVEMATRIX,[-0.6,0.0,0.8]);
        glMatrix.mat4.translate(tanganL.child[1].MOVEMATRIX,tanganL.child[1].MOVEMATRIX,[-0.6,0.0,3.75]);
        glMatrix.mat4.translate(tanganL.child[2].MOVEMATRIX,tanganL.child[2].MOVEMATRIX,[-0.6,0.0,2.35]);
        glMatrix.mat4.translate(tanganL.child[3].MOVEMATRIX,tanganL.child[3].MOVEMATRIX,[-1.05,-0.2,0]);
        glMatrix.mat4.translate(tanganR.MOVEMATRIX,tanganR.MOVEMATRIX,[0.6,0.0,0.8]);
        glMatrix.mat4.translate(tanganR.child[0].MOVEMATRIX,tanganR.child[0].MOVEMATRIX,[0.6,0.0,0.8]);
        glMatrix.mat4.translate(tanganR.child[1].MOVEMATRIX,tanganR.child[1].MOVEMATRIX,[0.6,0.0,3.75]);
        glMatrix.mat4.translate(tanganR.child[2].MOVEMATRIX,tanganR.child[2].MOVEMATRIX,[0.6,0.0,2.35]);
        glMatrix.mat4.translate(tanganR.child[3].MOVEMATRIX,tanganR.child[3].MOVEMATRIX,[1.05,-0.2,0]);
        glMatrix.mat4.translate(kakiL.MOVEMATRIX,kakiL.MOVEMATRIX,[-0.95,0.0,3.0]);
        glMatrix.mat4.translate(kakiL.child[0].MOVEMATRIX,kakiL.child[0].MOVEMATRIX,[-0.95,0.0,3.0]);
        glMatrix.mat4.translate(kakiR.child[0].MOVEMATRIX,kakiR.child[0].MOVEMATRIX,[0.95,0.0,3.0]);
        glMatrix.mat4.translate(kakiR.MOVEMATRIX,kakiR.MOVEMATRIX,[0.95,0.0,3.0]);
        glMatrix.mat4.translate(badan.MOVEMATRIX,badan.MOVEMATRIX,[0.0,0.0,-2.8]);
        glMatrix.mat4.translate(telingaR.MOVEMATRIX,telingaR.MOVEMATRIX,[0.8,0.0,4.8]);
        glMatrix.mat4.translate(telingaL.MOVEMATRIX,telingaL.MOVEMATRIX,[-0.8,0.0,4.8]);
        glMatrix.mat4.translate(telinga2R.MOVEMATRIX,telinga2R.MOVEMATRIX,[0.8,-0.01,4.8]);
        glMatrix.mat4.translate(telinga2L.MOVEMATRIX,telinga2L.MOVEMATRIX,[-0.8,-0.01,4.8]);    
        glMatrix.mat4.translate(hidung.MOVEMATRIX,hidung.MOVEMATRIX,[0,2.7,3.2]);
        glMatrix.mat4.translate(mataL.MOVEMATRIX,mataL.MOVEMATRIX,[-1.6,2.87,2.275]);
        glMatrix.mat4.rotateY(mataL.MOVEMATRIX,mataL.MOVEMATRIX,LIBS.degToRad(-196));
        glMatrix.mat4.translate(mata2L.MOVEMATRIX,mata2L.MOVEMATRIX,[-1.6,2.87,2.29]);
        glMatrix.mat4.rotateY(mata2L.MOVEMATRIX,mata2L.MOVEMATRIX,LIBS.degToRad(-196));
        glMatrix.mat4.translate(mataR.MOVEMATRIX,mataR.MOVEMATRIX,[1.6,2.87,2.275]);
        glMatrix.mat4.rotateY(mataR.MOVEMATRIX,mataR.MOVEMATRIX,LIBS.degToRad(196));
        glMatrix.mat4.translate(mata2R.MOVEMATRIX,mata2R.MOVEMATRIX,[1.6,2.87,2.29]);
        glMatrix.mat4.rotateY(mata2R.MOVEMATRIX,mata2R.MOVEMATRIX,LIBS.degToRad(196));
        glMatrix.mat4.translate(ekor.MOVEMATRIX,ekor.MOVEMATRIX,[0,-1.75,-7.5]);
        glMatrix.mat4.rotateZ(ekor.MOVEMATRIX,ekor.MOVEMATRIX,LIBS.degToRad(180));
        glMatrix.mat4.translate(ekor1.MOVEMATRIX,ekor1.MOVEMATRIX,[0,-1.535,-7.735]);


        glMatrix.mat4.rotateZ(mulut.MOVEMATRIX,mulut.MOVEMATRIX,LIBS.degToRad(180));
        glMatrix.mat4.translate(mulut.MOVEMATRIX,mulut.MOVEMATRIX,[0,0.65,-8.59]);
        glMatrix.mat4.rotateZ(ekor1.MOVEMATRIX,ekor1.MOVEMATRIX,LIBS.degToRad(180));
        GL.viewport(0,0,CANVAS.width,CANVAS.height);
        GL.clear(GL.COLOR_BUFFER_BIT);


        wajah.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        tanganL.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        tanganL.child[0].setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        tanganL.child[1].setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        tanganL.child[2].setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        tanganL.child[3].setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        tanganR.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        tanganR.child[0].setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        tanganR.child[1].setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        tanganR.child[2].setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        tanganR.child[3].setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        kakiL.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        kakiL.child[0].setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        kakiR.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        kakiR.child[0].setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        badan.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        telingaR.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        telingaL.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        telinga2L.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        telinga2R.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        hidung.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        mataL.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        mata2L.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        mataR.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        mata2R.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        ekor.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        ekor1.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        mulut.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);



        for (var i = 3; i < mouth[0].length; i += 3) {
            mulut.drawLine(-mouth[0][i - 3] * 7.5, -mouth[0][i - 2] * 7.5, -mouth[0][i-1] * 7.5, -mouth[0][i] * 7.5,-mouth[0][i+1] * 7.5,
             - mouth[0][i+2] * 7.5, mouth[1]);
            
        };
        wajah.draw();
        hidung.draw();
        mataL.draw();
        mataR.draw();
        mata2L.draw();
        mata2R.draw();
        tanganL.draw(); 
        tanganR.draw();
        kakiL.draw();
        kakiR.draw();
        badan.draw();
        telingaR.draw();
        telingaL.draw();
        telinga2L.draw();
        telinga2R.draw();
        tanganL.draw();
        ekor.draw();
        ekor1.draw();



        GL.flush();
        window.requestAnimationFrame(animate);
    }
    animate();
}
window.addEventListener("load",main);
