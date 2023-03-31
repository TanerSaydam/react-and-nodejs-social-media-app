import { useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom'
import FileUrl from '../common/file-url';


function Layouts() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        //window.location.href = "/login"
        navigate("/login");
    }

    const authenticationCheck = ()=>{
        let token = localStorage.getItem("token");
        if(token == null){
            navigate("/login");
        }
    }

    useEffect(()=>{
        authenticationCheck();
    },[])

    const getUser = () =>{
        const userString = localStorage.getItem("user");
        if(userString == null){
            navigate("/login")
        }

        return JSON.parse(userString);
    }
   
    
    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">My Social Meda</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {/* Sol taraftaki menüler */}
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        </ul>  
                        {/* Sol taraftaki menüler */}

                        {/* Sağ taraftaki menüler */}
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img style={{width:"50px", height: "50px", borderRadius: "50px"}} src={FileUrl + "/" + getUser().avatar.path}/>
                                <span className='mx-1'>
                               Profil
                                    </span>
                            </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <button onClick={logout} className="dropdown-item">Çıkış yap</button>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        {/* Sağ taraftaki menüler */}
                    </div>
                </div>
            </nav>

            <Outlet />
        </div>
    )
}

export default Layouts