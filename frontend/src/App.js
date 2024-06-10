import './App.css';
import './style.css'; // Import the CSS file
import Login from './components/Login';
import Signup from './components/Signup';
import SellItem from './components/SellItem';
import BrowseItems from './components/BrowseItems';
import ItemDetails from './components/ItemDetails';
import Bid from './components/Bid';
import Logout from './components/Logout';
import GetBidderInfo from './components/GetBidderInfo';
import logoImage from './poombit1.png'; // Import logo image
import { BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom';

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/> {/* Assuming you have a HomePage component */}
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/sellitem" element={<SellItem/>}/>
                <Route path="/browseitems" element={<BrowseItems/>}/>
                <Route path="/item/:id" element={<ItemDetails />} />
                <Route path="/placebid/:id" element={<Bid />} />
                <Route path="/logout/:id" element={<Logout/>} />
                <Route path="/getbidderinfo/:id" element={<GetBidderInfo/>} />
            </Routes>
        </BrowserRouter>
    );
}

function HomePage()
{
    //const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
    const navigate = useNavigate();
    
    const handleLoginClick = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        navigate('/login'); // Navigate to the login route
    }

    const handleSignupClick = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        navigate('/signup'); // Navigate to the login route
    }
    
    return (
        <div className="App">
            <img src={logoImage} alt="poombit logo"/>
            <h2>Have A Fun Bidding!</h2>
            <div>
                <button onClick={handleLoginClick} className="btn blue">Login</button>
                <br/>
                <button onClick={handleSignupClick} className="btn pink">Signup</button>
            </div>
        </div>);
}


export default App;

