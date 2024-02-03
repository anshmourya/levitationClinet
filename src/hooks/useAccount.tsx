import axios from "axios";

export interface User {
  name: string;
  email: string;
  password: string;
}

export interface SigninUser {
  email: string;
  password: string;
}

export interface Product {
  item: string;
  quantity: number;
  rate: number;
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

  const createSession = async (user: SigninUser) => {
    try {
      const { data } = await axios.post(`${serverUrl}/signin`, user);
      localStorage.setItem("uid", data.token);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const generateInvoice = async (productDetail: Product[]) => {
    try {
      let grandTotal = 0;
      // Calculate total for each product and accumulate grand total
      const products = productDetail.map((product) => {
        const total = product.quantity * product.rate;
        grandTotal += total;
        return {
          ...product,
          total,
        };
      });
      // Calculate GST (18% of grand total)
      const finalDetail = { products, total: grandTotal + 0.18 * grandTotal };

      const response = await axios.post(`${serverUrl}/product`, finalDetail, {
        headers: {
          Authorization: localStorage.getItem("uid"),
        },
        responseType: "arraybuffer", // Ensure that the response is treated as binary data
      });

      // Create a Blob from the response data
      const blob = new Blob([response.data], { type: "application/pdf" });

      // Create a download link and trigger a click event
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "invoice.pdf";
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  return { create, createSession, generateInvoice };
};

export default useAccount;
