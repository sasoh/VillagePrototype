var camera;
var scene;
var renderer;
var mesh;

function degreesToRadians(degrees) {

  return degrees * (Math.PI / 180);

}

function initSampleSceneGeometry() {

    // dummy mesh to show something alive on the scene

  var phongMaterial = new THREE.MeshPhongMaterial({
    overdraw: true,
    color: 0xCCCCCC
  })

  var light = new THREE.DirectionalLight(0xF6E86D, 1);
  light.position.set(1, 3, 2);
  scene.add(light);

//  var mgeometry = new THREE.IcosahedronGeometry(150, 1);
  var mgeometry = new THREE.CubeGeometry(100, 100, 100);
  var mmaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
    wireframe: true,
    wireframeLinewidth: 2
  });
  mesh = new THREE.Mesh(mgeometry, phongMaterial);
  mesh.position.y = 90;
  scene.add(mesh);

  // ground plane

  var wgeometry = new THREE.PlaneGeometry(1000, 1000, 25, 25);
//  var image = THREE.ImageUtils.loadTexture('./Resources/io_background.jpg'); // 2500x1400
//  var wmaterial = new THREE.MeshBasicMaterial({
//    map: image
//  });
  var wmaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
    wireframe: true,
    wireframeLinewidth: 1
  });
  mesh
  var wireplane = new THREE.Mesh(wgeometry, phongMaterial);
  wireplane.rotation.x = degreesToRadians(-90); // initially the plane is in the XY-plane
  scene.add(wireplane);

}

function init() {

  // renderer

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // camera

  var fieldOfView = 75;
  var aspectRatio = window.innerWidth / window.innerHeight;
  var nearPlane = 1;
  var farPlane = 1000;
  camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
  // raise the camera a bit & rotate toward the ground
  camera.position.y = 500;
  camera.position.z = 500;
  camera.rotation.x = degreesToRadians(-60);

  // scene & geometry

  scene = new THREE.Scene();

  initSampleSceneGeometry();

}

function animate() {

  mesh.rotation.x = Date.now() * 0.0001;
  mesh.rotation.y = Date.now() * 0.0002;
  renderer.render(scene, camera);

  requestAnimationFrame(animate);

}

function run() {

  init();

  animate();

}

run();
