VillagePrototype
================

Three.js-powered RTS camera with simple buildings &amp; landscape. I will be implementing functionalities over unregular periods of time, but will try to follow through the list.

To do:
---
- [x] Canvas initialization
- [x] Flat terrain
- [x] Moving camera
- [ ] Simple terrain & textured buildings
- [ ] UI for camera control
- [ ] Mouse click-object intersection

How to run:
--
A webserver is needed + the master from [here](https://github.com/sasoh/VillagePrototype/archive/master.zip) + open __main.html__ in a WebGL-supporting browser ([Can I use WebGL?](http://caniuse.com/webgl)).

Status update:
---

__2014-05-10__

Added a simple textured terrain. The problems from earlier were caused by the improper materials my 3d artists supplied. Next thing to do is to redo the building materials & add their meshes to the scene.

__2014-04-21__

Proper COLLADA export from 3dsmax of given models not absolved of problems. Simple diffuse map textures seem not to be loading. Investigation so far not helping. Will be trying other formats (first with the good old _.obj_). Updated to do list with some things that would be needed.

__2014-04-11__

Got sample models from 3D artist friends. Should be looking at file loading now. And maybe rearrange the buildings. Setting better near/far planes & toying with the fog might be an interesting point to focus at at some point.


__2014-04-09__

Added autoscroll & zoom capability.