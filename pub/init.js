import * as THREE from "./three/three.module.js";
import { EffectComposer } from "./jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "./jsm/postprocessing/RenderPass.js";
import { starsGeometry, starsMaterials } from "./stars.js";
import { planet_1, planet_1_clouds } from "./planets/planet_1.js";
import { moon_1 } from "./planets/moon_1.js";
import { FlyControls } from "./jsm/controls/FlyControls.js";

var position_indicator = document.getElementById("position_indicator");
var rotationSpeed = 0.02;
var scene, dirLight, composer, controls, camera, renderer, clock, renderModel, camera;
var SCREEN_HEIGHT = window.innerHeight;
var SCREEN_WIDTH = window.innerWidth;

function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  dirLight = new THREE.DirectionalLight(0xffffff);
  camera = new THREE.PerspectiveCamera(25, screen.height / screen.width, 50, 1e7);
  controls = new FlyControls(camera);
  clock = new THREE.Clock();

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

  dirLight.position.set(-1, 0, 1).normalize();

  camera.position.z = 6540 * 5;
  camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
  camera.updateProjectionMatrix();

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.00000025);
  scene.add(dirLight);
  scene.add(planet_1);
  scene.add(planet_1_clouds);
  scene.add(moon_1);

  //TODO: Make better stars
  for (var i = 10; i < 30; i++) {
    var stars = new THREE.Points(starsGeometry[i % 2], starsMaterials[i % 6]);
    stars.rotation.x = Math.random() * 6;
    stars.rotation.y = Math.random() * 6;
    stars.rotation.z = Math.random() * 6;
    stars.scale.setScalar(i * 10);
    stars.updateMatrix();
    scene.add(stars);
  }

  renderModel = new RenderPass(scene, camera);
  composer = new EffectComposer(renderer);
  composer.addPass(renderModel);
  document.body.appendChild(renderer.domElement);
  window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize() {
  SCREEN_HEIGHT = window.innerHeight;
  SCREEN_WIDTH = window.innerWidth;
  camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
  camera.updateProjectionMatrix();
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  composer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  var delta = clock.getDelta();
  planet_1.rotation.y += rotationSpeed * delta;
  planet_1_clouds.rotation.y += 1.25 * rotationSpeed * delta;
  position_indicator.innerHTML = camera.position.x + "," + camera.position.y + "," + camera.position.z;
  controls.update(delta);
  composer.render(delta);
}

init();
animate();
