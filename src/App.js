import React from "react";
import { Switch, Route } from "react-router-dom"
import LoginForm from './components/LoginForm.js'
import SignUpForm from "./components/SignUpForm"
import NavBar from './components/NavBar.js'


function App() {
  // const [user, setUser] = useState(null)



  return (
    <>
    <NavBar />

    <Switch> 
    <Route path="/signup">
     <SignUpForm />
    </Route>   
    
    <Route path ="/login">
     <LoginForm />
    </Route>
    
    </Switch>
    </>
  );
}

export default App;
