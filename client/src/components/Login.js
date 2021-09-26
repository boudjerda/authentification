import React,{Fragment,useState} from "react";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import '../components/css/Login.css';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
const Login = ({setAuth}) =>{

    const [inputs,setInputs]= useState({
        email:"",
        password:""
    })
    const {email,password}=inputs
    const onChange=(e)=>{
        setInputs({...inputs,[e.target.name]
            :e.target.value

        });}

        const onSubmitForm =async(e)=>{
            e.preventDefault()
            try {const body = {email,password}
                const response= await fetch("http://localhost:5000/auth/login",
                {method:"POST",
                 headers:{"Content-Type": "application/json"}, 
                 body: JSON.stringify(body)
                 
             });
             const parseRes = await response.json()
             console.log('bbbb',parseRes)
            if(parseRes.token){

                localStorage.setItem("token",parseRes.token)
                setAuth(true);
                toast.success("login successfully !")
                console.log('hoooooooooooo')
            }else{
                setAuth(false); 
                toast.error(parseRes)
            }


             
            } catch (err) {
                console.error(err.message)
            }
        }
    return (
        <div className="login-page">
           <div className="container">
               
                    <div className="sub-container-left">
                    <div className="image-left" >
                        
                    </div>
                    </div>
                
                    
                    
                            <form className="sub-container-right" onSubmit={onSubmitForm}>
                                <div className="image-right"></div>
                                <div className="login-title"> 
                                 <h1>login GeoBI</h1>
                                </div>
                                <div className="input-container">
                                <input className="un "
                                   type="email" name="email"
                                   placeholder="email" value={email}
                                   onChange={e=>onChange(e)} />
                                   </div>
                                   <div className="input-container">
                                <input className="pass"
                                 type="password" name="password"
                                  placeholder="password"value={password}
                                  onChange={e=>onChange(e)}/>
                                </div>
                                <div className="forgot-password">
                                <Link  className="forgot"  to="/register">
                                <p className="forgot-password-text"> Register </p>
                                </Link>
                                    </div>
                                    <div className="input-container">
                                <button className="submit">submit</button>
                                </div>
                                <div className="footer">
                                    <p className="footer-text">
                                        copyright @ djamel 2021
                                    </p>
                                </div>
                            </form>
                            
                    
                
                    </div>  
           
        </div>
    )
}
export default Login;