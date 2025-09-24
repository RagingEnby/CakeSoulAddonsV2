/// <reference types="../../CTAutocomplete" />
/// <reference lib="es2015" />


const MONTH_MAP = {
    'january': 1, 'february': 2, 'march': 3, 'april': 4,
    'may': 5, 'june': 6, 'july': 7, 'august': 8,
    'september': 9, 'october': 10, 'november': 11, 'december': 12
};


export function stripColorCodes(value) {
    return value.toString().replace(/[§&][0-9a-fk-or]/gi, '');
}



export function monthToNumber(month) {
    return MONTH_MAP[month.toLowerCase()];
}


export function numberToMonth(number) {
    const month = Object.keys(MONTH_MAP).find(key => MONTH_MAP[key] === number);
    return month.charAt(0).toUpperCase() + month.slice(1);
}

