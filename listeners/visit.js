/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />
import { chat, debug } from "../modules/chat.js";

let VISITORS = [];
export function getVisitors() {return VISITORS};


register("chat", (player, island, event) => {
    const [rank, ign] = player.includes(" ") ? player.split(" ") : ["non", player];
    chat(rank, ign, "is visiting", island);
    VISITORS.push({
        "rank": rank,
        "name": ign,
        "island": island
    })
}).setCriteria("[SkyBlock] ${player} is visiting Your ${island}!");
