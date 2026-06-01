import fs from 'fs';
import path from 'path';
import SettingsClient from './SettingsClient';

const settingsFilePath = path.join(process.cwd(), 'src', 'data', 'settings.json');

function getSettings() {
  try {
    if (fs.existsSync(settingsFilePath)) {
      return JSON.parse(fs.readFileSync(settingsFilePath, 'utf8'));
    }
  } catch {
  }

  return {
    primaryColor: '#D4AF37',
    backgroundColor: '#1A1A1A',
    textColor: '#F5F5F5',
    productsPerRow: 4,
    adminProductsPerPage: 5,
  };
}

export default function SettingsPage() {
  return <SettingsClient initialSettings={getSettings()} />;
}
