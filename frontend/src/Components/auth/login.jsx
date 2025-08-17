
// this form is made
//  by using FORMIK LIBRARY 

import axios from 'axios';
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../Loader.jsx';
import { useFormik } from 'formik';
import { loginSchema } from '../../validation/loginValidation.js';



function Login() {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {email:'', password:''},
        validationSchema: loginSchema,
        onSubmit: (values) => {
                        
            axios.post('http://localhost:3001/api/users/login', values)
            .then(res => {
                console.log(res.data);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userData', JSON.stringify(res.data.data));            
                toast.success(res.data.message);
                setTimeout(() => {
                navigate('/dashboard');
                },3000)            
            })
            .catch(err => {
                // console.log(err.response.data.message);
                toast.error(err.response.data.message)
            })

        }            
    })

    
    

  return (
    <>
        {/* {loading && <Loader />} */}

        <div className='container'>
            <h2 className='py-5'>Login Page</h2>

            <form onSubmit={formik.handleSubmit}>
                
                <div className="mb-3">
                    <label  className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' value={formik.values.email} onChange={formik.handleChange} />  
                    {formik.errors.email && formik.touched.email && <p>{formik.errors.email}</p>}              
                </div>
                <div className="mb-3">
                    <label  className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={formik.values.password} onChange={formik.handleChange} />
                    {formik.errors.password && formik.touched.password && <p>{formik.errors.password}</p>}  
                </div>
            
            
                <button type="submit" className="btn btn-primary">Login</button>
            </form>

        </div>
    </>
  )
}

export default Login