import React from 'react'

function Dashboard() {
    const userData = JSON.parse(localStorage.getItem('userData'));

    return (
        <>
            <h2>dashboard</h2>

            <p>{userData?.name}</p>
            <p>{userData?.email}</p>
        </>
    )
}

export default Dashboard