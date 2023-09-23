export const saveToken = (token: string, expiry: string) => {
  localStorage.setItem("token", token);
  localStorage.setItem("expiry", expiry);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getTokenExpiry = () => {
  return localStorage.getItem("expiry");
};

export const removeTokenAndExpiry = () => {
  localStorage.clear();
};
