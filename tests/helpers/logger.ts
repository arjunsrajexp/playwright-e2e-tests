import { test } from "@playwright/test";
import chalk from "chalk";

type Level = "log" | "info" | "warn" | "error";

export async function log(level: Level, message: string) {
    const plainLine = `[${level.toUpperCase()}]: ${message}`;   // For Allure
    let coloredLine = plainLine;

    // Pick color based on log level
    switch (level) {
        case "info":
            coloredLine = chalk.blue(plainLine);
            break;
        case "warn":
            coloredLine = chalk.yellow(plainLine);
            break;
        case "error":
            coloredLine = chalk.red(plainLine);
            break;
        default:
            coloredLine = plainLine;
    }

    // Print colored text in terminal
    (console[level] || console.log)(coloredLine);

    // Attach plain text to Allure report
    await test.step(plainLine, async () => {});
    
}