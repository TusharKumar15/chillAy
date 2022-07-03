import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";

function handleLogout(navigate) {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    navigate("/");
}

export function Orders(){

    const location = useLocation();
    const navigate = useNavigate();

    // console.log(location.state.shopid);
    const [customer, setCustomer] = useState([]);

    function gotoMenu() {
        navigate("/food_menu");
    }

    async function served(_id){
        await fetch("/orders", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({_id: _id, shopID: location.state.shopid})
        })
    }

    function endDay(){

    }

    function fetchOrders() {
        fetch("/orders", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({shopID: location.state.shopid})
        })
        .then((res) => res.json())
        .then((data) => {
            data.map((item, index) => {
                setCustomer((state) => [
                    ...state,
                    {
                    item: item,
                    },
                ]);
            });
        });
    }

    setTimeout(
        () => (document.getElementById("temporary").style.display = "none"),
        120000
    );

    useEffect(() => {
        const timerId = setInterval(function () {
          fetchOrders();
          setCustomer([]);
        }, 120000);
        return function cleanup() {
          clearInterval(timerId);
        };
    }, []);


    if(location.state) {
        return (
        <>
            <Navbar bg="light" variant="light">
                <Container>
                <Navbar.Brand href="/">
                    <img
                        alt=""
                        src = {require('../images/cupcake-dessert-food-svgrepo-com.svg').default}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '} 
                    ChillAy
                </Navbar.Brand>
                </Container>
                <div>welcome: {location.state.shopid}</div>
                <Button
                    variant="secondary"
                    style={{ margin: "2px" }}
                    onClick={() => handleLogout(navigate)}
                >
                    Logout
                </Button>{" "}
            </Navbar>
            <Button variant="primary" onClick={() => gotoMenu()}>
                Go to Eateries list
            </Button>
            <h1>orders</h1>
            <div id="temporary">Wait for 2 minutes.</div>
                <div style={{ margin: "auto", width: "60%" }}>
                <Accordion defaultActiveKey="0" flush>
                    {customer.map((item, index) => (
                    <>
                        {console.log(item)}
                        <Accordion.Item eventKey={index}>
                        <Accordion.Header>
                            <b>{item.item.customerID}</b>&nbsp;&nbsp;&nbsp;&nbsp;
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
                            <Button onClick={() => served(item.item._id)}>
                                Served
                            </Button>
                        </Accordion.Body>
                        </Accordion.Item>
                    </>
                    ))}
                </Accordion>
            </div>
        </>
    )}
    else {
        return <a href='/bussiness_signup'>Access denied. Click here to signup</a>
    }
}