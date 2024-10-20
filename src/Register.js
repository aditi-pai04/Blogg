import { useState } from 'react';
import { auth, db } from './firebaseConfig'; // Firebase auth & Firestore
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Import CSS for styling

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState(''); // New state for bio
  const [profileImageUrl, setProfileImageUrl] = useState(''); // New state for profile image URL
  const navigate = useNavigate(); 

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Prepare user data for Firestore
        const userData = {
            email: user.email,
            password: password, // Store password in Firestore
            bio: bio, // Include bio
            profileImageUrl: profileImageUrl // Include profile image URL
        };

        // Save user information in Firestore
        await setDoc(doc(db, "users", user.uid), userData);
        console.log('User registered:', user.uid);

        // Redirect to login page
        navigate('/login');
    } catch (error) {
        console.error('Registration error:', error.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister} className="register-form">
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Bio (optional)"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Profile Image URL (optional)"
            value={profileImageUrl}
            onChange={(e) => setProfileImageUrl(e.target.value)}
            className="input-field"
          />
        </div>
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
}

export default Register;
