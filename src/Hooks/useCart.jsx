import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Pages/Shared/Loader/Loader";
import useAxiosSecure from "./useAxiosSecure";

const useCart = () =>{
    const {user, loading} = useContext(AuthContext)
    const token = localStorage.getItem('access-token')
    const [axiosSecure] = useAxiosSecure();

    const { isLoading, isError, data : cart = [] , error, refetch } = useQuery({
        // queryKey: ['carts', user?.email],
        // queryFn: async () =>{
        //     const res = await fetch(`http://localhost:3000/carts?email=${user.email}`,{
        //       headers : {
        //         authorization : `bearer ${token}`
        //       }
        //     })
        //     return res.json()
        // },
        queryKey: ['carts', user?.email],
        enabled : !loading,
        queryFn: async () =>{
            const res = await axiosSecure(`/carts?email=${user.email}`)
            return res.data;
        },
      })
    
      if (isLoading) {
        return <Loader/>
      }
    
      if (isError) {
        return <span>Error: {error.message}</span>
      }

      return {cart, isLoading, refetch}

}

export default useCart;