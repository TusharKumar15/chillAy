import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

export function BSignup(){

    const nameError = document.getElementById('bnm');
    const emailError = document.getElementById('eml');
    const passwordError = document.getElementById('pswrd');
    
    const [form, setForm] = useState({
        shopName: "",
        bussinessID: "",
        password: "", 
    });
    
    const navigate = useNavigate();
    
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }
    
    async function handleSubmit(e) {
        e.preventDefault();
        emailError.textContent = '';
        nameError.textContent = '';
        passwordError.textContent = '';
        // When a post request is sent to the create url, we'll add a new record to the database.
        const newPerson = { ...form };
        // console.log(newPerson);
        
        await fetch("/business_signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newPerson),
        })
        .then(res => res.json())
        .then((data) => {
            if(data.errors){
                console.log(data.errors);
                nameError.textContent = data.errors.shopName;
                emailError.textContent = data.errors.bussinessID;
                passwordError.textContent = data.errors.password;
            }
            else {
                console.log('Business registered successfully');
                console.log(data.newShop);
                navigate("/food_menu");
            }
        });
    }

    return(
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
            </Navbar>
            <div style = {{padding: "5px"}}>
            <div style = {{width: "27%", margin: "auto", padding: "5px"}}>
                <h3>Create your Bussiness Account</h3>
            </div>
            <div style = {{width: "50%", margin: "auto", padding: "5px"}}>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Bussiness Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" value={Form.shopName} onChange = {(e) => updateForm({shopName: e.target.value})}/>
                    <Form.Text id = "bnm" style = {{color: "red"}}></Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={Form.bussinessID} onChange = {(e) => updateForm({bussinessID: e.target.value})}/>
                    <Form.Text id = "eml" style = {{color: "red"}}></Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={Form.password} onChange = {(e) => updateForm({password: e.target.value})}/>
                    <Form.Text id = "pswrd" style = {{color: "red"}}></Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password"/>
                    <Form.Text id = "cnfm" style = {{color: "red"}}></Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            </div>
        </div>
        </>
    )
}