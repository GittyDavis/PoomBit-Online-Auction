import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';

import React, {useState, useEffect} from 'react'; // Import necessary hooks

function GetBidderInfo() {
    const location = useLocation();
    const navigate = useNavigate();
    const {userName, bidderName} = location.state;
    const [bidderDetails, setBidderDetails] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleBackClick = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        navigate('/browseitems', {state: {userName}});
    }

    useEffect(() => {
        const fetchBidderDetails = async () => {
            try {
                const bidderDetails = await axios.get(`http://localhost:8080/api/auth/getbiderdetails/${bidderName}`);
                console.log('details response:', bidderDetails.data);
                setBidderDetails(bidderDetails.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching bidder details', error);
                setError('Error fetching bidder details');
                setLoading(false);
            }
        };

        fetchBidderDetails();
    }, []);


    return (
        <div className={'form'}>
            <div className={'item-details'} style={{background: '#cc3c34'}}>
                <h2>Highest Bidder Details: </h2>
                <h3>{bidderName}</h3>
                <p>Email Adress: {bidderDetails.email}</p>
                <p>Phone Number: {bidderDetails.phone}</p>
                <h3>Good Luck!</h3>
            </div>
            <button onClick={handleBackClick} className="btn blue">Back</button>
        </div>
    );
}

export default GetBidderInfo;
