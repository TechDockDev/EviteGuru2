import React from 'react'
import { Navigate } from 'react-router-dom';

const Protected = ({ check, path ,children }) => {
   //  console.log(check)
    if (!check) {
       return <Navigate to={path ? path : "/"}  replace={true} />;
    }
    return children;
 };
export default Protected


 