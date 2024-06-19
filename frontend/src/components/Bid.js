import React, {useState} from 'react';
import axios from 'axios';

import {useLocation, useNavigate} from 'react-router-dom';

function Bid() {
    const location = useLocation();
    const {userName, auctionItemId, lastPrice} = location.state || {};
    const [newPrice, setNewPrice] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleBidSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/auth/placebid', {
                userName: userName,
                auctionItemId: auctionItemId,
                newPrice: parseFloat(newPrice)
            });

            console.log('Bid placed:', response.data);
            alert('Success!!');
            navigate('/browseitems', { state: { userName: userName } });

        } catch (error) {
            if (error.response.status === 400) {
                alert('Your bid must be higher in 5% than the last bid. Minimum price: '+ (lastPrice+lastPrice/20));
            } else {
                alert('Failed to place bid. Please try again.');
            }
            setNewPrice('');
            // alert(error.response.body);
            console.error('Error placing bid', error);

        }
    };

    return (
        <div>
            {error && <div>{error}</div>}
            {userName ? ( // Render form only if user is logged in
                <div className={'form'}>
                    <h2>Place Your Bid</h2>
                    <p>The last bid is ${lastPrice}</p>
                    <form className={'form'} onSubmit={handleBidSubmit} >
                        <label htmlFor="newPrice">Enter your bid:</label>
                        <input type="number" id="newPrice" value={newPrice}
                               onChange={(e) => setNewPrice(e.target.value)}
                               required/>
                        <button type="submit" className={'btn blue'}>Place Bid</button>
                    </form>
                </div>
            ) : (// Display a message or redirect to login if not logged in
                <div>
                    <p>You must be logged in to sell items.</p>
                    <button onClick={() => navigate('/login')}>Login</button>
                </div>
            )}
        </div>
    );
}


export default Bid;
