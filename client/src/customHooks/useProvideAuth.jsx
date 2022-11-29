import { useState, useEffect } from "react";
import axios from 'axios';
import useFetchData from "./useFetchData";

const AUTH_PATHS = {
  GET_AUTH_USER: 'getAuthenticatedUser',
  LOGIN: 'login',
  LOGOUT: 'logout'
}

export function useProvideAuth() {
  const { data, loading } = useFetchData(`http://localhost:3001/auth/${AUTH_PATHS.GET_AUTH_USER}`);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (data && data.user) setUser(data.user);
  }, [data])

  async function login(username, password) {
    try {
      const credentials = { username, password };
      const result = await axios.post(`http://localhost:3001/auth/${AUTH_PATHS.LOGIN}`, credentials, { withCredentials: true });
      if (result.status === 200) {
        setUser(result.data.user);
      }
    }
    catch (err) {
      if (err.response.status === 403) {
        setUser(null);
      }
    }
  }

  async function logout() {
    try {
      await axios.get(`http://localhost:3001/auth/${AUTH_PATHS.LOGOUT}`, { withCredentials: true });
      setUser(null);
    }
    catch (err) {
      console.log(err);
    }
  }

  return {
    user,
    loading,
    login,
    logout,
  };
}