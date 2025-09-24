/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />
import { chat, debug } from "./modules/chat.js";
import { getCurrentProfile } from "./listeners/profilelistener.js";
import { getLobbyPlayers } from "./listeners/lobbylistener.js";
import { getVisitors } from "./listeners/visit.js";
import {  } from "./listeners/tooltiplistener.js";
import { getSettings } from "./modules/settings.js";


register("command", (mainArg, ...additionalArgs) => {
    if (!mainArg) {
        getSettings().getConfig().openGui();
    } else {
        chat(mainArg, ...additionalArgs);
    }
}).setName("csa");


register("command", (mainArg, ...additionalArgs) => {
    switch (mainArg) {
        case "profile":
            chat('dev', "You are currently on: &e", getCurrentProfile());
            break;
        
        case "lobby":
            const players = getLobbyPlayers();
            Object.values(players).forEach(player => {
                debug(player.name, '-', player.id, '-', player.displayName);
            });
            break;

        case "tablist":
            const names = TabList.getNames();
            names.forEach(name => {
                chat('dev', name);
                debug(name);
            });
            break;

        default:
            chat('dev', 'unknown command', mainArg);
            break;
    }
}).setName("csadev").setTabCompletions("profile", "lobby", "tablist");


getSettings().getConfig().registerListener("capturedDateFormat", (previousValue, newValue) => {
    chat('dev', `capturedDateFormat &e${previousValue} &7-> &e${newValue}`)
})
