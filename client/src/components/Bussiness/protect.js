
import { useState, useEffect } from "react";

export const ProtectedRouteB = ({ routePath, component: Component}) => {

    const token = document.cookie;
    const [successfullLogin, setsuccessfullLogin]  = useState(false);
    const [shop, setShop]  = useState({
      _id: "",
      shopName: "",
      shopStatus: "",
      bussinessID: "",
      password: "",
      __v: 0
    });
  
    useEffect(() => {
      fetch( routePath, {
        
        method: "GET",
        headers: {
          "Authorization": token.substring(4)
        },
      })
      .then( res => res.json())
      .then((user) => {
        if(user){
          setsuccessfullLogin(true);
          setShop({...user});
        }
      })
      
    }, []);
  
    if(successfullLogin){
      return <Component shop = {shop}/>;
    }
    else {
      return <a href = "/business_signup">Access to this page denied. click here to Signup</a>
    }
  }