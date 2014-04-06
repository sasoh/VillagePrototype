var camera;
var scene;
var renderer;
var mesh;


function degreesToRadians(degrees) {

  return degrees * (Math.PI / 180);

}

function init() {

  // renderer

  renderer = new THREE.CanvasRenderer();
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

  // dummy mesh to show something alive on the scene

  var mgeometry = new THREE.IcosahedronGeometry(150, 1);
  var mmaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
    wireframe: true,
    wireframeLinewidth: 2
  });
  mesh = new THREE.Mesh(mgeometry, mmaterial);
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
  var wireplane = new THREE.Mesh(wgeometry, wmaterial);
  wireplane.rotation.x = degreesToRadians(-90); // initially the plane is in the XY-plane
  scene.add(wireplane);

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
