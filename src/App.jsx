import { BrowserRouter as Router, Routes, Route } from'react-router-dom';

import Nav from "./components/Nav.jsx";
import Login from "./pages/Login.jsx";
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import Verify from './pages/Verify.jsx';
import Panel from './pages/Panel.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const App = () => {

  return (
    <>
      <Nav/>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/verify/:email' element={<Verify />} />
        <Route exact path='/panel' element={<ProtectedRoute element={<Panel />}/>} />
        
       
      </Routes>

    </>
  )
}

export default App
