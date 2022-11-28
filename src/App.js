import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import ErrorPage from './pages/ErrorPage';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';


import IsPrivate from './components/IsPrivate'



import UserProfile from './pages/UserProfile';
import Favorites from './pages/Favorites';
import CreatePet from './pages/pet/CreatePet'
import MyPlaces from './pages/user/MyPlaces'
import PhotoUser from './pages/user/PhotoUser'
import PlacesForm from './pages/places/PlacesForm'

import AddReview from './pages/places/AddReview';

import PlaceDetails from './pages/places/PlaceDetails'
import OtherUser from './pages/user/OtherUser'
import PetProfile from './pages/PetProfile'






function App() {
   return (


     <div className="App">
       <Toaster />
       <Navbar />
       <Routes>
         <Route path="/" element={<Login />} />
         <Route path="home" element={<Home />} />
         <Route path="/signup" element={<Signup />} />
         <Route path="/pet-profile/create" element={<IsPrivate><CreatePet /></IsPrivate>} />
         <Route path="/profile" element={<IsPrivate><MyPlaces /></IsPrivate>} />
         <Route path="/user-profile/edit-photo" element={<IsPrivate><PhotoUser /></IsPrivate>} />
         <Route path="/addPlace" element={<IsPrivate><PlacesForm /></IsPrivate>} />
         <Route path="/places/:placeId" element={<IsPrivate><PlaceDetails /></IsPrivate>} />
         <Route path="*" element={<ErrorPage />} />
         <Route path="/UserProfile" element={<IsPrivate><UserProfile /></IsPrivate>} />
         <Route path="/user-profile/:userId" element={<IsPrivate><OtherUser /></IsPrivate>} />
         <Route path="/Favorites" element={<IsPrivate><Favorites /></IsPrivate>} />
         <Route path="/pet-profile" element={<IsPrivate><PetProfile /></IsPrivate>} />
         <Route path= "/addReview/:placeId" element= {<IsPrivate><AddReview /></IsPrivate>}/>
       </Routes>
     </div>



   );
}

export default App;
