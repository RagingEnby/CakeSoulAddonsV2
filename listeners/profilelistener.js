/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />
import { chat, debug } from "../modules/chat.js";


let CURRENT_PROFILE = "unknown";
export function getCurrentProfile() {return CURRENT_PROFILE};


register("chat", (profileId, event) => {
    CURRENT_PROFILE = profileId;
}).setCriteria("Profile ID: ${profileId}");
