export const ADMIN_USERNAME = 'admin';
export const ADMIN_EMAIL = 'khanhvan18052004@gmail.com';
export let adminPassword = 'Khanhvan12@@';

export const verifyAdminCredentials = (username: string, password: string) => {
  return username === ADMIN_USERNAME && password === adminPassword;
};

export const getAdminProfile = () => ({
  username: ADMIN_USERNAME,
  email: ADMIN_EMAIL,
});

export const updateAdminPassword = (currentPassword: string, newPassword: string) => {
  if (currentPassword !== adminPassword) {
    return false;
  }

  adminPassword = newPassword;
  return true;
};
