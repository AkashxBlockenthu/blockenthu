import fs from 'fs';
import path from 'path';
import { EmailToSpreadsheetMap, JobConfig } from '../types';

let emailToSpreadsheetMap: EmailToSpreadsheetMap | null = null;
let jobConfig: JobConfig | null = null;

export function loadSheetConfig(): EmailToSpreadsheetMap {
  if (emailToSpreadsheetMap) {
    return emailToSpreadsheetMap;
  }

  try {
    // Use process.cwd() to get the project root directory
    const configPath = path.join(process.cwd(), 'src', 'config', 'sheetConfig.json');
    const rawConfig = fs.readFileSync(configPath, 'utf8');
    emailToSpreadsheetMap = JSON.parse(rawConfig) as EmailToSpreadsheetMap;
    return emailToSpreadsheetMap;
  } catch (error) {
    console.error('Error loading sheet config:', error);
    throw new Error('Failed to load sheet configuration');
  }
} 

export function loadJobConfig(): JobConfig {
  const configPath = path.join(process.cwd(), 'src', 'config', 'jobconfig.json');
  const rawConfig = fs.readFileSync(configPath, 'utf8');
  return JSON.parse(rawConfig) as JobConfig;
}

export function loadGoogleSheetConfig(): string {
  const configPath = path.join(process.cwd(), 'src', 'config', 'affinitysheetdata-6b3151ba3bad.json');
  const rawConfig = fs.readFileSync(configPath, 'utf8');
  return JSON.parse(rawConfig) as string;
}