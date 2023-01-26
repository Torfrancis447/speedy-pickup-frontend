import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import React, {useState} from 'react'
import EditChild from './EditChild'
function ChildCard({name, dob, gender, notes, pickup, image }){    
    const[readyForPickUp, setReadyForPickUp] =useState(false)
    console.log(name)
    console.log(gender)
    console.log(dob)
    // function handlePickUp(){
        // fetch('')
    // }
    // console.log({user})
    
   
    return (
        <Container>
            <Card>
                 <Card.Header>{name}</Card.Header>
                {/* <Card.title></Card.title>  */}


                <Card.Text>                   
                    {gender}
                </Card.Text> 
                <EditChild name={name} notes={notes}/>
            </Card>
        </Container>
    )
}

export default ChildCard