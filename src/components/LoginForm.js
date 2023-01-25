import {Form, Button, Container } from 'react-bootstrap'


function LoginForm(){

    return (
    <Container fluid="sm" style={{ width: '18rem' }}>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>User Name</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                    {/* We'll never share your email with anyone else. */}
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </Container>
    )
}

export default LoginForm