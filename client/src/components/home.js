import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import firstSlide from './images/firstSlide.png';
import secondSlide from './images/secondSlide.png';
import thirdSlide from './images/thirdSlide.jpg';
// import { useNavigate } from 'react-router-dom';

export function Home(){
    return (
        <>
            <NavigationBar></NavigationBar>
            <Slides></Slides>
            <AuthCardsContainer></AuthCardsContainer>
        </>
    );
}

function NavigationBar(){
    return (
        <>
            <Navbar bg="light" variant="light">
                <Container>
                <Navbar.Brand href="/">
                    <img
                        alt=""
                        src = {require('./images/cupcake-dessert-food-svgrepo-com.svg').default}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    ChillAy
                </Navbar.Brand>
                </Container>
                <Button variant="secondary" style = {{margin: "2px"}} ><Link to = "customer_login" style = {{textDecoration: "none", color: "white"}}>Login</Link></Button>{' '}
                <Button variant="secondary" style = {{margin: "2px"}}><Link to = "customer_signup" style = {{textDecoration: "none", color: "white"}}>Signup</Link></Button>{' '}
            </Navbar>
        </>
    );
}

function Slides(){
    return (
        <Carousel>
            <Carousel.Item interval={3000}>
                <img
                className="d-block w-100"
                src={firstSlide}
                alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={3000}>
                <img
                className="d-block w-100"
                src={secondSlide}
                alt="Second slide"
                />
                <Carousel.Caption>
                <h3 style={{color: "grey"}}>Here for Business?</h3>
                <p style={{color: "grey"}}>Scroll down and register if you haven't or Login</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={10000}>
                <img
                className="d-block w-100"
                src={thirdSlide}
                // src={require('./images/UDasRRs3xvfNgAKpn45eZZ-1024-80.jpg').default}
                alt="Third slide"
                />
                <Carousel.Caption>
                <h3>Craving for food</h3>
                <p>Get them at cheapest rates with heavy discounts only on ChillAy</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

function AuthCardsContainer(){

    const cardStyle = {
        // display: "flex",
        width: "400px",
        margin: "auto",
        padding: "30px"
    };

    const emailError = document.getElementById('eml');
    const passwordError = document.getElementById('pswrd');
    
    const [form, setForm] = useState({
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
        passwordError.textContent = '';
        const newPerson = { ...form };
        
        await fetch("/", {
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
                emailError.textContent = data.errors.bussinessID;
                passwordError.textContent = data.errors.password;
            }
            else {
                navigate("/food_menu");
            }
        });
    }

    return (
        <div >
            <div style = {{display: "flex", padding: "20px"}}><h2 style = {{margin: "auto"}}>Here for Bussiness?</h2></div>
            <div style = {{display: "flex", flexWrap: "wrap"}}>
            <div style = {cardStyle}>
                <h3>Log In to your bussiness account</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={Form.bussinessID} onChange = {(e) => updateForm({bussinessID: e.target.value})}/>
                        <Form.Text id = "eml" style = {{color: "red"}}></Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder = "Password" value={Form.password} onChange = {(e) => updateForm({password: e.target.value})}/>
                        <Form.Text id = "pswrd" style = {{color: "red"}}></Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
            <div style = {cardStyle} >
                <h3>Not yet registered?</h3>
                <h4><Link to = "/business_signup">Click here to register your business</Link></h4>
            </div>
            </div>
        </div>
    );
}