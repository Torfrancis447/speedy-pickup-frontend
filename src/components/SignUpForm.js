import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Alert } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import React, {useState, useEffect} from 'react';


function SignUpForm({setUser, user}){

    let history = useHistory()
    const[errors, setErrors] = useState([])
    const[schools, setSchools] = useState([])
    const[formData, setFormData] = useState({
        acct_type: "--Choose Account Type--",
        user_name: "", 
        password: "",
        password_confirmation: "",
        name: "",
        email: "",
        phone_number: "",
        photo_id: "",
        school_id: ""
    })

    

    function handleSubmit(e) {
        e.preventDefault()
        setErrors([])
        fetch('/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        }).then((r) => {
            if (r.ok) {
                r.json().then((userInfo)=> {
                    setUser(userInfo)
                    history.push("/")})
            } else {
                r.json().then((err) => (setErrors(err.errors)))
            }
        })
        setFormData({
            user_name: "", 
            password: "",
            password_confirmation: "",
            name: "",
            email: "",
            phone_number: "",
            photo_id: "",
            school_id: ""
        })
        
    }
    // console.log(errors.errors)
    console.log(formData)

    useEffect(() => {
        fetch('/schools')
        .then(resp => resp.json())
        .then((schoolData) => setSchools(schoolData))
    }, [])
    console.log(schools)
        
    function handleChange(e) {
        const name = e.target.name
        const value = e.target.value
        setFormData({...formData, [name]: value,})
    } 

    const schoolOptions = schools.map((school) => <option key={school.id} value={school.id}>{school.name}</option>)


    const school = 
    <Form.Group className="mb-3">
        <Form.Label>School: </Form.Label>
        <Form.Select 
        onChange={handleChange}
        placeholder='Select a school...' 
        name='school_id'
        value={formData.school_id}
        >
            <option>--Choose your school--</option>
            {schoolOptions}
        </Form.Select>
    </Form.Group>           


    return (       
      <Container style={{ width: '18rem' }}>
      {errors.map((e) => 
        <Alert variant='danger' key={e}>{e}</Alert>)}
         <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Account Type: </Form.Label>
                <Form.Select 
                onChange={handleChange}
                placeholder='Select Account Type...' 
                name='acct_type'
                value={formData.acct_type}
                >
                    <option>--Choose Account Type--</option>
                    <option value="Parent">Parent</option>
                    <option value="Teacher">Teacher</option>                
                </Form.Select>
            </Form.Group>           
             <Form.Group className="mb-3">
                 <Form.Label>Username: </Form.Label>
            <Form.Control 
                onChange={handleChange}
                placeholder="Ex: johndoe.." 
                type="text" 
                name="user_name" 
                value={formData.user_name}
            />            
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password: </Form.Label>
            <Form.Control 
                onChange={handleChange} 
                type="password"
                id="inputPassword5"
                // aria-describedby="passwordHelpBlock" 
                name="password" 
                value={formData.password}
            />            
            <Form.Text id="passwordHelpBlock" muted>
                Your password must be 8-20 characters long, contain letters and numbers,
                and must not contain spaces, special characters, or emoji.
            </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Confirm Password: </Form.Label>
            <Form.Control 
                onChange={handleChange} 
                type="password"
                // id="inputPassword5"
                aria-describedby="passwordHelpBlock" 
                name="password_confirmation" 
                value={formData.password_confirmation}
            />            
            <Form.Text id="passwordHelpBlock" muted>
                Please confirm your password
            </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Name</Form.Label>
            <Form.Control 
                onChange={handleChange} 
                placeholder="Ex: John Doe"
                type="text" 
                name="name"
                value={formData.name} 
            />            
            </Form.Group>
            {formData.acct_type === "Parent" || formData.acct_type === "--Choose Account Type--"  ? null : school}
            <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control 
                onChange={handleChange} 
                name="phone_number" 
                placeholder="123456789" 
                value={formData.phone_number}
                />
            </Form.Group>
            
            <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
            onChange={handleChange} 
            name="email" 
            type="email" 
            placeholder="name@example.com"
            value={formData.email}
             />
            
            </Form.Group>

            {/* <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control 
            value={formData.notes} 
            as="textarea" rows={3} 
            onChange={handleChange} 
            name="notes"/>
            </Form.Group> */}

            <Form.Group className="mb-3">
                <Form.Label> Upload your Photo ID</Form.Label>
                <Form.Control 
                placeholder='Insert URL'
                    type="text"
                    onChange={handleChange}
                    name="photo_id"
                    value={formData.photo_id}
                />           
            </Form.Group>
            <div className="mb-3 d-grid gap-2">
        <Button type="submit" size="lg"> Signup </Button>
            </div>
            
        </Form>
    </Container>
        
    )
}
export default SignUpForm