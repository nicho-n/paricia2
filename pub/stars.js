import * as THREE from "./three/three.module.js";

var i,
  r = 6371,
  starsGeometry = [new THREE.BufferGeometry(), new THREE.BufferGeometry()];

var vertices1 = [];
var vertices2 = [];

var vertex = new THREE.Vector3();

for (i = 0; i < 250; i++) {
  vertex.x = Math.random() * 2 - 1;
  vertex.y = Math.random() * 2 - 1;
  vertex.z = Math.random() * 2 - 1;
  vertex.multiplyScalar(r);

  vertices1.push(vertex.x, vertex.y, vertex.z);
}

for (i = 0; i < 1500; i++) {
  vertex.x = Math.random() * 2 - 1;
  vertex.y = Math.random() * 2 - 1;
  vertex.z = Math.random() * 2 - 1;
  vertex.multiplyScalar(r);

  vertices2.push(vertex.x, vertex.y, vertex.z);
}

starsGeometry[0].addAttribute(
  "position",
  new THREE.Float32BufferAttribute(vertices1, 3)
);
starsGeometry[1].addAttribute(
  "position",
  new THREE.Float32BufferAttribute(vertices2, 3)
);

var stars;
var starsMaterials = [
  new THREE.PointsMaterial({
    color: 0x555555,
    size: 2,
    sizeAttenuation: false
  }),
  new THREE.PointsMaterial({
    color: 0x555555,
    size: 1,
    sizeAttenuation: false
  }),
  new THREE.PointsMaterial({
    color: 0x333333,
    size: 2,
    sizeAttenuation: false
  }),
  new THREE.PointsMaterial({
    color: 0x3a3a3a,
    size: 1,
    sizeAttenuation: false
  }),
  new THREE.PointsMaterial({
    color: 0x1a1a1a,
    size: 2,
    sizeAttenuation: false
  }),
  new THREE.PointsMaterial({
    color: 0x1a1a1a,
    size: 1,
    sizeAttenuation: false
  })
];

export var starsGeometry = starsGeometry;
export var starsMaterials = starsMaterials;
