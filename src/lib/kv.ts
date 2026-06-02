import 'server-only';

import { Redis } from '@upstash/redis';

export const redis = process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
  ? new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    })
  : null;

export const kv = redis;

export function isKvConfigured() {
  return Boolean(redis);
}

export function getAnalyticsDayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function getAnalyticsMonthKey(date = new Date()) {
  return getAnalyticsDayKey(date).slice(0, 7);
}
