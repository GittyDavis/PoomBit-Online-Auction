import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.css'; // Import the CSS file
import logoImage from '../poombit1.png';
import axios from 'axios'; // Import axios for making HTTP requests

function Login() {
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const isFormValid = userName && password;
    const navigate = useNavigate();

    const clearForm = () => {
        setUsername('');
        setPassword('');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Login details:', userName, password);
        try {
                const response = await axios.post('http://localhost:8080/api/auth/login', {
                userName: userName,
                password: password
            });
            console.log(response.data);
            alert('Login successful! Hello ' + userName);
            clearForm();
            navigate('/browseitems' ,{ state: { userName: userName }}); // Navigate to the login route
        } catch (error) {
            console.error('Error loging', error);
            if (error.response) {
                // Handle errors with status code
                if (error.response.status === 401) {
                    alert('Invalid username or password. Please try again.');
                } else if (error.response.status === 409) {
                    alert('Username already exists. Please choose a different username.');
                } else if (error.response.status === 500) {
                    alert('Internal server error. Please try again later.');
                } else {
                    alert('An error occurred. Please try again.');
                }
                clearForm();
            } else if (error.request) {
                // Handle network errors
                alert('Network error. Please check your internet connection.');
            } else {
                // Handle other errors
                alert('An unexpected error occurred.');
            }
        }
    };

    return (
        <div>
            <img src={logoImage} alt={'logo'} className={'logo small'}/>
            <div className="form Login">
                <h2>Login</h2>
                <form onSubmit={handleSubmit} className="form">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" value={userName} onChange={(e) => setUsername(e.target.value)} />
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" disabled={!isFormValid} className={isFormValid ? 'btn pink' : 'btn disabled'}>submit</button>
                </form>
            </div>
        </div>
    );
}


// function Login() { // Props for login function
//
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const isFormValid = username && password; // Check if both fields are filled
//
//     const navigate = useNavigate();
//
//     const handleSubmit = (event) => {
//         event.preventDefault(); // Prevent default form submission behavior
//         // Implement login logic here (e.g., API call)
//         console.log('Login details:', username, password); // For now, log details
//
//         // Call the onLogin prop function (passed from App.js) if login is successful
//         handleSubmitLogin(username, password); // Assuming successful login
//     }
//
//     const handleSubmitLogin = (username, password) => {
//         // Print form data using console.log for testing purposes
//         console.log(`Username: ${username}, Password: ${password}`);
//         alert('Login successful! Hello '+username);
//         //setIsLoggedIn(true); // Update login status if needed
//         setUsername('');
//         setPassword('');
//         navigate('/midmenu'); // Navigate to the login route
//
//     };
//
//     return (
//         <div>
//             <img src={logoImage} alt={'logo'} className={'logo small'}/>
//             <div className="form Login">
//                 <h2>Login</h2>
//                 <form onSubmit={handleSubmit} className="form" >
//                     <label htmlFor="username">Username:</label>
//                     {/* eslint-disable-next-line no-undef */}
//                     <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
//                     <br/><label htmlFor="password">Password:</label>
//                     {/* eslint-disable-next-line no-undef */}
//                     <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
//                     <br/>
//                     <button type="submit" disabled={!isFormValid} className={isFormValid ? 'btn pink' : 'btn disabled'} >submit</button>
//                 </form>
//             </div>
//         </div>
//     );
// }




export default Login;
