import * as THREE from "./three/three.module.js";
var vertices = [];
var vertex = new THREE.Vector3();
var r = 6371, starsGeometry = new THREE.BufferGeometry();

for (var i = 0; i < 20000; i++) {
  vertex.x = Math.random() * 2 - 1;
  vertex.y = Math.random() * 2 - 1;
  vertex.z = Math.random() * 2 - 1;
  vertex.multiplyScalar(r);
  vertices.push(vertex.x, vertex.y, vertex.z);
}

starsGeometry.addAttribute("position",new THREE.Float32BufferAttribute(vertices, 3));
var starsMaterial = new THREE.PointsMaterial({color: 0x555555, size: 2, sizeAttenuation: false});

var stars = new THREE.Points(starsGeometry, starsMaterial);
stars.rotation.x = Math.random() * 6;
stars.rotation.y = Math.random() * 6;
stars.rotation.z = Math.random() * 6;
stars.scale.setScalar(20 * 10);
stars.updateMatrix();

export var stars = stars;