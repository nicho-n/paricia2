import * as THREE from "../three/threejs/three.module.js";
var textureLoader = new THREE.TextureLoader();

var geometry = new THREE.SphereBufferGeometry(6791, 100, 50);
var moonScale = 0.23;

var materialMoon = new THREE.MeshPhongMaterial({
  map: textureLoader.load("textures/planets/moon_1024.jpg")
});

moon_1 = new THREE.Mesh(geometry, materialMoon);
moon_1.position.set(6791 * 5, 0, 0);
moon_1.scale.set(moonScale, moonScale, moonScale);

export var moon_1 = moon_1;
