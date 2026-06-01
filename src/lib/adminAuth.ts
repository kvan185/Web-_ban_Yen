import { randomBytes, scrypt, timingSafeEqual } from 'crypto';
import { promisify } from 'util';
import { getAdminUser, saveAdminUser } from './dataStore';

export const ADMIN_USERNAME = 'admin';
export const ADMIN_EMAIL = 'khanhvan18052004@gmail.com';

type AdminUser = {
  username: string;
  email: string;
  passwordHash: string;
};

type UsersData = {
  admin: AdminUser;
};

const scryptAsync = promisify(scrypt);
const defaultUsersData: UsersData = {
  admin: {
    username: ADMIN_USERNAME,
    email: ADMIN_EMAIL,
    passwordHash:
      '64ac5d74deb2e5ee490dce6d653c4733:5cd5189b4b5aed91ad22f60617c3aa8da76eb4b809ec5b01f7a70bc6d50c48119e1c2154d4cd8e3611899a7592c3e83f958499d3557fd8711f8842fe7bb7c265',
  },
};

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt}:${derivedKey.toString('hex')}`;
}

async function verifyPassword(password: string, storedHash: string) {
  const [salt, key] = storedHash.split(':');

  if (!salt || !key) {
    return false;
  }

  const storedKey = Buffer.from(key, 'hex');
  const derivedKey = (await scryptAsync(password, salt, storedKey.length)) as Buffer;

  return storedKey.length === derivedKey.length && timingSafeEqual(storedKey, derivedKey);
}

async function readUsersData(): Promise<UsersData> {
  const admin = await getAdminUser();
  return admin ? { admin } : defaultUsersData;
}

export const verifyAdminCredentials = async (username: string, password: string) => {
  const usersData = await readUsersData();
  const admin = usersData.admin;

  return username === admin.username && (await verifyPassword(password, admin.passwordHash));
};

export const getAdminProfile = async () => {
  const usersData = await readUsersData();

  return {
    username: usersData.admin.username,
    email: usersData.admin.email,
  };
};

export const updateAdminPassword = async (currentPassword: string, newPassword: string) => {
  const usersData = await readUsersData();
  const passwordMatches = await verifyPassword(currentPassword, usersData.admin.passwordHash);

  if (!passwordMatches) {
    return false;
  }

  usersData.admin.passwordHash = await hashPassword(newPassword);
  await saveAdminUser(usersData.admin);
  return true;
};
