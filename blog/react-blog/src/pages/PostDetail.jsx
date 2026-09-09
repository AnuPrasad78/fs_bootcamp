import { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import { useParams } from 'react-router-dom';



const PostDetail = () => {

    const { id } = useParams();

    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        fetchPostData();

    }, [id]);



    const fetchPostData = async () => {
        try {
            setLoading(true)

            const [postData, commentsData] = await Promise.all([
                apiService.getPostById(id),
                apiService.getPostComments(id)
            ]);

            setPost(postData);
            setComments(commentsData);


        } catch (error) {
            setError('Failed to load post data');
            console.error('Error fetching post:', error);

        } finally {
            setLoading(false);

        }
    }

    //TEMPLATES

    if (loading) {
        return (
            <div className="container text-center mt-5">
                <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading post...</p>
            </div>
        )
    }


    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger">{error}</div>
            </div>
        )
    }

    if (!post) {
        return (
            <div className="container mt-5">
                <h1>Post not found</h1>
            </div>
        )
    }


    return (
        <div className='container mt-4'>
            <div className='card mb-4'>
                <div className='card-body'>
                    <h2 className='card-title'>{post.title}</h2>
                    <p className='card-text'>{post.body}</p>

                </div>
            </div>

            <h2 className='mb-3'>Comments</h2>
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <div key={comment.id} className="card mb-3"Ï>
                        <div  className='card-body'>
                            <h5  className='card-title'>{comment.user.fullName}</h5>
                            <p className='card-text'ƒ> {comment.body}</p>
                        </div>
                    </div>
                ))
            ) : (
                <div className="alert alert-info">No comments yet.</div>
            )}

        </div>
    )
}

export default PostDetail;
