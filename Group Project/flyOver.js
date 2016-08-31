
var down = {};
var canvas;
var gl;
var numberOfShots = 0;
var bx = 0
var  by  = 0; 
var bz = 0; 
var arrayOfBullets = new Array(); 
var arrayOfEnemies = new Array(); 

var bulletShot = false;
var numEnemyPoints = 0; 
var createEnemey = false;  
var bulletStart;  
var points;
var colors;
  var skyStart; 

var rotationTesting = 45; 
 
  var enemySpeed = .001; 


// parameters for creating the globe
const divs          =  4; // number of recursive divisions

// parameters for the globe transformation matrices
const sx = 10, sy = 1, sz = 5; // scale factors
const sx2 =10 , sy2 = 10, sz2 = 1; // scale factors

const dx = 0.5, dy = 0.0, dz = 0.0; // translation factors


const xRotateDivs  = 180; // number of positions around the revolution
var   xRotatePos   =   0; // current position around the revolution
                          // (0 ... xRotateDivs - 1)

const revolveDivs  = 540; // number of positions around the revolution
var   revolvePos   =   0; // current position around the revolution
                          // (0 ... revolveDivs - 1)

const obliqueAngle = -45.0;  // degrees

// constant globe matrices
const zRotateScaleAndTranslate =
               mult(mult(translate(dx, dy, dz), scalem(sx, sy, sz)),
                    rotate(90.0, 0.0, 0.0, 1.0));
const obliqueRotate = rotate(obliqueAngle, 0.0, 1.0, 0.0);

// parameters for the pyramids (quad based)
const pyrBaseVerts   = 4;
var   pyrStart       = 0;    // actual value computed in init
var   numPyrPoints   = 6 * pyrBaseVerts; // actual value computed in init
var numBulletPoints; 
const psx = 0.4, psy =  0.5, psz = 0.4;  // scale factors
const pdx = 0.7, pdy = -0.8, pdz = 0.7;  // translation factors
const pyrScale       = scalem(psx, psy, psz);
var dvx;
var dvy;
var dvz;

// Parameters for viewer position
const initViewerDist  =  4.0;
const minViewerDist   =  2.0;
const maxViewerDist   = 10.0;
const maxOffsetRatio  =  1.0;
const deltaViewerDist =  0.25;
const deltaOffset     =  0.1;
var   eye             = vec3(0.0, 0.0, initViewerDist);
var at              = vec3(0.0, 0.0, 0.0);
var up              = vec3(0.0, 1.0, 0.0);
var speedOfCharacter = .05

// Fly-over parameters
var   flying          = false;
var numSkyPoints; 
const flyDelta        = 0.01;
var   fdx = 0;
var  fdy = 0; 
var  fdz = 0;
const startEye        = vec3(0.0, 0.0, initViewerDist);;
const startAt         = vec3(0.0, 0.0, 0.0);

// Projection transformation parameters
var   fieldOfViewY = 40.0,
      aspectRatio  =  1.0, // actual value set in init
      zNear        =  1.0,
      zFar         = 20.0;

var   modelViewLoc;  // uniform location of the modelView matrix
var   projectionLoc; // uniform location of the projection matrix


function keyRelease(e){
var keyCode = e.keyCode; 
    down[keyCode] = false;


}

function keyPressed(e){

var keyCode = e.keyCode;
down[keyCode] = true;





if(down[32]){


  arrayOfBullets.push(new bulletObject(eye[0],0,eye[2]-1 ));
}
//up
if(down[38]){

     eye[2] -= speedOfCharacter;
     up[2]  += speedOfCharacter;
}
//left
if(down[37] ){
eye[0] -= speedOfCharacter; 
at[0]  -= speedOfCharacter;
}
//down
if(down[40]){

eye[2] += speedOfCharacter;
up[2]  += speedOfCharacter;
}
//right
if(down[39]){
fdz = 0; 
eye[0] += speedOfCharacter;
at[0]  += speedOfCharacter;
}
if(down[69]){
  arrayOfEnemies.push(new enemyObject(0,.5,-3));



}
}

window.onload = function init()
{
    canvas = document.getElementById("gl-canvas");
   document.addEventListener( "keydown", keyPressed,false );
      document.addEventListener( "keyup", keyRelease,false );

  aspectRatio  =  canvas.width / canvas.height;
    gl = WebGLUtils.setupWebGL( canvas );
    if (!gl) { alert("WebGL isn't available"); }
   gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 0.9, 0.75, 1.0); // light yellow background
    gl.enable(gl.DEPTH_TEST);
    
     points = [];
     colors = [];

  
    numPyrPoints    = pyramid(points,4, colors);
    numFloorPoints = ground(points, colors); 
    numSkyPoints = sky(points, colors);
    numBulletPoints = bullet(points, colors);
   numEnemyPoints = enemy(points, colors); 

 
setBuffer(); 

   } 
    function setBuffer(){
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);
    
    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);
    
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    modelViewLoc  = gl.getUniformLocation(program, "model_view");
    projectionLoc = gl.getUniformLocation(program, "projection");
    

    var offsetRatio;

    setInterval(function(){ render()}, 5);

  

      }  


