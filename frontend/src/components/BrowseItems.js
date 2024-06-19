import {useNavigate, useLocation} from 'react-router-dom';
import '../style.css'; // Import the CSS file
import logoImage from '../poombit1.png';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './BrowseItems.css';

function BrowseItems() {
    const [auctionItems, setAuctionItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isUserSalesActive, setIsUserSalesActive] = useState(false);
    const [salesButtonText, setSalesButtonText] = useState('Own Auctions');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const {userName} = location.state || {};


    useEffect(() => {
        const fetchItemsAndCategories = async () => {
            try {
                const itemsResponse = await axios.get('http://localhost:8080/api/auth/browseItems');
                const categoriesResponse = await axios.get('http://localhost:8080/api/auth/getCategories');
                console.log('Items response:', itemsResponse.data);
                setAuctionItems(itemsResponse.data);
                setCategories(categoriesResponse.data);
                setIsUserSalesActive(false);
                setSelectedCategory('All');
                setLoading(false);
            } catch (error) {
                console.error('Error fetching items or categories', error);
                setError('Error fetching items or categories');
                setLoading(false);
            }
        };

        fetchItemsAndCategories();
    }, []);

    const handleSellClick = (event) => {
        event.preventDefault();
        navigate('/sellitem', {state: {userName: userName}});
    }

    if(auctionItems.length === 0)
    {
        return <div className={'form'}>
            <h2> Repository is empty. Would you like to add an item? </h2>
            <button onClick={handleSellClick} className="btn pink">Sell Item</button>
        </div>
    }

    const handleItemClick = (auctionItem) => {
        console.log('Item clicked:', auctionItem);
        navigate(`/item/${auctionItem.itemId}`, {state: {userName, auctionItem}});
    };

    const handleLogOut = (event) => {
        event.preventDefault();
        navigate(`/logout/${userName}`, {state: {userName}});
    };


    // Function to handle category selection (defined within the component)
    const onCategorySelect = (category) => {
        setSelectedCategory(category);
    }

    const onSalesSelect = () => {
        setIsUserSalesActive(!isUserSalesActive);
        setSalesButtonText(isUserSalesActive ? 'Own Auctions' : 'All Auctions');
    };

    const filteredItems = auctionItems.filter((item) => {
        if (isUserSalesActive) {
            // Show only user's sales
            return item.sellerUser === userName;
        } else if (selectedCategory === 'All') {
            // Show all items (default)
            return item.isClosed === false;
        } else {
            // Show items based on selected category
            return item.category === selectedCategory && item.isClosed === false;
        }
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {userName ? (
                <div className="browse-items-container">
                    {/* Category selection */}
                    <div className="category-bar">
                        <img src={logoImage} alt={'logo'} className={'logo small'}/>
                        <button onClick={handleSellClick} className="btn pink">Sell Item</button>

                        <h3>Filter by Category</h3>
                        <div className="category-buttons form">
                            {/* Button for "All" category */}
                            <button
                                key="all"
                                className={selectedCategory === 'All' ? 'active pressed' : 'pressed'}
                                onClick={() => onCategorySelect('All')}
                                className={'btn blue'}>
                                All Categories
                            </button>
                            {/* Buttons for individual categories */}
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    className={selectedCategory === category ? 'active pressed' : 'pressed'}
                                    onClick={() => onCategorySelect(category)}
                                    className={'btn blue'}>
                                    {category}
                                </button>
                            ))}

                        </div>
                    </div>
                    {/* List of items */}
                    <div>
                        <h2 style={{fontFamily: 'Arial', color: '#2a0d4b', textAlign: 'center'}}>PoomBit Auctions</h2>
                        <p style={{textAlign: 'center'}}>*Press to view more details*</p>
                        <button onClick={handleLogOut} className={'btn blue'}>Log Out</button>
                        <button
                            className={isUserSalesActive ? 'active pressed' : 'pressed'}
                            onClick={onSalesSelect}
                            className={'btn pink'}
                            style={{width: 120}}
                        >{salesButtonText}</button>
                        <div className="items-list">
                            {filteredItems.map((auctionItem) => (
                                <button key={auctionItem.auctionId} className={auctionItem.isClosed? "item-button passed" : "item-button"}
                                        onClick={() => handleItemClick(auctionItem)}>
                                    <h3>{auctionItem.name}</h3>
                                    <p>Starting Price: {auctionItem.startingPrice}</p>
                                    <p>Current Price: {auctionItem.currentPrice}</p>
                                    <p>Category: {auctionItem.category}</p>
                                    <p>Seller: {auctionItem.sellerUser}</p>
                                    <p>Description: {auctionItem.description}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                // Display a message or redirect to login if not logged in
                <div className={'form'}>
                    <h3>You must be logged in to sell items.</h3>
                    <button className={'btn blue'} onClick={() => navigate('/login')}>Login</button>
                </div>
            )}
        </div>

    );
}

export default BrowseItems;

