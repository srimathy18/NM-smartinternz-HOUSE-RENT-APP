import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';
import Search from './pages/Search';
import ReviewForm from './pages/ReviewForm';
import OwnerRoute from './components/OwnerRoute';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
     
      <div className='flex flex-col justify-between min-h-screen'>
        <Header />
        <div className="flex-grow">
          <Routes>
          <Route 
              path="/" 
              element={
                <>
                  <div className="bg"></div> 
                  <Home />
                </>
              }
            />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<Search />} />
            <Route path="/listing/:listingId" element={<Listing />} />
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/update-listing/:listingId" element={<UpdateListing />} />
              <Route element={<OwnerRoute />}>
                <Route path="/create-listing" element={<CreateListing />} />
              </Route>
            </Route>
            <Route path="/review" element={<ReviewForm />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
  
}