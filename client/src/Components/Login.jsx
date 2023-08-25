import { useState } from "react"
import {backendUrl} from '../constants/constant.js'
import {useNavigate} from 'react-router-dom';


export default function Login(){
    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        try {
            console.log("backendurl: "+ backendUrl);
            const response = await fetch(`${backendUrl}/login`, {
                method: "POST",
                headers:{
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  email: email,
                  name: name
                })
             
              });
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const json = await response.json();
              if(json.token){
                localStorage.setItem("token", json.token)
                localStorage.setItem("name", json.name)
                navigate('/home');
              }else{
                alert('login failed');
              }
            
             
        } catch (error) {
            console.error('Error during login:', error);
            alert('Error Occured');
        }
    }
    
    return(
      <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label><br/>
            <input type="email" name="email" onChange={(e) => setEmail(e.target.value)}/><br />
            <label htmlFor="name" >Name</label><br />
            <input type="text" name="name" onChange={(e) => setName(e.target.value)}/><br/>
            <input type="submit" />
        </form>
      </>
    )
  }