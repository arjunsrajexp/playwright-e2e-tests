import { FullConfig } from "@playwright/test";
import { spawn } from "child_process";

export default async function globalTeardown(config: FullConfig) {
    console.log(`[INFO]: Starting the global teardown process ...`);

    if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
        console.log(" >> Local run detected - starting Allure server...");

        const child = spawn("allure", ["serve"], {
            detached: true,
            stdio: "ignore",
            shell: true,         // needed on Windows for .cmd shims like allure.cmd
        });
        child.unref();           // let the Playwright process exit independently
    }

    console.log(`[INFO]: Completed the global teardown process ...`);
}