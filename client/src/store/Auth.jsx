import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext ();


 export const AuthProvider = ({children}) =>{
 
    const [token , setToken] = useState(localStorage.getItem('token'));
   const [user , setUser] = useState("");
   const [isLoading , setISLoading]= useState(true);
   const [service , setService] = useState("");
   const Authorizationtoken = `Bearer ${token}`;
    const servertokenInLS = (servertoken) =>{
        setToken(servertoken);
        return localStorage.setItem('token',servertoken);
    };

   const isLoggedIn = !!token;
   console.log("isloggedIn" , isLoggedIn);

         const  LogoutUser = ()=>{
            setToken("");
            return localStorage.removeItem('token');
         }

    const userAuthentication = async ()=>{
        try {
            setISLoading(true);

            const response = await fetch("http://localhost:2000/api/auth/user",{
                method:"GET",
                headers:{
                    Authorization: Authorizationtoken,
                },
            });

            if(response.ok){
                const data = await response.json();
                console.log("user data", data.userdata)
                setUser(data.userdata);
                setISLoading(false);
            }else{
                console.error("error in fetching user data ")
                setISLoading(false);
            }
            
        } catch (error) {
            console.error("Error fetching user data")
        }
    }

  const getServices = async ()=>{

try {
    const response = await fetch("http://localhost:2000/api/data/service",{
        method:"GET",  
    });

    if(response.ok){
        const data = await response.json();
        console.log( data.msg)
        setService(data.msg)
       
    }
} catch (error) {
    console.error("Error fetching service data")
}
  }


    useEffect(()=>{
        getServices();
        userAuthentication();
    },[]);

    return <AuthContext.Provider value={{servertokenInLS ,LogoutUser,isLoggedIn,user,service,Authorizationtoken,isLoading}}>
        {children} 
    </AuthContext.Provider>
}

export const useAuth = ()=>{
    return useContext(AuthContext);
}
