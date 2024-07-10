import React from 'react'
import service from '../appwrite/conf'
import { Link } from 'react-router-dom'
export function PostCard($id , title , featuredImage) {
    

    return (
       <Link to={`/post/${$id}`}>
       <div className='w-full bg-gray-100' >
        <div className='w-full justify-center'>
            <img src={service.getFilePreview(featuredImage)} alt="" />
        </div>
        <h2>{title}</h2>
       </div>
       </Link>
    )
}
