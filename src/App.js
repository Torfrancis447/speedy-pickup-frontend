import React, {useState, useEffect} from "react";
import { Switch, Route } from "react-router-dom"
import LoginForm from './components/LoginForm.js'
import SignUpForm from "./components/SignUpForm"
import NavBar from './components/NavBar.js'
import ChildContainer from './components/ChildContainer'


function App() {
  const [user, setUser] = useState([])

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((userInfo) => setUser(userInfo));
      }
    });
  }, [])
console.log(user)
  



  return (
    <>
    <NavBar setUser={setUser}/>

    <Switch>
    
    <Route exact path="/">
        <ChildContainer user={user}/>
    </Route>

    <Route path="/signup">
     <SignUpForm 
        setUser={setUser}
        user={user}
        />
    </Route>   
    
    <Route path ="/login">
     <LoginForm 
        setUser={setUser}
        user={user}
        />
    </Route>
    
    </Switch>
    </>
  );
}

export default App;
