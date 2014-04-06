var camera;
var scene;
var renderer;
var mesh;

function init() {

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.y = 500;
  camera.position.z = 500;
  camera.rotation = new THREE.Vector3(-1 , 0, 0);

  scene = new THREE.Scene();

  var mgeometry = new THREE.IcosahedronGeometry(200, 1);
  var mmaterial = new THREE.MeshBasicMaterial({ color: 0x0A0A0A, wireframe: true, wireframeLinewidth: 2});
  mesh = new THREE.Mesh(mgeometry, mmaterial);
  scene.add(mesh);

  var wgeometry = new THREE.PlaneGeometry( 1000, 1000, 25, 25 );
  var wmaterial = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, wireframeLinewidth: 1 } );
  var wireplane = new THREE.Mesh(wgeometry, wmaterial);
  wireplane.scale.set( 1, 1, 1 );
  wireplane.rotation.x = - Math.PI / 2;
  scene.add(wireplane);

  renderer = new THREE.CanvasRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

}

function animate() {

  requestAnimationFrame(animate);
  mesh.rotation.x = Date.now() * 0.00005;
  mesh.rotation.y = Date.now() * 0.0001;
  renderer.render(scene, camera);

}

init();
animate();
