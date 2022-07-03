import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";


function handleLogout(navigate) {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    navigate("/");
}


export function YourOrders() {

    const navigate = useNavigate();
    const location = useLocation();
    const [shopdetails, setShopdetails] = useState([]);

    // console.log(location.state);

    function gotoEateries(){
        navigate('/eateries');
    }

    useEffect(() => {
        return () => {
          fetch("/your_orders", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({customerID: location.state.customer})
          })
            .then((res) => res.json())
            .then((data) => {
                data.map((item, index) => {
                    setShopdetails((state) => [
                      ...state,
                      {
                        item: item,
                      },
                    ]);
                });
            });
        };
      }, []);

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
                <div>welcome {location.state.customer}</div>
                <Button
                    variant="secondary"
                    style={{ margin: "2px" }}
                    onClick={() => handleLogout(navigate)}
                >
                    Logout
                </Button>{" "}
            </Navbar>
            <Button variant="primary" onClick={() => gotoEateries()}>Go to Eateries list</Button>
            <div >
                <h1>Your Orders</h1>
            </div>
            <div style={{ margin: "auto", width: "60%" }}>
                <Accordion defaultActiveKey="0" flush>
                    {shopdetails.map((item, index) => (
                    <>
                        {console.log(item)}
                        <Accordion.Item eventKey={index}>
                        <Accordion.Header>
                            <b>{item.item.shopID}</b>&nbsp;&nbsp;&nbsp;&nbsp;
                            <b> Total</b>: {item.item.totalAmount}
                        </Accordion.Header>
                        <Accordion.Body>
                            <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {item.item.orders.map((menudetails, id) => (
                                <tr>
                                    <td>{id + 1}</td>
                                    <td>{menudetails.itemName}</td>
                                    <td>{menudetails.itemPrice}</td>
                                    <td>{menudetails.quantity}</td>
                                </tr>
                                ))}
                            </tbody>
                            </Table>
                        </Accordion.Body>
                        </Accordion.Item>
                    </>
                    ))}
                </Accordion>
            </div>
        </>
    )
    }
    else {
        return <a href = "/customer_signup">Access to this page denied. click here to Signup</a>
    }
} 