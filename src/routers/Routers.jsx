import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth'; 
import { auth } from '../firebase.config'; 
import Home from '../components/Home';
import Shop from '../components/Recipes';
import ProductDetails from '../components/RecipeDetails';
import Login from '../components/Login';
import Signup from '../components/Signup';
import ProtectedRoute from './ProtectedRoute';
import Fav from '../components/Fav';
import NotFound from '../components/NotFound';
import RecipeUploadForm from '../components/RecipeUploadForm';

const Routers = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); 
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return ( 
      <div className="fullload">
        <div className="loader"></div> 
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to="/home" /> : <Signup />} />
      <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
      <Route path="/recipes" element={user ? <Shop /> : <Navigate to="/login" />} />
      <Route path="/recipes/:id" element={<ProductDetails />} />
      <Route path="/upload" element={user ? <RecipeUploadForm /> : <Navigate to="/login" />} />
      <Route path="/fav" element={user ? <Fav /> : <Navigate to="/login" />} />

      <Route path="/*" element={<ProtectedRoute />} />
      
      <Route path="notfound" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default Routers;
