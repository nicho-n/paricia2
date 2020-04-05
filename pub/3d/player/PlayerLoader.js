var PlayerLoader = {
    load: function(player1) {
        var loader = new OBJLoader();
        player = loader.parse(player1.ship)
        player.add(camera);
        player.scale.set(6,6,6);
        player.position.set(0,0,22890)
        camera.position.set(0, 25, 250);   
        controls = new THREE.FlyControls(player);    
        controls.movementSpeed = 1000;
        controls.rollSpeed = Math.PI / 24;
        controls.autoForward = false;
        controls.dragToLook = false;
        scene.add(player);
    },
}
