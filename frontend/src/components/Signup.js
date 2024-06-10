import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.css'; // Import the CSS file
import logoImage from '../poombit1.png';
import axios from 'axios'; // Import axios for making HTTP requests


function Signup() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const isFormValid = username && password && email && phone; // Check if fields are filled

    const navigate = useNavigate();

    const clearForm = () => {
        setUsername('');
        setPassword('');
        setEmail('');
        setPhone('');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Signup details:', username, password, email, phone);

        try {
            const response = await axios.post('http://localhost:8080/api/auth/signup', {
                userName: username,
                password: password,
                email: email,
                phone: phone
            });
            console.log(response.data);
            alert('Sign up successful! Please Log In with your details :)');
            clearForm()
            navigate('/login');
        } catch (error) {
            console.error('Error signing up', error);
            if (error.response && error.response.status === 409) {
                alert('Username already exists. Please choose a different username.');
            } else {
                alert('Sign up failed. Please try again.');
            }
            clearForm()
        }
    };

    return (
        <div>
            <img src={logoImage} alt={'logo'} className={'logo small'}/>
            <div className="form Signup">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit} className="form">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                    <label htmlFor="email">Email:</label>
                    {/* eslint-disable-next-line no-undef */}
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <label htmlFor="phone">Phone Number:</label>
                    {/* eslint-disable-next-line no-undef */}
                    <input type="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                    <button type="submit" disabled={!isFormValid} className={isFormValid ? 'btn pink' : 'btn disabled'} >submit</button>

                </form>
            </div>
        </div>
    );
}



export default Signup;


// <button onclick={handleSubmitSignup} type="submit">submit</button>