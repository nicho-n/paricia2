var PlayerLoader = {
    load: function(player) {
        var loader = new OBJLoader();
        var player =loader.parse(player.ship)
        player.add(camera);
        player.scale.set(6,6,6);
        player.position.set(0,0,22890)
        camera.position.set(0, 25, 250);        
        scene.add(player);
    },
}
