import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoutes from './utils/PrivateRoutes';
import { AuthProvider } from './utils/AuthContext';
import Product from './pages/Product';
import SearchPage from './pages/SearchPage'
import VerifyEmail from './pages/VerifyEmail';
import ChangePassword from './pages/ChangePassword';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/changepassword" element={<ChangePassword />}></Route>
          <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
          <Route path="/" element={<Home />} />
          
          {/* Wrap private routes inside the PrivateRoutes component */}
          <Route element={<PrivateRoutes />}>
          <Route path="/search" element={<SearchPage />}></Route>
          <Route path="/verifyemail" element={<VerifyEmail />}></Route>
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/product/:id" element={<Product />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
