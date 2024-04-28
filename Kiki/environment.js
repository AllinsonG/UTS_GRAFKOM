var map = {
    tree:function(){
        
    var numLongitudes = 50; // Jumlah garis bujur yang akan digunakan untuk membagi ellipsoid
    var numLatitudes = 30; // Jumlah garis lintang yang akan digunakan untuk membagi ellipsoid
    var ellipsoid_vertex = [];
    var ellipsoid_faces = [];
    var ellipsoid_colors = [];
    var segments = 30;
    var height = 50.75;
    var radius = 0.85;

    var ellipsoid_vertexX = [];
    var ellipsoid_vertexY = [];
    var ellipsoid_vertexZ = [];
    var ellipsoid_faces = [];
        

    for (var i = 0; i < 60; i++) {
        ellipsoid_vertexX[i] = [];
        ellipsoid_vertexY[i] = [];
        ellipsoid_vertexZ[i] = [];
    }
    var i,j;
        i=1;
        
        for(var u=-Math.PI;u<=Math.PI;u+=Math.PI/30)
        {	j=1;
            ellipsoid_vertexX[i] = [];
            ellipsoid_vertexY[i] = [];
            ellipsoid_vertexZ[i] = [];
            for(var v=-Math.PI/2;v<Math.PI/2;v+=Math.PI/30)
            {	
                ellipsoid_vertexX[i][j] = 0;
                ellipsoid_vertexY[i][j] = 0;
                ellipsoid_vertexZ[i][j] = 0;
                j+=1;
            }
            i+= 1;
        }
        
        var i,j;
        i=0;
        for(var u=-Math.PI;u<=Math.PI;u+=Math.PI/30)
        {	j=0;
            for(var v=-Math.PI/2;v<Math.PI/2;v+=Math.PI/30)
            {	
           
                ellipsoid_vertex.push(2*v*Math.cos(u),2*v*Math.sin(u),10*v*v -5)
                ellipsoid_vertexX[i][j] = 1*Math.cos(u);
                
                ellipsoid_vertexY[i][j] = 1*Math.sin(u);
                ellipsoid_vertexZ[i][j] = 2*v*v -5;
                ellipsoid_colors.push(0.0, 1.0, 0.0);
                

                j+=1;
            }
            i+= 1;
        }

    
        for (var i = 0; i <= numLatitudes; i++) {
            for (var j = 0; j <= numLongitudes; j++) {
                var first = i * (numLongitudes + 1) + j;
                var second = first + numLongitudes + 1;
                
                // Define indices for the two triangles forming each square
                ellipsoid_faces.push(first);
                ellipsoid_faces.push(second);
                ellipsoid_faces.push(first + 1);

                ellipsoid_faces.push(first + 1);
                ellipsoid_faces.push(second);
                ellipsoid_faces.push(second + 1);

            }
        }


        return [ellipsoid_vertex, ellipsoid_faces, ellipsoid_colors];
    
    },
    batang:function(){
        
        var numLongitudes = 50; // Jumlah garis bujur yang akan digunakan untuk membagi ellipsoid
        var numLatitudes = 30; // Jumlah garis lintang yang akan digunakan untuk membagi ellipsoid
        var ellipsoid_vertex = [];
        var ellipsoid_faces = [];
        var ellipsoid_colors = [];
        var segments = 30;
        var height = 50.75;
        var radius = 0.85;
    
        var ellipsoid_vertexX = [];
        var ellipsoid_vertexY = [];
        var ellipsoid_vertexZ = [];
        var ellipsoid_faces = [];
            
        for (var i = 0; i <= segments; i++) {
            var theta = (i / segments) * 2 * Math.PI;
            var x = radius * Math.cos(theta);
            var y = radius * Math.sin(theta);
            ellipsoid_vertex.push(x, y, 0, 0.1, 0.1, 0.2); // Bottom circle
             // Apex
             ellipsoid_colors.push(0.5, 0, 0.5);
            //  cone_vertex.push(0.45, 0, height, 0.1, 0.1, 0.2);
            ellipsoid_vertex.push(x, y, height/2, 0.1, 0.1, 0.2);
            ellipsoid_colors.push(0.5, 0, 0.5);
        }
    
    
        for (var i = 0; i < segments; i++) {
            ellipsoid_faces.push(0); // Bottom center vertex
            ellipsoid_faces.push(i * 2); // Current bottom vertex
            ellipsoid_faces.push((i + 1) * 2); // Next bottom vertex
    
            ellipsoid_faces.push(1); // Apex vertex
            ellipsoid_faces.push(i * 2 + 1); // Current top vertex
            ellipsoid_faces.push((i + 1) * 2 + 1); // Next top vertex
    
            ellipsoid_faces.push(i * 2); // Current bottom vertex
            ellipsoid_faces.push((i + 1) * 2); // Next bottom vertex
            ellipsoid_faces.push((i + 1) * 2 + 1); // Next top vertex
    
            ellipsoid_faces.push(i * 2); // Current bottom vertex
            ellipsoid_faces.push((i + 1) * 2 + 1); // Next top vertex
            ellipsoid_faces.push(i * 2 + 1); // Current top vertex
    
        }
       return [ellipsoid_vertex, ellipsoid_faces, ellipsoid_colors];
        },
    road:function(){
        var vertices = [];
        var indices = [];
        var colors = [];
        var width = 500; // Adjust the width as needed
        var height = 500; // Adjust the height as needed
        var depth = 1; // Thickness of the surface
        
        // Define vertices
        vertices.push(
            -width / 2, -height / 2, 0, 1, 0, 0,  // Bottom left
            width / 2, -height / 2, 0, 1, 0, 0,   // Bottom right
            width / 2, height / 2, 0, 1, 0, 0,    // Top right
            -width / 2, height / 2, 0, 1, 0, 0    // Top left
        );

        // Define indices
        indices.push(
            0, 1, 2,
            0, 2, 3
        );

        // Define colors
        colors.push(
            0, 0.5, 1, // Bottom left - blue
            0, 0.5, 1, // Bottom right - blue
            0, 0.5, 1, // Top right - blue
            0, 0.5, 1  // Top left - blue
        );

        return [vertices, indices, colors];
    }
}