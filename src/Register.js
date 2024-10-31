import { useState } from 'react';
import { auth, db } from './firebaseConfig'; // Firebase auth & Firestore
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Import CSS for styling
import Footer from './Footer';

function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState(''); 
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState(''); // New state for bio
  const [profileImageUrl, setProfileImageUrl] = useState(''); // New state for profile image URL
  const navigate = useNavigate(); 

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userData = {
          name: name,
            email: user.email,
            password: password, 
            bio: bio,
            profileImageUrl: profileImageUrl
        };

        await setDoc(doc(db, "users", user.uid), userData);
        console.log('User registered:', user.uid);

        navigate('/login');
    } catch (error) {
        console.error('Registration error:', error.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-heading">Create Your Account</h2>
        <p className="register-subtitle">Join our community and start sharing your ideas!</p>
        <form onSubmit={handleRegister} className="register-form">
        <div className="input-group">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Bio (optional)"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="input-group">
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
        <p className="login-link">
          Already have an account? <span onClick={() => navigate('/login')}>Log in</span>
        </p>
      </div>
      <Footer/>
    </div>
  );
}

export default Register;
