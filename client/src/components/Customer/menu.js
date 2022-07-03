import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useLocation } from "react-router-dom";


function handleLogout(navigate) {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    navigate("/");
}




export function Menu() {

    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [menu, setMenuList] = useState([]);
    const [shopid, setshopid] = useState("");

  useEffect(() => {
    return () => {
      fetch("/eateries/menu/" + params.shop_id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
          data.map((item, index) => {
            setMenuList((state) => [
              ...state,
              {
                menu_name: item.itemName,
                menu_id: item._id,
                menu_price: item.price
              },
            ]);
            setshopid(item.shopID);
          });
        });
    };
  }, []);


  async function placeOrder(){
    const items = document.querySelectorAll('input[type="number"]')
    var sum = 0; 
    var orders = [];
    for (const i of items) {
        if (i.value && i.value !== 0) {
            const obj = JSON.parse(i.name + i.value + '"}');
            const toAdd = parseInt(obj.itemPrice)*parseInt(obj.quantity)
            sum += toAdd;
            orders.push({
                itemName: obj.itemName,
                itemPrice: parseInt(obj.itemPrice),
                quantity: parseInt(obj.quantity)
            });     
        }
    }
    const newOrder = {shopID: shopid, customerID: location.state.customer.user.customerID, orders, totalAmount: sum};
    console.log(newOrder);
    await fetch("/eateries/menu/" + params.shop_id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder)
    })
    .then((res) => {
        navigate('/your_orders', {state: {customer: location.state.customer.user.customerID}})
        return res.json();
    })
  }

  if(location.state){
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src={
                require("../images/cupcake-dessert-food-svgrepo-com.svg")
                  .default
              }
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            ChillAy
          </Navbar.Brand>
        </Container>
        <div>welcome {location.state.customer.user.customerID}</div>
        <Button
          variant="secondary"
          style={{ margin: "2px" }}
          onClick={() => handleLogout(navigate)}
        >
          Logout
        </Button>{" "}
      </Navbar>
      <h4 style={{margin: "20px"}}>Menu</h4>
      <div style={{display:"flex", width:"70%", margin: "auto"}}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" key={0}>
              SNo
            </th>
            <th scope="col" key={1}>
              Item Title
            </th>
            <th scope="col" key={2}>
              Item Price
            </th>
            <th scope="col" key={3}>
              Quantity
            </th>
          </tr>
        </thead>
        <tbody id="tableBody">
          {menu.map((item, index) => (
            <tr>
              <th scope="row" key={index}>
                {index + 1}
              </th>
              <td>{item.menu_name}</td>
              <td>{item.menu_price}</td>
              <td>
                <input type="number" min={0} name = {'{"itemName":"'+item.menu_name+'","itemPrice":"'+item.menu_price+'","quantity":"'}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <h1 style={{margin: "20px"}}>
        <Button variant="primary" onClick={() => placeOrder()}>Place Order</Button>{" "}
      </h1>
    </>
  );
  }
return <a href = "/customer_signup">Access to this page denied. click here to Signup</a>
}