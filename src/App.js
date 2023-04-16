import './App.css';
import UserCalendar from './Screen/UserCalendar/UserCalendar';
import Login from './Screen/Login/Login';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/calendar" element={<UserCalendar />}></Route>
      </Routes>
    </div>
  );
}

export default App;
