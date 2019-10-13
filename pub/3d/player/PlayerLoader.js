import {OBJLoader} from "../three.js/three.module.js"
import { scene } from "../scene/scene.js"
export var PlayerLoader = {
    load: function(player) {
        var loader = new OBJLoader();
        var player =loader.parse(player.ship)
        //player.add(camera);
        //camera.position.set(0, 70, 500);        
        scene.add(player);
    },
}
