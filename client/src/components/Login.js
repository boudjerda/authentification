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
        <div className="container">
            <Row>
                <Col className="image-login" span={12}>
                    <div className="image-login-container" >
                        
                    </div>
                </Col>
                <Col span={12}> 
                     <div className="main">
                            <p className="sign" align="center">Sign in</p>
                    
                            <form className="form1" onSubmit={onSubmitForm}>
                                <input className="un "  type="email" name="email" placeholder="email" value={email}onChange={e=>onChange(e)} />
                                <input className="pass" type="password" name="password" placeholder="password"value={password}onChange={e=>onChange(e)}/>
                                <button className="submit">submit</button>
                            </form>
                            <Link  className="forgot"  to="/register">Register</Link>
                    </div>
                </Col>
            </Row>
           
        </div>
    )
}
export default Login;