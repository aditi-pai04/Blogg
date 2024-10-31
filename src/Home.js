import { Link } from 'react-router-dom';
import './App.css'; // Importing the CSS file
import Footer from './Footer';
import './Home.css'; // Create this file for specific Home styles

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">Welcome to the Blog Platform</h1>
        <p className="home-subtitle">Express your thoughts and explore other writers' ideas</p>
      </header>
      
      {/* <div className="home-hero">
        <img src="hero.jpg" alt="Hero" className="home-hero-image" />
      </div> */}
      
      <div className="home-buttons">
        <Link to="/login" className="btn login-btn">Login</Link>
        <Link to="/register" className="btn register-btn">Register</Link>
      </div>

      <section className="home-features">
        <div className="feature">
          <h3>Discover Blogs</h3>
          <p>Browse a wide variety of blogs from different genres and authors.</p>
        </div>
        <div className="feature">
          <h3>Save Your Favorites</h3>
          <p>Save blogs you love for easy access later.</p>
        </div>
        <div className="feature">
          <h3>Join the Community</h3>
          <p>Engage with fellow writers and readers through comments and discussions.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
