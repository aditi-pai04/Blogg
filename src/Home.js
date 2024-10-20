import { Link } from 'react-router-dom';
import './App.css'; // Importing the CSS file

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the Blog Platform</h1>
      <p className="home-subtitle">Express your thoughts and explore other writers' ideas</p>
      <div className="home-buttons">
        <Link to="/login" className="btn login-btn">Login</Link>
        <Link to="/register" className="btn register-btn">Register</Link>
      </div>
    </div>
  );
}

export default Home;
