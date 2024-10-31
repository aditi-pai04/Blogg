import { useState } from 'react';
import { auth } from './firebaseConfig'; // Import Firebase auth
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css'; // Importing CSS
import Footer from './Footer';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            console.log('User logged in:', user.uid);
            navigate('/options', { state: { userId: user.uid } });
        } catch (error) {
            console.error('Login error:', error.message);
        }
    };

    return (
        <>
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-heading">Welcome Back!</h2>
                <p className="login-subtitle">Sign in to continue exploring our platform</p>
                <form onSubmit={handleLogin} className="login-form">
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
                    <button type="submit" className="login-button">Login</button>
                </form>
                <p className="login-footer-text">
                    New here? <span className="signup-link" onClick={() => navigate('/register')}>Create an account</span>
                </p>
            </div>
           
        </div>
         <Footer />
         </>
    );
}

export default Login;
