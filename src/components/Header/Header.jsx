import React from 'react'
import { Container , Logoutbtn , Logo} from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export function Header() {
    const authStatus = useSelector((state)=> state.auth.status)
    const navigate = useNavigate()
    const navItem = [
        {
            name : "Home",
            slug : "/",
            active : true
        },
        {
            name : "Login",
            slug : "/login",
            active : !authStatus
        },
        {
            name : "Signup",
            slug : "/signup",
            active : !authStatus
        },
        {
            name : "All posts",
            slug : "/all-posts",
            active : authStatus
        },
        {
            name : "Add posts",
            slug : "/add-posts",
            active : authStatus
        }
    ]

    return (
        <>
            <header>
                <container>
                    <nav className='flex'>
                        <div>
                            <Link>
                            <Logo/>
                            </Link>
                        </div>
<ul className='flex ml-auto '>
    {navItem.map((item)=>
    item.active ? (
        <li key={item.name}>
            <button onClick={()=> navigate(item.slug)}>
                {item.name}
            </button>
        </li>
    ) : null
    )}
    {authStatus && (
        <li><Logoutbtn/></li>
    )}
</ul>
                    </nav>
                </container>
            </header>
        </>
    )
}
