import { useState, useEffect } from "react";

export const ProtectedRouteC = ({ routePath, component: Component}) => {

    const token = document.cookie;
    const [successfullLogin, setsuccessfullLogin]  = useState(false);
    const [customer, setCustomer]  = useState({
      _id: "",
      customerName: "",
      customerStatus: "",
      customerID: "",
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
          setCustomer({...user});
        }
      })
      
    }, []);
  
    if(successfullLogin){
      return <Component customer ={customer}/>;
    }
    else {
      return <a href = "/customer_signup">Access to this page denied. click here to Signup</a>
    }
  }