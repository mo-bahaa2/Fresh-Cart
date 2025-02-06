import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetCart() {
  
  return useQuery({
    queryKey: ["cart"],
    // staleTime: Infinity,
    // cacheTime: Infinity, 
    // refetchInterval: 1000000,
    queryFn: async () => {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: { token: localStorage.getItem("userToken") },
        }
      );
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
}