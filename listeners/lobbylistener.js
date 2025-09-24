/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />
import { chat, debug } from "../modules/chat.js";


let LOBBY_PLAYERS = {};
export function getLobbyPlayers() {return LOBBY_PLAYERS};


register("worldLoad", (event) => {
    LOBBY_PLAYERS = {};
})


register("playerJoined", (player) => {
    const uuid = player.getUUID();
    if (uuid.version() !== 4) return;
    const name = player.getName();
    const displayName = player.getDisplayName();
    LOBBY_PLAYERS[uuid] = {
        id: uuid.toString(),
        name: name.toString(),
        displayName: displayName.getText()
    }
})
