import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, increment, query, where, getDoc } from 'firebase/firestore'; // Add getDoc for individual blog fetch
import { db } from './firebaseConfig';
import './Options.css';

function Options() {
    const location = useLocation();
    const [userId, setUserId] = useState('');
    const [blogs, setBlogs] = useState([]);
    const [savedBlogs, setSavedBlogs] = useState([]);
    const [showSavedBlogs, setShowSavedBlogs] = useState(false); // Toggle between all and saved blogs
    const [searchTerm, setSearchTerm] = useState(''); 
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state && location.state.userId) {
            setUserId(location.state.userId);
        } else {
            console.error('No userId found');
            navigate('/login');
        }
    }, [location, navigate]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'blogs'));
                const blogList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setBlogs(blogList);
            } catch (error) {
                console.error("Error fetching blogs: ", error);
            }
        };

        fetchBlogs();
    }, []);

    // Fetch saved blogs for the current user along with their corresponding likes and dislikes
    useEffect(() => {
        const fetchSavedBlogs = async () => {
            try {
                const q = query(collection(db, 'savedBlogs'), where('userId', '==', userId));
                const querySnapshot = await getDocs(q);
                const savedBlogList = await Promise.all(
                    querySnapshot.docs.map(async (doc) => {
                        const savedBlogData = doc.data();
                        // Fetch the corresponding blog details including likes and dislikes
                        const blogDoc = await getDoc(doc(db, 'blogs', savedBlogData.blogId));
                        const blogData = blogDoc.exists() ? blogDoc.data() : {};
                        return { ...savedBlogData, likes: blogData.likes || 0, dislikes: blogData.dislikes || 0 };
                    })
                );
                setSavedBlogs(savedBlogList);
            } catch (error) {
                console.error("Error fetching saved blogs: ", error);
            }
        };

        if (userId) {
            fetchSavedBlogs();
        }
    }, [userId]);

    const handleCreateBlog = () => {
        navigate('/create-blog', { state: { userId } });
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredBlogs = (showSavedBlogs ? savedBlogs : blogs).filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleLike = async (blogId) => {
        const blogRef = doc(db, 'blogs', blogId);
        await updateDoc(blogRef, { likes: increment(1) });
        setBlogs(prevBlogs => 
            prevBlogs.map(blog => 
                blog.id === blogId ? { ...blog, likes: blog.likes + 1 } : blog
            )
        );
    };

    const handleDislike = async (blogId) => {
        const blogRef = doc(db, 'blogs', blogId);
        await updateDoc(blogRef, { dislikes: increment(1) });
        setBlogs(prevBlogs => 
            prevBlogs.map(blog => 
                blog.id === blogId ? { ...blog, dislikes: blog.dislikes + 1 } : blog
            )
        );
    };

    const handleSaveBlog = async (blog) => {
        try {
            await addDoc(collection(db, 'savedBlogs'), {
                userId,
                blogId: blog.id,
                title: blog.title,
                content: blog.content,
                createdAt: new Date(),
            });
            setSavedBlogs(prev => [...prev, { ...blog, userId }]);
        } catch (error) {
            console.error("Error saving blog: ", error);
        }
    };

    const handleUnsaveBlog = async (savedBlogId) => {
        try {
            await deleteDoc(doc(db, 'savedBlogs', savedBlogId));
            setSavedBlogs(prev => prev.filter(blog => blog.id !== savedBlogId));
        } catch (error) {
            console.error("Error unsaving blog: ", error);
        }
    };

    return (
        <div className="options-container">
            <h2 className="options-title">Options Page</h2>
            <p>User ID: {userId}</p>
            <button className="create-blog-btn" onClick={handleCreateBlog}>
                Create Blog
            </button>
            <button onClick={() => navigate('/user-profile', { state: { userId } })}>
    Go to Profile
</button>


            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search Blogs..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>

            <button className="toggle-btn" onClick={() => setShowSavedBlogs(!showSavedBlogs)}>
                {showSavedBlogs ? "Show All Blogs" : "Show Saved Blogs"}
            </button>

            <div className="blogs-container">
                <h3>{showSavedBlogs ? "Saved Blogs" : "Recent Blogs"}</h3>
                {filteredBlogs.length > 0 ? (
                    <ul className="blogs-list">
                        {filteredBlogs.map(blog => (
                            <li key={blog.id} className="blog-card">
                                <h4>{blog.title}</h4>
                                <p>{blog.content}</p>
                                <small>Posted by: {blog.userId}</small>
                                <div className="like-dislike-container">
                                    <button onClick={() => handleLike(blog.id)} className="like-btn">👍 {blog.likes || 0}</button>
                                    <button onClick={() => handleDislike(blog.id)} className="dislike-btn">👎 {blog.dislikes || 0}</button>
                                    <button onClick={() => handleSaveBlog(blog)}>Save</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No blogs found.</p>
                )}
            </div>
        </div>
    );
}

export default Options;