var PlayerLoader = {
    load: function(playerRes, isOtherPlayer) {
        var loader = new OBJLoader();
        player = loader.parse(playerRes.ship)
        player.position.set(playerRes.position.x, playerRes.position.y, playerRes.position.z)

        isOtherPlayer ?  initOtherPlayer(player) : initPlayer(player)
       
        scene.add(player);
    },
}

