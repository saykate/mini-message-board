import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext({
  token: null,
  setToken: () => {},
  isAuthenticated: false,
  userId: null,
  username: null,
});

const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null)
  const [userId, setUserId] = useState(() => {
    const _token = localStorage.getItem("accessToken");
    console.log("AccessToken", _token)
    if (!_token) {
      return null;
    }
    return jwtDecode(_token)?.sub || null;
  });
  const [token, setToken] = useState(() => {
    const _token = localStorage.getItem("accessToken");
    if (!_token) {
      return null;
    }
    return JSON.parse(_token);
  });
  const isAuthenticated = !!token;

  useEffect(() => {
    if (token) {
      localStorage.setItem("accessToken", JSON.stringify(token));
      const decoded = jwtDecode(token)
      console.log("DECODED?", decoded)
      setUserId(decoded?.sub || null);
      setUsername(jwtDecode(token)?._doc?.username)
      console.log("username", username)
    } else {
      localStorage.removeItem("accessToken");
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, isAuthenticated, userId, username }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;