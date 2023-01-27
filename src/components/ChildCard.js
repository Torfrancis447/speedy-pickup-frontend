import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import React, {useState} from 'react'
import EditChild from './EditChild'
// import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert'



function ChildCard({render, name, id, dob, gender, notes, pickup, image }){    

    const[errors, setErrors] = useState([])
    const[readyForPickUp, setReadyForPickUp] =useState(false)

    // console.log(name)
    // console.log(gender)
    // console.log(dob)
    // function handlePickUp(){
        // fetch('')
    // }
    // console.log(id)
    
    // className="w-25 p-3"


    function handleDelete() {
            fetch(`/children/${id}`, {
                method: "DELETE",
            }).then((r) => {
                if (r.ok) {
                    render()                   
                } else {
                    r.json().then((err) => (setErrors(err.errors)))
                }
            })            
        }

    return (
        <Container>
        <Row className="px-4 my-3 card-group">
            <Col className="g-4 ">
            <Card style={{display: "flex",    
                boxShadow: "0 0 3px 2px #cec7c759",
    
                }} className="w-50 p-3 ">
                <Card.Header>
                {errors.map((e) => 
                    <Alert variant='danger' key={e}>{e}</Alert>)}
                    <span>
                    {name}
                    </span>
                    <span 
                    onClick={handleDelete}
                    className='delete'>
                    🗑
                    </span>
                </Card.Header>
                {/* <Button className="w-10 row" variant="primary">🚮</Button> */}
                {/* <Card.Title></Card.Title>  */}
                <Card.Img 
                style={{width: "200"}} 
                className=" p-3"src={image} >
                </Card.Img>

                <Card.Text>                   
                    <span>Gender: {gender}</span>
                </Card.Text> 
                <Card.Text>                   
                <span>Date of Birth: {dob}</span>
                </Card.Text> 
                <Card.Text>                   
                    <span>Notes: {notes}</span>
                </Card.Text> 
                <EditChild pickup={pickup} render={render} id={id} name={name} notes={notes} image={image}/>
            </Card>
            </Col>
            </Row>
        </Container>
    )
}

export default ChildCard