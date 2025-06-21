import axios from 'axios';
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';



function Login() {
    const navigate = useNavigate();
    const [loginUser, setLoginUser] = useState({email:'', password:''});

    function handlerChange(e) {
        const {name,value} = e.target;
        setLoginUser((prev) => ({
            ...prev,
            [name]:value
        }))
    }

    function handlerLogin(e) {
        e.preventDefault();
        axios.post('http://localhost:3001/api/users/login', loginUser)
        .then(res => {
            console.log(res.data);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userData', JSON.stringify(res.data.data));
            navigate('/dashboard')
        })
        .catch(err => err.message);

    }

  return (
    <>
        <div className='container'>
            <h2 className='py-5'>Login Page</h2>

            <form onSubmit={handlerLogin}>
                
                <div className="mb-3">
                    <label  className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' value={loginUser.name} onChange={handlerChange} />                
                </div>
                <div className="mb-3">
                    <label  className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={loginUser.password} onChange={handlerChange} />
                </div>
            
            
                <button type="submit" className="btn btn-primary" >Login</button>
            </form>

        </div>
    </>
  )
}

export default Login