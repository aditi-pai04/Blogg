// BlogList.js
import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig'; // Import Firestore
import { collection, getDocs } from 'firebase/firestore';

function BlogList() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const blogsCollection = collection(db, 'blogs'); // Reference your blogs collection
                const blogSnapshot = await getDocs(blogsCollection);
                const blogList = blogSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setBlogs(blogList);
            } catch (error) {
                console.error("Error fetching blogs: ", error);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div>
            <h2>Recent Blogs</h2>
            {blogs.length === 0 ? (
                <p>No blogs available.</p>
            ) : (
                <ul>
                    {blogs.map(blog => (
                        <li key={blog.id}>
                            <h3>{blog.title}</h3>
                            <p>{blog.content}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default BlogList;
