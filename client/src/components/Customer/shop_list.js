import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";

function handleLogout(navigate) {
  document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  navigate("/");
}

export function Eateries(props) {
  const navigate = useNavigate();
  
  const [shopList, setShopList] = useState([]);

  function goto(shop_id) {
    console.log("/eateries/menu/" + shop_id);
    navigate("/eateries/menu/" + shop_id, {state: {customer: props.customer}});
  }
  async function updateShopList() {
    fetch("/eateries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data.map((item, index) => {
          setShopList((state) => [
            ...state,
            {
              shop_name: item.shopName,
              shop_id: item._id,
            },
          ]);
        });
      });
  }
  useEffect(() => {
    return () => {
      updateShopList();
    };
  }, []);

  function gotoYourOrders(){
    navigate('/your_orders', {state: {customer: props.customer.user.customerID}});
  }

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
        <div>welcome {props.customer.user.customerID}</div>
        <Button
          variant="secondary"
          style={{ margin: "2px" }}
          onClick={() => handleLogout(navigate)}
        >
          Logout
        </Button>{" "}
      </Navbar>
      <Button variant="primary" onClick={()=>gotoYourOrders()}>Your Orders</Button>
      <div style={{margin: "auto", width: "60%"}}>
      <h1 className="Shop_list_heading">Eateries around you</h1>
      <ListGroup variant="flush" className="listItem">
        {console.log(shopList)}
        {shopList.map((shop, index) => (
          <ListGroup.Item
            onClick={() => goto(shop.shop_id)}
            className="shopName"
          >
            <div className="d-grid gap-2">
              <Button variant="outline-secondary" size="lg">
                {shop.shop_name}
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      </div>
    </>
  );
}
