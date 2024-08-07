import React from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../../store/authSlice'
import authService from '../../appwrite/auth'

export function Logoutbtn() {
    const dispatch = useDispatch()
    const logoutHandler = ()=>{
        authService.logout().then(()=>{
            dispatch(logOut())
        })
    }

    return (
        <>
           <button className='inline-block px-6 py-2 max-md:py-0 duration-200 hover:bg-blue-100 rounded-full' onClick={logoutHandler}>logout</button> 
        </>
    )
}
