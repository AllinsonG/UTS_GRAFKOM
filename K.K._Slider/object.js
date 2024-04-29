var ears = {
    kupingKiri:function(){
        var a = 1.0
        var b = 1.0
        var sectorCount = 50
        var stackCount = 50
        var vertices = [];
        var indices = [];
        var colors = [];
     
        var sectorStep = (2 * Math.PI) / sectorCount;
        var stackStep = Math.PI / stackCount;
     
        for (var i = 0; i <= stackCount; ++i) {
          var stackAngle = Math.PI / 2 - i * stackStep;
          var xy = Math.cos(stackAngle);
     
          for (var j = 0; j <= sectorCount; ++j) {
            var sectorAngle = j * sectorStep;
     
            var x = xy * Math.cos(sectorAngle) * 0.7;
            var y = xy * Math.sin(sectorAngle) * 0.7;
            var z = (x * x) / (a * a) - (y * y) / (b * b);
            vertices.push(x, y, z, 0.1, 0.1, 0.2);
            colors.push(1, 1, 1);
          }
        }
     
        var k1, k2;
        for (var i = 0; i < stackCount; ++i) {
          k1 = i * (sectorCount + 1);
          k2 = k1 + sectorCount + 1;
     
          for (var j = 0; j < sectorCount; ++j, ++k1, ++k2) {
            if (i != 0) {
              indices.push(k1, k2, k1 + 1);
            }
     
            if (i != stackCount - 1) {
              indices.push(k1 + 1, k2, k2 + 1);
            }
          }
        }
     
        return [vertices,indices,colors]
    },
    kupingKanan: function(){
        var a = 1.0
        var b = 1.0
        var sectorCount = 50
        var stackCount = 50
        var vertices = [];
        var indices = [];
        var colors = [];
     
        var sectorStep = (2 * Math.PI) / sectorCount;
        var stackStep = Math.PI / stackCount;
     
        for (var i = 0; i <= stackCount; ++i) {
          var stackAngle = Math.PI / 2 - i * stackStep;
          var xy = Math.cos(stackAngle);
     
          for (var j = 0; j <= sectorCount; ++j) {
            var sectorAngle = j * sectorStep;
     
            var x = xy * Math.cos(sectorAngle) * 0.7;
            var y = xy * Math.sin(sectorAngle) * 0.7;
            var z = (x * x) / (a * a) - (y * y) / (b * b);
            vertices.push(x, y, z, 0.1, 0.1, 0.2);
            colors.push(1, 1, 1);
          }
        }
     
        var k1, k2;
        for (var i = 0; i < stackCount; ++i) {
          k1 = i * (sectorCount + 1);
          k2 = k1 + sectorCount + 1;
     
          for (var j = 0; j < sectorCount; ++j, ++k1, ++k2) {
            if (i != 0) {
              indices.push(k1, k2, k1 + 1);
            }
     
            if (i != stackCount - 1) {
              indices.push(k1 + 1, k2, k2 + 1);
            }
          }
        }
     
        return [vertices,indices,colors]
    }
};
var legs = {
    kakiKiri: function(){
        var vertices = [];
        var indices = [];
        var colors = [];
        var radius = 0.85;
    
        var PI = Math.PI;
        var segments = 30;
        var height = 3.75;
    
        for (var i = 0; i <= segments; i++) {
            var theta = (i / segments) * 2 * Math.PI;
            var x = radius * Math.cos(theta);
            var y = radius * Math.sin(theta);
            vertices.push(x, y, 0, 0.1, 0.1, 0.2);
            colors.push(1, 1, 1);
            vertices.push(x*(0.725), y*(0.725), height/2, 0.1, 0.1, 0.2);
            colors.push(1, 1, 1);
        }
    
    
        for (var i = 0; i < segments; i++) {
            indices.push(0);
            indices.push(i * 2);
            indices.push((i + 1) * 2);
    
            indices.push(1);
            indices.push(i * 2 + 1);
            indices.push((i + 1) * 2 + 1);
    
            indices.push(i * 2);
            indices.push((i + 1) * 2);
            indices.push((i + 1) * 2 + 1);
    
            indices.push(i * 2);
            indices.push((i + 1) * 2 + 1); 
            indices.push(i * 2 + 1);
    
        }
        return [vertices, indices,colors]
    },
    kakiKiri1: function(){
        var vertices = [];
        var indices = [];
        var colors = [];
        var radius = 0.85;
    
        var PI = Math.PI;
        var segments = 30;
        var height = 3.3;
    
        for (var i = 0; i <= segments; i++) {
            var theta = (i / segments) * 2 * Math.PI;
            var x = radius * Math.cos(theta);
            var y = radius * Math.sin(theta);
            vertices.push(x*0.775, y*0.775, height/2, 0.1, 0.1, 0.2);
             colors.push(1, 1, 1);
            vertices.push(x*0.575, y*0.575, height, 0.1, 0.1, 0.2);
            colors.push(1, 1, 1);
        }
    
    
        for (var i = 0; i < segments; i++) {
            indices.push(0);
            indices.push(i * 2);
            indices.push((i + 1) * 2);
    
            indices.push(1);
            indices.push(i * 2 + 1);
            indices.push((i + 1) * 2 + 1);
    
            indices.push(i * 2);
            indices.push((i + 1) * 2);
            indices.push((i + 1) * 2 + 1);
    
            indices.push(i * 2);
            indices.push((i + 1) * 2 + 1);
            indices.push(i * 2 + 1);
    
        }
        return [vertices, indices,colors]
    },
    kakiKanan: function(){
        var radius = 0.85;

        var PI = Math.PI;
        var segments = 30;
        var height = 3.75;
        var vertices1 = [];
        var indices1 = [];
        var colors1 = [];
        for (var i = 0; i <= segments; i++) {
            var theta = (i / segments) * 2 * Math.PI;
            var x = radius * Math.cos(theta);
            var y = radius * Math.sin(theta);
            vertices1.push(x, y, 0, 0.1, 0.1, 0.2);
            colors1.push(1, 1, 1);
            vertices1.push(x*0.725, y*0.725, height/2, 0.1, 0.1, 0.2);
            colors1.push(1, 1, 1);
        }
    
    
        for (var i = 0; i < segments; i++) {
            indices1.push(0);
            indices1.push(i * 2);
            indices1.push((i + 1) * 2);
    
            indices1.push(1);
            indices1.push(i * 2 + 1);
            indices1.push((i + 1) * 2 + 1);
    
            indices1.push(i * 2);
            indices1.push((i + 1) * 2);
            indices1.push((i + 1) * 2 + 1);
    
            indices1.push(i * 2);
            indices1.push((i + 1) * 2 + 1);
            indices1.push(i * 2 + 1);
        }
        return [vertices1,indices1,colors1]
    },
    kakiKanan1: function(){
        var radius = 0.85;

        var PI = Math.PI;
        var segments = 30;
        var height = 3.3;
        var vertices1 = [];
        var indices1 = [];
        var colors1 = [];
        for (var i = 0; i <= segments; i++) {
            var theta = (i / segments) * 2 * Math.PI;
            var x = radius * Math.cos(theta);
            var y = radius * Math.sin(theta);
            vertices1.push(x*0.775, y*0.775, height/2, 0.1, 0.1, 0.2);
            colors1.push(1, 1, 1);
            vertices1.push(x*0.575, y*0.575, height, 0.1, 0.1, 0.2);
            colors1.push(1, 1, 1);
        }
    
    
        for (var i = 0; i < segments; i++) {
            indices1.push(0);
            indices1.push(i * 2);
            indices1.push((i + 1) * 2);
    
            indices1.push(1);
            indices1.push(i * 2 + 1);
            indices1.push((i + 1) * 2 + 1);
    
            indices1.push(i * 2);
            indices1.push((i + 1) * 2);
            indices1.push((i + 1) * 2 + 1);
    
            indices1.push(i * 2);
            indices1.push((i + 1) * 2 + 1);
            indices1.push(i * 2 + 1);
    
        }
        return [vertices1,indices1,colors1]
    }
};
var bodys = {
    bodies:function(){
        var vertices = [];
        var indices = [];
        var colors = [];
        var radius = 2.0;
        var sectorCount = 72;
        var stackCount = 24;
    
        var PI = Math.PI;
        var sectorStep = 2 * PI / sectorCount;
        var stackStep = PI / stackCount;
        var sectorAngle, stackAngle;
        var segments = 30;
        var height = 2.9;
    
        for (var i = 0; i <= segments; i++) {
            var theta = (i / segments) * 2 * Math.PI;
            var x = radius * Math.cos(theta);
            var y = radius * Math.sin(theta);
            vertices.push(x, y, 0, 0.1, 0.1, 0.2);
            colors.push(1, 1, 1);
            vertices.push(x*0.4, y*0.4, height, 0.1, 0.1, 0.2);
            colors.push(1, 1, 1);
        }
        for (var i = 0; i <= stackCount/2; ++i) {
            stackAngle = PI / 2 - i * stackStep;
            var xy = radius * Math.cos(stackAngle);
            var z = radius * Math.sin(stackAngle);
    
            for (var j = 0; j <= sectorCount; ++j) {
                sectorAngle = j * sectorStep;
                var x = xy * Math.cos(sectorAngle);
                var y = xy * Math.sin(sectorAngle);
                vertices.push(-x, -y, -z);
    
                colors.push(1, 1, 1);
            }
        }
    
        for (var i = 0; i <= segments; i++) {
            indices.push(0);
            indices.push(i * 2);
            indices.push((i + 1) * 2);
    
            indices.push(1);
            indices.push(i * 2 + 1);
            indices.push((i + 1) * 2 + 1);
    
            indices.push(i * 2);
            indices.push((i + 1) * 2);
            indices.push((i + 1) * 2 + 1);
    
            indices.push(i * 2);
            indices.push((i + 1) * 2 + 1);
            indices.push(i * 2 + 1);
    
        }
        for (var i = 0; i < stackCount/2; ++i) {
            for (var j = 0; j < sectorCount; ++j) {
                var k1 = i * (sectorCount + 1) + j;
                var k2 = k1 + sectorCount + 1;
    
                if (i !== 0) {
                    indices.push(k1, k2, k1 + 1);
                }
                if (i !== (stackCount/2 - 1)) {
                    indices.push(k1 + 1, k2, k2 + 1);
                }
            }
        }
        return [vertices,indices,colors]
    },

    tails: function(){
        var cone_vertex = [];
        var segments = 30;
        var radius = 1.75;
        var height = 6.575;
        var colors = [];
        for (var i = 0; i <= segments/2; i++) {
            var theta = (i / segments) * 2 * Math.PI;
            var x = radius * Math.cos(theta);
            var y = radius * Math.sin(theta);
            cone_vertex.push(x, y, 0 , 0.1, 0.1, 0.2);
            colors.push(1, 1, 1);
            cone_vertex.push(0.45, 0, height , 0.1, 0.1, 0.2);
            colors.push(1, 1, 1);
        }



        var cone_faces = [];
        for (var i = 0; i <= segments/2; i++) {
            cone_faces.push(0);
            cone_faces.push(i * 2);
            cone_faces.push((i + 1) * 2);

            cone_faces.push(-i * 2);
            cone_faces.push(-(i + 1) * 2 + 1); 
            cone_faces.push(-i * 2 + 1); 

            cone_faces.push(i * 2);
            cone_faces.push((i + 1) * 2);
            cone_faces.push((i + 1) * 2 + 1);

            cone_faces.push(i * 2);
            cone_faces.push((i + 1) * 2 + 1);
            cone_faces.push(i * 2 + 1);

        }
        return [cone_vertex,cone_faces,colors]
    },
    tails1: function(){
        var cone_vertex = [];
        var segments = 30;
        var radius = 1.75;
        var height = 6.575;
        var colors = [];
        for (var i = 0; i <= segments/2; i++) {
            var theta = (i / segments) * 2 * Math.PI;
            var x = radius * Math.cos(theta);
            var y = radius * Math.sin(theta);
            cone_vertex.push(x, y, 0 , 0.1, 0.1, 0.2);
            colors.push(1, 1, 1);
            cone_vertex.push(0.45, 0, height , 0.1, 0.1, 0.2);
            colors.push(1, 1, 1);
        }



        var cone_faces = [];
        for (var i = 0; i <= segments/2; i++) {
            cone_faces.push(0);
            cone_faces.push(i * 2);
            cone_faces.push((i + 1) * 2);

            cone_faces.push(-i * 2);
            cone_faces.push(-(i + 1) * 2 + 1); 
            cone_faces.push(-i * 2 + 1); 

            cone_faces.push(i * 2);
            cone_faces.push((i + 1) * 2);
            cone_faces.push((i + 1) * 2 + 1);

            cone_faces.push(i * 2);
            cone_faces.push((i + 1) * 2 + 1);
            cone_faces.push(i * 2 + 1);

        }
        return [cone_vertex,cone_faces,colors]
    }
};

