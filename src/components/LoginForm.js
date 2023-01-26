import {Form, Button, Container } from 'react-bootstrap'
import { useState } from 'react'
import { useHistory } from "react-router-dom";


function LoginForm( {user, setUser} ){

    let history = useHistory()
    const[errors, setErrors]=useState([])
    const[loginObj, setLoginObj] = useState({
        user_name: "",
        password: ""
    })

    function handleChange(e) {
        const name = e.target.name
        const value = e.target.value
        setLoginObj({...loginObj, [name]: value})
    } 

    function handleSubmit(e) {
        e.preventDefault()
        setErrors([])
        fetch('/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginObj),
        }).then((r) => {
            if (r.ok) {
                r.json().then((userInfo) => setUser(userInfo))
            } else {
                r.json().then((err) => (setErrors(err.errors)))
            }
        })
        setLoginObj({
            user_name: "",
            password: ""
        })
    //    history.push("/")
    }
    console.log(loginObj)
    return (
    <Container fluid="sm" style={{ width: '18rem' }}>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                onChange={handleChange}
                value={loginObj.user_name}
                type='text'
                name="user_name" 
                placeholder="Enter username" />
                <Form.Text className="text-muted">
                    {/* We'll never share your email with anyone else. */}
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                onChange={handleChange}
                value={loginObj.password}
                type="password" 
                name="password"
                placeholder="Password" />
            </Form.Group>
            
            <Button variant="primary" type="submit">
                Submit
            </Button>{ user ?
            (<h2>Hello, welcome {user.name}!</h2>) : (<h1> please login </h1>)}
        </Form>
    </Container>
    )
}

export default LoginForm