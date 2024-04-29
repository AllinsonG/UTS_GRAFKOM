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
    var clothL = new hand.cloth1();
    var clothR = new hand.cloth1();
    var cloth2L = new hand.cloth2();
    var cloth2R = new hand.cloth2();
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
    var cloth = new bodys.clothw();
    var balon = new baloon.baloons();




    var trees = new map.tree();
    var batangs = new map.batang();
    var matahari = new map.sun();
    var peta = new map.road();







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
    var bajuL = new MyObject(clothL[0], clothL[1], clothL[2], shader_vertex_source,shader_fragment_source);
    var baju2L = new MyObject(clothL[3], clothL[4], clothL[5], shader_vertex_source,shader_fragment_source);
    var bajuR = new MyObject(clothR[0], clothR[1], clothR[2], shader_vertex_source,shader_fragment_source);
    var baju2R = new MyObject(clothR[3], clothR[4], clothR[5], shader_vertex_source,shader_fragment_source);
    
    var baju3L = new MyObject(cloth2L[0], cloth2L[1], cloth2L[2], shader_vertex_source,shader_fragment_source);
    var baju4L = new MyObject(cloth2L[3], cloth2L[4], cloth2L[5], shader_vertex_source,shader_fragment_source);
    var baju3R = new MyObject(cloth2R[0], cloth2R[1], cloth2R[2], shader_vertex_source,shader_fragment_source);
    var baju4R = new MyObject(cloth2R[3], cloth2R[4], cloth2R[5], shader_vertex_source,shader_fragment_source);
    var baju = new MyObject(cloth[0], cloth[1], cloth[2], shader_vertex_source,shader_fragment_source);

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
    var balons = new MyObject(balon[0], balon[1], balon[2], shader_vertex_source, shader_fragment_source);
    var pohon = new MyObject(trees[0], trees[1], trees[2], shader_vertex_source, shader_fragment_source);
    var batang1 = new MyObject(batangs[0], batangs[1], batangs[2], shader_vertex_source,shader_fragment_source);
    var pohon2 = new MyObject(trees[0], trees[1], trees[2], shader_vertex_source, shader_fragment_source);
    var batang2 = new MyObject(batangs[0], batangs[1], batangs[2], shader_vertex_source,shader_fragment_source);
    var pohon3 = new MyObject(trees[0], trees[1], trees[2], shader_vertex_source, shader_fragment_source);
    var batang3 = new MyObject(batangs[0], batangs[1], batangs[2], shader_vertex_source,shader_fragment_source);
    
    var petas = new MyObject(peta[0], peta[1], peta[2], shader_vertex_source, shader_fragment_source);
    var mataharis = new MyObject(matahari[0], matahari[1], matahari[2], shader_vertex_source, shader_fragment_source);


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
    bajuL.addChild(baju2L);
    bajuR.addChild(baju2R);
    baju3R.addChild(baju4R);
    baju3L.addChild(baju4L);
    var PROJMATRIX =  LIBS.get_projection(40,CANVAS.width/CANVAS.height,1,100);
    
    var VIEWMATRIX = LIBS.get_I4();

    LIBS.translateZ(VIEWMATRIX,-40);
    var slow = 0;
    var slow1 = 0;
    var slow2 = 0;
    var slow3 = 0;
    var slow4 = 0;
    var slow5 = 0;
    var slow6 = 0;
    var x = 1.5;
    var y = 1;
    var z = 0.5;
    var d = 0.1;
    var c = 500 * 0.005;
    var test = 0.5;
    var test1 = 0;
    var test2 = 0;
    var test3 = 0;
    var test4 = 0;
    var temp = 0;
    var temp1 = 0;
    var h = 0;
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
        petas.setIdentifyMove();
        pohon.setIdentifyMove();
        batang1.setIdentifyMove();
        pohon2.setIdentifyMove();
        batang2.setIdentifyMove();
        pohon3.setIdentifyMove();
        batang3.setIdentifyMove();
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
        bajuL.child[0].setIdentifyMove();
        bajuL.setIdentifyMove();
        bajuR.setIdentifyMove();
        bajuR.child[0].setIdentifyMove();
        baju3L.child[0].setIdentifyMove();
        baju3L.setIdentifyMove();
        baju3R.setIdentifyMove();
        baju3R.child[0].setIdentifyMove();
        baju.setIdentifyMove();
        balons.setIdentifyMove();
        mataharis.setIdentifyMove();
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
        bajuL.child[0].MOVEMATRIX = LIBS.mul(bajuL.child[0].MOVEMATRIX,temps);
        bajuL.MOVEMATRIX = LIBS.mul(bajuL.MOVEMATRIX, temps);
        bajuR.child[0].MOVEMATRIX = LIBS.mul(bajuR.child[0].MOVEMATRIX,temps);
        bajuR.MOVEMATRIX = LIBS.mul(bajuR.MOVEMATRIX, temps);
        baju3L.child[0].MOVEMATRIX = LIBS.mul(baju3L.child[0].MOVEMATRIX,temps);
        baju3L.MOVEMATRIX = LIBS.mul(baju3L.MOVEMATRIX, temps);
        baju3R.child[0].MOVEMATRIX = LIBS.mul(baju3R.child[0].MOVEMATRIX,temps);
        baju3R.MOVEMATRIX = LIBS.mul(baju3R.MOVEMATRIX, temps);
        baju.MOVEMATRIX = LIBS.mul(baju.MOVEMATRIX,temps);
        balons.MOVEMATRIX = LIBS.mul(balons.MOVEMATRIX, temps);
        pohon.MOVEMATRIX = LIBS.mul(pohon.MOVEMATRIX,temps);
        batang1.MOVEMATRIX = LIBS.mul(batang1.MOVEMATRIX,temps);
        pohon2.MOVEMATRIX = LIBS.mul(pohon2.MOVEMATRIX,temps);
        batang2.MOVEMATRIX = LIBS.mul(batang2.MOVEMATRIX,temps);
        pohon3.MOVEMATRIX = LIBS.mul(pohon3.MOVEMATRIX,temps);
        batang3.MOVEMATRIX = LIBS.mul(batang3.MOVEMATRIX,temps);
        petas.MOVEMATRIX = LIBS.mul(petas.MOVEMATRIX,temps);
        mataharis.MOVEMATRIX = LIBS.mul(mataharis.MOVEMATRIX, temps);


        //Default
        glMatrix.mat4.rotateX(petas.MOVEMATRIX, petas.MOVEMATRIX,LIBS.degToRad(-90));
        glMatrix.mat4.translate(petas.MOVEMATRIX,petas.MOVEMATRIX,[0,0,-6.5]);
        glMatrix.mat4.rotateZ(tanganL.MOVEMATRIX,tanganL.MOVEMATRIX,LIBS.degToRad(-45));
        glMatrix.mat4.rotateX(tanganL.MOVEMATRIX,tanganL.MOVEMATRIX,LIBS.degToRad(90));
        glMatrix.mat4.rotateZ(tanganL.child[0].MOVEMATRIX,tanganL.child[0].MOVEMATRIX,LIBS.degToRad(-45));
        glMatrix.mat4.rotateX(tanganL.child[0].MOVEMATRIX,tanganL.child[0].MOVEMATRIX,LIBS.degToRad(90));
        glMatrix.mat4.rotateZ(tanganL.child[1].MOVEMATRIX,tanganL.child[1].MOVEMATRIX,LIBS.degToRad(-45));
        glMatrix.mat4.rotateX(tanganL.child[1].MOVEMATRIX,tanganL.child[1].MOVEMATRIX,LIBS.degToRad(90));
        glMatrix.mat4.rotateZ(tanganL.child[2].MOVEMATRIX,tanganL.child[2].MOVEMATRIX,LIBS.degToRad(-45));
        glMatrix.mat4.rotateX(tanganL.child[2].MOVEMATRIX,tanganL.child[2].MOVEMATRIX,LIBS.degToRad(90));
        glMatrix.mat4.rotateZ(tanganR.MOVEMATRIX,tanganR.MOVEMATRIX,LIBS.degToRad(45));
        glMatrix.mat4.rotateX(tanganR.MOVEMATRIX,tanganR.MOVEMATRIX,LIBS.degToRad(90));
        glMatrix.mat4.rotateZ(tanganR.child[0].MOVEMATRIX,tanganR.child[0].MOVEMATRIX,LIBS.degToRad(45));
        glMatrix.mat4.rotateX(tanganR.child[0].MOVEMATRIX,tanganR.child[0].MOVEMATRIX,LIBS.degToRad(90));
        glMatrix.mat4.rotateZ(tanganR.child[1].MOVEMATRIX,tanganR.child[1].MOVEMATRIX,LIBS.degToRad(45));
        glMatrix.mat4.rotateX(tanganR.child[1].MOVEMATRIX,tanganR.child[1].MOVEMATRIX,LIBS.degToRad(90));
        glMatrix.mat4.rotateZ(tanganR.child[2].MOVEMATRIX,tanganR.child[2].MOVEMATRIX,LIBS.degToRad(45));
        glMatrix.mat4.rotateX(tanganR.child[2].MOVEMATRIX,tanganR.child[2].MOVEMATRIX,LIBS.degToRad(90));
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
        glMatrix.mat4.rotateX(baju.MOVEMATRIX,baju.MOVEMATRIX,LIBS.degToRad(90));
        glMatrix.mat4.rotateY(baju.MOVEMATRIX,baju.MOVEMATRIX,LIBS.degToRad(180));
        glMatrix.mat4.rotateX(bajuR.MOVEMATRIX,bajuR.MOVEMATRIX,LIBS.degToRad(90));
        glMatrix.mat4.rotateX(bajuR.child[0].MOVEMATRIX,bajuR.child[0].MOVEMATRIX,LIBS.degToRad(90));
        glMatrix.mat4.rotateY(bajuR.MOVEMATRIX,bajuR.MOVEMATRIX,LIBS.degToRad(45));
        glMatrix.mat4.rotateY(bajuR.child[0].MOVEMATRIX,bajuR.child[0].MOVEMATRIX,LIBS.degToRad(45));
        glMatrix.mat4.rotateX(bajuL.MOVEMATRIX,bajuL.MOVEMATRIX,LIBS.degToRad(-90));
        glMatrix.mat4.rotateX(bajuL.child[0].MOVEMATRIX,bajuL.child[0].MOVEMATRIX,LIBS.degToRad(-90));
        glMatrix.mat4.rotateY(bajuL.MOVEMATRIX,bajuL.MOVEMATRIX,LIBS.degToRad(-135));
        glMatrix.mat4.rotateY(bajuL.child[0].MOVEMATRIX,bajuL.child[0].MOVEMATRIX,LIBS.degToRad(-135));
        glMatrix.mat4.rotateX(balons.MOVEMATRIX,balons.MOVEMATRIX,LIBS.degToRad(-180));
        glMatrix.mat4.rotateX(pohon.MOVEMATRIX,pohon.MOVEMATRIX,LIBS.degToRad(90));
        glMatrix.mat4.translate(pohon.MOVEMATRIX,pohon.MOVEMATRIX,[-20.0,-15.0,-20.0]);
        glMatrix.mat4.rotateX(batang1.MOVEMATRIX,batang1.MOVEMATRIX,LIBS.degToRad(90));
        glMatrix.mat4.translate(batang1.MOVEMATRIX,batang1.MOVEMATRIX,[-20.0,-15.0,-19]);
        glMatrix.mat4.rotateX(pohon2.MOVEMATRIX,pohon2.MOVEMATRIX,LIBS.degToRad(90));
        glMatrix.mat4.translate(pohon2.MOVEMATRIX,pohon2.MOVEMATRIX,[0.0,-20.0,-20.0]);
        glMatrix.mat4.rotateX(batang2.MOVEMATRIX,batang2.MOVEMATRIX,LIBS.degToRad(90));
        glMatrix.mat4.translate(batang2.MOVEMATRIX,batang2.MOVEMATRIX,[0.0,-20.0,-19.0]);
        glMatrix.mat4.rotateX(pohon3.MOVEMATRIX,pohon3.MOVEMATRIX,LIBS.degToRad(90));
        glMatrix.mat4.translate(pohon3.MOVEMATRIX,pohon3.MOVEMATRIX,[20.0,-15.0,-20.0]);
        glMatrix.mat4.rotateX(batang3.MOVEMATRIX,batang3.MOVEMATRIX,LIBS.degToRad(90));
        glMatrix.mat4.translate(batang3.MOVEMATRIX,batang3.MOVEMATRIX,[20.0,-15.0,-19.0]);
        glMatrix.mat4.translate(mataharis.MOVEMATRIX, mataharis.MOVEMATRIX, [0,0,-70]);




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
        glMatrix.mat4.translate(kakiR.MOVEMATRIX,kakiR.MOVEMATRIX,[0.95,0.0,3]);
        glMatrix.mat4.translate(kakiR.child[0].MOVEMATRIX,kakiR.child[0].MOVEMATRIX,[0.95,0.0,3]);

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
        glMatrix.mat4.translate(ekor.MOVEMATRIX,ekor.MOVEMATRIX,[0,-2.15,-7.55]);
        glMatrix.mat4.rotateZ(ekor.MOVEMATRIX,ekor.MOVEMATRIX,LIBS.degToRad(180));
        glMatrix.mat4.translate(ekor1.MOVEMATRIX,ekor1.MOVEMATRIX,[0,-1.935,-7.785]);
        glMatrix.mat4.rotateZ(mulut.MOVEMATRIX,mulut.MOVEMATRIX,LIBS.degToRad(180));
        glMatrix.mat4.translate(mulut.MOVEMATRIX,mulut.MOVEMATRIX,[0,0.65,-8.59]);
        glMatrix.mat4.rotateZ(ekor1.MOVEMATRIX,ekor1.MOVEMATRIX,LIBS.degToRad(180));
        glMatrix.mat4.translate(baju.MOVEMATRIX,baju.MOVEMATRIX,[0,0,-2.8]);
        glMatrix.mat4.translate(bajuL.MOVEMATRIX,bajuL.MOVEMATRIX,[0.6,0,3.45]);
        glMatrix.mat4.translate(bajuL.child[0].MOVEMATRIX,bajuL.child[0].MOVEMATRIX,[0.6,0,3.75]);
        glMatrix.mat4.translate(bajuR.MOVEMATRIX,bajuR.MOVEMATRIX,[0.6,0,3.45]);
        glMatrix.mat4.translate(bajuR.child[0].MOVEMATRIX,bajuR.child[0].MOVEMATRIX,[0.6,0,3.75]);
        glMatrix.mat4.translate(baju3L.MOVEMATRIX,baju3L.MOVEMATRIX,[0.6,0,3]);
        glMatrix.mat4.translate(baju3L.child[0].MOVEMATRIX,baju3L.child[0].MOVEMATRIX,[0.6,0,3.5]);
        glMatrix.mat4.translate(baju3R.MOVEMATRIX,baju3R.MOVEMATRIX,[0.6,0,3]);
        glMatrix.mat4.translate(baju3R.child[0].MOVEMATRIX,baju3R.child[0].MOVEMATRIX,[0.6,0,3.5]);





        //Walk
        glMatrix.mat4.translate(mataharis.MOVEMATRIX, mataharis.MOVEMATRIX, [0,0,70]);
        if (time>0){
            h += x;
         
            if ((h/180)%2 == 0){
                CANVAS.style.backgroundColor = "blue";
            }
            else if((h/180)%2==1){
                CANVAS.style.backgroundColor = "darkblue";
            }
            glMatrix.mat4.rotateX(mataharis.MOVEMATRIX, mataharis.MOVEMATRIX, LIBS.degToRad(x));
        }
        glMatrix.mat4.rotateX(mataharis.MOVEMATRIX, mataharis.MOVEMATRIX, LIBS.degToRad(h));
        glMatrix.mat4.translate(mataharis.MOVEMATRIX, mataharis.MOVEMATRIX, [0,0,-70]);

        if (time > 0){

            glMatrix.mat4.translate(wajah.MOVEMATRIX,wajah.MOVEMATRIX,[0,0.0,c]);
            glMatrix.mat4.translate(tanganL.MOVEMATRIX,tanganL.MOVEMATRIX,[0,c,0]);
            glMatrix.mat4.translate(tanganR.MOVEMATRIX,tanganR.MOVEMATRIX,[0,c,0]);
            glMatrix.mat4.translate(kakiL.MOVEMATRIX,kakiL.MOVEMATRIX,[0,c,0]);
            glMatrix.mat4.translate(kakiR.MOVEMATRIX,kakiR.MOVEMATRIX,[0,c,0]);
            glMatrix.mat4.translate(badan.MOVEMATRIX,badan.MOVEMATRIX,[0,-c,0]);
            glMatrix.mat4.translate(telingaR.MOVEMATRIX,telingaR.MOVEMATRIX,[0,-c,0]);
            glMatrix.mat4.translate(telingaL.MOVEMATRIX,telingaL.MOVEMATRIX,[0,-c,0]);
            glMatrix.mat4.translate(telinga2L.MOVEMATRIX,telinga2L.MOVEMATRIX,[0,-c,0]);
            glMatrix.mat4.translate(telinga2R.MOVEMATRIX,telinga2R.MOVEMATRIX,[0,-c,0]);
            glMatrix.mat4.translate(tanganL.child[0].MOVEMATRIX,tanganL.child[0].MOVEMATRIX,[0,c,0]);
            glMatrix.mat4.translate(tanganR.child[0].MOVEMATRIX,tanganR.child[0].MOVEMATRIX,[0,c,0]);
            glMatrix.mat4.translate(tanganL.child[1].MOVEMATRIX,tanganL.child[1].MOVEMATRIX,[0,c,0]);
            glMatrix.mat4.translate(tanganR.child[1].MOVEMATRIX,tanganR.child[1].MOVEMATRIX,[0,c,0]);
            glMatrix.mat4.translate(tanganL.child[2].MOVEMATRIX,tanganL.child[2].MOVEMATRIX,[0,c,0]);
            glMatrix.mat4.translate(tanganR.child[2].MOVEMATRIX,tanganR.child[2].MOVEMATRIX,[0,c,0]);
            glMatrix.mat4.translate(tanganL.child[3].MOVEMATRIX,tanganL.child[3].MOVEMATRIX,[0,0,c]);
            glMatrix.mat4.translate(tanganR.child[3].MOVEMATRIX,tanganR.child[3].MOVEMATRIX,[0,0,c]);
            glMatrix.mat4.translate(kakiL.child[0].MOVEMATRIX,kakiL.child[0].MOVEMATRIX,[0,c,0]);
            glMatrix.mat4.translate(kakiR.child[0].MOVEMATRIX,kakiR.child[0].MOVEMATRIX,[0,c,0]);
            glMatrix.mat4.translate(hidung.MOVEMATRIX,hidung.MOVEMATRIX,[0,0.0,c]);
            glMatrix.mat4.rotateY(mataL.MOVEMATRIX,mataL.MOVEMATRIX,LIBS.degToRad(196));
            glMatrix.mat4.translate(mataL.MOVEMATRIX,mataL.MOVEMATRIX,[0,0,c]);
            glMatrix.mat4.rotateY(mataL.MOVEMATRIX,mataL.MOVEMATRIX,LIBS.degToRad(-196));
            glMatrix.mat4.rotateY(mataR.MOVEMATRIX,mataR.MOVEMATRIX,LIBS.degToRad(-196));
            glMatrix.mat4.translate(mataR.MOVEMATRIX,mataR.MOVEMATRIX,[0,0.0,c]);
            glMatrix.mat4.rotateY(mataR.MOVEMATRIX,mataR.MOVEMATRIX,LIBS.degToRad(196));
            glMatrix.mat4.rotateY(mata2L.MOVEMATRIX,mata2L.MOVEMATRIX,LIBS.degToRad(196));
            glMatrix.mat4.translate(mata2L.MOVEMATRIX,mata2L.MOVEMATRIX,[0,0.0,c]);
            glMatrix.mat4.rotateY(mata2L.MOVEMATRIX,mata2L.MOVEMATRIX,LIBS.degToRad(-196));
            glMatrix.mat4.rotateY(mata2R.MOVEMATRIX,mata2R.MOVEMATRIX,LIBS.degToRad(-196));
            glMatrix.mat4.translate(mata2R.MOVEMATRIX,mata2R.MOVEMATRIX,[0,0.0,c]);
            glMatrix.mat4.rotateY(mata2R.MOVEMATRIX,mata2R.MOVEMATRIX,LIBS.degToRad(196));
            glMatrix.mat4.translate(ekor.MOVEMATRIX,ekor.MOVEMATRIX,[0,0.0,c]);
            glMatrix.mat4.translate(ekor1.MOVEMATRIX,ekor1.MOVEMATRIX,[0,0.0,c]);
            glMatrix.mat4.rotateZ(mulut.MOVEMATRIX,mulut.MOVEMATRIX,LIBS.degToRad(-180));
            glMatrix.mat4.rotateX(mulut.MOVEMATRIX,mulut.MOVEMATRIX,LIBS.degToRad(-30));
            glMatrix.mat4.translate(mulut.MOVEMATRIX,mulut.MOVEMATRIX,[0,0.0,c]);
            glMatrix.mat4.rotateX(mulut.MOVEMATRIX,mulut.MOVEMATRIX,LIBS.degToRad(30));
            glMatrix.mat4.rotateZ(mulut.MOVEMATRIX,mulut.MOVEMATRIX,LIBS.degToRad(180));
            glMatrix.mat4.translate(bajuL.child[0].MOVEMATRIX,bajuL.child[0].MOVEMATRIX,[0,-c,0]);
            glMatrix.mat4.translate(bajuL.MOVEMATRIX,bajuL.MOVEMATRIX,[0,-c,0]);
            glMatrix.mat4.translate(bajuR.MOVEMATRIX,bajuR.MOVEMATRIX,[0,c,0]);
            glMatrix.mat4.translate(bajuR.child[0].MOVEMATRIX,bajuR.child[0].MOVEMATRIX,[0,c,0]);
            glMatrix.mat4.translate(baju.MOVEMATRIX,baju.MOVEMATRIX,[0,c,0]);
        }
        

        if (time >= 250 && time <500){

            slow += -x;
            slow2 += y

            glMatrix.mat4.rotateX(kakiL.MOVEMATRIX,kakiL.MOVEMATRIX,LIBS.degToRad(y));
            glMatrix.mat4.rotateX(kakiR.MOVEMATRIX,kakiR.MOVEMATRIX,LIBS.degToRad(-x));
            glMatrix.mat4.rotateX(kakiL.child[0].MOVEMATRIX,kakiL.child[0].MOVEMATRIX,LIBS.degToRad(y));
            glMatrix.mat4.rotateX(kakiR.child[0].MOVEMATRIX,kakiR.child[0].MOVEMATRIX,LIBS.degToRad(-x));
        }

        glMatrix.mat4.rotateX(kakiL.MOVEMATRIX,kakiL.MOVEMATRIX,LIBS.degToRad(slow2));
        glMatrix.mat4.rotateX(kakiR.MOVEMATRIX,kakiR.MOVEMATRIX,LIBS.degToRad(slow));
        glMatrix.mat4.rotateX(kakiL.child[0].MOVEMATRIX,kakiL.child[0].MOVEMATRIX,LIBS.degToRad(slow2))
        glMatrix.mat4.rotateX(kakiR.child[0].MOVEMATRIX,kakiR.child[0].MOVEMATRIX,LIBS.degToRad(slow));
        glMatrix.mat4.translate(kakiL.child[0].MOVEMATRIX,kakiL.child[0].MOVEMATRIX,[0,0.0,1.5]);


        
        if (time >= 250 && time < 500){
            slow3 += x;
            c = time * 0.005;

            glMatrix.mat4.rotateX(kakiL.child[0].MOVEMATRIX,kakiL.child[0].MOVEMATRIX,LIBS.degToRad(x));


        }
        
        
        glMatrix.mat4.rotateX(kakiL.child[0].MOVEMATRIX,kakiL.child[0].MOVEMATRIX,LIBS.degToRad(slow3));
        if (time >= 500 && time <1000 && slow3 != 0){
            slow3 += -x;
            c = time * 0.005;
            glMatrix.mat4.rotateX(kakiL.child[0].MOVEMATRIX,kakiL.child[0].MOVEMATRIX,LIBS.degToRad(-x));
        }
        glMatrix.mat4.rotateX(kakiL.child[0].MOVEMATRIX,kakiL.child[0].MOVEMATRIX,LIBS.degToRad(slow3));

        glMatrix.mat4.translate(kakiL.child[0].MOVEMATRIX,kakiL.child[0].MOVEMATRIX,[0,0.0,-1.5]);



        if (time >= 500 && time <1000 && slow2 != 0){

            slow2 += -y;
            glMatrix.mat4.rotateX(kakiL.MOVEMATRIX,kakiL.MOVEMATRIX,LIBS.degToRad(-y));

            glMatrix.mat4.rotateX(kakiL.child[0].MOVEMATRIX,kakiL.child[0].MOVEMATRIX,LIBS.degToRad(-y));

        }
        if (time >= 500 && time <1000 && slow != 0){
            slow += x;


            glMatrix.mat4.rotateX(kakiR.MOVEMATRIX,kakiR.MOVEMATRIX,LIBS.degToRad(x));

            glMatrix.mat4.rotateX(kakiR.child[0].MOVEMATRIX,kakiR.child[0].MOVEMATRIX,LIBS.degToRad(x));
        }

        glMatrix.mat4.rotateX(kakiL.MOVEMATRIX,kakiL.MOVEMATRIX,LIBS.degToRad(slow2));
        glMatrix.mat4.rotateX(kakiR.MOVEMATRIX,kakiR.MOVEMATRIX,LIBS.degToRad(slow));
        glMatrix.mat4.rotateX(kakiL.child[0].MOVEMATRIX,kakiL.child[0].MOVEMATRIX,LIBS.degToRad(slow2));
        glMatrix.mat4.rotateX(kakiR.child[0].MOVEMATRIX,kakiR.child[0].MOVEMATRIX,LIBS.degToRad(slow));




        if (time >= 1000 && time <1250 ){
            slow += y;
            slow2 += -z;
            c = time * 0.005;
            glMatrix.mat4.rotateX(kakiL.MOVEMATRIX,kakiL.MOVEMATRIX,LIBS.degToRad(-z));
            glMatrix.mat4.rotateX(kakiR.MOVEMATRIX,kakiR.MOVEMATRIX,LIBS.degToRad(y));
            glMatrix.mat4.rotateX(kakiL.child[0].MOVEMATRIX,kakiL.child[0].MOVEMATRIX,LIBS.degToRad(-z));
            glMatrix.mat4.rotateX(kakiR.child[0].MOVEMATRIX,kakiR.child[0].MOVEMATRIX,LIBS.degToRad(y));
        }

        glMatrix.mat4.rotateX(kakiL.MOVEMATRIX,kakiL.MOVEMATRIX,LIBS.degToRad(slow2));
        glMatrix.mat4.rotateX(kakiR.MOVEMATRIX,kakiR.MOVEMATRIX,LIBS.degToRad(slow));
        glMatrix.mat4.rotateX(kakiL.child[0].MOVEMATRIX,kakiL.child[0].MOVEMATRIX,LIBS.degToRad(slow2));
        glMatrix.mat4.rotateX(kakiR.child[0].MOVEMATRIX,kakiR.child[0].MOVEMATRIX,LIBS.degToRad(slow));
        glMatrix.mat4.translate(kakiR.child[0].MOVEMATRIX,kakiR.child[0].MOVEMATRIX,[0,0.0,1.5]);
        if (time >=1000 && time < 1250){
            slow4 += x;
            glMatrix.mat4.rotateX(kakiR.child[0].MOVEMATRIX,kakiR.child[0].MOVEMATRIX,LIBS.degToRad(1.5));
        }
        glMatrix.mat4.rotateX(kakiR.child[0].MOVEMATRIX,kakiR.child[0].MOVEMATRIX,LIBS.degToRad(slow4));
        if (time >=1250 && time < 1600 && slow4 != 0){
            slow4 += -x;
            c = time * 0.005;
            glMatrix.mat4.rotateX(kakiR.child[0].MOVEMATRIX,kakiR.child[0].MOVEMATRIX,LIBS.degToRad(-1.5));
        }
        glMatrix.mat4.rotateX(kakiR.child[0].MOVEMATRIX,kakiR.child[0].MOVEMATRIX,LIBS.degToRad(slow4));

        glMatrix.mat4.translate(kakiR.child[0].MOVEMATRIX,kakiR.child[0].MOVEMATRIX,[0,0.0,-1.5]);


        if (time >= 1250 && time <1600 && slow2 != 0){

            slow2 += z;
            glMatrix.mat4.rotateX(kakiL.MOVEMATRIX,kakiL.MOVEMATRIX,LIBS.degToRad(0.5));

            glMatrix.mat4.rotateX(kakiL.child[0].MOVEMATRIX,kakiL.child[0].MOVEMATRIX,LIBS.degToRad(0.5));

        }
        if (time >= 1250 && time <1600 && slow != 0){
            slow += -y;


            glMatrix.mat4.rotateX(kakiR.MOVEMATRIX,kakiR.MOVEMATRIX,LIBS.degToRad(-y));

            glMatrix.mat4.rotateX(kakiR.child[0].MOVEMATRIX,kakiR.child[0].MOVEMATRIX,LIBS.degToRad(-y));
        }

        glMatrix.mat4.rotateX(kakiL.MOVEMATRIX,kakiL.MOVEMATRIX,LIBS.degToRad(slow2));
        glMatrix.mat4.rotateX(kakiR.MOVEMATRIX,kakiR.MOVEMATRIX,LIBS.degToRad(slow));
        glMatrix.mat4.rotateX(kakiL.child[0].MOVEMATRIX,kakiL.child[0].MOVEMATRIX,LIBS.degToRad(slow2));
        glMatrix.mat4.rotateX(kakiR.child[0].MOVEMATRIX,kakiR.child[0].MOVEMATRIX,LIBS.degToRad(slow));


        if (time >= 1600 && time <1850 ){
            
            slow += -x;
            slow2 += y

            glMatrix.mat4.rotateX(kakiL.MOVEMATRIX,kakiL.MOVEMATRIX,LIBS.degToRad(y));
            glMatrix.mat4.rotateX(kakiR.MOVEMATRIX,kakiR.MOVEMATRIX,LIBS.degToRad(-x));
            glMatrix.mat4.rotateX(kakiL.child[0].MOVEMATRIX,kakiL.child[0].MOVEMATRIX,LIBS.degToRad(y));
            glMatrix.mat4.rotateX(kakiR.child[0].MOVEMATRIX,kakiR.child[0].MOVEMATRIX,LIBS.degToRad(-x));
        }

        
        glMatrix.mat4.rotateX(kakiL.MOVEMATRIX,kakiL.MOVEMATRIX,LIBS.degToRad(slow2));
        glMatrix.mat4.rotateX(kakiR.MOVEMATRIX,kakiR.MOVEMATRIX,LIBS.degToRad(slow));
        glMatrix.mat4.rotateX(kakiL.child[0].MOVEMATRIX,kakiL.child[0].MOVEMATRIX,LIBS.degToRad(slow2))
        glMatrix.mat4.rotateX(kakiR.child[0].MOVEMATRIX,kakiR.child[0].MOVEMATRIX,LIBS.degToRad(slow));
        glMatrix.mat4.translate(kakiL.child[0].MOVEMATRIX,kakiL.child[0].MOVEMATRIX,[0,0.0,1.5]);


        
        if (time >= 1600 && time <1850 ){
            slow3 += x;
            c = time * 0.005;

            glMatrix.mat4.rotateX(kakiL.child[0].MOVEMATRIX,kakiL.child[0].MOVEMATRIX,LIBS.degToRad(x));


        }
    
        glMatrix.mat4.rotateX(kakiL.child[0].MOVEMATRIX,kakiL.child[0].MOVEMATRIX,LIBS.degToRad(slow3));
        if (time >= 1850 && time <2200 && slow3 != 0){
            slow3 += -x;
            c = time * 0.005;
            glMatrix.mat4.rotateX(kakiL.child[0].MOVEMATRIX,kakiL.child[0].MOVEMATRIX,LIBS.degToRad(-x));
        }
        glMatrix.mat4.rotateX(kakiL.child[0].MOVEMATRIX,kakiL.child[0].MOVEMATRIX,LIBS.degToRad(slow3));

        glMatrix.mat4.translate(kakiL.child[0].MOVEMATRIX,kakiL.child[0].MOVEMATRIX,[0,0.0,-1.5]);



        if (time >= 1850 && time <2200 && slow2 != 0){

            slow2 += -y;
            glMatrix.mat4.rotateX(kakiL.MOVEMATRIX,kakiL.MOVEMATRIX,LIBS.degToRad(-y));

            glMatrix.mat4.rotateX(kakiL.child[0].MOVEMATRIX,kakiL.child[0].MOVEMATRIX,LIBS.degToRad(-y));

        }
        if (time >= 1850 && time <2200 && slow != 0){
            slow += x;


            glMatrix.mat4.rotateX(kakiR.MOVEMATRIX,kakiR.MOVEMATRIX,LIBS.degToRad(x));

            glMatrix.mat4.rotateX(kakiR.child[0].MOVEMATRIX,kakiR.child[0].MOVEMATRIX,LIBS.degToRad(x));
        }

        glMatrix.mat4.rotateX(kakiL.MOVEMATRIX,kakiL.MOVEMATRIX,LIBS.degToRad(slow2));
        glMatrix.mat4.rotateX(kakiR.MOVEMATRIX,kakiR.MOVEMATRIX,LIBS.degToRad(slow));
        glMatrix.mat4.rotateX(kakiL.child[0].MOVEMATRIX,kakiL.child[0].MOVEMATRIX,LIBS.degToRad(slow2));
        glMatrix.mat4.rotateX(kakiR.child[0].MOVEMATRIX,kakiR.child[0].MOVEMATRIX,LIBS.degToRad(slow));



        

        //Menganggukkan kepala
        glMatrix.mat4.translate(telingaR.MOVEMATRIX,telingaR.MOVEMATRIX,[-0.8,0.0,-4.8]);
        glMatrix.mat4.translate(telingaL.MOVEMATRIX,telingaL.MOVEMATRIX,[0.8,0.0,-4.8]);
        glMatrix.mat4.translate(telinga2R.MOVEMATRIX,telinga2R.MOVEMATRIX,[-0.8,0.01,-4.8]);
        glMatrix.mat4.translate(telinga2L.MOVEMATRIX,telinga2L.MOVEMATRIX,[0.8,0.01,-4.8]); 
        glMatrix.mat4.rotateY(mataL.MOVEMATRIX,mataL.MOVEMATRIX,LIBS.degToRad(196));
        glMatrix.mat4.translate(mataL.MOVEMATRIX,mataL.MOVEMATRIX,[1.6,-2.87,-2.275]);
        glMatrix.mat4.rotateY(mata2L.MOVEMATRIX,mata2L.MOVEMATRIX,LIBS.degToRad(196));
        glMatrix.mat4.translate(mata2L.MOVEMATRIX,mata2L.MOVEMATRIX,[1.6,-2.87,-2.29]);
        glMatrix.mat4.rotateY(mataR.MOVEMATRIX,mataR.MOVEMATRIX,LIBS.degToRad(-196));
        glMatrix.mat4.translate(mataR.MOVEMATRIX,mataR.MOVEMATRIX,[-1.6,-2.87,-2.275]);
        glMatrix.mat4.rotateY(mata2R.MOVEMATRIX,mata2R.MOVEMATRIX,LIBS.degToRad(-196));   
        glMatrix.mat4.translate(mata2R.MOVEMATRIX,mata2R.MOVEMATRIX,[-1.6,-2.87,-2.29]);

        if (time >= 2200 && time <3000){
            temp += d;
            temp1 += z;
            glMatrix.mat4.rotateX(wajah.MOVEMATRIX,wajah.MOVEMATRIX,LIBS.degToRad(y));
            glMatrix.mat4.rotateX(telingaR.MOVEMATRIX,telingaR.MOVEMATRIX,LIBS.degToRad(z));
            glMatrix.mat4.rotateX(telingaL.MOVEMATRIX,telingaL.MOVEMATRIX,LIBS.degToRad(z));
            glMatrix.mat4.rotateX(telinga2L.MOVEMATRIX,telinga2L.MOVEMATRIX,LIBS.degToRad(z));
            glMatrix.mat4.rotateX(telinga2R.MOVEMATRIX,telinga2R.MOVEMATRIX,LIBS.degToRad(z));
            glMatrix.mat4.rotateX(hidung.MOVEMATRIX,hidung.MOVEMATRIX,LIBS.degToRad(z));
            glMatrix.mat4.rotateX(mataL.MOVEMATRIX,mataL.MOVEMATRIX,LIBS.degToRad(d));
            glMatrix.mat4.rotateX(mataR.MOVEMATRIX,mataR.MOVEMATRIX,LIBS.degToRad(d));
            glMatrix.mat4.rotateX(mata2L.MOVEMATRIX,mata2L.MOVEMATRIX,LIBS.degToRad(d));
            glMatrix.mat4.rotateX(mata2R.MOVEMATRIX,mata2R.MOVEMATRIX,LIBS.degToRad(d));
            glMatrix.mat4.rotateZ(mulut.MOVEMATRIX,mulut.MOVEMATRIX,LIBS.degToRad(d));
        }
        glMatrix.mat4.rotateX(wajah.MOVEMATRIX,wajah.MOVEMATRIX,LIBS.degToRad(temp1));
        glMatrix.mat4.rotateX(telingaR.MOVEMATRIX,telingaR.MOVEMATRIX,LIBS.degToRad(temp));
        glMatrix.mat4.rotateX(telingaL.MOVEMATRIX,telingaL.MOVEMATRIX,LIBS.degToRad(temp));
        glMatrix.mat4.rotateX(telinga2L.MOVEMATRIX,telinga2L.MOVEMATRIX,LIBS.degToRad(temp));
        glMatrix.mat4.rotateX(telinga2R.MOVEMATRIX,telinga2R.MOVEMATRIX,LIBS.degToRad(temp));
        glMatrix.mat4.rotateX(hidung.MOVEMATRIX,hidung.MOVEMATRIX,LIBS.degToRad(temp));
        glMatrix.mat4.rotateX(mataL.MOVEMATRIX,mataL.MOVEMATRIX,LIBS.degToRad(temp));
        glMatrix.mat4.rotateX(mataR.MOVEMATRIX,mataR.MOVEMATRIX,LIBS.degToRad(temp));
        glMatrix.mat4.rotateX(mata2L.MOVEMATRIX,mata2L.MOVEMATRIX,LIBS.degToRad(temp));
        glMatrix.mat4.rotateX(mata2R.MOVEMATRIX,mata2R.MOVEMATRIX,LIBS.degToRad(temp));
        glMatrix.mat4.rotateX(mulut.MOVEMATRIX,mulut.MOVEMATRIX,LIBS.degToRad(temp/6));
        glMatrix.mat4.translate(telingaR.MOVEMATRIX,telingaR.MOVEMATRIX,[0.8,0.0,4.8]);
        glMatrix.mat4.translate(telingaL.MOVEMATRIX,telingaL.MOVEMATRIX,[-0.8,0.0,4.8]);
        glMatrix.mat4.translate(telinga2R.MOVEMATRIX,telinga2R.MOVEMATRIX,[0.8,-0.01,4.8]);
        glMatrix.mat4.translate(telinga2L.MOVEMATRIX,telinga2L.MOVEMATRIX,[-0.8,-0.01,4.8]);    
        glMatrix.mat4.translate(mataL.MOVEMATRIX,mataL.MOVEMATRIX,[-1.6,2.87,2.275]);
        glMatrix.mat4.rotateY(mataL.MOVEMATRIX,mataL.MOVEMATRIX,LIBS.degToRad(-196));
        glMatrix.mat4.translate(mata2L.MOVEMATRIX,mata2L.MOVEMATRIX,[-1.6,2.87,2.29]);
        glMatrix.mat4.rotateY(mata2L.MOVEMATRIX,mata2L.MOVEMATRIX,LIBS.degToRad(-196));
        glMatrix.mat4.translate(mataR.MOVEMATRIX,mataR.MOVEMATRIX,[1.6,2.87,2.275]);
        glMatrix.mat4.rotateY(mataR.MOVEMATRIX,mataR.MOVEMATRIX,LIBS.degToRad(196));
        glMatrix.mat4.translate(mata2R.MOVEMATRIX,mata2R.MOVEMATRIX,[1.6,2.87,2.29]);
        glMatrix.mat4.rotateY(mata2R.MOVEMATRIX,mata2R.MOVEMATRIX,LIBS.degToRad(196));   



        glMatrix.mat4.translate(telingaR.MOVEMATRIX,telingaR.MOVEMATRIX,[-0.8,0.0,-4.8]);
        glMatrix.mat4.translate(telingaL.MOVEMATRIX,telingaL.MOVEMATRIX,[0.8,0.0,-4.8]);
        glMatrix.mat4.translate(telinga2R.MOVEMATRIX,telinga2R.MOVEMATRIX,[-0.8,0.01,-4.8]);
        glMatrix.mat4.translate(telinga2L.MOVEMATRIX,telinga2L.MOVEMATRIX,[0.8,0.01,-4.8]); 
        glMatrix.mat4.rotateY(mataL.MOVEMATRIX,mataL.MOVEMATRIX,LIBS.degToRad(196));
        glMatrix.mat4.translate(mataL.MOVEMATRIX,mataL.MOVEMATRIX,[1.6,-2.87,-2.275]);
        glMatrix.mat4.rotateY(mata2L.MOVEMATRIX,mata2L.MOVEMATRIX,LIBS.degToRad(196));
        glMatrix.mat4.translate(mata2L.MOVEMATRIX,mata2L.MOVEMATRIX,[1.6,-2.87,-2.29]);
        glMatrix.mat4.rotateY(mataR.MOVEMATRIX,mataR.MOVEMATRIX,LIBS.degToRad(-196));
        glMatrix.mat4.translate(mataR.MOVEMATRIX,mataR.MOVEMATRIX,[-1.6,-2.87,-2.275]);
        glMatrix.mat4.rotateY(mata2R.MOVEMATRIX,mata2R.MOVEMATRIX,LIBS.degToRad(-196));   
        glMatrix.mat4.translate(mata2R.MOVEMATRIX,mata2R.MOVEMATRIX,[-1.6,-2.87,-2.29]);

        if (time >= 3000 && time <3800 && temp >= 1){
            temp -= d;
            temp1 -= z;
            glMatrix.mat4.rotateX(wajah.MOVEMATRIX,wajah.MOVEMATRIX,LIBS.degToRad(y));
            glMatrix.mat4.rotateX(telingaR.MOVEMATRIX,telingaR.MOVEMATRIX,LIBS.degToRad(z));
            glMatrix.mat4.rotateX(telingaL.MOVEMATRIX,telingaL.MOVEMATRIX,LIBS.degToRad(z));
            glMatrix.mat4.rotateX(telinga2L.MOVEMATRIX,telinga2L.MOVEMATRIX,LIBS.degToRad(z));
            glMatrix.mat4.rotateX(telinga2R.MOVEMATRIX,telinga2R.MOVEMATRIX,LIBS.degToRad(z));
            glMatrix.mat4.rotateX(hidung.MOVEMATRIX,hidung.MOVEMATRIX,LIBS.degToRad(z));
            glMatrix.mat4.rotateX(mataL.MOVEMATRIX,mataL.MOVEMATRIX,LIBS.degToRad(d));
            glMatrix.mat4.rotateX(mataR.MOVEMATRIX,mataR.MOVEMATRIX,LIBS.degToRad(d));
            glMatrix.mat4.rotateX(mata2L.MOVEMATRIX,mata2L.MOVEMATRIX,LIBS.degToRad(d));
            glMatrix.mat4.rotateX(mata2R.MOVEMATRIX,mata2R.MOVEMATRIX,LIBS.degToRad(d));
            glMatrix.mat4.rotateZ(mulut.MOVEMATRIX,mulut.MOVEMATRIX,LIBS.degToRad(d));
        }
        glMatrix.mat4.rotateX(wajah.MOVEMATRIX,wajah.MOVEMATRIX,LIBS.degToRad(temp1));
        glMatrix.mat4.rotateX(telingaR.MOVEMATRIX,telingaR.MOVEMATRIX,LIBS.degToRad(temp));
        glMatrix.mat4.rotateX(telingaL.MOVEMATRIX,telingaL.MOVEMATRIX,LIBS.degToRad(temp));
        glMatrix.mat4.rotateX(telinga2L.MOVEMATRIX,telinga2L.MOVEMATRIX,LIBS.degToRad(temp));
        glMatrix.mat4.rotateX(telinga2R.MOVEMATRIX,telinga2R.MOVEMATRIX,LIBS.degToRad(temp));
        glMatrix.mat4.rotateX(hidung.MOVEMATRIX,hidung.MOVEMATRIX,LIBS.degToRad(temp));
        glMatrix.mat4.rotateX(mataL.MOVEMATRIX,mataL.MOVEMATRIX,LIBS.degToRad(temp));
        glMatrix.mat4.rotateX(mataR.MOVEMATRIX,mataR.MOVEMATRIX,LIBS.degToRad(temp));
        glMatrix.mat4.rotateX(mata2L.MOVEMATRIX,mata2L.MOVEMATRIX,LIBS.degToRad(temp));
        glMatrix.mat4.rotateX(mata2R.MOVEMATRIX,mata2R.MOVEMATRIX,LIBS.degToRad(temp));
        glMatrix.mat4.rotateX(mulut.MOVEMATRIX,mulut.MOVEMATRIX,LIBS.degToRad(temp/6));
        glMatrix.mat4.translate(telingaR.MOVEMATRIX,telingaR.MOVEMATRIX,[0.8,0.0,4.8]);
        glMatrix.mat4.translate(telingaL.MOVEMATRIX,telingaL.MOVEMATRIX,[-0.8,0.0,4.8]);
        glMatrix.mat4.translate(telinga2R.MOVEMATRIX,telinga2R.MOVEMATRIX,[0.8,-0.01,4.8]);
        glMatrix.mat4.translate(telinga2L.MOVEMATRIX,telinga2L.MOVEMATRIX,[-0.8,-0.01,4.8]);    
        glMatrix.mat4.translate(mataL.MOVEMATRIX,mataL.MOVEMATRIX,[-1.6,2.87,2.275]);
        glMatrix.mat4.rotateY(mataL.MOVEMATRIX,mataL.MOVEMATRIX,LIBS.degToRad(-196));
        glMatrix.mat4.translate(mata2L.MOVEMATRIX,mata2L.MOVEMATRIX,[-1.6,2.87,2.29]);
        glMatrix.mat4.rotateY(mata2L.MOVEMATRIX,mata2L.MOVEMATRIX,LIBS.degToRad(-196));
        glMatrix.mat4.translate(mataR.MOVEMATRIX,mataR.MOVEMATRIX,[1.6,2.87,2.275]);
        glMatrix.mat4.rotateY(mataR.MOVEMATRIX,mataR.MOVEMATRIX,LIBS.degToRad(196));
        glMatrix.mat4.translate(mata2R.MOVEMATRIX,mata2R.MOVEMATRIX,[1.6,2.87,2.29]);
        glMatrix.mat4.rotateY(mata2R.MOVEMATRIX,mata2R.MOVEMATRIX,LIBS.degToRad(196));   




        //Niup balon serta melambai tangan
        //Scale
        glMatrix.mat4.rotateX(balons.MOVEMATRIX,balons.MOVEMATRIX,LIBS.degToRad(30));
        glMatrix.mat4.translate(balons.MOVEMATRIX,balons.MOVEMATRIX,[0,-7,-12]);

        if (time >= 3800 && time <4050){
            test += -x;
            glMatrix.mat4.scale(balons.MOVEMATRIX,balons.MOVEMATRIX,[time*0.000001,time*0.000001,time*0.000001]);
        }

        if (time >= 4050 && time <5800){

            glMatrix.mat4.scale(balons.MOVEMATRIX,balons.MOVEMATRIX,[time*0.000175,time*0.000175,time*0.000175]);
        }
        glMatrix.mat4.translate(tanganL.child[0].MOVEMATRIX,tanganL.child[0].MOVEMATRIX,[0,0.0,1.45]);
        glMatrix.mat4.translate(bajuL.child[0].MOVEMATRIX,bajuL.child[0].MOVEMATRIX,[0,0.0,-1.45]);
        glMatrix.mat4.translate(bajuL.MOVEMATRIX,bajuL.MOVEMATRIX,[0,0.0,-1.25]);
        glMatrix.mat4.translate(tanganL.child[1].MOVEMATRIX,tanganL.child[1].MOVEMATRIX,[0,0.0,-1.45]);
        
        
        if (time >= 4050 && time <5800){
            test1 += -x;
            glMatrix.mat4.rotateY(tanganL.child[1].MOVEMATRIX,tanganL.child[1].MOVEMATRIX,LIBS.degToRad(x));
            glMatrix.mat4.rotateY(tanganL.child[0].MOVEMATRIX,tanganL.child[0].MOVEMATRIX,LIBS.degToRad(x));
            glMatrix.mat4.rotateY(bajuL.child[0].MOVEMATRIX,bajuL.child[0].MOVEMATRIX,LIBS.degToRad(-x));
            glMatrix.mat4.rotateY(bajuL.MOVEMATRIX,bajuL.MOVEMATRIX,LIBS.degToRad(-x));
            glMatrix.mat4.scale(balons.MOVEMATRIX,balons.MOVEMATRIX,[time*0.0003,time*0.0003,time*0.0003]);
        }
        glMatrix.mat4.rotateY(bajuL.child[0].MOVEMATRIX,bajuL.child[0].MOVEMATRIX,LIBS.degToRad(-test1));
        glMatrix.mat4.rotateY(bajuL.MOVEMATRIX,bajuL.MOVEMATRIX,LIBS.degToRad(-test1));
        glMatrix.mat4.rotateY(tanganL.child[0].MOVEMATRIX,tanganL.child[0].MOVEMATRIX,LIBS.degToRad(test1));
        glMatrix.mat4.rotateY(tanganL.child[1].MOVEMATRIX,tanganL.child[1].MOVEMATRIX,LIBS.degToRad(test1));
        glMatrix.mat4.translate(tanganL.child[0].MOVEMATRIX,tanganL.child[0].MOVEMATRIX,[0,0.0,-1.45]);
        glMatrix.mat4.translate(bajuL.child[0].MOVEMATRIX,bajuL.child[0].MOVEMATRIX,[0,0.0,1.45]);
        glMatrix.mat4.translate(tanganL.child[1].MOVEMATRIX,tanganL.child[1].MOVEMATRIX,[0,0.0,1.45]);
        glMatrix.mat4.translate(bajuL.MOVEMATRIX,bajuL.MOVEMATRIX,[0,0.0,1.25]);
        if(time >= 5800){
            glMatrix.mat4.scale(balons.MOVEMATRIX,balons.MOVEMATRIX,[c*0,c*0,c*0]);
        } 
        glMatrix.mat4.translate(tanganL.child[0].MOVEMATRIX,tanganL.child[0].MOVEMATRIX,[0,0.0,1.45]);
        glMatrix.mat4.translate(bajuL.child[0].MOVEMATRIX,bajuL.child[0].MOVEMATRIX,[0,0.0,-1.45]);
        glMatrix.mat4.translate(bajuL.MOVEMATRIX,bajuL.MOVEMATRIX,[0,0.0,-1.25]);
        glMatrix.mat4.translate(tanganL.child[1].MOVEMATRIX,tanganL.child[1].MOVEMATRIX,[0,0.0,-1.45]);
        
        if (time >= 5800 && time <6800){
            test2 += +x;
            glMatrix.mat4.rotateY(tanganL.child[1].MOVEMATRIX,tanganL.child[1].MOVEMATRIX,LIBS.degToRad(-x));
            glMatrix.mat4.rotateY(tanganL.child[0].MOVEMATRIX,tanganL.child[0].MOVEMATRIX,LIBS.degToRad(-x));
            glMatrix.mat4.rotateY(bajuL.child[0].MOVEMATRIX,bajuL.child[0].MOVEMATRIX,LIBS.degToRad(+x));
            glMatrix.mat4.rotateY(bajuL.MOVEMATRIX,bajuL.MOVEMATRIX,LIBS.degToRad(x));
        }
        glMatrix.mat4.rotateY(bajuL.child[0].MOVEMATRIX,bajuL.child[0].MOVEMATRIX,LIBS.degToRad(-test2));
        glMatrix.mat4.rotateY(bajuL.MOVEMATRIX,bajuL.MOVEMATRIX,LIBS.degToRad(-test2));
        glMatrix.mat4.rotateY(tanganL.child[0].MOVEMATRIX,tanganL.child[0].MOVEMATRIX,LIBS.degToRad(test2));
        glMatrix.mat4.rotateY(tanganL.child[1].MOVEMATRIX,tanganL.child[1].MOVEMATRIX,LIBS.degToRad(test2));
        glMatrix.mat4.translate(tanganL.child[0].MOVEMATRIX,tanganL.child[0].MOVEMATRIX,[0,0.0,-1.45]);
        glMatrix.mat4.translate(bajuL.child[0].MOVEMATRIX,bajuL.child[0].MOVEMATRIX,[0,0.0,1.45]);
        glMatrix.mat4.translate(tanganL.child[1].MOVEMATRIX,tanganL.child[1].MOVEMATRIX,[0,0.0,1.5]);
        glMatrix.mat4.translate(bajuL.MOVEMATRIX,bajuL.MOVEMATRIX,[0,0.0,1.25]);

        glMatrix.mat4.translate(tanganL.child[0].MOVEMATRIX,tanganL.child[0].MOVEMATRIX,[0,0.0,1.45]);
        glMatrix.mat4.translate(bajuL.child[0].MOVEMATRIX,bajuL.child[0].MOVEMATRIX,[0,0.0,-1.45]);
        glMatrix.mat4.translate(bajuL.MOVEMATRIX,bajuL.MOVEMATRIX,[0,0.0,-1.25]);
        glMatrix.mat4.translate(tanganL.child[1].MOVEMATRIX,tanganL.child[1].MOVEMATRIX,[0,0.0,-1.45]);
        
        if (time >= 6800 && time <7800){
            test3 += -x;
            glMatrix.mat4.rotateY(tanganL.child[1].MOVEMATRIX,tanganL.child[1].MOVEMATRIX,LIBS.degToRad(x));
            glMatrix.mat4.rotateY(tanganL.child[0].MOVEMATRIX,tanganL.child[0].MOVEMATRIX,LIBS.degToRad(x));
            glMatrix.mat4.rotateY(bajuL.child[0].MOVEMATRIX,bajuL.child[0].MOVEMATRIX,LIBS.degToRad(-x));
            glMatrix.mat4.rotateY(bajuL.MOVEMATRIX,bajuL.MOVEMATRIX,LIBS.degToRad(-x));
            glMatrix.mat4.scale(balons.MOVEMATRIX,balons.MOVEMATRIX,[time*0.0003,time*0.0003,time*0.0003]);
        }
        glMatrix.mat4.rotateY(bajuL.child[0].MOVEMATRIX,bajuL.child[0].MOVEMATRIX,LIBS.degToRad(-test3));
        glMatrix.mat4.rotateY(bajuL.MOVEMATRIX,bajuL.MOVEMATRIX,LIBS.degToRad(-test3));
        glMatrix.mat4.rotateY(tanganL.child[0].MOVEMATRIX,tanganL.child[0].MOVEMATRIX,LIBS.degToRad(test3));
        glMatrix.mat4.rotateY(tanganL.child[1].MOVEMATRIX,tanganL.child[1].MOVEMATRIX,LIBS.degToRad(test3));
        glMatrix.mat4.translate(tanganL.child[0].MOVEMATRIX,tanganL.child[0].MOVEMATRIX,[0,0.0,-1.45]);
        glMatrix.mat4.translate(bajuL.child[0].MOVEMATRIX,bajuL.child[0].MOVEMATRIX,[0,0.0,1.45]);
        glMatrix.mat4.translate(tanganL.child[1].MOVEMATRIX,tanganL.child[1].MOVEMATRIX,[0,0.0,1.45]);
        glMatrix.mat4.translate(bajuL.MOVEMATRIX,bajuL.MOVEMATRIX,[0,0.0,1.25]);


        glMatrix.mat4.translate(tanganL.child[0].MOVEMATRIX,tanganL.child[0].MOVEMATRIX,[0,0.0,1.45]);
        glMatrix.mat4.translate(bajuL.child[0].MOVEMATRIX,bajuL.child[0].MOVEMATRIX,[0,0.0,-1.45]);
        glMatrix.mat4.translate(bajuL.MOVEMATRIX,bajuL.MOVEMATRIX,[0,0.0,-1.25]);
        glMatrix.mat4.translate(tanganL.child[1].MOVEMATRIX,tanganL.child[1].MOVEMATRIX,[0,0.0,-1.45]);
        
        if (time >= 7800 && time <9500){
            test4 += +x;
            glMatrix.mat4.rotateY(tanganL.child[1].MOVEMATRIX,tanganL.child[1].MOVEMATRIX,LIBS.degToRad(-x));
            glMatrix.mat4.rotateY(tanganL.child[0].MOVEMATRIX,tanganL.child[0].MOVEMATRIX,LIBS.degToRad(-x));
            glMatrix.mat4.rotateY(bajuL.child[0].MOVEMATRIX,bajuL.child[0].MOVEMATRIX,LIBS.degToRad(+x));
            glMatrix.mat4.rotateY(bajuL.MOVEMATRIX,bajuL.MOVEMATRIX,LIBS.degToRad(x));

        }
        glMatrix.mat4.rotateY(bajuL.child[0].MOVEMATRIX,bajuL.child[0].MOVEMATRIX,LIBS.degToRad(-test4));
        glMatrix.mat4.rotateY(bajuL.MOVEMATRIX,bajuL.MOVEMATRIX,LIBS.degToRad(-test4));
        glMatrix.mat4.rotateY(tanganL.child[0].MOVEMATRIX,tanganL.child[0].MOVEMATRIX,LIBS.degToRad(test4));
        glMatrix.mat4.rotateY(tanganL.child[1].MOVEMATRIX,tanganL.child[1].MOVEMATRIX,LIBS.degToRad(test4));
        glMatrix.mat4.translate(tanganL.child[0].MOVEMATRIX,tanganL.child[0].MOVEMATRIX,[0,0.0,-1.45]);
        glMatrix.mat4.translate(bajuL.child[0].MOVEMATRIX,bajuL.child[0].MOVEMATRIX,[0,0.0,1.45]);
        glMatrix.mat4.translate(tanganL.child[1].MOVEMATRIX,tanganL.child[1].MOVEMATRIX,[0,0.0,1.45]);
        glMatrix.mat4.translate(bajuL.MOVEMATRIX,bajuL.MOVEMATRIX,[0,0.0,1.25]);













        GL.viewport(0,0,CANVAS.width,CANVAS.height);
        GL.clear(GL.COLOR_BUFFER_BIT);

        petas.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
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
        bajuL.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        bajuL.child[0].setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        bajuR.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        bajuR.child[0].setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        baju3L.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        baju3L.child[0].setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        baju3R.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        baju3R.child[0].setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        baju.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        balons.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        pohon.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        batang1.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        pohon2.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        batang2.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        pohon3.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        batang3.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        mataharis.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);


        petas.draw();
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
        bajuL.draw();
        bajuR.draw();
        baju.draw();
        balons.draw();
        pohon.draw();
        batang1.draw();
        pohon2.draw();
        batang2.draw();
        pohon3.draw();
        batang3.draw();
        mataharis.draw();
        // baju3L.draw();
        // baju3R.draw();

        mulut.setUniformmatrix4(PROJMATRIX,VIEWMATRIX);
        for (var i = 3; i < mouth[0].length; i += 3) {
            mulut.drawLine(-mouth[0][i - 3] * 7.5, -mouth[0][i - 2] * 7.5, -mouth[0][i-1] * 7.5, -mouth[0][i] * 7.5,-mouth[0][i+1] * 7.5,
             - mouth[0][i+2] * 7.5, mouth[1]);
        };

        GL.flush();
        window.requestAnimationFrame(animate);
    }
    animate();
}
window.addEventListener("load",main);
