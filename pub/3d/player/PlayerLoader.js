var PlayerLoader = {
    load: function(player1) {
        var loader = new OBJLoader();
        player = loader.parse(player1.ship)
        player.add(camera);
        player.scale.set(6,6,6);
        player.position.set(0,0,22890)
        camera.position.set(0, 25, 250);        
        scene.add(player);
    },
}
