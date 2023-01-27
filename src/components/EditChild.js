import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import { useHistory } from "react-router-dom";

function EditChild({pickup, render, id, name, notes, image }) {
    let history = useHistory()
    const [show, setShow] = useState(false)
    const [updatedData, setUpdatedData]= useState({
        name:"",
        notes:"",
        image: ""      
    })
    const[dropOff, setDropOff]=useState(pickup)
    // const[pickUpData, setPickUpData]= useState("")  
    
    const[errors, setErrors] = useState([])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleChange(e) {
        // console.log(id)
        const name = e.target.name
        const value = e.target.value
        setUpdatedData({...updatedData, [name]: value})
        
    } 
    
    const conFigObj = {method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify(updatedData)
        }


// console.log(id)
    function handleSubmit(e) {
        e.preventDefault();      
        fetch(`/children/${id}`, conFigObj)
        .then((r) => {
                if (r.ok) {
                    handleClose()
                    render()                    
                } else {
                    r.json().then((err) => (setErrors(err.errors)))
                }
            })            
    }

    function handleClick() {
        setDropOff((dropOff) => !dropOff)
        console.log(dropOff)
        
    }
    
    // console.log(pickup)

    function handleDropOff() {
        setDropOff((dropOff) => !dropOff)
        let pickUpData = {pick_up: !dropOff}
        console.log(pickUpData)
        console.log(id)
        setErrors([])
        fetch(`/children/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pickUpData)
        }).then((r) => {
            if (r.ok) {
                r.json().then((r) => console.log(r))
                render()
            } else {
                r.json().then((err) => (console.log(err)))
            }
        })
    }
        
    return (
        <>
            
            <Button  variant="primary" onClick={handleShow}>
                Edit Child
            </Button>
            
            <Button  variant={pickup ? "primary" : "secondary"} value={dropOff} onClick={handleDropOff}>
                {pickup ? "Pick Up" : "Drop Off"}
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                // backdrop="static"
                // keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Child</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {errors.map((e) => 
                    <Alert variant='danger' key={e}>{e}</Alert>)}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name: </Form.Label>
                            <Form.Control onChange={handleChange} value={updatedData.name} name="name" type="text" placeholder={name} />

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicImage">
                            <Form.Label>Image: </Form.Label>
                            <Form.Control onChange={handleChange} value={updatedData.image} name="image" type="text" placeholder={image} />

                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Notes: </Form.Label>
                            <Form.Control onChange={handleChange} value={updatedData.notes} name="notes" type="text" placeholder={notes} />
                        </Form.Group>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">Save</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default EditChild