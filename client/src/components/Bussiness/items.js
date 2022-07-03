import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useState } from "react";

function handleLogout(navigate) {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    navigate("/");
}

export function FoodMenu(props) {

    const navigate = useNavigate();
    const businessId = { shopID: props.shop.user.bussinessID };
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({
        itemName: "",
        price: "" 
    });


    function showOrders(){
        console.log("show orders");
        navigate('/orders', {state: {shopid: props.shop.user.bussinessID}})
        // console.log()
    }

    function updateForm(value) {
        return setForm((prev) => {
            return {...prev, ...value};
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const newItem = {...form, shopID: businessId.shopID};
        console.log(newItem);
        await fetch ("/food_menu", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newItem),
        })
        window.location.reload();
    }

    async function deleteItem(id) {
        await fetch ("/food_menu", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({_id: id, shopID: businessId.shopID}),
        })
        window.location.reload();
    }

    async function updateItemList() {
        await fetch("/food_menu", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(businessId),
        })
        .then((res) => res.json())
        .then((data) => {
        data.map((item, index) => {
            setItems((state) => [
            ...state,
            { itemName: item.itemName, itemPrice: item.price, itemId:item._id },
            ]);
          });
        });
    }

    useEffect(() => {
        return () => {
          updateItemList();
        };
    }, []);

    return (
        <>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            alt=""
                            src={require('../images/cupcake-dessert-food-svgrepo-com.svg').default}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        ChillAy
                    </Navbar.Brand>
                </Container>
                <div>welcome {props.shop.user.bussinessID}</div>
                <Button variant="secondary" style={{ margin: "2px" }} onClick={() => handleLogout(navigate)} >Logout</Button>{' '}
            </Navbar>
            <div>
                <div style={{ margin: "5px" }}><Button variant = "primary" onClick={() => showOrders()}>Customers' Orders</Button></div>
                <div style={{margin: "auto", width: "60%"}}>
                    <div>Add Item</div>
                    <Form onSubmit = {handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Control placeholder="Item name" value = {Form.itemName} onChange = {(e) => updateForm({itemName: e.target.value})}/>
                            </Col>
                            <Col>
                                <Form.Control placeholder="Price" value = {Form.price} onChange = {(e) => updateForm({price: e.target.value})}/>
                            </Col>
                        </Row>
                        <Button variant="primary" type = "submit">Add</Button>
                    </Form>
                    <div id="items" className = "my-4">
                        <h2>Your Items</h2>
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col" key = {0}>SNo</th>
                                <th scope="col" key = {1}>Item Title</th>
                                <th scope="col" key = {2}>Item Price</th>
                            </tr>
                            </thead>
                            <tbody id="tableBody">
                            {items.map((item, index) => (
                                <tr>
                                <th scope="row" key = {index}>{index + 1}</th>
                                <td>{item.itemName}</td>
                                <td>{item.itemPrice}</td>
                                <td>
                                    <Button
                                    variant = "primary"
                                    onClick={() => deleteItem(item.itemId)}
                                    >
                                    Delete
                                    </Button>
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}