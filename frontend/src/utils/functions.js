const setToken = (token) => {
  const data = {
    value: token,
    expiry: new Date().getTime() + 24 * 60 * 60 * 1000,
  };
  localStorage.setItem("authToken", JSON.stringify(data));
};

const getToken = () => {
  const itemStr = localStorage.getItem("authToken");
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  const now = new Date().getTime();

  if (now > item.expiry) {
    localStorage.removeItem("authToken");
    return null;
  }

  return item.value;
};

const clearToken = () => {
  localStorage.removeItem("authToken");
};

export { setToken, getToken, clearToken };
