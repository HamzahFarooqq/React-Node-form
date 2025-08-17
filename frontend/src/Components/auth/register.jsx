// this form is made
//  by using FORMIK LIBRARY 

// import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { registerSchema } from '../../validation/registerValidation.js';





function Register() {
    const navigate = useNavigate();
        

    const formik = useFormik({
        initialValues: { name: '', email: '', password: '' },
        validationSchema: registerSchema,
        onSubmit: async(values) => {
            
            try {
                const response = await axios.post('http://localhost:3001/api/users/register', values);
                // console.log(response.data);                
                navigate('/login');
            } catch (error) {
                console.error('Registration error:', error.response?.data || error.message);
            }
            // console.log(formik);        
        }
        
    });

        


  return (
    <>
        <div className='container'>
            <h2 className='py-5'>Registration Page</h2>

            <form onSubmit={formik.handleSubmit}>                
                <div className="mb-3">
                    <label  className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" value={formik.values.name} onChange={formik.handleChange}  />                    
                    {formik.errors.name && formik.touched.name && <p>{formik.errors.name}</p>}
                </div>
                <div className="mb-3">
                    <label  className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" value={formik.values.email} onChange={formik.handleChange}  />  
                    {formik.errors.email && formik.touched.email && (<p>{formik.errors.email}</p>)}              
                </div>
                <div className="mb-3">
                    <label  className="form-label">Password</label>
                    <input type="password" className="form-control"  name="password" value={formik.values.password} onChange={formik.handleChange}  />
                    {formik.errors.password && formik.touched.password && (<p>{formik.errors.password}</p>)}
                </div>            
            
                <button type="submit" className="btn btn-primary">Register</button>
            </form>

        </div>
    </>
  )
}

export default Register