import Container from 'react-bootstrap/Container'
import { useState, useEffect } from 'react'
import ChildCard from './ChildCard'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { useHistory } from "react-router-dom";
import Alert from 'react-bootstrap/Alert'

function ChildContainer({ render, showModal, setShowModal, user }){   
    
let history = useHistory()
    const [teachers, setTeachers] = useState([])
    const[errors, setErrors]=useState([])
    const[formData, setFormData] = useState({
        parent_id: "",
        teacher_id: "",
        name: "",
        dob: "",
        gender: "",
        image: "",
        notes: "",
        pick_up: false      
    })   

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    
    useEffect(() => {
        fetch('/teachers')
        .then(resp => resp.json())
        .then((teacherData) => setTeachers(teacherData))
    }, [])
    
    function handleChange(e) {
        setFormData(formData.parent_id = user.id)
        const name = e.target.name
        const value = e.target.value
        setFormData({...formData, [name]: value})
        
    } 
    // console.log(formData)
    
    function handleSubmit(e) {
        e.preventDefault()
        
        console.log(formData)
        setErrors([])      
        fetch("/children", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        }).then((r) => {
            if (r.ok) {
                r.json().then((newChild) => console.log(newChild))
                handleClose()
                
            } else {
                r.json().then((err) => (setErrors(err.errors)))
            }
        })
        setFormData({
            parent_id: "",
            teacher_id: "",
            name: "",
            dob: "",
            gender: "",
            image: "",
            notes: ""      
        })   
        
    }

    const teacherOptions = teachers.map((teacher) => <option key={teacher.id} value={teacher.id}>{teacher.name}</option>)

// console.log(formData.teacher_id)
 
// console.log(user.children)
// console.log(user.children
    
const renderChildren = (user.acct_type === "Parent"  && user.children !== "Undefined" || user.acct_type === "Teacher" && user.children !== "Undefined") ? 
user.children.map((child) => {
        return (
            <ChildCard 
            render={render}
            key={child.id}
            id={child.id} 
            name={child.name}
            dob={child.dob}
            gender={child.gender}
            notes={child.notes}
            pickup={child.pick_up}
            image={child.image}/>
            )}) : <h2>Loading...</h2>

    return (
    <Container>
    
        {user.acct_type === "Teacher" ?  null : <Button  className="float-end" variant="primary" onClick={handleShow}>
        Add New Child
        </Button>}

        <Modal

            show={showModal}
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          New Child
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
            {errors.map((e) => 
            <Alert variant='danger' key={e}>{e}</Alert>)}
      <Form onSubmit={handleSubmit}> 
      <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control 
            onChange={handleChange} 
            value={formData.name}
            name="name" 
            type="text"  />

        </Form.Group>
         
            <Form.Group className="mb-3">
            <Form.Label>Teacher: </Form.Label>
            <Form.Select 
            onChange={handleChange}
            placeholder='Select a teacher...' 
            name='teacher_id'
            value={formData.teacher_id}
            >
                <option>--Choose your teacher--</option>
                {teacherOptions}
            </Form.Select>
             </Form.Group>          
             <Form.Group className="mb-3">
                 <Form.Label>Upload an Image: </Form.Label>
            <Form.Control 
                onChange={handleChange}
                placeholder="Insert URL" 
                type="text" 
                name="image" 
                value={formData.image}
            />            
            </Form.Group>
            
            
            <Form.Group className="mb-3" >
                <Form.Label>Date of Birth: </Form.Label>
            <Form.Control 
                onChange={handleChange} 
                placeholder="Ex: MM/DD/YYYY"
                type="text" 
                name="dob"
                value={formData.dob} 
            />            
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Gender: </Form.Label>
            <Form.Select 
            onChange={handleChange}
            placeholder='Select Gender...' 
            name='gender'
            value={formData.gender}
            >
                <option>--Choose A Gender--</option>
                <option>Male</option>
                <option>Female</option>
                <option>Non-Binary</option>
            </Form.Select>
            </Form.Group> 

            <Form.Group className="mb-3" controlId="formBasicNotes">
            <Form.Label>Notes</Form.Label>
            <Form.Control 
            onChange={handleChange}  
            value={formData.notes}
            name="notes" 
            type="text" />
            </Form.Group>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" type='submit'>Save</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
    {user ? 
       renderChildren : <h1>please sign in</h1>}
    </Container>
    )
}
export default ChildContainer