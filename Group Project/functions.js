 var minPyrColor = vec3(0.4, 0.2, 0.0);
        var bulletColor = vec3(0.7, 0.7, 0.0);

    var maxPyrColor = vec3(0.8, 0.4, 0.2);
     var minGroundColor = vec3(0.4, 0.2, 0.0);
    var maxGroundColor = vec3(0.4, 0.2, 0.0);
     var minSkyColor = vec3(0.5, 0.5, 1);
    var maxSkyColor = vec3(0.5, 0.5, 1);


function sky(points, colors){

      var vertices = [
    vec4(-1,1,0 , 1.0 ), // 0
    vec4( -1, .5,0,  1.0 ), // 1
    vec4( 1,1,0 ,1.0 ), // 2
    vec4(  1,.5,0,  1.0 ), // 3

  ];

var floorVerticies = [
   [ 0,1,2 ], // 0  back face
   [ 3,2,1 ], // 1  top face
   


  ];


     for ( i = 0; i < floorVerticies.length; i++ ) {
     // alert("interesting: "  + floorVerticies.length); 
   points.push( vertices[floorVerticies[i][0]] );
   points.push( vertices[floorVerticies[i][1]] );
  points.push( vertices[floorVerticies[i][2]] );

  }

   for (i = 0; i < floorVerticies.length*3; i++) {
      var nextColor = vec4(0.0, 0.0, 0.0, 1.0);
      for (j = 0; j < 3; j++) {
        nextColor[j] = minSkyColor[j];
      }
      colors.push(nextColor);
    }


  return floorVerticies.length*3; 
}

function ground(p){

      var vertices = [
    vec4(-1,0,-2 , 1.0 ), // 0
    vec4( -1, 0,0,  1.0 ), // 1
    vec4( 1,0,-2 ,1.0 ), // 2
    vec4(  1,0,0,  1.0 ), // 3

  ];

var floorVerticies = [
   [ 0,1,2 ], // 0  back face
   [ 3,2,1 ], // 1  top face
   


  ];


     for ( i = 0; i < floorVerticies.length; i++ ) {
    p.push( vertices[floorVerticies[i][0]] );
    p.push( vertices[floorVerticies[i][1]] );
    p.push( vertices[floorVerticies[i][2]] );

  }

 for (i = 0; i < floorVerticies.length*3; i++) {
      var nextColor = vec4(0.0, 0.0, 0.0, 1.0);
      for (j = 0; j < 3; j++) {
        nextColor[j] = minPyrColor[j] +
        Math.random() * (minGroundColor[j] - maxGroundColor[j]);
      }
      colors.push(nextColor);
    }




  return floorVerticies.length*3; 
}

function enemy( points) {

  const numFaces     = 5;
  const vertsPerFace =6;



   var vertices = [
    vec4( -0.2 ,-.2, -.2,  1.0 ), // 0
    vec4( .2,  -.2,-.2,  1.0 ), // 1
    vec4( -.2,  -.2,  .2,  1.0 ), // 2
    vec4(  .2, -.2,  .2,  1.0 ), // 3
        vec4( 0, -.6, 0,  1.0 ), // 4

  ];

   var vertices2 = [
    vec4( -0.2 ,.2, .2,  1.0 ), // 0
    vec4( -.2, .2,-.2,  1.0 ), // 1
    vec4( -.2,  -.2,  .2,  1.0 ), // 2
    vec4(  -.2, -.2,  -.2,  1.0 ), // 3
        vec4( -.6, 0, 0,  1.0 ), // 4

  ];

   var vertices3 = [
    vec4( 0.2 ,.2, -.2,  1.0 ), // 0
    vec4( -.2,  .2,-.2,  1.0 ), // 1
    vec4( .2,  .2,  .2,  1.0 ), // 2
    vec4( - .2, .2,  .2,  1.0 ), // 3
        vec4( 0, .6, 0,  1.0 ), // 4

  ];

   var vertices4 = [
    vec4( 0.2 ,-.2, .2,  1.0 ), // 0
    vec4( .2, -.2,-.2,  1.0 ), // 1
    vec4( .2,  .2,  .2,  1.0 ), // 2
    vec4(  .2, .2,  -.2,  1.0 ), // 3
        vec4( .6, 0, 0,  1.0 ), // 4

  ];

     var vertices5 = [
    vec4( -0.2 ,.2, .2,  1.0 ), // 0
    vec4( .2, .2,.2,  1.0 ), // 1
    vec4( -.2, - .2,  .2,  1.0 ), // 2
    vec4(  .2, -.2,  .2,  1.0 ), // 3
        vec4( 0, 0, .6,  1.0 ), // 4

  ];

      var vertices6 = [
    vec4( -0.2 ,.2, -.2,  1.0 ), // 0
    vec4( .2, .2,-.2,  1.0 ), // 1
    vec4( -.2, - .2, - .2,  1.0 ), // 2
    vec4(  .2, -.2,  -.2,  1.0 ), // 3
        vec4( 0, 0,- .6,  1.0 ), // 4

  ];

 var faceIndices = [
   [ 1,0,4 ], // 0  back face
   [ 0,4,2 ], // 1  top face
   [ 2,4,3 ], // 2  right face
   [ 3,4,1], // 3  bottom face


  ];


     for ( i = 0; i < 4; i++ ) {
    points.push( vertices[faceIndices[i][0]] );
    points.push( vertices[faceIndices[i][1]] );
    points.push( vertices[faceIndices[i][2]] );

  }
      for ( i = 0; i < 4; i++ ) {
    points.push( vertices2[faceIndices[i][0]] );
    points.push( vertices2[faceIndices[i][1]] );
    points.push( vertices2[faceIndices[i][2]] );

  }
     for ( i = 0; i < 4; i++ ) {
    points.push( vertices3[faceIndices[i][0]] );
    points.push( vertices3[faceIndices[i][1]] );
    points.push( vertices3[faceIndices[i][2]] );

  }
     for ( i = 0; i < 4; i++ ) {
    points.push( vertices4[faceIndices[i][0]] );
    points.push( vertices4[faceIndices[i][1]] );
    points.push( vertices4[faceIndices[i][2]] );

  }

     for ( i = 0; i < 4; i++ ) {
    points.push( vertices5[faceIndices[i][0]] );
    points.push( vertices5[faceIndices[i][1]] );
    points.push( vertices5[faceIndices[i][2]] );

  }
     for ( i = 0; i < 4; i++ ) {
    points.push( vertices6[faceIndices[i][0]] );
    points.push( vertices6[faceIndices[i][1]] );
    points.push( vertices6[faceIndices[i][2]] );

  }


   for (i = 0; i < 72; i++) {
    var nextColor = vec4(0.0, 0.0, 0.0, 1.0);
    for (j = 0; j < 3; j++) {
      nextColor[j] = Math.random();
    }
    colors.push(nextColor);
}




  return 72;
}

function pyramid( points, k, colors ) {

  var apex          = vec4( 0.0, 1.0, 0.0, 1.0);
  var baseCenter    = vec4( 0.0, 0.0, 0.0, 1.0);
  var baseVertices  = [];
  var vertsPerSlice = 6; // base triangle and side triangle

  var theta = 2.0 * Math.PI / k;
  for ( i = 0; i < k; i++ ) {
    var angle = i * theta;
    baseVertices.push( vec4( Math.cos(angle), 0.0, Math.sin(angle), 1.0));
  }

  for (i = 0; i < k-1; i++ ) {
    points.push( baseCenter );
    points.push( baseVertices[i] );
    points.push( baseVertices[i+1] );
    points.push( apex );
    points.push( baseVertices[i+1] );
    points.push( baseVertices[i] );
  }
  points.push( baseCenter );
  points.push( baseVertices[k-1] );
  points.push( baseVertices[0] );
  points.push( apex );
  points.push( baseVertices[0] );
  points.push( baseVertices[k-1] );

    for (i = 0; i < vertsPerSlice * k; i++) {
      var nextColor = vec4(0.0, 0.0, 0.0, 1.0);
      for (j = 0; j < 3; j++) {
        nextColor[j] = minPyrColor[j] +
                       Math.random() * (maxPyrColor[j] - minPyrColor[j]);
      }
      colors.push(nextColor);
    }

  return vertsPerSlice * k;
}

function bullet( points , color ) {

  const numFaces     = 6;
  const vertsPerFace = 6;

  var vertices = [
    vec4( -1.0, -1.0,  1.0,  1.0 ), // 0
    vec4( -1.0,  1.0,  1.0,  1.0 ), // 1
    vec4(  1.0,  1.0,  1.0,  1.0 ), // 2
    vec4(  1.0, -1.0,  1.0,  1.0 ), // 3
    vec4( -1.0, -1.0, -1.0,  1.0 ), // 4
    vec4( -1.0,  1.0, -1.0,  1.0 ), // 5
    vec4(  1.0,  1.0, -1.0,  1.0 ), // 6
    vec4(  1.0, -1.0, -1.0,  1.0 )  // 7
  ];

  var faceIndices = [
    [ 1, 0, 3, 2 ], // 0  front face
    [ 2, 3, 7, 6 ], // 1  right face
    [ 3, 0, 4, 7 ], // 2  bottom face
    [ 6, 5, 1, 2 ], // 3  top face
    [ 4, 5, 6, 7 ], // 4  back face
    [ 5, 4, 0, 1 ]  // 5  left face
  ];

  for ( i = 0; i < numFaces; i++ ) {
    points.push( vertices[faceIndices[i][0]] );
    points.push( vertices[faceIndices[i][1]] );
    points.push( vertices[faceIndices[i][2]] );
    points.push( vertices[faceIndices[i][0]] );
    points.push( vertices[faceIndices[i][2]] );
    points.push( vertices[faceIndices[i][3]] );
  }


    for (i = 0; i < vertsPerFace * numFaces; i++) {
      var nextColor = vec4(0.0, 0.0, 0.0, 1.0);
      for (j = 0; j < 3; j++) {
        nextColor[j] = bulletColor[j] 
      }
      colors.push(nextColor);
    }
  
  return vertsPerFace * numFaces;
}

