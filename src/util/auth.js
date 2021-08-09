export const isToken = () => {
  if (localStorage.getItem("token")) {
    return true;
  } else {
    return false;
  }
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};
