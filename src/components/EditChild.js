import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'

function EditChild({ name, notes }) {
    const [updatedData, setUpdatedData]= useState({})
    const [show, setShow] = useState(false);
    const[errors, setErrors] = useState([])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleChange(e) {
        const name = e.target.name
        const value = e.target.value
        setUpdatedData({...updatedData, [name]: value})
    } 
    

    function handleSubmit(e) {
        e.preventDefault();
        // const name = e.target.name
        // const value = e.target.value
        // setUpdatedData({...updatedData, [name]: value})        
        // fetch("/update", {
        //     method: "PATCH",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         title,
        //         instructions,
        //         minutes_to_complete: minutesToComplete,
        //     }),
        // })
        
        console.log(updatedData)
    }
        
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Edit
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Child</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control onChange={handleChange} value={updatedData.name} name="name" type="text" placeholder={name} />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control onChange={handleChange} value={updatedData.notes} name="notes" type="textarea" placeholder={notes} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onSubmit={handleSubmit}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditChild