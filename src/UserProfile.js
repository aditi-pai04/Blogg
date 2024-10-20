import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, getDocs, query, where, updateDoc, doc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebaseConfig'; // Firebase config for Firestore and Storage
import './UserProfile.css'; // Custom CSS for styling

function UserProfile() {
    const location = useLocation();
    const [userId, setUserId] = useState('');
    const [userDetails, setUserDetails] = useState({});
    const [blogsWritten, setBlogsWritten] = useState([]);
    const [blogsLiked, setBlogsLiked] = useState([]);
    const [blogsSaved, setBlogsSaved] = useState([]);
    const [newBio, setNewBio] = useState('');
    const [profileImageUrl, setProfileImageUrl] = useState('');

    useEffect(() => {
        if (location.state && location.state.userId) {
            const fetchedUserId = location.state.userId;
            setUserId(fetchedUserId);
            fetchUserData(fetchedUserId);
        }
    }, [location]);

    const fetchUserData = async (userId) => {
        try {
            const userDocRef = doc(db, 'users', userId);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                setUserDetails(userDoc.data());
                setProfileImageUrl(userDoc.data().url || ''); // Set profile image URL from Firestore
            }

            // Fetch blogs written by user
            const writtenBlogsQuery = query(collection(db, 'blogs'), where('userId', '==', userId));
            const writtenBlogsSnapshot = await getDocs(writtenBlogsQuery);
            setBlogsWritten(writtenBlogsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

            // Fetch liked blogs by user
            const likedBlogsQuery = query(collection(db, 'blogsLiked'), where('userId', '==', userId));
            const likedBlogsSnapshot = await getDocs(likedBlogsQuery);
            setBlogsLiked(likedBlogsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

            // Fetch saved blogs by user
            const savedBlogsQuery = query(collection(db, 'savedBlogs'), where('userId', '==', userId));
            const savedBlogsSnapshot = await getDocs(savedBlogsQuery);
            setBlogsSaved(savedBlogsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (error) {
            console.error("Error fetching user data: ", error);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const storageRef = ref(storage, `profilePictures/${userId}`);
            try {
                await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(storageRef);
                setProfileImageUrl(downloadURL); // Set uploaded profile image URL
                
                // Ensure the document exists before updating
                const userDocRef = doc(db, 'users', userId);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    await updateDoc(userDocRef, { profileImageUrl: downloadURL });
                    console.log("Profile image URL updated successfully.");
                } else {
                    console.error("No document found with ID:", userId);
                }
            } catch (error) {
                console.error("Error uploading image: ", error);
            }
        }
    };
    

    const handleBioUpdate = async () => {
        if (newBio.trim()) {
            await updateDoc(doc(db, 'users', userId), { bio: newBio });
            setUserDetails(prev => ({ ...prev, bio: newBio })); // Update local state to reflect new bio
        }
    };

    return (
        <div className="user-profile-container">
            <h2>User Profile</h2>
            <div className="profile-details">
                <div className="profile-picture">
                    {profileImageUrl ? (
                        <img src={profileImageUrl} alt="Profile" />
                    ) : (
                        <div className="placeholder-image">No Profile Picture</div>
                    )}
                    <input type="file" onChange={handleImageUpload} accept="image/*" />
                </div>

                <div className="user-info">
                    <h3>{userDetails.username || 'Username'}</h3>
                    <p>Bio: {userDetails.bio || 'No bio yet'}</p>
                    <textarea
                        placeholder="Update your bio..."
                        value={newBio}
                        onChange={(e) => setNewBio(e.target.value)}
                    />
                    <button onClick={handleBioUpdate}>Update Bio</button>
                </div>
            </div>

            <div className="user-activity">
                <h3>Blogs You've Written</h3>
                {blogsWritten.length > 0 ? (
                    <ul>
                        {blogsWritten.map(blog => (
                            <li key={blog.id}>{blog.title}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No blogs written yet.</p>
                )}

                <h3>Blogs You've Liked</h3>
                {blogsLiked.length > 0 ? (
                    <ul>
                        {blogsLiked.map(blog => (
                            <li key={blog.id}>{blog.title}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No liked blogs.</p>
                )}

                <h3>Blogs You've Saved</h3>
                {blogsSaved.length > 0 ? (
                    <ul>
                        {blogsSaved.map(blog => (
                            <li key={blog.id}>{blog.title}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No saved blogs.</p>
                )}
            </div>
        </div>
    );
}

export default UserProfile;
