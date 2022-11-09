export const get = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

export const set = (name, value, expire) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + expire * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()}`;
};
