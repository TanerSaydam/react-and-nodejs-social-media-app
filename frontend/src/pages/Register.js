import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CallToast from "../common/Toast";
import ApiUrl from '../common/api';
import request from "../common/http.service";

const Register = () =>{
    const [userName, setUserName] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState();
    const [showImage, setShowImage] = useState();
    const [profession, setProfession] = useState("");
    const [about, setAbout] = useState("");
    const navigate = useNavigate();    

    const changeImage = (e) =>{
        setImage(e.target.files[0]);
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onload = () => {
            const imageUrl = reader.result;
            setShowImage(imageUrl);
        };
    }

    const register = (e) =>{
        e.preventDefault();        
        let formData = new FormData();
        formData.append("name", name);
        formData.append("userName", userName);
        formData.append("password",password);
        formData.append("profession", profession);
        formData.append("about",about);
        formData.append("image",image);
        request(ApiUrl + "/auth/register",formData,"post", (res)=>{
            localStorage.setItem("token",res.data.token);
            localStorage.setItem("user",JSON.stringify(res.data.user));
            navigate("/");
            CallToast("success","Kayıt başarıyla tamamlandı!");
        });
    }

    const checkValidation = (e)=>{
        if(e.target.validity.valid){
            e.target.className = "form-control is-valid"
        }else{
            e.target.className="form-control is-invalid"
        }
    }

    return(
        <>
         <div className="d-flex justify-content-center" style={{ marginTop: "170px" }}>
            <div className="col-md-4">
                <div className="card">
                    <div className="card-header">
                        <h1>Kayıt Ol</h1>
                    </div>
                    <div className="card-body">
                        <form autoComplete="off" onSubmit={register}>                            
                            <div className="form-group">
                                <label htmlFor="name">
                                    Ad Soyad
                                </label>
                                <input
                                    onKeyUp={checkValidation}
                                    className="form-control"
                                    name="name"
                                    id="name"
                                    required
                                    minLength="3"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} />
                                <div className="invalid-feedback">
                                    Ad soyad alanı en az 3 karakter olmalıdır!
                                </div>
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="userName">
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
                            <div className="form-group m2">
                                <label htmlFor="profession">
                                    Meslek
                                </label>
                                <input 
                                    onKeyUp={checkValidation}
                                    className="form-control"
                                    name="profession"
                                    id="profession"
                                    required
                                    minLength="3"
                                    value={profession}
                                    onChange={(e) => setProfession(e.target.value)}
                                    />
                                <div className="invalid-feedback">
                                    Meslek alanı en az 3 karakter olmalıdır!
                                </div>
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="about">
                                    Hakkımızda
                                </label>
                                <textarea 
                                onKeyUp={checkValidation}
                                className="form-control"
                                required
                                minLength="3"
                                name="about"
                                id="about"
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}>                                    
                                </textarea>
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="password">
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
                                    onChange={(e) => setPassword(e.target.value)}/>
                                 <div className="invalid-feedback">
                                    şifre alanı boş olamaz!
                                </div>
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="image">
                                    Kullanıcı Resmi
                                </label>
                                <input 
                                    type="file"
                                    className="form-control"
                                    name="image"
                                    id="image"
                                    required
                                    onChange={changeImage}
                                    />
                            </div>
                            <div className="form-group mt-2 text-center">
                                <img style={{width: "320px"}} src={showImage} alt="Resim bulunamadı!"/>
                            </div>
                            <div className="form-group mt-2">
                                <button 
                                    type="submit"
                                    id="loginBtn"
                                    className="btn btn-outline-success w-100">
                                    Kayıt Ol
                                </button>
                                <Link 
                                    to="/login" 
                                    className="mt-1" 
                                    style={{float
                                :"right"}}>
                                    Giriş Sayfası
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Register;