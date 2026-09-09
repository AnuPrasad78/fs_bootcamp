import { useState } from 'react';
import apiService from '../services/apiService';

const CreatePostForm = ({ onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try{
            const newPost={
                title,
                body,
                userId:1
            }
        const createdPost = await apiService.createPost(newPost);
        alert('Post created successfully!');
        onPostCreated(createdPost);
        setTitle('');
        setBody('');
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post. Please try again.');
        } finally {
            setIsSubmitting(false);
        }}
        return (
        <form onSubmit={handleSubmit} className="mb-4 p-3 border rounded bg-light">

            <div className="mb-3">

                <label className="form-lable fw-bold" htmlFor="">Title</label>

                <input
                    type="text"
                    className="form-control"
                    id="postTitle"
                    placeholder="Enter post title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    disabled={isSubmitting}
                />
            </div>

            <div className="mb-3">
                <label className="form-lable fw-bold" htmlFor="">Content</label>
                <textarea
                    className="form-control"
                    id="postContent"
                    placeholder="Enter your content"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                    disabled={isSubmitting}
                ></textarea>
            </div>

            <button type="submit" className="btn btn-success" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Create Post'}
            </button>

        </form>
    )

}

export default CreatePostForm;
