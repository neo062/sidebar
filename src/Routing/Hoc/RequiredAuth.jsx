import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

const RequiredAuth = ({children}) => {
const {isAuth,token} =useSelector(state=>state.AuthReducer)
const location=useLocation( )
console.log(location)
if(token)
{  return children }
else{
return <Navigate to="/login" state = {{from : location.pathname}} replace/>
}
}

export default RequiredAuth
