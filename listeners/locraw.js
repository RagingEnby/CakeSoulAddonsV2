/// <reference types="../../../CTAutocomplete" />
/// <reference lib="es2015" />
import { chat, debug } from "../chat.js";


let LOCRAW = undefined;
let WAITING = false;


export function getLocraw() {
    // if LOCRAW is defined, return it
    if (LOCRAW) return LOCRAW;
    // if LOCRAW is undefined, request it
    requestLocraw();
    // wait for locraw to become defined
    if (!LOCRAW) setTimeout(() => {
        return getLocraw();
    }, 50)
    // when it does, return it
    return LOCRAW;
}


function requestLocraw() {
    if (WAITING) return;
    WAITING = true;
    ChatLib.say("/locraw");
}


register("worldLoad", () => {
    debug("worldLoad");
    LOCRAW = undefined;
    setTimeout(getLocraw, 500);
});


// only detects locraw messages
register("chat", (event) => {
    LOCRAW = JSON.parse(ChatLib.getChatMessage(event));
    if (WAITING) {
        debug("requested locraw received");
        WAITING = false;
        cancel(event);
    }
}).setCriteria('{"server":"').setStart();
