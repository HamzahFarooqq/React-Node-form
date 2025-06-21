import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Read() {
    const [usersData, setUsersData] = useState([]);
    const navigate = useNavigate();

    function getUsers(){
        axios.get('http://localhost:3001/api/users/')
        .then(res => {
            setUsersData(res.data);
        })
        .catch(err => {
            console.log(err.message);
        })
    }

    useEffect(()=>{
        getUsers();
    }, [])


    function handlerDelete(e){
        const userId = e.target.getAttribute('data-id');
        axios.delete(`http://localhost:3001/api/users/${userId}`)
        .then((res) => {
            console.log(res.data);
            getUsers();
        })
        .catch(err => {            
            console.log(err.message);
        })


    }

    function handlerUpdate(id){
        navigate(`/update/${id}?mode=edit&ref=dashboard`);
    }

  return (
    <>
    <div className="container">
      <h2>Read</h2>
      <br />

        <table className="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">NAME</th>
                    <th scope="col">EMAIL</th>
                    <th scope="col">ACTION</th>                
                </tr>
            </thead>

            <tbody>
                {usersData.map((user, index) => (
                    <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>  
                        <td>
                            <button type="submit" className="btn btn-success" onClick={() => handlerUpdate(user._id)} >edit</button>
                            <button type="submit" className="btn btn-danger" data-id={user._id} onClick={handlerDelete} >delete</button>
                        </td>                  
                    </tr> 
                ))}
                              
            </tbody>
        </table>

    </div>
    </>
  )
}

export default Read