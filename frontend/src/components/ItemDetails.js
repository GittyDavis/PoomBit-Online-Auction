import {useLocation, useNavigate} from 'react-router-dom';
import {parseISO, format} from 'date-fns';

import React from 'react'; // Import necessary hooks

function ItemDetails() {
    const location = useLocation();
    const navigate = useNavigate();

    const {userName, auctionItem} = location.state;
    //Parse and format dates
    const startDate = auctionItem.auctionStartDate ? format(parseISO(auctionItem.auctionStartDate), 'dd/MM/yyyy') : 'Invalid Date';
    const endDate = auctionItem.auctionEndDate ? format(parseISO(auctionItem.auctionEndDate), 'dd/MM/yyyy') : 'Invalid Date';
    const isSeller = userName === auctionItem.sellerUser ? true : false;
    const isTimePassed = auctionItem.isClosed;

    const handleBidClick = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        navigate(`/placebid/${auctionItem.itemId}`, {
            state: {
                userName,
                auctionItemId: auctionItem.auctionId,
                lastPrice: auctionItem.currentPrice
            }
        });
    }

    const handleBackClick = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        navigate('/browseitems', {state: {userName}});
    }

    const handleGetInformationClick = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        navigate(`/getbidderinfo/${auctionItem.itemId}`, {state: { bidderName: auctionItem.highestBidder}});
    }

    return (
        <div className={'form'}>
            <div className={'item-details'}>
                <h2>Item Details</h2>
                <h3>{auctionItem.name} ({auctionItem.itemId})</h3>
                <p>Starting Price: ${auctionItem.startingPrice}</p>
                <p>Current Price: ${auctionItem.currentPrice}</p>
                <p>Highest Bidder: {auctionItem.highestBidder}</p>
                <p>Number of Offers: {auctionItem.itemOffersCount}</p>
                <p>Start Date: {startDate}</p>
                <p>End Date: {endDate}</p>

                <button onClick={handleBidClick} className={!isSeller ? 'btn blue' : 'btn disabled'}
                        disabled={isSeller}>Bid It!
                </button>
                <button onClick={handleBackClick} className="btn blue">Back</button>
                {isSeller && (
                    <div>
                        <p style={{color: '#cc3c34'}}>This is your own item. You have no permittion to bid it</p>
                        {isTimePassed && (
                            <div>
                                <p>This auction has ended</p>
                                <button onClick={handleGetInformationClick} className={'btn pink'}>Get Bidder
                                    information
                                </button>
                            </div>)}
                    </div>)}
            </div>
        </div>
    );
}

export default ItemDetails;

