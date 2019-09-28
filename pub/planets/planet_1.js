import * as THREE from "../3d/three.js/three.module.js";
var textureLoader = new THREE.TextureLoader();

var radius = 6371;
var tilt = 0.41;
var cloudsScale = 1.005;

var materialNormalMap = new THREE.MeshPhongMaterial({
  specular: 0x333333,
  shininess: 15,
  map: textureLoader.load("../textures/planets/mars-surface.jpg"),
  normalScale: new THREE.Vector2(0.85, 0.85)
});

var geometry = new THREE.SphereBufferGeometry(radius, 100, 50);
var meshPlanet = new THREE.Mesh(geometry, materialNormalMap);
meshPlanet.rotation.y = 0;
meshPlanet.rotation.z = tilt;

export var planet_1 = meshPlanet;