function render()
{
  // clear the window
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // set up projection matrix
  var projection = perspective(fieldOfViewY, aspectRatio, zNear, zFar);
  gl.uniformMatrix4fv(projectionLoc, false, flatten(projection));

  // set up view position
  var viewer = lookAt(eye, at, up);
  // Set up pyramids
  // right front pyramid
  var pyrTranslate = translate(pdx, pdy, pdz);
  mv = mult(mult(viewer, pyrTranslate),
            mult(pyrScale, rotate(45.0, 0.0, 1.0, 0.0)));
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(mv));
  gl.drawArrays(gl.TRIANGLES, pyrStart, numPyrPoints);

  // right rear pyramid
  pyrTranslate = translate(pdx, pdy, -pdz);
  mv = mult(mult(viewer, pyrTranslate),
            mult(pyrScale, rotate(135.0, 0.0, 1.0, 0.0)));
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(mv));
  gl.drawArrays(gl.TRIANGLES, pyrStart, numPyrPoints);

  // left front pyramid
  pyrTranslate = translate(-pdx, pdy, pdz);
  mv = mult(mult(viewer, pyrTranslate),
            mult(pyrScale, rotate(225.0, 0.0, 1.0, 0.0)));
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(mv));
  gl.drawArrays(gl.TRIANGLES, pyrStart, numPyrPoints);

  // left rear pyramid
  pyrTranslate = translate(-pdx, pdy, -pdz);
  mv = mult(mult(viewer, pyrTranslate),
            mult(pyrScale, rotate(315.0, 0.0, 1.0, 0.0)));
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(mv));
  gl.drawArrays(gl.TRIANGLES, pyrStart, numPyrPoints);

   // this is for the ground
  groundTranslate = translate(0, -1.5, 0);
  var goundScale =  scalem(sx, sy, sz)
  mv = mult(groundTranslate, mult(viewer, goundScale));
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(mv));
  gl.drawArrays(gl.TRIANGLES, pyrStart +numPyrPoints, 6);



   // this is for the sky
    skyStart = pyrStart +numPyrPoints + numFloorPoints; 
 var  skyTranslate = translate(0, -6, -3);
 var skyScale =  scalem(sx2, sy2, sz2);
  mv =  mult(viewer, skyTranslate);
  mv = mult(skyTranslate, mult(viewer, skyScale));
 gl.uniformMatrix4fv(modelViewLoc, false, flatten(mv));
  gl.drawArrays(gl.TRIANGLES, skyStart, 6);


   // this is for the bullet

    for( i = 0; i<arrayOfBullets.length; i++){
    bulletStart = skyStart + 6; 

    var currentBullet = arrayOfBullets[i];

    var  bulletTranslate = translate(currentBullet.x, currentBullet.y, currentBullet.z);
    var bulletScale =  scalem(.02, .02, .02);
    mv = mult(bulletTranslate, mult(viewer, bulletScale));

  gl.uniformMatrix4fv(modelViewLoc, false, flatten(mv));
  gl.drawArrays(gl.TRIANGLES, bulletStart, numBulletPoints);
  bulletShot = true; 
  currentBullet.z -= .05;

if (currentBullet.z < -5.0) {
       

       arrayOfBullets.splice(i, 1);
           }
  


    }

  




  //creating the enemies


    for(i = 0; i <arrayOfEnemies.length; i++){
var currentEnemy = arrayOfEnemies[i]; 
      var startEnemy = skyStart + 6 + numBulletPoints; 
   var  enemyTranslate = translate(currentEnemy.x, currentEnemy.y, currentEnemy.z);
   var skyScale =  scalem(.2, .2, .2);

   var enemeyRotate =  rotate(rotationTesting, 0
, 0, 1);

  mv = mult(mult(enemyTranslate, mult(viewer, skyScale)),enemeyRotate);
  gl.uniformMatrix4fv(modelViewLoc, false, flatten(mv));
  gl.drawArrays(gl.TRIANGLES, startEnemy, numEnemyPoints);



if(eye[0]<currentEnemy.x){

  currentEnemy.x -= enemySpeed; 
} if(eye[0]>currentEnemy.x){

  currentEnemy.x += enemySpeed; 

}if(eye[2]-1.4>currentEnemy.z){

  currentEnemy.z += enemySpeed; 
}if(eye[2]-.5<currentEnemy.z){

  currentEnemy.z -= enemySpeed; 
}if(eye[1]>currentEnemy.y){

  currentEnemy.y += enemySpeed; 
}if(eye[1]<currentEnemy.y){

  currentEnemy.y -= enemySpeed; 
}



    }

   



rotationTesting += .5; 

checkForCollision(); 


  // requestAnimFrame(render);

  

}

function checkForCollision(){



for(b = 0; b<arrayOfBullets.length; b++){
  for(e = 0;e<arrayOfEnemies.length; e++){
var currentBullet = arrayOfBullets[b];
var currentEnemy = arrayOfEnemies[e];

//console.log("Current bullet x: " + currentEnemy.h); 

//console.log("Current Enemey x" + currentEnemy.x); 

//console.log("Current bullet x: " +currentEnemy.width ); 


    if(currentBullet.x <currentEnemy.x+currentEnemy.w && currentBullet.x>currentEnemy.x-currentEnemy.w && currentBullet.y<currentEnemy.y+currentEnemy.h && currentBullet.y > currentEnemy.y - currentEnemy.h && currentBullet.z<currentEnemy.z+currentEnemy.d && currentBullet.z > currentEnemy.z- currentEnemy.d ){

           arrayOfBullets.splice(b, 1);

currentEnemy.damage = currentEnemy.damage -1; 
console.log(currentEnemy.damage); 
           if(currentEnemy.damage <=0){


           arrayOfEnemies.splice(e, 1);

           }


    }



  }

}


}
