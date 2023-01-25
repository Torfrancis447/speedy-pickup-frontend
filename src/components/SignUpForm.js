import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import SchoolIdInput from './SchoolIdInput';
import { Alert } from 'react-bootstrap'


import React, {useState} from 'react';


function SignUpForm(){
    const[errors, setErrors] = useState([])
    const[formData, setFormData] = useState({
        name: "",
        user_name:'',
        password:'',
        password_confirmation:"",
        email:'',
        acct_type:"",
        phone_number:"",
        photo_id: "",
        school_id: undefined

    })

    

    function handleSubmit(e){
        e.preventDefault()
        setErrors([])
        fetch('/signup',{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }).then((r) =>{
            if(r.ok){
                
            } else {
                r.json().then((err)=>(setErrors(err.errors)))
            }
          })    
        
        }
    console.log(errors.errors)
    console.log(formData)
          
    function handleChange(e) {
        const name = e.target.name
        const value = e.target.value
        setFormData({...formData, [name]: value,})
    } 

    const school = 
    <div>
    <label>School: </label>
    <input 
        // value={formData.date}
        onChange={handleChange}                                
        type="number" 
        name="school_id" 
        placeholder='Ex: school..'
    />
    </div>



    return (       
            // <form onSubmit={handleSubmit}>
            //     <div >
            //         <div>
            //             <div>
            //                 <label>Account Type: </label>
            //                 <select 
            //                     onChange={handleChange}
                                
            //                     placeholder='Select Account Type...' 
            //                     name='acct_type' 
            //                     // value={mountainData.name}
            //                     >
            //                     <option >Choose Account Type</option>
            //                     <option >Parent</option>
            //                     <option>Teacher</option>
            //                 </select>
            //             </div>
            //             <div>
            //                 <label>Username: </label>
            //                 <input 
            //                     // value={formData.date}
            //                     onChange={handleChange}                                
            //                     type="text" 
            //                     name="user_name" 
            //                     placeholder='Ex: johndoe..'
            //                 />
            //             </div>
            //             <div >
            //                 <label>Password: </label>
            //                 <input 
            //                     // value={formData.buddies}
            //                     onChange={handleChange}                                
            //                     type="password" 
            //                     name="password" 
            //                 />
            //             </div>
            //             <div>
            //                 <label>Confirm Password: </label>
            //                 <input 
            //                     // value={formData.buddies}
            //                     onChange={handleChange}  
                                
            //                     type="password" 
            //                     name="password_confirmation" 
            //                 />
            //             </div>
            //             <div>
            //                 <label>Name: </label>
            //                 <input 
            //                     // value={formData.buddies}
            //                     onChange={handleChange}                           
            //                     // onChange={(e) => console.log(e.target.value)}
            //                     type="text" 
            //                     name="name"
            //                     placeholder='Ex: John Doe..'
            //                 />
            //             </div>
            //             <div>
            //                 <label>Email: </label>
            //                 <input 
            //                     // value={formData.buddies}
            //                     onChange={handleChange}  
                                
            //                     type="text" 
            //                     name="email"
            //                     placeholder='Ex: johndoe@gmail.com'
            //                 />
            //             </div>
            //             <div>
            //                 <label>Phone Number: </label>
            //                 <input 
            //                     // value={formData.buddies}
            //                     onChange={handleChange}  
                                
            //                     type="tel" 
            //                     name="phone_number"
            //                     placeholder='Ex: (248)909-4311)'
            //                 />
            //             </div>
            //             {formData.acct_type === "Parent" ? null : school}
            //             <div>
            //                 <label>Upload your photoID: </label>
            //                 <input 
            //                 onChange={handleChange}
            //                 type="file" 
            //                 name="photo_id"
            //                 />
            //             </div>
            //             <div>

            //         </div>
            //         {errors.map((e) => 
            //             <Alert variant='danger' key={e}>{e}</Alert>)}
            //         </div>
            //     </div>
            //     <div >
            //         <button type='submit' >Create User</button>
            //     </div> 
            // </form>
    

      <Container style={{ width: '18rem' }}>
         <Form>
             <Form.Group>
                 <Form.Label>Username: </Form.Label>
            <Form.Control 
                onChange={handleChange}
                placeholder="Ex: johndoe.." 
                type="text" 
                name="name" 
            />            
            </Form.Group>
            <Form.Group >
                <Form.Label>Password: </Form.Label>
            <Form.Control 
                onChange={handleChange} 
                type="password"
                id="inputPassword5"
                // aria-describedby="passwordHelpBlock" 
                name="password" 
            />            
            <Form.Text id="passwordHelpBlock" muted>
                Your password must be 8-20 characters long, contain letters and numbers,
                and must not contain spaces, special characters, or emoji.
            </Form.Text>
            </Form.Group>
            <Form.Group >
                <Form.Label>Confirm Password: </Form.Label>
            <Form.Control 
                onChange={handleChange} 
                type="password"
                id="inputPassword5"
                aria-describedby="passwordHelpBlock" 
                name="password_confirmation" 
            />            
            <Form.Text id="passwordHelpBlock" muted>
                Please confirm your password
            </Form.Text>
            </Form.Group>
            <Form.Group >
                <Form.Label>Name</Form.Label>
            <Form.Control 
                onChange={handleChange} 
                placeholder="Ex: John Doe"
                type="text" 
                name="name" 
            />            
            </Form.Group>

            
            <Form.Group >
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="phonenumber" placeholder="123456789" />
            </Form.Group>
            
            <Form.Group >
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>

            <Form.Group >
            <Form.Label>Notes</Form.Label>
            <Form.Control as="textarea" rows={3} />
            </Form.Group>

            {/* <Form.Group>
                <Form.Label> Upload your Photo ID</Form.Label>
                <Form.File type="file" as="file"/>                
            </Form.Group> */}

            <Form.Group>
                <Form.Select>
                    <option>Choose Account Type</option>
                    <option value="Parent">Parent</option>
                    <option value="Teacher">Teacher</option>                
                </Form.Select>
            </Form.Group>           

        </Form>
    </Container>
        
    )
}
export default SignUpForm