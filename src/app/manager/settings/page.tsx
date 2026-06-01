import SettingsClient from './SettingsClient';
import { getSettings } from '@/lib/dataStore';

export default async function SettingsPage() {
  return <SettingsClient initialSettings={await getSettings()} />;
}
