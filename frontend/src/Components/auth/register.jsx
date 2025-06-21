import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';





function Register() {
    const navigate = useNavigate();
    const [registerUser, setRegisterUser] = useState({
        name: '', email: '', password: ''
    });

    function handlerChange(e) {
        const {name, value}  = e.target;
        setRegisterUser((prev) => ({
            ...prev , 
            [name] : value
        }))
    }

    const handlerRegisterSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/api/users/register', registerUser)
        .then(res => {
            console.log(res.data);
            navigate('/login')

        })
        .catch(err => {
            console.log(err.message)
        })
    }



  return (
    <>
        <div className='container'>
            <h2 className='py-5'>Registration Page</h2>

            <form>
                
                <div className="mb-3">
                    <label  className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" value={registerUser.name} onChange={handlerChange}  />
                </div>
                <div className="mb-3">
                    <label  className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" value={registerUser.email} onChange={handlerChange}  />                
                </div>
                <div className="mb-3">
                    <label  className="form-label">Password</label>
                    <input type="password" className="form-control"  name="password" value={registerUser.password} onChange={handlerChange}  />
                </div>
            
            
                <button type="submit" className="btn btn-primary" onClick={handlerRegisterSubmit}>Register</button>
            </form>

        </div>
    </>
  )
}

export default Register