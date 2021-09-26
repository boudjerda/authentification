import React,{Fragment,useState} from "react";
import {Link} from "react-router-dom"
import {toast} from "react-toastify";
import '../components/css/Register.css';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
const Register = ({setAuth}) =>{
    const [inputs,setInputs]= useState({
        email:"",
        password:"",
        name:""
    })
    const {email,password,name}=inputs
    const onChange=(e)=>{
        setInputs({...inputs,[e.target.name]
            :e.target.value

        });
    }
    const onSubmitForm =async(e)=>{
        e.preventDefault()
        try {
            const body = {email,password,name}
            
            const response= await fetch("http://localhost:5000/auth/register",
           {method:"POST",
            headers:{"Content-Type": "application/json"}, 
            body: JSON.stringify(body)
        });
            const parseRes = await response.json()
            if(parseRes.token){

                localStorage.setItem("token",parseRes.token)
                setAuth(true);
                toast.success("login successfully !")
                
            }else{
                setAuth(false); 
                toast.error(parseRes)
            }
     
        } catch (err) {
            console.error(err.message)
        }
    }
    return (
        

        <div className="container2">
          
                    <div className="main-register">
                       <p className="register"  align="center">Register</p>
                       <form className="form2" onSubmit={onSubmitForm}>
                           <input className="email-register " type="email" name="email" placeholder="email" value={email}onChange={e=>onChange(e)}/>
                           <input className="pass-register" type="password" name="password" placeholder="password" value={password}onChange={e=>onChange(e)}/>
                           <input className="pass-register" type="text" name="name" placeholder="name" value={name}onChange={e=>onChange(e)}/>
                           <button className="submit">submit</button>
                         </form>
                       <Link className="forgot" to="/login">login</Link>
                    </div>
           
        </div>
    )
}
export default Register;



