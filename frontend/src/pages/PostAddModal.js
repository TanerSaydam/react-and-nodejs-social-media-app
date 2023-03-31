import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiUrl from "../common/api";
import FileUrl from "../common/file-url";
import request from "../common/http.service";
import CallToast from "../common/Toast";

const PostAddModal = ({ getPost }) => {
    const navigate = useNavigate();
    const [content, setContent] = useState("");
    const [file, setFile] = useState();
    const [type, setType] = useState("");

    let day = "";
    const nowDay = () => {
        const günler = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
        const bugün = new Date();
        day = günler[bugün.getDay()];
    }

    const getUser = () => {
        const userString = localStorage.getItem("user");
        if (userString == null) {
            navigate("/login")
        }

        return JSON.parse(userString);
    }

    const sendPost = () => {
        const formData = new FormData();
        formData.append("content", content);
        formData.append("fileType",type);
        formData.append("userId", getUser()._id);
        if (file != null) {
            formData.append("file", file, file.name)
        }

        // let model = {content: content, userId: getUser()._id}
        request(ApiUrl + "/post/add", formData, "post", (res) => {
            CallToast("success", res.data.message);
            setContent("");
            let element = document.getElementById("postAddModalCloseBtn");
            element.click();
            getPost();
        });
    }

    const setFileAndType = (e,type) =>{
        setFile(e.target.files[0]);
        setType(type)
    }

    nowDay();

    return (
        <>
            <div className="modal fade" id="postAddModal" tabIndex="-1" aria-labelledby="postAddModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="postAddModalLabel">Post Modal</h1>
                            <button type="button" id="postAddModalCloseBtn" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-1" style={{ marginRight: "25px" }}>
                                    <img
                                        className="profile-avatar"
                                        src={FileUrl + "/" + getUser().avatar.path} />
                                </div>
                                <div className="col-md-10 mt-1">
                                    <span className="mx-2" style={{ fontWeight: "700" }}>
                                        {getUser().name}
                                    </span>
                                    <br />
                                    <span className="mx-2">
                                        {getUser().profession}
                                    </span>
                                    <br />
                                    <span className="mx-2" style={{ fontSize: "small" }}>
                                        {day}
                                    </span>
                                </div>
                            </div>
                            <hr />
                            <textarea
                                className="form-control"
                                placeholder="Ne hakkında konuşmak istiyorsunuz?"
                                style={{ border: "none" }}
                                rows="5"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}>
                            </textarea>
                            <div className="form-group mt-2">
                                <label className="fileLabel" htmlFor="video">
                                    <i className="fa fa-video"></i>
                                </label>
                                <input
                                    type="file"
                                    id="video"
                                    name="video"
                                    style={{ display: "none" }}
                                    className="mt-1"
                                    onChange={(e) => setFileAndType(e,"video")} />
                                <label className="fileLabel mx-1" htmlFor="image">
                                    <i className="fa fa-image"></i>
                                </label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    style={{ display: "none" }}
                                    className="mt-1"
                                    onChange={(e) => setFileAndType(e,"image")} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={sendPost}
                                style={{ borderRadius: "25px", width: '20%' }}>
                                Paylaş
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostAddModal;