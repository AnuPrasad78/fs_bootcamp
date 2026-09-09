import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import CreatePostForm from '../components/CreatePostForm'
import apiService from '../services/apiService';



const Posts = () => {

    const [posts, setPosts] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {

        fetchPosts();

    }, []);


    const fetchPosts = async () => {
        setIsLoading(true);

        try {
            const allPosts = await apiService.getPosts();
            setPosts(allPosts.slice(0, 20)); //limit to first 20 posts

        } catch (error) {
            console.error('Error fetching posts:', error);

        } finally {
            setIsLoading(false);

        }
    }

    const handlePostCreated = (newPost) => {
        setPosts([newPost, ...posts]);
        setShowForm(false);
    }

    const routeToPostDetailsPage = (postId) => {
        navigate(`/posts/${postId}`);
    }



    return (
        <div className='container mt-4'>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className='mb-0'>Blog Posts</h1>

                <button
                    onClick={() => setShowForm(!showForm)}
                    className={`btn ${showForm ? 'btn-secondary' : 'btn-success'}`}>
                    {showForm ? 'Hide Form' : 'Create New Form'}
                </button>
            </div>

            {showForm && <CreatePostForm onPostCreated={handlePostCreated} />}

            {isLoading ? (
                <div className="text-center my-5">
                    <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading posts...</p>
                </div>
            ) : (
                <div className='mt-4'>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.id} className="card mb-4">
                                <div className="card-body">
                                    <h5 className="card-title">{post.title}</h5>

                                    <p className="card-text">{post.body.length > 100 ? `${post.body.substring(0, 100)}...` : post.body}</p>
                                    <button onClick={() => routeToPostDetailsPage(post.id)} className='btn btn-outline-success'>
                                        Read More
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="alert alert-info">
                            No Posts available
                        </div>
                    )}
                </div>
            )}

        </div>
    )

}

export default Posts;