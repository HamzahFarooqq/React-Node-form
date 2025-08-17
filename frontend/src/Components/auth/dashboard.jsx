import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../assets/styles/dashboard.css';


function Dashboard() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const navigate = useNavigate();

     const handleLogout = () => {        
        localStorage.removeItem('token');
        localStorage.removeItem('user');  
        toast.success('Loging Out...');
        setTimeout(()=>{
            navigate('/login');
        }, 3000)      
    };



    return (
        <>
            <div className="dashboard-container container-fluid">
                <div className="row">
                    <div className="sidebar col-lg-3">
                        <h2>dashboard</h2>
                        <p>{userData?.name}</p>
                        <p>{userData?.email}</p>
                        <button onClick={handleLogout}>Logout</button>
                    </div>            
                    <div className="main-container col-lg-9">
                    </div>            
                    

                </div>
            </div>
        </>
    )
}

export default Dashboard