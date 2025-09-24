/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


const PREFIX = "&2[&aCSA&2]&r&7 ";
const DEV_PREFIX = PREFIX.replace("CSA", "CSA-DEV");


export function chat() {
    let prefix = PREFIX;
    let args = [];
    for (let i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
    }
    if (args[0] === "dev") {
        args = args.slice(1);
        prefix = DEV_PREFIX;
    }
    const msg = args.join(" ");
    ChatLib.chat(prefix + msg);
}


export function debug() {
    const msg = Array.prototype.slice.call(arguments).join(" ").replace(/&./g, "");//.replace(/§./g, "");
    console.debug("[CSADEBUG]", msg);
}
