import { fetchMe } from "@/api/auth/auth-lapi";
import { User } from "@/models/user";
import { enqueueSnackbar } from "notistack";
import { createContext, useEffect, useMemo, useState } from "react";

/**
 * @typedef {Object} AuthContextType
 * @property {User|null} user
 * @property {(user: User|null) => void} setUser
 * @property {boolean} loading
 */

/** @type {import('react').Context<AuthContextType>} */
export const AuthContext = createContext({
  user: null,
  setUser: () => {},
  loading: true,
});

export const AuthProvider = ({ children }) => {
  /** @type {[User|null, (user: User|null) => void]} */
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getMe = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetchMe(token);

        console.log("user: ", response);

        setUser(response);
      } catch (e) {
        enqueueSnackbar("Xác thực người dùng thất bại", { variant: "error" });
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getMe();
  }, []);

  return (
    <AuthContext.Provider
      value={useMemo(() => ({ user, setUser, loading }), [user, loading])}
    >
      {children}
    </AuthContext.Provider>
  );
};
