var camera;
var scene;
var renderer;
var mesh;
var controls;
var clock;

function degreesToRadians(degrees) {

	return degrees * (Math.PI / 180);

}

function initSampleSceneGeometry() {

	// dummy mesh to show something alive on the scene
	var phongMaterial = new THREE.MeshPhongMaterial({
		overdraw: true,
		color: 0xCCCCCC
	})

	// single directional light
	var light = new THREE.DirectionalLight(0xF6E86D, 1);
	light.position.set(1, 3, 2);
	scene.add(light);

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
	var image = THREE.ImageUtils.loadTexture('./Resources/io_background.jpg'); // 2500x1400
 	// var wmaterial = new THREE.MeshBasicMaterial({
		// map: image
	// });
	var wmaterial = new THREE.MeshBasicMaterial({
		color: 0x000000,
		wireframe: true,
		wireframeLinewidth: 1
	});
	
	var wireplane = new THREE.Mesh(wgeometry, phongMaterial);
	wireplane.rotation.x = degreesToRadians(-90); // initially the plane is in the XY-plane
	scene.add(wireplane);
	
}

function init() {

	clock = new THREE.Clock();
	
	// renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0xcccccc, 1);
	document.body.appendChild(renderer.domElement);

	// camera
	var fieldOfView = 75;
	var aspectRatio = window.innerWidth / window.innerHeight;
	var nearPlane = 1;
	var farPlane = 1100;
	camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
	// raise the camera a bit & rotate toward the ground
	camera.position.y = 500;
	camera.position.z = 500;
	camera.rotation.x = degreesToRadians(-60);
		
	// control
	controls = new rtsCameraControl(camera);
	controls.moveSpeed = 10;
	controls.lookSpeed = 0.1;

	// scene & geometry
	scene = new THREE.Scene();
	// scene.fog = new THREE.FogExp2(0x9DB3B5, 0.0005);
	initSampleSceneGeometry();

}

function animate() {

	mesh.rotation.x = Date.now() * 0.0001;
	mesh.rotation.y = Date.now() * 0.0002;
	renderer.render(scene, camera);
	controls.update(clock.getDelta());
	requestAnimationFrame(animate);

}

function run() {

	init();
	animate();

}

run();
