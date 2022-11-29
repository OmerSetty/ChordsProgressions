import { useContext } from "react";
import { authContext } from "../App";

export default function useAuth() {
  return useContext(authContext);
};


