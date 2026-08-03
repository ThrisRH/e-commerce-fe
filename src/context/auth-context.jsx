import { fetchMe } from "@/api/auth/auth-api";
import { User } from "@/models/user";
import { enqueueSnackbar } from "notistack";
import { createContext, useEffect, useMemo, useState } from "react";




export const AuthContext = createContext({
  user: null,
  setUser: () => {},
  loading: true,
});

export const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getMe = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetchMe(token);

        setUser(response);
      } catch (e) {
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
