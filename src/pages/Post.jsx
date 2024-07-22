import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/conf";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import authService from "../appwrite/auth";

export default function Post() {
    const [post, setPost] = useState(null);
    const [author , setAuthor] = useState("")
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;
    console.log(isAuthor);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const fetchedPost = await service.getPost(slug);
                if (fetchedPost) {
                    setPost(fetchedPost);
                    const authorData = authService.getCurrentUser(fetchedPost.userId)
                    setAuthor((await authorData).name)
                } else {
                    navigate("/");
                }
            } catch (error) {
                console.error('Error fetching post:', error);
                navigate("/");
            }
        };

        if (slug) {
            fetchPost();
        }
    }, [slug, navigate]);
    console.log('Post:', post);
    console.log('UserData:', userData);
    console.log('Is Author:', isAuthor);

    const deletePost = async () => {
        try {
            const status = await service.deletePost(post.$id);
            if (status) {
                await service.deleteFile(post.featuredImage);
                navigate("/");
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const imageURL = post ? service.getFilePreview(post.featuredImage) : ""
    console.log('Image URL',imageURL);

    return post ? (
        <div className="py-8 max-md:w-full w-1/4 border border-spacing-2">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={imageURL}
                        alt={post.title}
                        className="rounded-xl w-full"
                        
                    />
</div>
                    {isAuthor && (
                        <div className="w-full flex justify-end mr-5">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-semibold">{post.title}</h1>
                    <h1 className="text-xl font-semibold">Author:{author}</h1>
                   
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}