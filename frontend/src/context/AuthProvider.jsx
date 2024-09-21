import PropTypes from "prop-types"
import { createContext, useContext, useEffect, useState } from "react";

import axios from 'axios';

export const AuthContext=createContext();

export const AuthProvider=({children})=>{

    const[blogs,setBlogs]=useState();
    const [profile,setProfile]=useState();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(()=>{

        const fetchProfile = async () => {
           
               
          try {
            // token should be let type variable because its value will change in every login. (in backend also)
            
             
              const { data } = await axios.get(
                `${import.meta.env.VITE_B_URL}/api/users/my-profile`,
                {
                  withCredentials: true,
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              console.log(data.user);
              setProfile(data.user);
              setIsAuthenticated(true);
            }
          
            
          catch (error) {
              console.log(error);
            }
    };
      
      
         
        const fetchBlogs=async()=>{
            try{
         const response=await axios.get(`${import.meta.env.VITE_B_URL}/api/blogs/all-blogs`)
         console.log(response);
         setBlogs(response.data);
            }
            catch(error){
        console.log(error);
            }
        }
        fetchBlogs();
        fetchProfile();
    },[]);

return(
    <AuthContext.Provider value={{blogs,profile,setProfile,isAuthenticated,setIsAuthenticated}}>{children}</AuthContext.Provider>
);
};

AuthProvider.propTypes={
    children:PropTypes.node,
}

export const useAuth=()=>useContext(AuthContext);