import { useContext, useEffect } from "react"
import { AuthContext } from "../Providers/AuthProvider"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000/'
  });

const useAxiosSecure = () => {
  const { signOutUser } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {

    axiosSecure.interceptors.request.use(config => {
      const token = localStorage.getItem('access-token')
      if (token) {
        config.headers.authorization = `Bearer ${token}`
      }
      return config;
    })
    //TODO: fix login redirect issue
    axiosSecure.interceptors.response.use(response => response, async (error) => {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        await signOutUser();
        navigate('/login');
      }
    })
    
  }, [signOutUser, navigate, axiosSecure])

  return [axiosSecure]
}

export default useAxiosSecure;
