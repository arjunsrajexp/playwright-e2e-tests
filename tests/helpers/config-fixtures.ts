import { test as base } from '@playwright/test';

export type EnvConfig = {
  URL: string;
  userName: string;
  password: string
};

export const test = base.extend<EnvConfig>({
  // Define an option and provide a default value.
  // We can later override it in the config.
  URL: ['QA', { option: true }],
  userName: ['Test', { option: true }],
  password: ['', { option: true }],
});