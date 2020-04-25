var PlayerLoader = {
    load: function(playerInfo, isOtherPlayer) {
        var loader = new OBJLoader();
        var player = playerInfo;
        loader.load('./3d/assets/spaceship.obj', function(rendererPlayer) {
            player.obj = rendererPlayer;
            player.obj.position.set(playerInfo.position.x, playerInfo.position.y, playerInfo.position.z)
            isOtherPlayer ?  initOtherPlayer(player) : initPlayer(player)
        });
    }
}

