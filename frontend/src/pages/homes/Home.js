import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiUrl from "../../common/api";
import request from "../../common/http.service";
import PostAddModal from "../PostAddModal";
import AddPost from "./AddPost";
import Post from "./Post";
import Profil from "./Profil";

function Home() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([])
    const [pageSize, setPageSize] = useState(10);

    const getPost = (p = 10) => {
        let model = { pageSize: p, userId: getUser()._id }
        request(ApiUrl + "/posts", model, "post", (res) => {
            setPosts(res.data)
        });
    }

    useEffect(() => {
        getPost();
    }, [])

    const handleScroll = () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;

        if (Math.ceil(windowHeight + scrollTop) >= documentHeight) {
            setPageSize(val => val + 10);
            getPost(pageSize + 10);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    const showComment = (index) => {
        let element = document.getElementById("div-" + index);
        element.style = "";
    }

    const getUser = () => {
        const userString = localStorage.getItem("user");
        if (userString == null) {
            navigate("/login")
        }

        return JSON.parse(userString);
    }

    const likeOrUnlike = (postId) => {
        let model = { userId: getUser()._id, postId: postId };
        request(ApiUrl + "/likeOrUnlike", model, "post", () => {
            getPost(pageSize);
        });
    }

    const formatDate = (date)=>{
        const myDate = new Date(date);
        const formattedDate = myDate.toLocaleDateString("tr-TR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }) + " " + myDate.toLocaleTimeString("tr-TR", {
            hour: "2-digit",
            minute: "2-digit",
          });

          return formattedDate;      
    }

    const addComment = (_id) =>{
        let element = document.getElementById("commentInput-" + _id);
        let content = element.value;
        let model = {postId: _id, content: content, userId: getUser()._id}
        
        request(ApiUrl + "/comments/add", model, "post", (res)=>{
            getPost();
        });
        
        element.value = "";
    }

    return (
        <div style={{ marginTop: "20px", marginLeft: "5%" }}>
            <div className="row">
                <div className="col-md-3 card-div text-center" style={{ height: "100%" }}>
                   <Profil getUser={getUser}/>
                </div>
                <div className="col-md-8 mx-3">
                    <AddPost/>
                    <hr />
                    {posts.map((val, index) => {
                        return (
                         <Post 
                            index={index}
                            key={index} 
                            val={val} 
                            addComment={addComment} 
                            showComment={showComment} 
                            likeOrUnlike={likeOrUnlike} 
                            getUser={getUser} 
                            formatDate={formatDate}/> 
                        )
                    })}

                </div>
            </div>
            <PostAddModal getPost={getPost} />
        </div>
    )
}

export default Home;