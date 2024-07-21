import React from 'react'
import { useState , useEffect } from 'react'
import { Container, PostForm } from '../components'
import service from '../appwrite/conf'
import { useNavigate , useParams } from 'react-router-dom'

export default function EditPost() {
    const [posts , setposts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if (slug) {
            service.getPost(slug).then((posts)=>{
                if (posts) {
                    setposts(posts)
                }
            })
        }else{
            navigate("/")
        }
    },[slug ,  navigate])
    return posts ? (
        <div className='py-8'>
            <Container>
                <PostForm post={posts}/>
            </Container>
        </div>
    ) : null

}