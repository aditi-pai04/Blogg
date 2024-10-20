import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Options from './Options';
import CreateBlogPost from './CreateBlogPost';
import UserProfile from './UserProfile';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/options" element={<Options />} />
          <Route path="/create-blog" element={<CreateBlogPost />} /> 
          <Route path="/user-profile" element={<UserProfile />} /> 
        </Routes>
      </Router>
  );
}

export default App;
