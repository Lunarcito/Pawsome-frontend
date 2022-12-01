import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Home from './pages/Home';
import Navbar from './components/homeComponents/Navbar';
import ErrorPage from './pages/ErrorPage';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import IsPrivate from './components/authComponents/IsPrivate'
import UserProfile from './pages/user/UserProfile';
import Favorites from './pages/user/Favorites';
import CreatePet from './pages/pet/CreatePet'
import MyPlaces from './pages/user/MyPlaces'
import PhotoUser from './pages/user/PhotoUser'
import PlacesForm from './pages/places/PlacesForm'
import AddReview from './pages/places/AddReview';
import PlaceDetails from './pages/places/PlaceDetails'
import OtherUser from './pages/user/OtherUser'
import PetProfile from './pages/pet/PetProfile'
import Forgotpassword from './pages/auth/Forgotpassword';
import ResetScreen from './pages/auth/ResetScreen';
import EditPlace from './pages/places/EditPlace'
import IsLoggedin from './components/authComponents/IsLoggedin';

import { ChakraProvider } from '@chakra-ui/react'
import Footer from './components/homeComponents/Footer'


function App() {
  return (

 <ChakraProvider>
   
      <div className="App">
        
        <Toaster />
        <Navbar />
        <Routes>
          <Route path="/" element={<IsLoggedin><Login /></IsLoggedin>} />
          <Route path="home" element={<Home />} />
          <Route path="/signup" element={<IsLoggedin><Signup /></IsLoggedin>} />
          <Route path="/pet-profile/create" element={<IsPrivate><CreatePet /></IsPrivate>} />
          <Route path="/profile/myPlaces" element={<IsPrivate><MyPlaces /></IsPrivate>} />
          <Route path="/user-profile/edit-photo" element={<IsPrivate><PhotoUser /></IsPrivate>} />
          <Route path="/addPlace" element={<IsPrivate><PlacesForm /></IsPrivate>} />
          <Route path="/places/:placeId" element={<PlaceDetails />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/profile" element={<IsPrivate><UserProfile /></IsPrivate>} />
          <Route path="/user-profile/:userId" element={<IsPrivate><OtherUser /></IsPrivate>} />
          <Route path="/Favorites" element={<IsPrivate><Favorites /></IsPrivate>} />
          <Route path="/pet-profile" element={<IsPrivate><PetProfile /></IsPrivate>} />
          <Route path="/addReview/:placeId" element={<IsPrivate><AddReview /></IsPrivate>} />
          <Route path="/forgotPassword" element={<IsPrivate><Forgotpassword /></IsPrivate>} />
          <Route path="/setNewPassword" element={<IsPrivate><ResetScreen /></IsPrivate>} />
          <Route path="/profile/MyPlaces/edit-place/:placeId" element={<IsPrivate><EditPlace /></IsPrivate>} />
        </Routes>  
       
         <Footer />
      </div>


         </ChakraProvider>

  );
}

export default App;
