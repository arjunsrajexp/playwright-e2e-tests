import { defineConfig, devices } from "@playwright/test"
import { baseConfig } from "../playwright.config"

export default defineConfig({
    ...baseConfig // Loads all existing config values
});