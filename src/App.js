import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserCalendar from "./Screen/UserCalendar/UserCalendar";
import Login from "./Screen/Login/Login";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Screen/Login/SignUp";

function App() {
    return (
        <div className='App'>
            <Routes>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/signup' element={<SignUp />}></Route>
                <Route path='/calendar' element={<UserCalendar />}></Route>
            </Routes>
        </div>
    );
}

export default App;
