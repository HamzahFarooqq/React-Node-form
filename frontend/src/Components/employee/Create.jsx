import React, { useState } from 'react'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

function Create() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handlerSubmit = (e) => {
        e.preventDefault();        

        axios.post('http://localhost:3001/api/users/create',{
            name: name,
            email: email,
            password: password
        })   
        
        alert('new user created.');
        navigate('/read');
    }
    

  return (
    <>
    <div className='container'>
        <h2>Create</h2>

        <form>
             <div className="mb-3">
                <label  className="form-label">Name</label>
                <input type="text" className="form-control"  value={name} onChange={(e)=>setName(e.target.value)} />
            </div>
            <div className="mb-3">
                <label  className="form-label">Email address</label>
                <input type="email" className="form-control"  value={email} onChange={(e)=>setEmail(e.target.value)} />                
            </div>
            <div className="mb-3">
                <label  className="form-label">Password</label>
                <input type="password" className="form-control"  value={password} onChange={(e)=>setPassword(e.target.value)} />
            </div>
           
           
            <button type="submit" className="btn btn-primary" onClick={handlerSubmit}>Submit</button>
        </form>

    </div>
    </>
  )
}

export default Create