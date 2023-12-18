import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({  children }) => {
  // Vérifier si l'utilisateur est authentifié
  const isAuthenticated = /* Logique d'authentification */ false;

  // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  

  // Rendre la route protégée
   return children;;
};

export default PrivateRoute;