import * as THREE from "./three/three.module.js";
import { EffectComposer } from "./jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "./jsm/postprocessing/RenderPass.js";
import { stars } from "./stars.js";
import { planet_1 } from "./planets/planet_1.js";
import { moon_1 } from "./planets/moon_1.js";
import { FlyControls } from "./jsm/controls/FlyControls.js";

var position_indicator = document.getElementById("position_indicator");
var rotationSpeed = 0.003;
var scene, dirLight, composer, controls, camera, renderer, clock, renderModel, camera;
var SCREEN_HEIGHT = window.innerHeight;
var SCREEN_WIDTH = window.innerWidth;

function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  dirLight = new THREE.DirectionalLight(0xaaaaaa, 0.8);
  camera = new THREE.PerspectiveCamera(25, screen.height / screen.width, 50, 1e7);
  controls = new FlyControls(camera);
  clock = new THREE.Clock();

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x000000, 0.00000025);
  scene.add(dirLight);
  scene.add(planet_1);
  scene.add(moon_1);
  scene.add(stars);

  dirLight.position.set(-100, 0, 100).normalize

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  camera.position.z = 6540 * 3.5;
  camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;-
  camera.updateProjectionMatrix();

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
  position_indicator.innerHTML = camera.position.x + "," + camera.position.y + "," + camera.position.z;
  controls.update(delta);
  composer.render(delta);
}

init();
animate();
