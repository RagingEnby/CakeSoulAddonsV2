import Settings from "../Amaterasu/core/Settings"
import DefaultConfig from "../Amaterasu/core/DefaultConfig"

const moduleName = 'CakeSoulAddons';
const metadata = JSON.parse(FileLib.read(moduleName, 'metadata.json'));


const infoCategory = "Info";
const soulFormatCategory = "Soul Formatting";

const colorSchemePath = "data/ColorScheme.json"
const schemes = [colorSchemePath]

const defaultConf = new DefaultConfig(moduleName, "data/settings.json")
    // Info
    .addTextParagraph({
        category: infoCategory,
        configName: "textParagraph",
        title: `${moduleName} v${metadata.version} - by ${metadata.creator}`,
        description: metadata.description,
        tags: ["cake", "soul", "addons", "config", "settings"]
    })
    .addButton({
        category: infoCategory,
        configName: "MyDiscord",
        title: "Discord Server",
        description: "Join my Discord server to see what else I'm working on!",
        placeHolder: "Join",
        tags: ["discord", "server", "join"],
        onClick: (_) => {
            java.awt.Desktop.getDesktop().browse(new java.net.URI("https://ragingenby.dev/server?ref=csa"));
        }
    })

    // Soul Formatting
    .addSelection({
        category: soulFormatCategory,
        configName: "capturedDateFormat",
        title: "Captured Date Format",
        description: "Alter the format that Cake Souls display their captured date in",
        options: ["(Default)", "MM/DD/YY", "DD/MM/YY", "January 1st, 2025", "January 01 '25"],
        tags: ["cake", "soul", "format", "date"]
    })


const config = new Settings(moduleName, defaultConf, colorSchemePath)
export default config.settings
