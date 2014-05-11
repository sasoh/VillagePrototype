var camera;
var scene;
var renderer;
var mesh;
var controls;
var clock;
var gui;
var guiControls;
var controllerActive;
var currentFov;
var currentCameraRotation;

function degreesToRadians(degrees) {

	return degrees * (Math.PI / 180);

}

var guiText = function() {

	// camera controls
	this.fov = currentFov;
	this.cameraAngle = currentCameraRotation;
	this.groundRotation = 0;
	
	// material controls
	this.solid = false;
	this.wireframe = false;
	// this.textured = false;
	
	this.explode = function() {
		// Define render logic ...
	};

};

function initGui() {
	
	gui = new dat.GUI();
	guiControls = new guiText();
	
	// fov
	var minFov = 30;
	var maxFov = 95;
	var fovController = gui.add(guiControls, 'fov', minFov, maxFov).listen();
	fovController.onChange(function(value) {
	
		camera.fov = value;
		camera.updateProjectionMatrix();
		
		controllerActive = false;
		
	});
	fovController.onFinishChange(function() {
	
		controllerActive = true;
		
	});
	
	// camera angle
	var minAngle = 0;
	var maxAngle = 90;
	var angleController = gui.add(guiControls, 'cameraAngle', minAngle, maxAngle)
	angleController.onChange(function(value) {
	
		camera.rotation.x = degreesToRadians(-value);
		camera.updateProjectionMatrix();
		
		controllerActive = false;
		
	});
	angleController.onFinishChange(function() {
	
		controllerActive = true;
		
	});
	
	// ground rotation
	var minGroundAngle = -180;
	var maxGroundAngle = 180;
	var groundAngleController = gui.add(guiControls, 'groundRotation', minGroundAngle, maxGroundAngle);
	groundAngleController.onChange(function(value) {
	
		mesh.rotation.z = degreesToRadians(-value);
		
		controllerActive = false;
		
	});
	groundAngleController.onFinishChange(function() {
	
		controllerActive = true;
		
	});
	
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

function loadCustomModels() {
	
	var loader = new THREE.ColladaLoader();
	loader.load('Resources/models/ground.dae', function(result) {
		mesh = result.scene;
		mesh.rotation.x = degreesToRadians(-90);
	
		scene.add(mesh);
		console.log(mesh);
	});

}

function onWindowResize() {

	renderer.setSize( window.innerWidth, window.innerHeight );
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

}

function init() {

	clock = new THREE.Clock();
	
	// renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0xcccccc, 1);
	document.body.appendChild(renderer.domElement);
	
	window.addEventListener('resize', onWindowResize, false );

	// camera
	currentFov = 45;
	var aspectRatio = window.innerWidth / window.innerHeight;
	var nearPlane = 10;
	var farPlane = 500;
	camera = new THREE.PerspectiveCamera(currentFov, aspectRatio, nearPlane, farPlane);
	// raise the camera a bit & rotate toward the ground
	currentCameraRotation = 45;
	camera.position.y = 25;
	camera.position.z = 25;
	camera.rotation.x = degreesToRadians(-currentCameraRotation);
		
	// control
	controls = new rtsCameraControl(camera);
	controls.moveSpeed = 1;
	controls.lookSpeed = 0.005;
	controllerActive = true;

	// scene & geometry
	scene = new THREE.Scene();
	// scene.fog = new THREE.FogExp2(0x9DB3B5, 0.0005);

	// add some ambient lighting
    var ambientLight = new THREE.AmbientLight(0xCCCCCC);
    scene.add(ambientLight);
	
    // directional lighting
	var directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.5);
	directionalLight.position.set(0, 1, 0);
	scene.add(directionalLight);
	
}

function animate() {

	renderer.render(scene, camera);
	controls.update(clock.getDelta(), controllerActive);
	guiControls.fov = camera.fov;
	requestAnimationFrame(animate);

}

function run() {

	init();
	initGui();
	// initSampleSceneGeometry();
	loadCustomModels();
	animate();

}

run();
