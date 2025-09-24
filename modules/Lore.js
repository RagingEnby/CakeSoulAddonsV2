export const Lore = {
    replace: (item, index, newLine) => {
        const lore = item.getLore();
        if (!lore || index >= lore.length) return;
        lore[index] = newLine;
        item.setLore(lore);
    }
}; 