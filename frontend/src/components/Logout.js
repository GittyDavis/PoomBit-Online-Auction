import React from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import '../style.css'; // Import the CSS file
import axios from 'axios'; // Import axios for making HTTP requests

function Logout() {
    const navigate = useNavigate();
    const location = useLocation();
    const {userName} = location.state || {};

    const handleSubmit = async (event) => {
        const response = await axios.put(`http://localhost:8080/api/auth/logout/${userName}`);
            navigate('/');
    }

    return (
    <div className={'form'}>
        <p> Sure You want to log out? </p>
        <button type="submit" className={'btn pink'} onClick={handleSubmit}>submit</button>
    </div>
);
}

export default Logout;
