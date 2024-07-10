import React from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../../store/authSlice'
import {authService} from "../../appwrite/auth"

export function Logout() {
    const dispatch = useDispatch()
    const logoutHandler = ()=>{
        authService.logOut().then(()=>{
            dispatch(logOut())
        })
    }

    return (
        <>
           <button>logout</button> 
        </>
    )
}
