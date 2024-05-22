var textureLoader = new THREE.TextureLoader();

var radius = 6371;
var tilt = 0.75;
var cloudsScale = 1.005;

var materialNormalMap = new THREE.MeshPhongMaterial({
  specular: 0x333333,
  shininess: 15,
  map: textureLoader.load("../textures/planets/mars-surface.jpg"),
  normalScale: new THREE.Vector2(0.85, 0.85)
});

var geometry = new THREE.SphereBufferGeometry(radius, 100, 50);
var planet_1 = new THREE.Mesh(geometry, materialNormalMap);
planet_1.rotation.y = 0;
planet_1.rotation.z = tilt;

