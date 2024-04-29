var earsHP = {
    // V = πr2 (4/3 * r + h)
    left_earHP: function() {
        var vertices = [];
        var indices = [];
        var colors = [];
        var radius = 1.55; 
        var sphere_radius = 1.1; 
        var sphere_segments = 20; 
        var height = 8; 
    
        var PI = Math.PI;
        var segments = 30;
        var circle_radius = 0.5; // Adjust the radius as needed
        var circle_segments = 20; // Number of segments to approximate the circlef
        
        // Generate the sphere on top
        var sphere_start_index = 0; 
    
        for (var j = 0; j <= sphere_segments/2; j++) {
            for (var i = 0; i <= sphere_segments; i++) {
                var theta = (i / sphere_segments) * 2 * Math.PI;
                var phi = (j / sphere_segments) * Math.PI;
                var x = sphere_radius * Math.sin(phi) * Math.cos(theta);
                var y = sphere_radius * Math.sin(phi) * Math.sin(theta);
                var z = sphere_radius * Math.cos(phi);
                vertices.push(x, y, z + height-4, 0, 0.5, 1);
                colors.push(0, 0.5, 1);
            }
        }
    
        for (var j = 0; j < sphere_segments/2; j++) {
            for (var i = 0; i < sphere_segments/2; i++) {
                var vertex1 = sphere_start_index + j * (sphere_segments + 1) + i;
                var vertex2 = sphere_start_index + j * (sphere_segments + 1) + i + 1;
                var vertex3 = sphere_start_index + (j + 1) * (sphere_segments + 1) + i;
                var vertex4 = sphere_start_index + (j + 1) * (sphere_segments + 1) + i + 1;
    
                indices.push(vertex1, vertex2, vertex3);
                indices.push(vertex2, vertex4, vertex3);
            }
        }
    
        // Generate circle vertices and indices
        var circle_start_index = vertices.length / 6    ;
    

    
        // Generate main ear body vertices and indices
        for (var i = 0; i <= segments/2; i++) {
            var theta = (i / segments) * 2 * Math.PI;
            var x = radius  * Math.cos(theta);
            var y = radius  * Math.sin(theta);
            vertices.push(x, y , -1, 0, 0.5, 1); 
            colors.push(0, 0.5, 1);
            vertices.push(x * (0.725) , y * (0.725), height / 2, 0, 0.5, 1);
            colors.push(0, 0.5, 1);
        }
    
        for (var i = 0; i < segments; i++) {
            indices.push(circle_start_index + 0); 
            indices.push(circle_start_index + i * 2); 
            indices.push(circle_start_index + (i + 1) * 2); 
    
            indices.push(circle_start_index + 1); 
            indices.push(circle_start_index + i * 2 + 1); 
            indices.push(circle_start_index + (i + 1) * 2 + 1); 
    
            indices.push(circle_start_index + i * 2);
            indices.push(circle_start_index + (i + 1) * 2); 
            indices.push(circle_start_index + (i + 1) * 2 + 1); 
    
            indices.push(circle_start_index + i * 2); 
            indices.push(circle_start_index + (i + 1) * 2 + 1); 
            indices.push(circle_start_index + i * 2 + 1); 
        }
    
        return [vertices, indices, colors];
    }
    ,
    left_ear2HP: function() {
        var vertices = [];
        var indices = [];
        var colors = [];
        var radius = 1.2; 
        var sphere_radius = 0.84; 
        var sphere_segments = 20; 
        var height = 8.01; 
    
        var PI = Math.PI;
        var segments = 30;
        var circle_radius = 0.5; // Adjust the radius as needed
        var circle_segments = 20; // Number of segments to approximate the circle
        
        // Generate the sphere on top
        var sphere_start_index = 0; 
    
        for (var j = 0; j <= sphere_segments/2; j++) {
            for (var i = 0; i <= sphere_segments; i++) {
                var theta = (i / sphere_segments) * 2 * Math.PI;
                var phi = (j / sphere_segments) * Math.PI;
                var x = sphere_radius * Math.sin(phi) * Math.cos(theta);
                var y = sphere_radius * Math.sin(phi) * Math.sin(theta);
                var z = sphere_radius * Math.cos(phi);
                vertices.push(x, y, z + height-4, 0, 0.5, 1);
                colors.push(1, 1, 0);
            }
        }
    
        for (var j = 0; j < sphere_segments/2; j++) {
            for (var i = 0; i < sphere_segments/2; i++) {
                var vertex1 = sphere_start_index + j * (sphere_segments + 1) + i;
                var vertex2 = sphere_start_index + j * (sphere_segments + 1) + i + 1;
                var vertex3 = sphere_start_index + (j + 1) * (sphere_segments + 1) + i;
                var vertex4 = sphere_start_index + (j + 1) * (sphere_segments + 1) + i + 1;
    
                indices.push(vertex1, vertex2, vertex3);
                indices.push(vertex2, vertex4, vertex3);
            }
        }
    
        // Generate circle vertices and indices
        var circle_start_index = vertices.length / 6    ;
    

    
        // Generate main ear body vertices and indices
        for (var i = 0; i <= segments/2; i++) {
            var theta = (i / segments) * 2 * Math.PI;
            var x = radius  * Math.cos(theta);
            var y = radius  * Math.sin(theta);
            vertices.push(x, y , -1, 0, 0.5, 1); 
            colors.push(1, 1, 0);
            vertices.push(x * (0.725) , y * (0.725), height / 2, 0, 0.5, 1);
            colors.push(1, 1, 0);
        }
    
        for (var i = 0; i < segments; i++) {
            indices.push(circle_start_index + 0); 
            indices.push(circle_start_index + i * 2); 
            indices.push(circle_start_index + (i + 1) * 2); 
    
            indices.push(circle_start_index + 1); 
            indices.push(circle_start_index + i * 2 + 1); 
            indices.push(circle_start_index + (i + 1) * 2 + 1); 
    
            indices.push(circle_start_index + i * 2);
            indices.push(circle_start_index + (i + 1) * 2); 
            indices.push(circle_start_index + (i + 1) * 2 + 1); 
    
            indices.push(circle_start_index + i * 2); 
            indices.push(circle_start_index + (i + 1) * 2 + 1); 
            indices.push(circle_start_index + i * 2 + 1); 
        }
    
        return [vertices, indices, colors];
    },
    right_earHP: function() {
        var vertices = [];
        var indices = [];
        var colors = [];
        var radius = 1.55; 
        var sphere_radius = 1.1; 
        var sphere_segments = 20; 
        var height = 8; 
    
        var PI = Math.PI;
        var segments = 30;
        var circle_radius = 0.5; // Adjust the radius as needed
        var circle_segments = 20; // Number of segments to approximate the circle
        
        // Generate the sphere on top
        var sphere_start_index = 0; 
    
        for (var j = 0; j <= sphere_segments/2; j++) {
            for (var i = 0; i <= sphere_segments; i++) {
                var theta = (i / sphere_segments) * 2 * Math.PI;
                var phi = (j / sphere_segments) * Math.PI;
                var x = sphere_radius * Math.sin(phi) * Math.cos(theta);
                var y = sphere_radius * Math.sin(phi) * Math.sin(theta);
                var z = sphere_radius * Math.cos(phi);
                vertices.push(x, y, z + height-4, 0.1, 0.1, 0.2);
                colors.push(0, 0.5, 1);
            }
        }
    
        for (var j = 0; j < sphere_segments/2; j++) {
            for (var i = 0; i < sphere_segments/2; i++) {
                var vertex1 = sphere_start_index + j * (sphere_segments + 1) + i;
                var vertex2 = sphere_start_index + j * (sphere_segments + 1) + i + 1;
                var vertex3 = sphere_start_index + (j + 1) * (sphere_segments + 1) + i;
                var vertex4 = sphere_start_index + (j + 1) * (sphere_segments + 1) + i + 1;
    
                indices.push(vertex1, vertex2, vertex3);
                indices.push(vertex2, vertex4, vertex3);
            }
        }
    
        // Generate circle vertices and indices
        var circle_start_index = vertices.length / 6;
    

    
        // Generate main ear body vertices and indices
        for (var i = 0; i <= segments/2; i++) {
            var theta = (i / segments) * 2 * Math.PI;
            var x = radius  * Math.cos(theta);
            var y = radius  * Math.sin(theta);
            vertices.push(x, y , -1, 0.1, 0.1, 0.2); 
            colors.push(0, 0.5, 1);
            vertices.push(x * (0.725) , y * (0.725), height / 2, 0.1, 0.1, 0.2);
            colors.push(0, 0.5, 1);
        }
    
        for (var i = 0; i < segments; i++) {
            indices.push(circle_start_index + 0); 
            indices.push(circle_start_index + i * 2); 
            indices.push(circle_start_index + (i + 1) * 2); 
    
            indices.push(circle_start_index + 1); 
            indices.push(circle_start_index + i * 2 + 1); 
            indices.push(circle_start_index + (i + 1) * 2 + 1); 
    
            indices.push(circle_start_index + i * 2);
            indices.push(circle_start_index + (i + 1) * 2); 
            indices.push(circle_start_index + (i + 1) * 2 + 1); 
    
            indices.push(circle_start_index + i * 2); 
            indices.push(circle_start_index + (i + 1) * 2 + 1); 
            indices.push(circle_start_index + i * 2 + 1); 
        }
    
        return [vertices, indices, colors];
    },right_ear2HP: function() {
        var vertices = [];
        var indices = [];
        var colors = [];
        var radius = 1.2; 
        var sphere_radius = 0.84; 
        var sphere_segments = 20; 
        var height = 8.01; 
    
        var PI = Math.PI;
        var segments = 30;
        var circle_radius = 0.5; // Adjust the radius as needed
        var circle_segments = 20; // Number of segments to approximate the circle
        
        // Generate the sphere on top
        var sphere_start_index = 0; 
    
        for (var j = 0; j <= sphere_segments/2; j++) {
            for (var i = 0; i <= sphere_segments; i++) {
                var theta = (i / sphere_segments) * 2 * Math.PI;
                var phi = (j / sphere_segments) * Math.PI;
                var x = sphere_radius * Math.sin(phi) * Math.cos(theta);
                var y = sphere_radius * Math.sin(phi) * Math.sin(theta);
                var z = sphere_radius * Math.cos(phi);
                vertices.push(x, y, z + height-4, 0, 0.5, 1);
                colors.push(1, 1, 0);
            }
        }
    
        for (var j = 0; j < sphere_segments/2; j++) {
            for (var i = 0; i < sphere_segments/2; i++) {
                var vertex1 = sphere_start_index + j * (sphere_segments + 1) + i;
                var vertex2 = sphere_start_index + j * (sphere_segments + 1) + i + 1;
                var vertex3 = sphere_start_index + (j + 1) * (sphere_segments + 1) + i;
                var vertex4 = sphere_start_index + (j + 1) * (sphere_segments + 1) + i + 1;
    
                indices.push(vertex1, vertex2, vertex3);
                indices.push(vertex2, vertex4, vertex3);
            }
        }
    
        // Generate circle vertices and indices
        var circle_start_index = vertices.length / 6    ;
    

    
        // Generate main ear body vertices and indices
        for (var i = 0; i <= segments/2; i++) {
            var theta = (i / segments) * 2 * Math.PI;
            var x = radius  * Math.cos(theta);
            var y = radius  * Math.sin(theta);
            vertices.push(x, y , -1, 0, 0.5, 1); 
            colors.push(1, 1, 0);
            vertices.push(x * (0.725) , y * (0.725), height / 2, 0, 0.5, 1);
            colors.push(1, 1, 0);
        }
    
        for (var i = 0; i < segments; i++) {
            indices.push(circle_start_index + 0); 
            indices.push(circle_start_index + i * 2); 
            indices.push(circle_start_index + (i + 1) * 2); 
    
            indices.push(circle_start_index + 1); 
            indices.push(circle_start_index + i * 2 + 1); 
            indices.push(circle_start_index + (i + 1) * 2 + 1); 
    
            indices.push(circle_start_index + i * 2);
            indices.push(circle_start_index + (i + 1) * 2); 
            indices.push(circle_start_index + (i + 1) * 2 + 1); 
    
            indices.push(circle_start_index + i * 2); 
            indices.push(circle_start_index + (i + 1) * 2 + 1); 
            indices.push(circle_start_index + i * 2 + 1); 
        }
    
        return [vertices, indices, colors];
    }

    // 



    
    
    

};
var legsHP = {
    left_legHP: function(){
        var vertices = [];
        var indices = [];
        var colors = [];
        var radius = 0.75; // Adjust the radius of the sphere as needed
    
        var PI = Math.PI;
        var segments = 30;
        var height = 6.8;
    
        for (var i = 0; i <= segments; i++) {
            var theta = (i / segments) * 2 * Math.PI;
            var x = radius * Math.cos(theta);
            var y = radius * Math.sin(theta);
            vertices.push(x, y, 0, 0.1, 0.1, 0.2); // Bottom circle
             // Apex
             colors.push(0, 0.5, 1);
            //  cone_vertex.push(0.45, 0, height, 0.1, 0.1, 0.2);
            vertices.push(x*(0.725), y*(0.725), height/2, 0.1, 0.1, 0.2);
            colors.push(0, 0.4, 0.9);
        }
    
    
        for (var i = 0; i < segments; i++) {
            indices.push(0); // Bottom center vertex
            indices.push(i * 2); // Current bottom vertex
            indices.push((i + 1) * 2); // Next bottom vertex
    
            indices.push(1); // Apex vertex
            indices.push(i * 2 + 1); // Current top vertex
            indices.push((i + 1) * 2 + 1); // Next top vertex
    
            indices.push(i * 2); // Current bottom vertex
            indices.push((i + 1) * 2); // Next bottom vertex
            indices.push((i + 1) * 2 + 1); // Next top vertex
    
            indices.push(i * 2); // Current bottom vertex
            indices.push((i + 1) * 2 + 1); // Next top vertex
            indices.push(i * 2 + 1); // Current top vertex
    
        }
        return [vertices, indices,colors]
    },
    left_leg2HP: function(){
        var vertices = [];
        var indices = [];
        var colors = [];
        var radius = 0; // Adjust the radius of the sphere as needed
    
        var PI = Math.PI;
        var segments = 30;
        var height = 6.8;
    
        for (var i = 0; i <= segments; i++) {
            var theta = (i / segments) * 2 * Math.PI;
            var x = radius * Math.cos(theta);
            var y = radius * Math.sin(theta);
            vertices.push(x*0.775, y*0.775, height/2, 0.1, 0.1, 0.2); // Bottom circle
             // Apex
             colors.push(0, 0.5, 1);
            //  cone_vertex.push(0.45, 0, height, 0.1, 0.1, 0.2);
            vertices.push(x*0.575, y*0.575, height, 0.1, 0.1, 0.2);
            colors.push(0.0, 0.0, 0.0);
        }
    
    
        for (var i = 0; i < segments; i++) {
            indices.push(0); // Bottom center vertex
            indices.push(i * 2); // Current bottom vertex
            indices.push((i + 1) * 2); // Next bottom vertex
    
            indices.push(1); // Apex vertex
            indices.push(i * 2 + 1); // Current top vertex
            indices.push((i + 1) * 2 + 1); // Next top vertex
    
            indices.push(i * 2); // Current bottom vertex
            indices.push((i + 1) * 2); // Next bottom vertex
            indices.push((i + 1) * 2 + 1); // Next top vertex
    
            indices.push(i * 2); // Current bottom vertex
            indices.push((i + 1) * 2 + 1); // Next top vertex
            indices.push(i * 2 + 1); // Current top vertex
    
        }
        return [vertices, indices,colors]
    },
    right_legHP: function(){
        var radius = 0.75; // Adjust the radius of the sphere as needed

        var PI = Math.PI;
        var segments = 30;
        var height = 6.8;
        var vertices1 = [];
        var indices1 = [];
        var colors1 = [];
        for (var i = 0; i <= segments; i++) {
            var theta = (i / segments) * 2 * Math.PI;
            var x = radius * Math.cos(theta);
            var y = radius * Math.sin(theta);
            vertices1.push(x, y, 0, 0.8, 0.9, 1); // Bottom circle
             // Apex
             colors1.push(0, 0.5, 1);
            //  cone_vertex.push(0.45, 0, height, 0.1, 0.1, 0.2);
            vertices1.push(x*0.725, y*0.725, height/2, 0.8, 0.9, 1);
            colors1.push(0, 0.4, 0.9);
        }
    
    
        for (var i = 0; i < segments; i++) {
            indices1.push(0); // Bottom center vertex
            indices1.push(i * 2); // Current bottom vertex
            indices1.push((i + 1) * 2); // Next bottom vertex
    
            indices1.push(1); // Apex vertex
            indices1.push(i * 2 + 1); // Current top vertex
            indices1.push((i + 1) * 2 + 1); // Next top vertex
    
            indices1.push(i * 2); // Current bottom vertex
            indices1.push((i + 1) * 2); // Next bottom vertex
            indices1.push((i + 1) * 2 + 1); // Next top vertex
    
            indices1.push(i * 2); // Current bottom vertex
            indices1.push((i + 1) * 2 + 1); // Next top vertex
            indices1.push(i * 2 + 1); // Current top vertex
    
        }
        return [vertices1,indices1,colors1]
    },
    right_leg2HP: function(){
        var radius = 0; // Adjust the radius of the sphere as needed

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
            vertices1.push(x*0.775, y*0.775, height/2, 0.1, 0.1, 0.2); // Bottom circle
             // Apex
             colors1.push(0, 0.5, 1);
            //  cone_vertex.push(0.45, 0, height, 0.1, 0.1, 0.2);
            vertices1.push(x*0.575, y*0.575, height, 0, 0.5, 1);
            colors1.push(0, 0.5, 0.9);
        }
    
    
        for (var i = 0; i < segments; i++) {
            indices1.push(0); // Bottom center vertex
            indices1.push(i * 2); // Current bottom vertex
            indices1.push((i + 1) * 2); // Next bottom vertex
    
            indices1.push(1); // Apex vertex
            indices1.push(i * 2 + 1); // Current top vertex
            indices1.push((i + 1) * 2 + 1); // Next top vertex
    
            indices1.push(i * 2); // Current bottom vertex
            indices1.push((i + 1) * 2); // Next bottom vertex
            indices1.push((i + 1) * 2 + 1); // Next top vertex
    
            indices1.push(i * 2); // Current bottom vertex
            indices1.push((i + 1) * 2 + 1); // Next top vertex
            indices1.push(i * 2 + 1); // Current top vertex
    
        }
        return [vertices1,indices1,colors1]
    }
};
var bodysHP = {
    bodiesHP:function(){
        var vertices = [];
        var normals = [];
        var texCoords = [];
        var indices = [];
        var colors = [];
        var radius = 2.0; // Adjust the radius of the sphere as needed
        var sectorCount = 144; // Number of sectors
        var stackCount = 64; // Number of stacks
    
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
            vertices.push(x , y , 0, 0.1, 0.1, 0.2); // Bottom circle
             // Apex
             colors.push(0, 0.5, 1);
            //  cone_vertex.push(0.45, 0, height, 0.1, 0.1, 0.2);
            vertices.push(x*0.5, y*0.5, height , 0, 0.5, 1);
            colors.push(0, 0.4, 0.9);
        }


        for (var i = 0; i <= stackCount/1.4; ++i) {
            stackAngle = PI / 2 - i * stackStep;
            var xy = radius * Math.cos(stackAngle) ;
            var z = radius * Math.sin(stackAngle);
    
            for (var j = 0; j <= sectorCount; ++j) {
                sectorAngle = j * sectorStep;
                var x = xy * Math.cos(sectorAngle) * 1.1;
                var y = xy * Math.sin(sectorAngle) * 1;
                vertices.push(-x, -y, -z*0.8);
    
                // Calculate normals
                var nx = x / radius;
                var ny = y / radius;
                var nz = z / radius;
                normals.push(nx, ny, nz);
    
                // Calculate texture coordinates
                var s = j / sectorCount;
                var t = i / stackCount/2;
                texCoords.push(s, t);
                colors.push(0, 0.5, 1);
            }
        }
    
        for (var i = 0; i <= segments; i++) {
            indices.push(0); // Bottom center vertex
            indices.push(i * 2); // Current bottom vertex
            indices.push((i + 1) * 2); // Next bottom vertex
    
            indices.push(1); // Apex vertex
            indices.push(i * 2 + 1); // Current top vertex
            indices.push((i + 1) * 2 + 1); // Next top vertex
    
            indices.push(i * 2); // Current bottom vertex
            indices.push((i + 1) * 2); // Next bottom vertex
            indices.push((i + 1) * 2 + 1); // Next top vertex
    
            indices.push(i * 2); // Current bottom vertex
            indices.push((i + 1) * 2 + 1); // Next top vertex
            indices.push(i * 2 + 1); // Current top vertex
    
        }
        for (var i = 0; i < stackCount/2; ++i) {
            for (var j = 0; j < sectorCount; ++j) {
                var k1 = i * (sectorCount + 1) + j;
                var k2 = k1 + sectorCount + 1;
    
                // 2 triangles per sector excluding first and last stacks
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
    clothHP: function () {
        var vertices = [];
        var normals = [];
        var texCoords = [];
        var indices = [];
        var colors = [];
        var radius = 2.05; // Adjust the radius of the sphere as needed
        var sectorCount = 144; // Number of sectors
        var stackCount = 64; // Number of stacks
    
        var PI = Math.PI;
        var sectorStep = 2 * PI / sectorCount;
        var stackStep = PI / stackCount;
        var sectorAngle, stackAngle;
        var segments = 30;
        var height = 3;
    
        for (var i = 0; i <= segments; i++) {
            var theta = (i / segments) * 2 * Math.PI;
            var x = radius * Math.cos(theta);
            var y = radius * Math.sin(theta);
            vertices.push(x*1.2 , y*1.2 , -0.38, 0.1, 0.1, 0.2); // Bottom circle
             // Apex
             colors.push(1, 1, 1);
            //  cone_vertex.push(0.45, 0, height, 0.1, 0.1, 0.2);
            vertices.push(x*0.5, y*0.5, height , 1, 1, 1);
            colors.push(1, 1, 1);
        }


        for (var i = 29; i <= stackCount; ++i) {
            stackAngle = PI / 2 - i * stackStep;
            var xy = radius * Math.cos(stackAngle) ;
            var z = radius * Math.sin(stackAngle);
    
            for (var j = 0; j <= sectorCount; ++j) {
                sectorAngle = j * sectorStep;
                var x = xy * Math.cos(sectorAngle) * 1.1;
                var y = xy * Math.sin(sectorAngle) * 1;
                vertices.push(-x, -y, -z*1.3);
    
                // Calculate normals
                var nx = x / radius;
                var ny = y / radius;
                var nz = z / radius;
                normals.push(nx, ny, nz);
    
                // Calculate texture coordinates
                var s = j / sectorCount;
                var t = i / stackCount/2;
                texCoords.push(s, t);
                colors.push(1, 1, 1);
            }
        }
    
        for (var i = 0; i <= segments; i++) {
            indices.push(0); // Bottom center vertex
            indices.push(i * 2); // Current bottom vertex
            indices.push((i + 1) * 2); // Next bottom vertex
    
            indices.push(1); // Apex vertex
            indices.push(i * 2 + 1); // Current top vertex
            indices.push((i + 1) * 2 + 1); // Next top vertex
    
            indices.push(i * 2); // Current bottom vertex
            indices.push((i + 1) * 2); // Next bottom vertex
            indices.push((i + 1) * 2 + 1); // Next top vertex
    
            indices.push(i * 2); // Current bottom vertex
            indices.push((i + 1) * 2 + 1); // Next top vertex
            indices.push(i * 2 + 1); // Current top vertex
    
        }
        for (var i = 0; i < stackCount/2; ++i) {
            for (var j = 0; j < sectorCount; ++j) {
                var k1 = i * (sectorCount + 1) + j;
                var k2 = k1 + sectorCount + 1;
    
                // 2 triangles per sector excluding first and last stacks
                if (i !== 0) {
                    indices.push(k1, k2, k1 + 1);
                }
                if (i !== (stackCount/2 - 1)) {
                    indices.push(k1 + 1, k2, k2 + 1);
                }
            }
        }
        return [vertices,indices,colors]
    }
    ,
    markHP:function(){

    },
    tailsHP:function(){
        var vertices = [];
        var indices = [];
        var colors = [];
    
        // Define vertices for a simple spheroid
        var latitudeBands = 30;
        var longitudeBands = 30;
        var radius = 1.1;
    
        for (var latNumber = 0; latNumber <= latitudeBands; latNumber++) {
            var theta = latNumber * Math.PI / latitudeBands;
            var sinTheta = Math.sin(theta);
            var cosTheta = Math.cos(theta);
    
            for (var longNumber = 0; longNumber <= longitudeBands; longNumber++) {
                var phi = longNumber * 2 * Math.PI / longitudeBands;
                var sinPhi = Math.sin(phi);
                var cosPhi = Math.cos(phi);
    
                var x = cosPhi * sinTheta;
                var y = cosTheta;
                var z = sinPhi * sinTheta;
    
                vertices.push(radius * x, radius * y, radius * z);
                colors.push(0.0, 0.5, 1.0); // White color for simplicity
            }
        }
    
        // Define indices to connect vertices into triangles
        for (var latNumber = 0; latNumber < latitudeBands; latNumber++) {
            for (var longNumber = 0; longNumber < longitudeBands; longNumber++) {
                var first = (latNumber * (longitudeBands + 1)) + longNumber;
                var second = first + longitudeBands + 1;
                indices.push(first, second, first + 1);
                indices.push(second, second + 1, first + 1);
            }
        }
    
        return [vertices, indices, colors];
  
        return [vertices,indices, colors]
    }
};

var handHP = {
    left_handHP:function(){
        var vertices = [];
        var colors = [];
        var normals = [];
        var texCoords = [];
        var indices = [];
        var radius = 0.35; // Adjust the radius of the sphere as needed
        var sectorCount = 72; // Number of sectors
        var stackCount = 24; // Number of stacks
    
        var PI = Math.PI;
        var sectorStep = 2 * PI / sectorCount;
        var stackStep = PI / stackCount;
        var sectorAngle, stackAngle;
        var segments = 30;
        var height = 3.96;
    
        for (var i = 0; i <= segments; i++) {
            var theta = (i / segments) * 2 * Math.PI;
            var x = radius * Math.cos(theta);
            var y = radius * Math.sin(theta);
            vertices.push(x, y, 0, 0.1, 0.1, 0.2); // Bottom circle
             // Apex
             colors.push(0, 0.5, 1);
            //  cone_vertex.push(0.45, 0, height, 0.1, 0.1, 0.2);
            vertices.push(x * 1.01 , y, height/2, 0, 0.5, 1);
            colors.push(0, 0.5, 1);
        }
    
    
        for (var i = 0; i < segments; i++) {
            indices.push(0); // Bottom center vertex
            indices.push(i * 2); // Current bottom vertex
            indices.push((i + 1) * 2); // Next bottom vertex
    
            indices.push(1); // Apex vertex
            indices.push(i * 2 + 1); // Current top vertex
            indices.push((i + 1) * 2 + 1); // Next top vertex
    
            indices.push(i * 2); // Current bottom vertex
            indices.push((i + 1) * 2); // Next bottom vertex
            indices.push((i + 1) * 2 + 1); // Next top vertex
    
            indices.push(i * 2); // Current bottom vertex
            indices.push((i + 1) * 2 + 1); // Next top vertex
            indices.push(i * 2 + 1); // Current top vertex
    
        }
        return [vertices,indices, colors]
    },
    left_hand2HP:function(){
        var vertices = [];
        var colors = [];
        var normals = [];
        var texCoords = [];
        var indices = [];
        var radius = 0.35; // Adjust the radius of the sphere as needed
        var sectorCount = 72; // Number of sectors
        var stackCount = 24; // Number of stacks
    
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
            vertices.push(x * 1.01  , y, height/2, 0.1, 0.1, 0.2); // Bottom circle
             // Apex
             colors.push(0, 0.5, 1);
            //  cone_vertex.push(0.45, 0, height, 0.1, 0.1, 0.2);
            vertices.push(x * 1.01  , y, height, 0, 0.5, 1);
            colors.push(0, 0.5, 1);
        }
    
    
        for (var i = 0; i < segments; i++) {
            indices.push(0); // Bottom center vertex
            indices.push(i * 2); // Current bottom vertex
            indices.push((i + 1) * 2); // Next bottom vertex
    
            indices.push(1); // Apex vertex
            indices.push(i * 2 + 1); // Current top vertex
            indices.push((i + 1) * 2 + 1); // Next top vertex
    
            indices.push(i * 2); // Current bottom vertex
            indices.push((i + 1) * 2); // Next bottom vertex
            indices.push((i + 1) * 2 + 1); // Next top vertex
    
            indices.push(i * 2); // Current bottom vertex
            indices.push((i + 1) * 2 + 1); // Next top vertex
            indices.push(i * 2 + 1); // Current top vertex
    
        }

        return [vertices,indices, colors]
    },
    right_handHP:function(){
        var normals = [];
        var texCoords = [];
        var radius = 0; // Adjust the radius of the sphere as needed
        var sectorCount = 72; // Number of sectors
        var stackCount = 24; // Number of stacks
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
            vertices1.push(x, y, 0, 0.1, 0.1, 0.2); // Bottom circle
             // Apex
             colors1.push(0, 0.5, 1);
            //  cone_vertex.push(0.45, 0, height, 0.1, 0.1, 0.2);
            vertices1.push(x * 1.01 , y, height/2, 0, 0.5, 1);
            colors1.push(0, 0.5, 1);
        }
    
    
        for (var i = 0; i < segments; i++) {
            indices1.push(0); // Bottom center vertex
            indices1.push(i * 2); // Current bottom vertex
            indices1.push((i + 1) * 2); // Next bottom vertex
    
            indices1.push(1); // Apex vertex
            indices1.push(i * 2 + 1); // Current top vertex
            indices1.push((i + 1) * 2 + 1); // Next top vertex
    
            indices1.push(i * 2); // Current bottom vertex
            indices1.push((i + 1) * 2); // Next bottom vertex
            indices1.push((i + 1) * 2 + 1); // Next top vertex
    
            indices1.push(i * 2); // Current bottom vertex
            indices1.push((i + 1) * 2 + 1); // Next top vertex
            indices1.push(i * 2 + 1); // Current top vertex
    
        }
        
        return [vertices1,indices1, colors1]
    },
    right_hand2HP:function(){
        var normals = [];
        var texCoords = [];
        var radius = 0.35; // Adjust the radius of the sphere as needed
        var sectorCount = 72; // Number of sectors
        var stackCount = 24; // Number of stacks
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
            vertices1.push(x * 1.01  , y, height/2, 0.1, 0.1, 0.2); // Bottom circle
             // Apex
             colors1.push(0, 0.5, 1);
            //  cone_vertex.push(0.45, 0, height, 0.1, 0.1, 0.2);
            vertices1.push(x * 1.01 , y, height, 0, 0.5, 1);
            colors1.push(0, 0.5, 1);
        }
    
    
        for (var i = 0; i < segments; i++) {
            indices1.push(0); // Bottom center vertex
            indices1.push(i * 2); // Current bottom vertex
            indices1.push((i + 1) * 2); // Next bottom vertex
    
            indices1.push(1); // Apex vertex
            indices1.push(i * 2 + 1); // Current top vertex
            indices1.push((i + 1) * 2 + 1); // Next top vertex
    
            indices1.push(i * 2); // Current bottom vertex
            indices1.push((i + 1) * 2); // Next bottom vertex
            indices1.push((i + 1) * 2 + 1); // Next top vertex
    
            indices1.push(i * 2); // Current bottom vertex
            indices1.push((i + 1) * 2 + 1); // Next top vertex
            indices1.push(i * 2 + 1); // Current top vertex
    
        }

        return [vertices1,indices1, colors1]
    },
    left_palmHP:function(){
        var vertices = [];
        var colors = [];
        var normals = [];
        var texCoords = [];
        var indices = [];
        var radius = 0.35; // Adjust the radius of the sphere as needed
        var sectorCount = 72; // Number of sectors
        var stackCount = 24; // Number of stacks
    
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
    
                // Calculate normals
                var nx = x / radius;
                var ny = y / radius;
                var nz = z / radius;
                normals.push(nx, ny, nz);
    
                // Calculate texture coordinates
                var s = j / sectorCount;
                var t = i / stackCount/2;
                texCoords.push(s, t);
                colors.push(0, 0.5, 1);
            }
        }
        for (var i = 0; i < stackCount/2; ++i) {
            for (var j = 0; j < sectorCount; ++j) {
                var k1 = i * (sectorCount + 1) + j;
                var k2 = k1 + sectorCount + 1;
    
                // 2 triangles per sector excluding first and last stacks
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
    right_palmHP:function(){
        var normals = [];
        var texCoords = [];
        var radius = 0.35; // Adjust the radius of the sphere as needed
        var sectorCount = 72; // Number of sectors
        var stackCount = 24; // Number of stacks
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
    
                // Calculate normals
                var nx = x / radius;
                var ny = y / radius;
                var nz = z / radius;
                normals.push(nx, ny, nz);
    
                // Calculate texture coordinates
                var s = j / sectorCount;
                var t = i / stackCount/2;
                texCoords.push(s, t);
                colors1.push(0, 0.5, 1);
            }
        }
        for (var i = 0; i < stackCount/2; ++i) {
            for (var j = 0; j < sectorCount; ++j) {
                var k1 = i * (sectorCount + 1) + j;
                var k2 = k1 + sectorCount + 1;
    
                // 2 triangles per sector excluding first and last stacks
                if (i !== 0) {
                    indices1.push(k1, k2, k1 + 1);
                }
                if (i !== (stackCount/2 - 1)) {
                    indices1.push(k1 + 1, k2, k2 + 1);
                }
            }
        }
        return [vertices1,indices1,colors1]
    },
    elbowHP:function(){
        var vertices = [];
        var colors = [];
        var normals = [];
        var texCoords = [];
        var indices = [];
        var radius = 0.0; // Adjust the radius of the sphere as needed
        var sectorCount = 72; // Number of sectors
        var stackCount = 24; // Number of stacks
    
        var PI = Math.PI;
        var sectorStep = 2 * PI / sectorCount;
        var stackStep = PI / stackCount;
        var sectorAngle, stackAngle;
        var segments = 30;
        var height = 2.96;
    
        for (var i = 0; i <= stackCount; ++i) {
            stackAngle = PI / 2 - i * stackStep;
            var xy = radius * Math.cos(stackAngle);
            var z = radius * Math.sin(stackAngle);
    
            for (var j = 0; j <= sectorCount; ++j) {
                sectorAngle = j * sectorStep;
                var x = xy * Math.cos(sectorAngle);
                var y = xy * Math.sin(sectorAngle);
                vertices.push(x, y , z);
    
                // Calculate normals
                var nx = x / radius;
                var ny = y / radius;
                var nz = z / radius;
                normals.push(nx, ny, nz);
    
                // Calculate texture coordinates
                var s = j / sectorCount;
                var t = i / stackCount/2;
                texCoords.push(s, t);
                colors.push(0, 0.5, 1);
            }
        }
        for (var i = 0; i < stackCount; ++i) {
            for (var j = 0; j < sectorCount; ++j) {
                var k1 = i * (sectorCount + 1) + j;
                var k2 = k1 + sectorCount + 1; 
    
                // 2 triangles per sector excluding first and last stacks
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
    elbow1HP:function(){
        var vertices = [];
        var colors = [];
        var normals = [];
        var texCoords = [];
        var indices = [];
        var radius = 0.34; // Adjust the radius of the sphere as needed
        var sectorCount = 72; // Number of sectors
        var stackCount = 24; // Number of stacks
    
        var PI = Math.PI;
        var sectorStep = 2 * PI / sectorCount;
        var stackStep = PI / stackCount;
        var sectorAngle, stackAngle;
        var segments = 30;
        var height = 2.96;
    
        for (var i = 0; i <= stackCount; ++i) {
            stackAngle = PI / 2 - i * stackStep;
            var xy = radius * Math.cos(stackAngle);
            var z = radius * Math.sin(stackAngle);
    
            for (var j = 0; j <= sectorCount; ++j) {
                sectorAngle = j * sectorStep;
                var x = xy * Math.cos(sectorAngle);
                var y = xy * Math.sin(sectorAngle);
                vertices.push(x, y , z);
    
                // Calculate normals
                var nx = x / radius;
                var ny = y / radius;
                var nz = z / radius;
                normals.push(nx, ny, nz);
    
                // Calculate texture coordinates
                var s = j / sectorCount;
                var t = i / stackCount/2;
                texCoords.push(s, t);
                colors.push(1, 1, 1);
            }
        }
        for (var i = 0; i < stackCount; ++i) {
            for (var j = 0; j < sectorCount; ++j) {
                var k1 = i * (sectorCount + 1) + j;
                var k2 = k1 + sectorCount + 1;
    
                // 2 triangles per sector excluding first and last stacks
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
    left_clothHP:function(){
        var vertices = [];
        var colors = [];
        var normals = [];
        var texCoords = [];
        var indices = [];
        var radius = 0.55; // Adjust the radius of the sphere as needed
        var sectorCount = 72; // Number of sectors
        var stackCount = 24; // Number of stacks
    
        var PI = Math.PI;
        var sectorStep = 2 * PI / sectorCount;
        var stackStep = PI / stackCount;
        var sectorAngle, stackAngle;
        var segments = 30;
        var height = 3.96;
    
        for (var i = 0; i <= segments; i++) {
            var theta = (i / segments) * 2 * Math.PI;
            var x = radius * Math.cos(theta);
            var y = radius * Math.sin(theta);
            vertices.push(x, y, 0, 0.1, 0.1, 0.2); // Bottom circle
             // Apex
             colors.push(1, 1, 1);
            //  cone_vertex.push(0.45, 0, height, 0.1, 0.1, 0.2);
            vertices.push(x * 1.01 , y, height/2, 0, 0.5, 1);
            colors.push(0.88, 0.88, 0.88);
        }
    
    
        for (var i = 0; i < segments; i++) {
            indices.push(0); // Bottom center vertex
            indices.push(i * 2); // Current bottom vertex
            indices.push((i + 1) * 2); // Next bottom vertex
    
            indices.push(1); // Apex vertex
            indices.push(i * 2 + 1); // Current top vertex
            indices.push((i + 1) * 2 + 1); // Next top vertex
    
            indices.push(i * 2); // Current bottom vertex
            indices.push((i + 1) * 2); // Next bottom vertex
            indices.push((i + 1) * 2 + 1); // Next top vertex
    
            indices.push(i * 2); // Current bottom vertex
            indices.push((i + 1) * 2 + 1); // Next top vertex
            indices.push(i * 2 + 1); // Current top vertex
    
        }
        return [vertices,indices, colors]
    },
    right_clothHP:function(){
        var vertices = [];
        var colors = [];
        var normals = [];
        var texCoords = [];
        var indices = [];
        var radius = 0.55; // Adjust the radius of the sphere as needed
        var sectorCount = 72; // Number of sectors
        var stackCount = 24; // Number of stacks
    
        var PI = Math.PI;
        var sectorStep = 2 * PI / sectorCount;
        var stackStep = PI / stackCount;
        var sectorAngle, stackAngle;
        var segments = 30;
        var height = 3.96;
    
        for (var i = 0; i <= segments; i++) {
            var theta = (i / segments) * 2 * Math.PI;
            var x = radius * Math.cos(theta);
            var y = radius * Math.sin(theta);
            vertices.push(x, y, 0, 0.1, 0.1, 0.2); // Bottom circle
             // Apex
             colors.push(1, 1, 1);
            //  cone_vertex.push(0.45, 0, height, 0.1, 0.1, 0.2);
            vertices.push(x * 1.01 , y, height/2, 0, 0.5, 1);
            colors.push(0.88, 0.88, 0.88);
        }
    
    
        for (var i = 0; i < segments; i++) {
            indices.push(0); // Bottom center vertex
            indices.push(i * 2); // Current bottom vertex
            indices.push((i + 1) * 2); // Next bottom vertex
    
            indices.push(1); // Apex vertex
            indices.push(i * 2 + 1); // Current top vertex
            indices.push((i + 1) * 2 + 1); // Next top vertex
    
            indices.push(i * 2); // Current bottom vertex
            indices.push((i + 1) * 2); // Next bottom vertex
            indices.push((i + 1) * 2 + 1); // Next top vertex
    
            indices.push(i * 2); // Current bottom vertex
            indices.push((i + 1) * 2 + 1); // Next top vertex
            indices.push(i * 2 + 1); // Current top vertex
    
        }
        return [vertices,indices, colors]   
    }
};
var facesHP = {
    facesHP: function() {
        var numLongitudes = 30; 
        var numLatitudes = 10000; 
        var faces_vertex = [];
        var faces_faces = [];
        var faces_color = [];
        
        // Define arrays to store vertex positions
        var faces_vertexX = [];
        var faces_vertexY = [];
        var faces_vertexZ = [];
        
        // Initialize vertex position arrays
        for (var i = 0; i < 61; i++) { // Changed 60 to 61 to match the loop condition
            faces_vertexX[i] = [];
            faces_vertexY[i] = [];
            faces_vertexZ[i] = [];
        }
    
        // Calculate vertex positions
        for (var i = 0; i <= 60; i++) { // Changed 1 to 0 to match the loop condition
            for (var j = 0; j <= 60; j++) { // Changed 1 to 0 to match the loop condition
                var u = -Math.PI + i * (Math.PI / 30);
                var v = -Math.PI / 2 + j * (Math.PI / 30);
                var x = 4 * Math.cos(v) * Math.cos(u);
                var y = 3 * Math.cos(v) * Math.sin(u);
                var z = 2.5 * Math.sin(v);
    
                faces_vertexX[i][j] = x;
                faces_vertexY[i][j] = y;
                faces_vertexZ[i][j] = z;
                
                faces_vertex.push(x, y, z);
                faces_color.push(0, 0.5, 1);
            }
        }
    
        // Generate faces
        for (var i = 0; i < numLatitudes; i++) {
            for (var j = 0; j < numLongitudes; j++) {
                var first = i * (numLongitudes + 1) + j;
                var second = first + numLongitudes + 1;
                
                // Define indices for the two triangles forming each square
                faces_faces.push(first);
                faces_faces.push(second);
                faces_faces.push(first + 1);
                
                faces_faces.push(second);
                faces_faces.push(second + 1);
                faces_faces.push(first + 1);
            }
        }
        return [faces_vertex, faces_faces, faces_color];
    }
    ,
    eye1HP:function(){
        var cone_vertex = [];
        var segments = 60; // Number of segments in the cone
        var radius = 1; // Radius of the cone
        var height = 5.075; // Height of the cone
        var colors = [];

        var vertices = [];
        var normals = [];
        var texCoords = [];
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
                vertices.push(x*0.88, y*1.4, z);
    
                // Calculate normals
                var nx = x / radius;
                var ny = y / radius;
                var nz = z / radius;
                normals.push(nx, ny, nz);
    
                // Calculate texture coordinates
                var s = j / sectorCount;
                var t = i / stackCount/2;
                texCoords.push(s, t);
                colors.push(1, 1, 1);
            }
        }
    
        for (var i = 0; i < stackCount/2; ++i) {
            for (var j = 0; j < sectorCount; ++j) {
                var k1 = i * (sectorCount + 1) + j;
                var k2 = k1 + sectorCount + 1;
    
                // 2 triangles per sector excluding first and last stacks
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
    eye2HP:function(){
        var radius = 0.7; 

        var colors = [];

        var vertices = [];
        var normals = [];
        var texCoords = [];
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
                vertices.push(x *0.88, y *1.4, z);
    
                // Calculate normals
                var nx = x / radius;
                var ny = y / radius;
                var nz = z / radius;
                normals.push(nx, ny, nz);
    
                // Calculate texture coordinates
                var s = j / sectorCount;
                var t = i / stackCount/2;
                texCoords.push(s, t);
                colors.push(0, 0, 0);
            }
        }
    
        for (var i = 0; i < stackCount/2; ++i) {
            for (var j = 0; j < sectorCount; ++j) {
                var k1 = i * (sectorCount + 1) + j;
                var k2 = k1 + sectorCount + 1;
    
                // 2 triangles per sector excluding first and last stacks
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
    mouthHP: function() {
    var point = [
        -0.4, 0.26, -1.44,
        -0.4, 0.26, -1.43,
        -0.38, 0.20, -1.43, 
        -0.32, 0.16, -1.42,
        -0.3, 0.15, -1.42,
        -0.25, 0.19, -1.44,
        -0.2, 0.26, -1.46, 
        -0.15, 0.19, -1.44,
        -0.1, 0.15, -1.42,
        -0.08, 0.16, -1.42,
        -0.02, 0.20, -1.42,
        -0.0, 0.24, -1.43,
        -0.0, 0.26, -1.44
    ];
    
    var color = [
        0, 0, 0.5, 
        0, 0, 0.5, 
        0, 0, 0.5, 
        0, 0, 0.5, 
        0, 0, 0.5, 
        0, 0, 0.5, 
        0, 0, 0.5, 
        0, 0, 0.5, 
        0, 0, 0.5, 
        0, 0, 0.5, 
        
    ];

    return [point, color, 0];
},
brow_leftHP: function() {
    var point = [
         0.18, 0.6, -1.34,
         0.18, 0.62, -1.34,
         0.16, 0.64, -1.34,
         0.14, 0.66, -1.34,
         0.12, 0.68, -1.34,
         0.06, 0.7, -1.34,//tengah
        -0.02, 0.68, -1.40,
        -0.04, 0.66, -1.42,
        -0.06, 0.64, -1.43,
        -0.08, 0.62, -1.44,
        -0.08, 0.6, -1.45
    ];
    
    var color = [
        0, 0, 0.5, 
        0, 0, 0.5, 
        0, 0, 0.5,  
    ];

    return [point, color, 0];
},
brow_rightHP: function() {
var point = [
    -0.32, 0.6, -1.45,
    -0.32, 0.62, -1.43,
    -0.34, 0.64, -1.42,
    -0.36, 0.66, -1.4,
    -0.38, 0.68, -1.4,
    -0.44, 0.70, -1.4,//
    -0.52, 0.68, -1.34, 
    -0.54, 0.66, -1.34, 
    -0.56, 0.64, -1.34, 
    -0.58, 0.62, -1.34, 
    -0.58, 0.6, -1.35,
];

/*
        0.18, 0.6, -1.34,
        0.18, 0.62, -1.34,
        0.16, 0.64, -1.34,
        0.14, 0.66, -1.34,
        0.12, 0.68, -1.34,
        0.06, 0.7, -1.34,
        -0.02, 0.68, -1.40,
        -0.04, 0.66, -1.42,
        -0.06, 0.64, -1.43,
        -0.08, 0.62, -1.44,
        -0.08, 0.6, -1.45
*/

var color = [
    0, 0, 0.5, 
    0, 0, 0.5, 
    0, 0, 0.5, 
];

return [point, color, 0];
}


};

var baloonsHP = {
    baloonHP:function(){
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

                var r = Math.random(); // Randomize color components for each vertex
                var g = Math.random();
                var d = Math.random();
                faces_colors.push(1,0,0)
                j+=1;
            }
            i+= 1;
        }

        for (var i = 0; i <= numLatitudes; i++) {
            for (var j = 0; j <= numLongitudes; j++) {
                var first = i * (numLongitudes + 1) + j;
                var second = first + numLongitudes + 1;
                
                // Define indices for the two triangles forming each square
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
            faces_vertex.push(0, 0, 0, 0.1, 0.1, 0.2); // Bottom circle
             // Apex
             faces_colors.push(0.7, 0, 0.0);
            //  cone_vertex.push(0.45, 0, height, 0.1, 0.1, 0.2);
            faces_vertex.push(x, y, height, 0.1, 0.1, 0.2);
            faces_colors.push(0.7, 0, 0.0);
        }
        for (var i = 0; i < segments; i++) {
            faces_faces.push(0); // Bottom center vertex
            faces_faces.push(i * 2); // Current bottom vertex
            faces_faces.push((i + 1) * 2); // Next bottom vertex
    
            faces_faces.push(1); // Apex vertex
            faces_faces.push(i * 2 + 1); // Current top vertex
            faces_faces.push((i + 1) * 2 + 1); // Next top vertex
    
            faces_faces.push(i * 2); // Current bottom vertex
            faces_faces.push((i + 1) * 2); // Next bottom vertex
            faces_faces.push((i + 1) * 2 + 1); // Next top vertex
    
            faces_faces.push(i * 2); // Current bottom vertex
            faces_faces.push((i + 1) * 2 + 1); // Next top vertex
            faces_faces.push(i * 2 + 1); // Current top vertex
    
        }
        return [faces_vertex,faces_faces,faces_colors];
    }
};