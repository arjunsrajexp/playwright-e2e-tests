import path from 'path';
import { type FullConfig } from "playwright/test";
import fs from 'fs'

export default async function globalSetup(config: FullConfig) {
    console.log(`[INFO]: Starting the global setup...`);

    if (process.env.RUNNER?.toUpperCase() === 'LOCAL') {
        console.log(`[INFO]: Detecting Local Runs...`);
        //Delete Allure Results
        const resultDir = path.resolve(process.cwd(), "allure-results")
        console.log(`>>resultDir:${resultDir}`);

        if (fs.existsSync(resultDir)) {
            fs.rmSync(resultDir, { recursive: true, force: true })
            console.log(`Allure Reports Deleted for Local Run`);
        }

    }
    console.log(`[INFO]: Completing the global setup...`);

    // All Other one off tasks goes here..

    //Set the login cookie global variable
    process.env.LOGIN_COOKIES = undefined
}