import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import '../style.css'; // Import the CSS file
import axios from 'axios';

function SellItem() {
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemCategory, setItemCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [startingPrice, setStartingPrice] = useState('');
    const [numOfDays, setNumOfDays] = useState('');
    const isFormValid = itemName && itemDescription && startingPrice && numOfDays;
    const location = useLocation();
    const {userName} = location.state || {};
    const navigate = useNavigate();

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesResponse = await axios.get('http://localhost:8080/api/auth/getCategories');
                setCategories(categoriesResponse.data);
            } catch (error) {
                console.error('Error fetching categories', error);
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/auth/sellitem', {
                itemName: itemName,
                itemDescription: itemDescription,
                itemCategory: itemCategory,
                startingPrice: parseFloat(startingPrice),
                numOfDays: parseInt(numOfDays),
                sellerUserId: userName,
            });

            console.log(response.data);
            alert('Congratulations! Item added to the repository');
            setItemName('');
            setItemDescription('');
            setStartingPrice('');
            setNumOfDays('');
            navigate('/Browseitems', {state: {userName}});
        } catch (error) {
            console.error('Error adding item', error);
            alert('Failed to add item. Please try again.');
        }
    };

    // Conditionally render the form based on login status
    return (
        <div>
            {userName ? (
                <div className="form SellItem">
                    <h2>Item for Sale</h2>
                    <form onSubmit={handleSubmit} className="form">
                        <label htmlFor="itemName">Item Name: </label>
                        <input type="text" id="itemName" value={itemName}
                               onChange={(e) => setItemName(e.target.value)}/>
                        <label htmlFor="itemDescription">Item Description: </label>
                        <textarea type="text" id="itemDescription" value={itemDescription}
                                  onChange={(e) => setItemDescription(e.target.value)} rows={5}/>
                        {/* Conditionally render category selection based on categories */}
                        {categories.length > 0 && (
                            <>
                                <label htmlFor="itemCategory">Item Category: </label>
                                <select value={itemCategory} onChange={(e) => setItemCategory(e.target.value)} style={{ width: '100%' }}>
                                    <option value="All">All Categories</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </>
                        )}

                        <label htmlFor="startingPrice">Starting Price: </label>
                        <input type="number" id="startingPrice" value={startingPrice}
                               onChange={(e) => setStartingPrice(e.target.value)}/>
                        <label htmlFor="numOfDays">Number Of Days: </label>
                        <input type="number" id="numOfDays" value={numOfDays}
                               onChange={(e) => setNumOfDays(e.target.value)}/>
                        <button type="submit" disabled={!isFormValid}
                                className={isFormValid ? 'btn pink' : 'btn disabled'}>Submit
                        </button>
                    </form>
                </div>
            ) : (
                // Display a message or redirect to login if not logged in
                <div className={'form'}>
                    <h3>You must be logged in to sell items.</h3>
                    <button className={'btn blue'} onClick={() => navigate('/login') }>Login</button>
                </div>
            )}
        </div>
    );
}


export default SellItem;