var hand = {
    tanganKiri:function(){
        var vertices = [];
        var colors = [];
        var indices = [];
        var radius = 0.35;
        var sectorCount = 72;
        var stackCount = 24;
    
        var PI = Math.PI;
        var sectorStep = 2 * PI / sectorCount;
        var stackStep = PI / stackCount;
        var sectorAngle, stackAngle;
        var segments = 30;
        var height = 2.96;
    
        for (var i = 0; i <= segments; i++) {
            var theta = (i / segments) * 2 * Math.PI;
            var x = radius * Math.cos(theta);
            var y = radius * Math.sin(theta);
            vertices.push(x, y, 0, 0.1, 0.1, 0.2);
            colors.push(1, 1, 1);
            vertices.push(x * 1.01 , y, height/2, 0.1, 0.1, 0.2);
            colors.push(1, 1, 1);
        }
    
    
        for (var i = 0; i < segments; i++) {
            indices.push(0);
            indices.push(i * 2);
            indices.push((i + 1) * 2);
    
            indices.push(1);
            indices.push(i * 2 + 1);
            indices.push((i + 1) * 2 + 1);
    
            indices.push(i * 2);
            indices.push((i + 1) * 2);
            indices.push((i + 1) * 2 + 1);
    
            indices.push(i * 2);
            indices.push((i + 1) * 2 + 1);
            indices.push(i * 2 + 1);
    
        }

    

        return [vertices,indices, colors]
    },
    tanganKiri2:function(){
        var vertices = [];
        var colors = [];
        var indices = [];
        var radius = 0.35;
        var sectorCount = 72;
        var stackCount = 24;
    
        var PI = Math.PI;
        var sectorStep = 2 * PI / sectorCount;
        var stackStep = PI / stackCount;
        var sectorAngle, stackAngle;
        var segments = 30;
        var height = 2.96;
    
        for (var i = 0; i <= segments; i++) {
            var theta = (i / segments) * 2 * Math.PI;
            var x = radius * Math.cos(theta);
            var y = radius * Math.sin(theta);
            vertices.push(x * 1.01  , y, height/2, 0.1, 0.1, 0.2);
            colors.push(1, 1, 1);
            vertices.push(x * 1.01  , y, height, 0.1, 0.1, 0.2);
            colors.push(1, 1, 1);
        }
    
    
        for (var i = 0; i < segments; i++) {
            indices.push(0);
            indices.push(i * 2);
            indices.push((i + 1) * 2);
    
            indices.push(1);
            indices.push(i * 2 + 1);
            indices.push((i + 1) * 2 + 1);
    
            indices.push(i * 2);
            indices.push((i + 1) * 2);
            indices.push((i + 1) * 2 + 1);
    
            indices.push(i * 2);
            indices.push((i + 1) * 2 + 1);
            indices.push(i * 2 + 1);
    
        }

        return [vertices,indices, colors]
    },
    tanganKanan:function(){
        var radius = 0.35;
        var sectorCount = 72;
        var stackCount = 24;
        var colors1 = [];
        var PI = Math.PI;
        var sectorStep = 2 * PI / sectorCount;
        var stackStep = PI / stackCount;
        var sectorAngle, stackAngle;
        var segments = 30;
        var height = 2.96;
        var vertices1 = [];
        var indices1 = [];
        var colors1 = [];
        for (var i = 0; i <= segments; i++) {
            var theta = (i / segments) * 2 * Math.PI;
            var x = radius * Math.cos(theta);
            var y = radius * Math.sin(theta);
            vertices1.push(x, y, 0, 0.1, 0.1, 0.2);
            colors1.push(1, 1, 1);
            vertices1.push(x * 1.01 , y, height/2, 0.1, 0.1, 0.2);
            colors1.push(1, 1, 1);
        }
    
    
        for (var i = 0; i < segments; i++) {
            indices1.push(0);
            indices1.push(i * 2);
            indices1.push((i + 1) * 2);
    
            indices1.push(1);
            indices1.push(i * 2 + 1);
            indices1.push((i + 1) * 2 + 1);
    
            indices1.push(i * 2);
            indices1.push((i + 1) * 2);
            indices1.push((i + 1) * 2 + 1);
    
            indices1.push(i * 2);
            indices1.push((i + 1) * 2 + 1);
            indices1.push(i * 2 + 1);
        }
        
        return [vertices1,indices1, colors1]
    },
    tanganKanan2:function(){
        var radius = 0.35;
        var sectorCount = 72;
        var stackCount = 24;
        var colors1 = [];
        var PI = Math.PI;
        var sectorStep = 2 * PI / sectorCount;
        var stackStep = PI / stackCount;
        var sectorAngle, stackAngle;
        var segments = 30;
        var height = 2.96;
        var vertices1 = [];
        var indices1 = [];
        var colors1 = [];
        for (var i = 0; i <= segments; i++) {
            var theta = (i / segments) * 2 * Math.PI;
            var x = radius * Math.cos(theta);
            var y = radius * Math.sin(theta);
            vertices1.push(x * 1.01  , y, height/2, 0.1, 0.1, 0.2);
            colors1.push(1, 1, 1);
            vertices1.push(x * 1.01 , y, height, 0.1, 0.1, 0.2);
            colors1.push(1, 1, 1);
        }
    
    
        for (var i = 0; i < segments; i++) {
            indices1.push(0);
            indices1.push(i * 2);
            indices1.push((i + 1) * 2);
    
            indices1.push(1);
            indices1.push(i * 2 + 1);
            indices1.push((i + 1) * 2 + 1);
    
            indices1.push(i * 2);
            indices1.push((i + 1) * 2);
            indices1.push((i + 1) * 2 + 1);
    
            indices1.push(i * 2);
            indices1.push((i + 1) * 2 + 1);
            indices1.push(i * 2 + 1);
    
        }

        return [vertices1,indices1, colors1]
    },
    telapakKiri:function(){
        var vertices = [];
        var colors = [];
        var indices = [];
        var radius = 0.35;
        var sectorCount = 72;
        var stackCount = 24;
    
        var PI = Math.PI;
        var sectorStep = 2 * PI / sectorCount;
        var stackStep = PI / stackCount;
        var sectorAngle, stackAngle;
        var segments = 30;
        var height = 2.96;
    
        for (var i = 0; i <= stackCount/2; ++i) {
            stackAngle = PI / 2 - i * stackStep;
            var xy = radius * Math.cos(stackAngle);
            var z = radius * Math.sin(stackAngle);
    
            for (var j = 0; j <= sectorCount; ++j) {
                sectorAngle = j * sectorStep;
                var x = xy * Math.cos(sectorAngle);
                var y = xy * Math.sin(sectorAngle);
                vertices.push(x, y , z);
                colors.push(1, 1, 1);
            }
        }
        for (var i = 0; i < stackCount/2; ++i) {
            for (var j = 0; j < sectorCount; ++j) {
                var k1 = i * (sectorCount + 1) + j;
                var k2 = k1 + sectorCount + 1;
    
                if (i !== 0) {
                    indices.push(k1, k2, k1 + 1);
                }
                if (i !== (stackCount/2 - 1)) {
                    indices.push(k1 + 1, k2, k2 + 1);
                }
            }
        }
        return [vertices,indices, colors]
    }, 
    telapakKanan:function(){
        var radius = 0.35;
        var sectorCount = 72;
        var stackCount = 24;
        var colors1 = [];
        var PI = Math.PI;
        var sectorStep = 2 * PI / sectorCount;
        var stackStep = PI / stackCount;
        var sectorAngle, stackAngle;
        var segments = 30;
        var height = 2.96;
        var vertices1 = [];
        var indices1 = [];
        var colors1 = [];
        for (var i = 0; i <= stackCount/2; ++i) {
            stackAngle = PI / 2 - i * stackStep;
            var xy = radius * Math.cos(stackAngle);
            var z = radius * Math.sin(stackAngle);
    
            for (var j = 0; j <= sectorCount; ++j) {
                sectorAngle = j * sectorStep;
                var x = xy * Math.cos(sectorAngle);
                var y = xy * Math.sin(sectorAngle);
                vertices1.push(x, y ,z);
                colors1.push(1, 1, 1);
            }
        }
        for (var i = 0; i < stackCount/2; ++i) {
            for (var j = 0; j < sectorCount; ++j) {
                var k1 = i * (sectorCount + 1) + j;
                var k2 = k1 + sectorCount + 1;
    
                if (i !== 0) {
                    indices1.push(k1, k2, k1 + 1);
                }
                if (i !== (stackCount/2 - 1)) {
                    indices1.push(k1 + 1, k2, k2 + 1);
                }
            }
        }
        return [vertices1,indices1,colors1]
    }
};
var faces = {
    faces: function() {
        var numLongitudes = 30; 
        var numLatitudes = 10000; 
        var faces_vertex = [];
        var faces_faces = [];
        var faces_vertexX = [];
        var faces_vertexY = [];
        var faces_vertexZ = [];
        var faces_faces = [];
        var faces_color = [];
        for (var i = 0; i < 60; i++) {
            faces_vertexX[i] = [];
            faces_vertexY[i] = [];
            faces_vertexZ[i] = [];
        }
        var i,j;
            i=1;
            
            for(var u=-Math.PI;u<=Math.PI + 0.175;u+=Math.PI/30)
            {	j=1;
                faces_vertexX[i] = [];
                faces_vertexY[i] = [];
                faces_vertexZ[i] = [];
                for(var v=-Math.PI/2;v<=Math.PI/2;v+=Math.PI/30)
                {	
                    faces_vertexX[i][j] = 0;
                    faces_vertexY[i][j] = 0;
                    faces_vertexZ[i][j] = 0;
                    j+=1;
                }
                i+= 1;
            }
            
            var i,j;
            i=0;
            for(var u=-Math.PI;u<=Math.PI + 0.175;u+=Math.PI/30)
            {	j=0;
                
                for(var v=-Math.PI/2;v<=Math.PI/2;v+=Math.PI/30)
                {	
                    
                    faces_vertex.push(3.5*Math.cos(v)*Math.cos(u),3*Math.cos(v)*Math.sin(u),2.5*Math.sin(v))
                    faces_vertexX[i][j] = (3.5*Math.cos(v)*Math.cos(u));
                    
                    faces_vertexY[i][j] = (3*Math.cos(v)*Math.sin(u));
                    faces_vertexZ[i][j] = (2.5*Math.sin(v));
    
                    faces_color.push(1,1,1);
                    j+=1;
                }
                i+= 1;
            }
    
    
            for (var i = 0; i <= numLatitudes; i++) {
                for (var j = 0; j <= numLongitudes; j++) {
                    var first = i * (numLongitudes + 1) + j;
                    var second = first + numLongitudes + 1;
                    
                    faces_faces.push(first);
                    faces_faces.push(second);
                    faces_faces.push(first + 1);
                    
                    faces_faces.push(second);
                    faces_faces.push(second + 1);
                    faces_faces.push(first + 1);
                }
            }
        return [faces_vertex, faces_faces, faces_color]
    },
    eye2:function(){

        var radius = 0.5; 

        var colors = [];

        var vertices = [];
        var indices = [];

        var sectorCount = 72; 
        var stackCount = 24; 
    
        var PI = Math.PI;
        var sectorStep = 2 * PI / sectorCount;
        var stackStep = PI / stackCount;
        var sectorAngle, stackAngle;
    
        for (var i = 0; i <= stackCount/2; ++i) {
            stackAngle = PI / 2 - i * stackStep;
            var xy = radius * Math.cos(stackAngle);
            var z = radius * Math.sin(stackAngle);
    
            for (var j = 0; j <= sectorCount; ++j) {
                sectorAngle = j * sectorStep;
                var x = xy * Math.cos(sectorAngle);
                var y = xy * Math.sin(sectorAngle);
                vertices.push(x, y, z);
                colors.push(0.1, 0.1, 0.25);
            }
        }
    
        for (var i = 0; i < stackCount/2; ++i) {
            for (var j = 0; j < sectorCount; ++j) {
                var k1 = i * (sectorCount + 1) + j;
                var k2 = k1 + sectorCount + 1;
    
                if (i !== 0) {
                    indices.push(k1, k2, k1 + 1);
                }
                if (i !== (stackCount/2 - 1)) {
                    indices.push(k1 + 1, k2, k2 + 1);
                }
            }
        }
        return [vertices,indices,colors]
    },
    beaks:function(){
        var numLongitudes = 30; 
        var numLatitudes = 10000; 
        var faces_vertex = [];
        var faces_faces = [];
        var faces_vertexX = [];
        var faces_vertexY = [];
        var faces_vertexZ = [];
        var faces_faces = [];
        var faces_color = [];
        for (var i = 0; i < 60; i++) {
            faces_vertexX[i] = [];
            faces_vertexY[i] = [];
            faces_vertexZ[i] = [];
        }
        var i,j;
            i=1;
            
            for(var u=-Math.PI;u<=Math.PI + 0.175;u+=Math.PI/30)
            {	j=1;
                faces_vertexX[i] = [];
                faces_vertexY[i] = [];
                faces_vertexZ[i] = [];
                for(var v=-Math.PI/2;v<=Math.PI/2;v+=Math.PI/30)
                {	
                    faces_vertexX[i][j] = 0;
                    faces_vertexY[i][j] = 0;
                    faces_vertexZ[i][j] = 0;
                    j+=1;
                }
                i+= 1;
            }
            
            var i,j;
            i=0;
            for(var u=-Math.PI;u<=Math.PI + 0.175;u+=Math.PI/30)
            {	j=0;
                
                for(var v=-Math.PI/2;v<=Math.PI/2;v+=Math.PI/30)
                {	
                    
                    faces_vertex.push(1.5*Math.cos(v)*Math.cos(u),1.5*Math.cos(v)*Math.sin(u),1.5*Math.sin(v))
                    faces_vertexX[i][j] = (1.5*Math.cos(v)*Math.cos(u));
                    
                    faces_vertexY[i][j] = (1.5*Math.cos(v)*Math.sin(u));
                    faces_vertexZ[i][j] = (1.5*Math.sin(v));
    
                    faces_color.push(1,1,1);
                    j+=1;
                }
                i+= 1;
            }
    
    
            for (var i = 0; i <= numLatitudes; i++) {
                for (var j = 0; j <= numLongitudes; j++) {
                    var first = i * (numLongitudes + 1) + j;
                    var second = first + numLongitudes + 1;
                    
                    faces_faces.push(first);
                    faces_faces.push(second);
                    faces_faces.push(first + 1);
                    
                    faces_faces.push(second);
                    faces_faces.push(second + 1);
                    faces_faces.push(first + 1);
                }
            }
        return [faces_vertex, faces_faces, faces_color]
    },
    mouth:function(){
       var point = [
        -0.3911290322580645, 0.2749326145552561, 0, -0.38984274193548385, 0.2727962264150943, 0, -0.3884569892473118,
            0.27069973045822104, 0, -0.38697177419354833, 0.26864312668463614, 0, -0.3853870967741936, 0.26662641509433965,
            0, -0.38370295698924733, 0.2646495956873316, 0, -0.38191935483870965, 0.26271266846361185, 0, -0.38003629032258057,
            0.2608156334231806, 0, -0.37805376344086017, 0.2589584905660377, 0, -0.37597177419354844, 0.25714123989218335,
            0, -0.3737903225806452, 0.2553638814016173, 0, -0.3715094086021506, 0.25362641509433964, 0, -0.36912903225806454,
            0.2519288409703504, 0, -0.3666491935483871, 0.2502711590296496, 0, -0.36406989247311833, 0.24865336927223716,
            0, -0.36139112903225806, 0.24707547169811317, 0, -0.3586129032258064, 0.2455374663072776, 0, -0.3557352150537634,
            0.2440393530997304, 0, -0.35275806451612907, 0.24258113207547172, 0, -0.3496814516129032, 0.24116280323450134,
            0, -0.346505376344086, 0.2397843665768194, 0, -0.3432298387096775, 0.2384458221024259, 0, -0.3398548387096774,
            0.23714716981132075, 0, -0.336380376344086, 0.23588840970350405, 0, -0.3328064516129033, 0.23466954177897573,
            0, -0.32913306451612906, 0.23349056603773585, 0, -0.3253602150537635, 0.23235148247978438, 0, -0.32148790322580645,
            0.23125229110512127, 0, -0.317516129032258, 0.2301929919137466, 0, -0.3134448924731183, 0.22917358490566037,
            0, -0.30927419354838703, 0.2281940700808625, 0, -0.3050040322580645, 0.22725444743935308, 0, -0.3006344086021505,
            0.22635471698113208, 0, -0.29616532258064515, 0.22549487870619944, 0, -0.2915967741935484, 0.22467493261455523,
            0, -0.2869287634408602, 0.22389487870619945, 0, -0.28216129032258064, 0.22315471698113207, 0, -0.2772943548387097,
            0.22245444743935308, 0, -0.27232795698924733, 0.2217940700808625, 0, -0.26726209677419355, 0.22117358490566036,
            0, -0.2620967741935483, 0.2205929919137466, 0, -0.2568319892473119, 0.22005229110512128, 0, -0.2514677419354839,
            0.21955148247978434, 0, -0.2460040322580645, 0.21909056603773586, 0, -0.24044086021505376, 0.21866954177897574,
            0, -0.2347782258064516, 0.21828840970350405, 0, -0.22901612903225804, 0.21794716981132078, 0, -0.22315456989247312,
            0.2176458221024259, 0, -0.21719354838709673, 0.2173843665768194, 0, -0.21113306451612904, 0.21716280323450138,
            0, -0.20497311827956988, 0.2169811320754717, 0, -0.19881424731182792, 0.21684905660377363, 0, -0.1927569892473118,
            0.21677628032345014, 0, -0.18680134408602148, 0.21676280323450134, 0, -0.18094731182795695, 0.2168086253369272,
            0, -0.17519489247311823, 0.21691374663072777, 0, -0.16954408602150534, 0.21707816711590297, 0, -0.1639948924731183,
            0.21730188679245283, 0, -0.15854731182795698, 0.2175849056603774, 0, -0.1532013440860215, 0.21792722371967654,
            0, -0.14795698924731182, 0.2183288409703504, 0, -0.14281424731182793, 0.21878975741239892, 0, -0.13777311827956987,
            0.21930997304582214, 0, -0.1328336021505376, 0.21988948787062, 0, -0.12799569892473114, 0.22052830188679248,
            0, -0.1232594086021505, 0.22122641509433966, 0, -0.11862473118279566, 0.22198382749326148, 0, -0.1140916666666666,
            0.22280053908355799, 0, -0.10966021505376337, 0.2236765498652291, 0, -0.105330376344086, 0.22461185983827497,
            0, -0.1011021505376344, 0.22560646900269546, 0, -0.09697553763440858, 0.2266603773584906, 0, -0.09295053763440858,
            0.2277735849056604, 0, -0.08902715053763438, 0.22894609164420487, 0, -0.08520537634408601, 0.23017789757412407,
            0, -0.08148521505376341, 0.23146900269541784, 0, -0.07786666666666664, 0.23281940700808634, 0, -0.07434973118279566,
            0.2342291105121294, 0, -0.0709344086021505, 0.2356981132075472, 0, -0.06762069892473115, 0.23722641509433967,
            0, -0.06440860215053759, 0.2388140161725068, 0, -0.06129811827956984, 0.24046091644204856, 0, -0.05828924731182794,
            0.24216711590296497, 0, -0.0553819892473118, 0.2439326145552561, 0, -0.052576344086021486, 0.24575741239892188,
            0, -0.04987231182795697, 0.2476415094339623, 0, -0.047269892473118254, 0.2495849056603774, 0, -0.04476908602150535,
            0.25158760107816713, 0, -0.04236989247311825, 0.2536495956873316, 0, -0.04007231182795696, 0.25577088948787063,
            0, -0.03787634408602148, 0.25795148247978444, 0, -0.035781989247311796, 0.26019137466307285, 0, -0.03378924731182792,
            0.2624905660377359, 0, -0.031898118279569856, 0.26484905660377367, 0, -0.030108602150537622, 0.26726684636118603,
            0, -0.028420698924731168, 0.2697439353099731, 0, -0.02683440860215052, 0.2722803234501348, 0, -0.02534973118279568,
            0.27487601078167123, 0, -0.023966666666666647, 0.2775309973045823, 0, -0.02268521505376342, 0.2802452830188679,
            0
       ];
       var color = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
       return [point,color,0];

    },

    
};
var baloon = {
    baloons:function(){
        var numLongitudes = 30; 
    var numLatitudes = 10000; 
    var faces_vertex = [];
    var faces_faces = [];
    var faces_colors = [];
    var indices = [];
    var sectorCount = 30;
    var stackCount = 10000; 
    var faces_vertexX = [];
    var radius = 0.5;
    var height = 3;
    var faces_vertexY = [];
    var faces_vertexZ = [];
    var faces_faces = [];
    var segments = 30;
    for (var i = 0; i < 60; i++) {
        faces_vertexX[i] = [];
        faces_vertexY[i] = [];
        faces_vertexZ[i] = [];
    }
    var i,j;
        i=1;
        
        for(var u=-Math.PI;u<=Math.PI + 0.175;u+=Math.PI/30)
        {	j=1;
            faces_vertexX[i] = [];
            faces_vertexY[i] = [];
            faces_vertexZ[i] = [];
            for(var v=-Math.PI/2;v<=Math.PI/2;v+=Math.PI/30)
            {	
                faces_vertexX[i][j] = 0;
                faces_vertexY[i][j] = 0;
                faces_vertexZ[i][j] = 0;
                j+=1;
            }
            i+= 1;
        }
        
        var i,j;
        i=0;
        for(var u=-Math.PI;u<=Math.PI + 0.175;u+=Math.PI/30)
        {	j=0;
            
            for(var v=-Math.PI/2;v<=Math.PI/2;v+=Math.PI/30)
            {	
                
                faces_vertex.push(2*Math.cos(v)*Math.cos(u),1.5*Math.cos(v)*Math.sin(u),2.5*Math.sin(v),0.2,0.2,0.4)
                faces_vertexX[i][j] = (2.5*Math.cos(v)*Math.cos(u));
                
                faces_vertexY[i][j] = (3*Math.cos(v)*Math.sin(u));
                faces_vertexZ[i][j] = (2*Math.sin(v));

                faces_colors.push(1,0,0)
                j+=1;
            }
            i+= 1;
        }

        for (var i = 0; i <= numLatitudes; i++) {
            for (var j = 0; j <= numLongitudes; j++) {
                var first = i * (numLongitudes + 1) + j;
                var second = first + numLongitudes + 1;
                
                faces_faces.push(first);
                faces_faces.push(second);
                faces_faces.push(first + 1);
                
                faces_faces.push(second);
                faces_faces.push(second + 1);
                faces_faces.push(first + 1);
            }
        }
        for (var i = 0; i <= segments; i++) {
            var theta = (i / segments) * 2 * Math.PI;
            var x = radius * Math.cos(theta);
            var y = radius * Math.sin(theta);
            faces_vertex.push(0, 0, 0, 0.1, 0.1, 0.2);
             faces_colors.push(1, 0.0, 0.0);
            faces_vertex.push(x, y, height, 0.1, 0.1, 0.2);
            faces_colors.push(1, 0.0, 0.0);
        }
        for (var i = 0; i < segments; i++) {
            faces_faces.push(0);
            faces_faces.push(i * 2);
            faces_faces.push((i + 1) * 2);
    
            faces_faces.push(1);
            faces_faces.push(i * 2 + 1);
            faces_faces.push((i + 1) * 2 + 1);
    
            faces_faces.push(i * 2);
            faces_faces.push((i + 1) * 2);
            faces_faces.push((i + 1) * 2 + 1);
    
            faces_faces.push(i * 2);
            faces_faces.push((i + 1) * 2 + 1);
            faces_faces.push(i * 2 + 1);
    
        }
        return [faces_vertex,faces_faces,faces_colors];
    }
}