export const setToken = () => {
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  if (userInfo !== null) {
    const { token } = userInfo;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return config;
  }
  return null;
};
