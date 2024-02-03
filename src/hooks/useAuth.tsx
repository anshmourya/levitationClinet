import { useState, useEffect } from "react";
const useAuth = () => {
  const [isloggedIn, setIsloggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("uid");
    if (token) {
      setIsloggedIn(true);
    }
    setLoading(false);
  }, []);
  return { isloggedIn, setIsloggedIn, loading, setLoading };
};

export default useAuth;
