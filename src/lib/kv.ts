import 'server-only';

import { kv } from '@vercel/kv';

export { kv };

export function isKvConfigured() {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

export function getAnalyticsDayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function getAnalyticsMonthKey(date = new Date()) {
  return getAnalyticsDayKey(date).slice(0, 7);
}
