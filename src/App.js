import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom"
import LoginForm from './components/LoginForm.js'
import SignUpForm from "./components/SignUpForm"
import NavBar from './components/NavBar.js'
import ChildContainer from './components/ChildContainer'
import AccountInformation from './components/AccountInformation'
import { useHistory } from 'react-router-dom';

function App() {
  const[errors, setErrors]=useState([])
  const [user, setUser] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [render, setRender] = useState("")

let history = useHistory()

  useEffect(() => {
    // console.log("auto-login render")
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((userInfo) => {
          setUser(userInfo)});
      } else {
        r.json().then((err) => console.log(err))
      }
    });
  }, [render, showModal])
  // console.log(user)

  function renderUseEffect() {
    setRender(Math.random())
  }


  return (
    <>
      <NavBar user={user} setUser={setUser} />

      <Switch>



        <Route exact path="/">
          <ChildContainer
            user={user}
            showModal={showModal}
            setShowModal={setShowModal}
            render={renderUseEffect}
          />
        </Route>

        <Route path="/signup">
          <SignUpForm
            setUser={setUser}
            user={user}
          />
        </Route>

        <Route path="/login">
          <LoginForm
            setUser={setUser}
            user={user}
          />
        </Route>
        <Route path="/account-information">

          <AccountInformation user={user} set={setUser} />

        </Route>

      </Switch>
    </>
  );
}

export default App;
