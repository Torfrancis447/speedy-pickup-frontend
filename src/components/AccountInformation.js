import React from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
// import ListGroup from 'react-bootstrap/ListGroup'
import { useState } from 'react'
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import { useHistory } from 'react-router-dom'

function AccountInformation({ user, setUser}) {
    let history = useHistory()
    const[disable, setDisable]= useState(true)
    const[errors, setErrors] = useState([])
    const[userObj, setUserObj] = useState({})

    function handleChange(e) {
        const name = e.target.name
        const value = e.target.value
        setUserObj({...userObj, [name]: value})
    } 
    
    console.log(userObj)

    const conFigObj = {method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify(userObj)
    }
console.log(user)
    function toggleDisable(){
        setDisable(!disable)
        fetch(`/users/${user.id}`, conFigObj,
        ).then((r) => {
            if (r.ok) {
                r.json().then((r) => console.log(r))        
            } else {
                r.json().then((err) => (setErrors(err.errors)))
            }
        })
        }

    function handleDelete() {
        fetch(`/users/${user.id}`, {
            method: "DELETE",
        }).then((r) => {
            if (r.ok) {
                 history.push("/login")                  
            } else {
                r.json().then((err) => (setErrors(err.errors)))
            }
        })            
    }
    
    return (
        <Container style={{ backgroundColor: '#f1f1f1' }} >
        {errors ? errors.map((e) => 
                    <Alert variant='danger' key={e}>{e}</Alert>): null}
        <Form>
            <Form.Text>Name</Form.Text>
            <Form.Control
                // value={user.name}               
                onChange={handleChange}
                placeholder={user.name} 
                name="name"
                aria-describedby="basic-addon1"
                disabled={disable}
                type="text"
            />
            <Form.Text>User Name</Form.Text>
            <Form.Control
                onChange={handleChange}
                placeholder={user.user_name} 
                // value={user.user_name}               
                name="user_name"
                aria-describedby="basic-addon1"
                disabled={disable}
                type="text"
            />
            <Form.Text>Email</Form.Text>
            <Form.Control
                onChange={handleChange}
                placeholder={user.email} 
                // value={user.email}               
                name="email"
                aria-describedby="basic-addon1"
                disabled={disable}
                type="text"
            />
            <Form.Text>Phone Number</Form.Text>
            <Form.Control
                onChange={handleChange}
                placeholder={user.phone_number}      
                // value={user.phone_number}          
                name="phone_number"
                aria-describedby="basic-addon1"
                disabled={disable}
                type="text"
            />
            <Form.Text>Photo ID</Form.Text>
            <Form.Control
                onChange={handleChange}
                placeholder={user.photo_id}      
                // value={user.phone_number}          
                name="photo_id"
                aria-describedby="basic-addon1"
                disabled={disable}
                type="text"
            />
            {user.school ? (
                <>
                <Form.Text> School </Form.Text>
                    <Form.Control
                        onChange={handleChange}
                        placeholder={user.school.name}                        
                        disabled
                    />
                    <Form.Text> Location </Form.Text>
                    <Form.Control
                        onChange={handleChange}
                        placeholder={user.school.address}                        
                        disabled
                    />
                </>
            ) : null}
            <Button onClick={toggleDisable}>Edit Account Information</Button>
            {user.school ?  null : <Button onClick={handleDelete}>Deactivate Account</Button> }
        </Form>
        </Container>
    )
}
export default AccountInformation