import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import './CreateBlogPost.css'
import Footer from './Footer';

function CreateBlogPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = location.state?.userId;

            if (!userId) {
                console.error('User ID not found');
                return;
            }

            await addDoc(collection(db, 'blogs'), {
                title,
                content,
                userId,
                createdAt: new Date(),
            });

            // Redirect back to the options page, passing the userId again
            navigate('/options', { state: { userId } });
        } catch (error) {
            console.error("Error creating blog post: ", error);
        }
    };

    return (
        <div className="create-blog-container">
            <h2 className="create-blog-title">Create a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                <div>
                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="textarea"
                    />
                </div>
                <button type="submit" className="submit-button">Submit</button>
            </form>
            <Footer/>
        </div>
    );
}

export default CreateBlogPost;
