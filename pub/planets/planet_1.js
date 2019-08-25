import * as THREE from "../three/three.module.js";
var textureLoader = new THREE.TextureLoader();

var radius = 6371;
var tilt = 0.41;
var cloudsScale = 1.005;

var materialNormalMap = new THREE.MeshPhongMaterial({
  specular: 0x333333,
  shininess: 15,
  map: textureLoader.load("../textures/planets/earth_atmos_2048.jpg"),
  specularMap: textureLoader.load(
    "../textures/planets/earth_specular_2048.jpg"
  ),
  normalMap: textureLoader.load("../textures/planets/earth_normal_2048.jpg"),
  normalScale: new THREE.Vector2(0.85, 0.85)
});

var materialClouds = new THREE.MeshLambertMaterial({
  map: textureLoader.load("../textures/planets/earth_clouds_1024.png"),
  transparent: true
});

var geometry = new THREE.SphereBufferGeometry(radius, 100, 50);
var meshPlanet = new THREE.Mesh(geometry, materialNormalMap);
meshPlanet.rotation.y = 0;
meshPlanet.rotation.z = tilt;

var meshClouds = new THREE.Mesh(geometry, materialClouds);
meshClouds.scale.set(cloudsScale, cloudsScale, cloudsScale);
meshClouds.rotation.z = tilt;

export var planet_1 = meshPlanet;
export var planet_1_clouds = meshClouds;
