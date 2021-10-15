
import './App.scss';
import Navbar from './components/navbar/Navbar';
import AllReviews from './components/all-reviews/AllReviews';
import {BrowserRouter as Router} from 'react-router-dom';

function App() {
  
  return (
    <Router>
        <div className="App text-capitalize ">
          <Navbar />
          <AllReviews />
        </div>

    </Router>
  );
}

export default App;
