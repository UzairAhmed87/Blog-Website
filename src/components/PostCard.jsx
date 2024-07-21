import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import service from '../appwrite/conf';

export default function PostCard({ $id, title, featuredImage }) {
    const [filePreview, setFilePreview] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFilePreview = async () => {
            try {
                if (featuredImage) {
                    const preview = await service.getFilePreview(featuredImage);
                    setFilePreview(preview.href); // Assuming `href` contains the URL of the preview image
                    setLoading(false);
                } else {
                    throw new Error('Featured image ID is missing');
                }
            } catch (err) {
                console.error('Error fetching file preview:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchFilePreview();
    }, [featuredImage]);

    if (loading) return <p>Loading preview...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-400 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    {filePreview ? (
                        <img src={filePreview} alt="Featured" />
                    ) : (
                        <p>Preview not available</p>
                    )}
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    );
}
