import { useSelector } from "react-redux";

const useToken = () => {
  const { auth } = useSelector((state) => state.auth);
  const { userInfo } = auth;
  const { token } = userInfo;

  return [token];
};

export default useToken;
