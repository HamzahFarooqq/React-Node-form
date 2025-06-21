import React, { useEffect, useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';


function Update() {
    // const {id} = useParams();
    const [user, setUser] = useState({name:'', email:'', password:''});        
    const {id} = useParams();
    const navigate = useNavigate();
    // const location = useLocation();
        
    // const queryParam = new URLSearchParams(location.search);    
    // console.log(queryParam.get('mode'));

    useEffect(()=>{
        axios.get(`http://localhost:3001/api/users/${id}`)
        .then(res => {
            setUser(res.data);
        })
        .catch(err => console.log(err.message))
    },[]);
    

    const handleInputChange = (e) => {        
        const {name,value} = e.target;        
        setUser(prev => ({
            ...prev,
            [name]: value
        }));
    }    

    const handlerUpdate = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:3001/api/users/${id}`, user)
        .then(res => {
            alert('User updated successfully!');
            navigate('/read');
        })
        .catch(err => {
            console.log(err.message);
            alert('Failed to update user.');
        });
    };


  return (
    <>
        <div className='container'>

            <h2>UPDATE USER FORM</h2>

            <form onSubmit={handlerUpdate}>
                <div className="mb-3">
                    <label  className="form-label">Name</label>
                    <input type="text" className="form-control" name='name' value={user.name} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label  className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' value={user.email} onChange={handleInputChange} />                
                </div>
                <div className="mb-3">
                    <label  className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={user.password} onChange={handleInputChange} />
                </div>
            
            
                <button type="submit" className="btn btn-primary">update</button>
            </form>

        </div>

    </>
  )
}

export default Update