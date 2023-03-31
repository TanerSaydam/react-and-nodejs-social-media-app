import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './Login';
import Home from './homes/Home';
import Register from './Register';
import Layouts from './Layouts';
import NotFound from './NotFound';

function App(){
    return(
        <>
        <BrowserRouter>
        <Routes>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>} />

            <Route path="/" element={<Layouts/>}>
                <Route index element={<Home/>} />
                <Route path="*" element={<NotFound/>} />
            </Route>  
        </Routes>
        </BrowserRouter>
        </>
    )
}

export default App;