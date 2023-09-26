import './App.css';
import Nav from './pages/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './pages/Footer';
import PrivateComponent from './pages/PrivateComponent';
import SignUp from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddClass from './pages/AddClass';
import UpdateClass from './pages/UpdateClass';
import Profile from './pages/Profile';
import AddStudent from './pages/AddStudent';
// import WebcamCapture from './pages/Webcam';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          {/* sign up is not private */}
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<Dashboard />} ></Route>
            <Route path="/add-class" element={<AddClass />} ></Route>
            <Route path="/add-student/:id" element={<AddStudent />} ></Route>
            <Route path="/update/:id" element={<UpdateClass />} ></Route>
            <Route path="/profile/:id" element={<Profile />} ></Route>
            {/* <Route path="/webcam/:id" element={<WebcamCapture />} ></Route> */}
          </Route>

          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />} ></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
