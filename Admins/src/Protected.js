import React from 'react'
import { Navigate } from 'react-router-dom';

const Protected = ({ check, children }) => {
    console.log(check)
    if (!check) {
       return <Navigate to="/"  replace={true} />;
    }
    return children;
 };
export default Protected


 