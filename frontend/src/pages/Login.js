import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiUrl from "../common/api";
import request from "../common/http.service";
import CallToast from "../common/Toast";


function Login() {
   
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        let model = {userName: userName, password: password};     
        request(ApiUrl + "/auth/login",model, "post", async (res)=>{            
            localStorage.setItem("token",res.data.token);
            localStorage.setItem("user",JSON.stringify(res.data.user));
            CallToast("success","Giriş işlemi başarılı!");
            navigate("/");
        });
    }

    const checkValidation = (e) => {
        if (e.target.validity.valid) {
            e.target.className = "form-control is-valid"
        } else {
            e.target.className = "form-control is-invalid"
        }
    }

    return (
        <div className="login">
            <div className="login-div">
                <div className="row">
                    <div className="col-md-8">

                    </div>
                    <div className="col-md-4 login-div-card">
                        <h1 className="text-center">Giriş Sayfası</h1>
                        <form autoComplete="off" onSubmit={login}>
                            <div className="form-group mt-2">
                                <label htmlFor="userName" style={{fontWeight: "700"}}>
                                    Kullanıcı Adı
                                </label>
                                <input
                                    onKeyUp={checkValidation}
                                    className="form-control"
                                    name="userName"
                                    id="userName"
                                    required
                                    minLength="3"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)} />
                                <div className="invalid-feedback">
                                    Kullanıcı adı en az 3 karakter olmalıdır!
                                </div>
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="password" style={{fontWeight: "700"}}>
                                    Şifre
                                </label>
                                <input
                                    onKeyUp={checkValidation}
                                    className="form-control"
                                    name="password"
                                    id="password"
                                    type="password"
                                    required
                                    minLength="1"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                                <div className="invalid-feedback">
                                    şifre alanı boş olamaz!
                                </div>
                            </div>
                            <div className="form-group mt-2">
                                <button
                                    id="loginBtn"
                                    type="submit"
                                    className="btn btn-primary w-100">
                                    Giriş Yap
                                </button>
                                <Link
                                    to="/register"
                                    
                                    className="mt-1"
                                    style={{
                                        float
                                            : "right",
                                        fontWeight
                                            : "700"
                                    }}>
                                    Kayıt Ol
                                </Link>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;