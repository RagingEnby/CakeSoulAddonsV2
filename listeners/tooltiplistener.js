/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />
import { chat, debug } from "../modules/chat.js";
import { stripColorCodes, monthToNumber, numberToMonth } from "../modules/utils.js";
import { getSettings } from "../modules/settings.js";
import Lore from "../../Lore/index.js";
const NBTTagString = Java.type("net.minecraft.nbt.NBTTagString")



function validateSoulItem(extraAttributes, lore) {
    if (!extraAttributes.getString('captured_player')) return false;
    if (getSettings().capturedDateFormat === 0) return false; // "(Default)"
    if (lore.length < 3) return false;
    return true;
}

function extractDateString(lore) {
    let dateString = stripColorCodes(lore[2]);
    if (!dateString.startsWith('Captured ')) {
        return null;
    }
    return dateString.substring(9); // remove "Captured " prefix
}

function parseMMDDYY(dateString) {
    if (!dateString.match(/^\d{2}\/\d{2}\/\d{2}$/)) return null;
    return {
        month: parseInt(dateString.substring(0, 2)),
        day: parseInt(dateString.substring(3, 5)),
        year: parseInt('20' + dateString.substring(6, 8))
    };
}

function parseMonthDayYear(dateString) {
    if (!dateString.match(/[a-zA-Z]+ \d{1,2}(?:st|nd|rd|th), \d{4}$/)) return null;
    const parts = dateString.split(' ');
    return {
        month: monthToNumber(parts[0]),
        day: parseInt(parts[1].replace(/(?:st|nd|rd|th)/, '')),
        year: parseInt(parts[2].replace(',', ''))
    };
}

function parseMonthDayApostropheYear(dateString) {
    if (!dateString.match(/[a-zA-Z]+ \d{1,2} '\d{2}$/)) return null;
    const parts = dateString.split(' ');
    return {
        month: monthToNumber(parts[0]),
        day: parseInt(parts[1]),
        year: parseInt('20' + parts[2].substring(1))
    };
}

function parseDate(dateString) {
    let parsed = null;

    parsed = parseMMDDYY(dateString);
    if (parsed) return parsed;

    parsed = parseMonthDayYear(dateString);
    if (parsed) return parsed;

    parsed = parseMonthDayApostropheYear(dateString);
    if (parsed) return parsed;

    debug('malformed captured string (unknown format):', dateString);
    return null;
}

function padDateNum(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(dateInfo) {
    if (!dateInfo) return null;
    const { month, day, year } = dateInfo;

    if (!month || !day || !year) {
        debug('malformed captured string (unable to parse month, day, or year):', dateString, month, day, year);
        return null;
    }

    switch (getSettings().capturedDateFormat) {
        case 1: // MM/DD/YY
            return `${padDateNum(month)}/${padDateNum(day)}/${year.toString().substring(2)}`;
        case 2: // DD/MM/YY
            // 'C5A' is invisible, watermark to indicate this is already formatted as DD/MM/YY
            // otherwise, when formatDate() runs again it will assume that it is actually MM/DD/YY
            // and constantly reverse it back and forth
            return `${padDateNum(day)}/${padDateNum(month)}/${year.toString().substring(2)}§c§5§a`;
        case 3: // January 1st, 2025
            return `${numberToMonth(month)} ${day}${getDaySuffix(day)}, ${year}`;
        case 4: // January 01 '25
            return `${numberToMonth(month)} ${padDateNum(day)} '${year.toString().substring(2)}`;
        default:
            return null;
    }
}

function getDaySuffix(day) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

function onCakeSoulTooltip(item, tag, extraAttributes) {
    let lore = item.getLore();
    if (!lore) return debug('no lore found');
    if (!validateSoulItem(extraAttributes, lore)) return;

    
    if (lore[2].endsWith('§c§5§a')) return; // already formatted as DD/MM/YY

    const dateString = extractDateString(lore);
    if (!dateString) return debug('no date string found');

    const dateInfo = parseDate(dateString);
    if (!dateInfo) return debug('unable to parse date string');

    const formattedDate = formatDate(dateInfo);
    if (!formattedDate) return debug('unable to format date string');

    const coloredDate = `§7Captured ${formattedDate}`
    chat(lore[2]);
    if (lore[2].includes(coloredDate)) return;

    Lore.remove(item, 1, true);
    Lore.insert(item, 1, coloredDate);
}


register("itemTooltip", (_lore, item, _event) => {
    const nbt = item.getNBT();
    //debug(JSON.stringify(nbt.toObject()));//, null, 2));

    const tag = nbt?.getCompoundTag('tag');
    const extraAttributes = tag?.getCompoundTag('ExtraAttributes');
    const item_id = extraAttributes?.getString('id') ?? null;
    if (item_id === "CAKE_SOUL") onCakeSoulTooltip(item, tag, extraAttributes);
})
