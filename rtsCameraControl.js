function rtsCameraControl(camera, options) {
	
	this.camera = camera;
	options = options || {};
	this.domElement = options.domElement || document;
	this.moveSpeed = options.moveSpeed || 1;
	this.domElement.addEventListener('keydown', this.onKeyDown.bind(this), false);
	this.domElement.addEventListener('keyup', this.onKeyUp.bind(this), false);
	this.domElement.addEventListener('mousedown', this.onTouchStart.bind(this), false );
	this.domElement.addEventListener('mousemove', this.onTouchMove.bind(this), false );
	this.domElement.addEventListener('mouseup', this.onTouchEnd.bind(this), false );
	this.domElement.addEventListener('mousewheel', this.onMouseWheel.bind(this), false );
	this.domElement.addEventListener('DOMMouseScroll', this.onMouseWheel.bind(this), false ); // firefox
	
	this.dragging = false;
	this.mouseVector = new THREE.Vector3();
	
}

function checkMapBounds() {
		
	// camera movement bounds
	var halfMapSide = 400; // current sample plane size is 1000x1000, this would place the bounds a bit to the inside
	if (this.camera.position.x < -halfMapSide) {
		this.camera.position.x = -halfMapSide;
	}
	if (this.camera.position.x > halfMapSide) {
		this.camera.position.x = halfMapSide;
	}
	
	// z offset is the distance from the projection of the camera position to the looking point
	var zOffset = this.camera.position.y / Math.tan(this.camera.rotation.x);
	if (this.camera.position.z + zOffset < -halfMapSide) {
		this.camera.position.z = -halfMapSide - zOffset;
	}
	if (this.camera.position.z + zOffset > halfMapSide) {
		this.camera.position.z = halfMapSide - zOffset;
	}
	
}

rtsCameraControl.prototype = {

	update: function() {
		// forward/backward movement will be parallel to the XZ axis
		if (this.moveForward) {
			this.camera.translateZ(-this.moveSpeed * Math.cos(this.camera.rotation.x));
			this.camera.translateY(-this.moveSpeed * Math.cos(Math.PI / 2 - this.camera.rotation.x));
		}
		if (this.moveBackward) {
			this.camera.translateZ(this.moveSpeed * Math.cos(this.camera.rotation.x));
			this.camera.translateY(this.moveSpeed * Math.cos(Math.PI / 2 - this.camera.rotation.x));
		}
		if (this.moveLeft) {
			this.camera.translateX(-this.moveSpeed);
		}
		if (this.moveRight) {
			this.camera.translateX(this.moveSpeed);
		}

		this.camera.position.add(this.mouseVector);
		
		checkMapBounds();
	},
	onKeyDown: function (event) {
		switch (event.keyCode) {
			case 38: /*up*/
			case 87: /*W*/ {
				this.moveForward = true; 
				break;
			}
			case 37: /*left*/
			case 65: /*A*/ {
				this.moveLeft = true;
				break;
			}
			case 40: /*down*/
			case 83: /*S*/ {
				this.moveBackward = true; 
				break;
			}
			case 39: /*right*/
			case 68: /*D*/ {
				this.moveRight = true; 
				break;
			}
		}
	},
	onKeyUp: function (event) {
		switch(event.keyCode) {
			case 38: /*up*/
			case 87: /*W*/ {
				this.moveForward = false; 
				break;
			}
			case 37: /*left*/
			case 65: /*A*/ {
				this.moveLeft = false;
				break;
			}
			case 40: /*down*/
			case 83: /*S*/ {
				this.moveBackward = false; 
				break;
			}
			case 39: /*right*/
			case 68: /*D*/ {
				this.moveRight = false; 
				break;
			}
		}
	},
	onTouchStart: function (event) {
	
		// check for object intersection?
		
		// if no intersection, start dragging
		this.dragging = true;
		this.startPositionX = event.clientX;
		this.startPositionY = event.clientY;
		
		this.mouseVector.set(0, 0, 0);
		
	},
	onTouchMove: function (event) {
	
		if (this.dragging == true) {
			var currentPositionX = event.clientX;
			var currentPositionY = event.clientY;
			
			this.mouseVector.set((this.startPositionX - currentPositionX) / this.moveSpeed, 0, (this.startPositionY - currentPositionY) / this.moveSpeed);
		}

		// autoscroll?
	
	},
	onTouchEnd: function (event) {
	
		this.dragging = false;
		this.mouseVector.set(0, 0, 0);
		
	},
	onMouseWheel: function (event) {
	
		var delta = 0;

		if (event.wheelDelta) { // WebKit / Opera / Explorer 9
			delta = event.wheelDelta / 40;
		} else if (event.detail) { // Firefox
			delta = -event.detail / 3;
		}
		
		// zoom & check bounds afterwards
		
	}

};
