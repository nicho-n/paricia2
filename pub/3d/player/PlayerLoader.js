var PlayerLoader = {
    load: function(playerInfo, isOtherPlayer) {
        var loader = new OBJLoader();
        var player = playerInfo;
        player.position = new THREE.Vector3(playerInfo.position.x, playerInfo.position.y, playerInfo.position.z);
        loader.load('./3d/assets/spaceship.obj', function(rendererPlayer) {
            player.obj = rendererPlayer;
            player.obj.position.set(playerInfo.position.x, playerInfo.position.y, playerInfo.position.z)
            isOtherPlayer ?  initOthers(player) : initPlayer(player)
        });
    }
}

