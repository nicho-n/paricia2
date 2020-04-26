var position_indicator = document.getElementById("position_indicator");
var rotationSpeed = 0.003;
var dirLight, composer, controls, camera, renderer, clock, renderModel, camera, player, container;
var SCREEN_HEIGHT = window.innerHeight;
var SCREEN_WIDTH = window.innerWidth;
var loginWindow = new UIWindow("Hello", "../ui/login/login.html", "540px", "280px");
var scene = new THREE.Scene();
var players = {};

function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  dirLight = new THREE.DirectionalLight(0xaaaaaa, 0.8);
  camera = new THREE.PerspectiveCamera(25, screen.height / screen.width, 50, 1e7);
  clock = new THREE.Clock();
  scene.fog = new THREE.FogExp2(0x000000, 0.00000025);
  scene.add(dirLight);
  scene.add(planet_1);
  scene.add(moon_1);
  scene.add(stars);
  loginWindow.open();
  loginWindow.show();

  dirLight.position.set(-100, 0, 100).normalize;

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  camera.position.z = 6540 * 3.5;
  camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;-
  camera.updateProjectionMatrix();

  renderModel = new THREE.RenderPass(scene, camera);
  composer = new THREE.EffectComposer(renderer);
  composer.addPass(renderModel);
  document.body.appendChild(renderer.domElement);
  window.addEventListener("resize", onWindowResize, false);
}

function initPlayer(playerRes) {
  player = playerRes;
  player.obj.add(camera);
  player.obj.scale.set(7, 7, 7);
  camera.position.set(0, 17, 125);
  initPlayerControls();
  scene.add(player.obj);
}

function initOthers(otherPlayer){
  players[otherPlayer.username] = otherPlayer;
  scene.add(otherPlayer.obj);
}

function initPlayerControls(){
  controls = new THREE.FlyControls(player.obj);
  controls.movementSpeed = 1000;
  controls.rollSpeed = Math.PI / 24;
  controls.autoForward = false;
  controls.dragToLook = false;
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
  composer.render(delta);
  if (controls) controls.update( delta );
  if (player && !player.position.equals(player.obj.position)){
    player.position = player.obj.position.clone();
    broadcastPosition();
  }
}

init();
animate();
