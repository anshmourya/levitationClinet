import axios from "axios";

export interface User {
  name: string;
  email: string;
  password: string;
}
export interface signinUser {
  email: string;
  password: string;
}

const serverUrl = import.meta.env.VITE_SERVER_URL;
const useAccount = () => {
  const create = async (user: User) => {
    try {
      await axios.post(`${serverUrl}/signup`, user);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const createSession = async (user: signinUser) => {
    try {
      const { data } = await axios.post(`${serverUrl}/signin`, user);
      localStorage.setItem("uid", data.token);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return { create, createSession };
};

export default useAccount;
