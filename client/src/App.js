import React,{Fragment,useState,useEffect} from "react";
import {
  BrowserRouter as Router ,
  Switch,
  Route,
  Redirect

} from "react-router-dom";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
// components 
import Login from "./components/Login";
import Main from "./components/main/Main";
import Register from "./components/Register";


toast.configure();
function App() {

  const [isAuthenticated,setIsAuthenticated]=useState(true);

  const setAuth = (boolean) =>{
    setIsAuthenticated(boolean) 
  }
  async function isAuth(){
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify",{
        method:"GET",
        headers:{token:localStorage.token}
    })
    const parseRes = await response.json()
    parseRes === true ? setIsAuthenticated(true):setIsAuthenticated(false)
    console.log(parseRes)
      
    } catch (err) {
      console.error(err.message)
    }
  }
  useEffect(()=>{
    isAuth()
},[])
  return (
  <Fragment>
   <Router>
     <div >
       
     <Switch>
        <Route exact path ="/login" render={props => !isAuthenticated ? ( <Login {...props} setAuth={setAuth} /> ): (<Redirect to="/main"/>)}/>
        <Route exact path ="/register" render={props => !isAuthenticated ? (<Register  {...props} setAuth={setAuth}/>) :(<Redirect to="/login"/>)}/>
        <Route exact path ="/main"render={props =>isAuthenticated ? (<Main {...props} setAuth={setAuth}/>):(<Redirect to="/login"/>)}/>
        
     </Switch>   
     </div>
     
   </Router>
  </Fragment>
  );
}

export default App;
