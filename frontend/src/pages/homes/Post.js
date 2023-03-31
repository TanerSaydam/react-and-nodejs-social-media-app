import FileUrl from "../../common/file-url";
import Comment from "./Comment";

const Post = ({
    formatDate,
    getUser,
    likeOrUnlike,
    val,
    showComment,
    addComment,
    index
}) => {
    return (
        <>
            <div className="card-div mt-4">
                <div className="row">
                    <div className="col-md-1" style={{ marginRight: "25px" }}>
                        <img
                            className="profile-avatar"
                            src={FileUrl + "/" + val.users[0].avatar.path} />
                    </div>
                    <div className="col-md-10 mt-1">
                        <span className="mx-2" style={{ fontWeight: "700" }}>
                            {val.users[0].name}
                        </span>
                        <br />
                        <span className="mx-2">
                            {val.users[0].profession}
                        </span>
                        <br />
                        <span className="mx-2" style={{ fontSize: "small" }}>
                            {formatDate(val.users[0].createdDate)}
                        </span>
                    </div>
                </div>
                <hr />
                <p>
                    {val.content}
                </p>
                {
                    val.video != undefined &&
                    <video width="600" controls>
                        <source src={FileUrl + "/" + val.video.path} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                }
                {
                    val.image != undefined &&
                    <img width={600} src={FileUrl + "/" + val.image.path}/>
                }
                <br/>

                {
                    getUser()._id != val.users[0]._id ?
                        <>
                            <button onClick={() => likeOrUnlike(val._id)} className="btn btn-default">

                                {
                                    val.likes.filter(p => p.userId == getUser()._id).length == 0 ?
                                        <>
                                            <i className="fa-regular fa-thumbs-up mx-2"></i>
                                            Beğen
                                        </> :
                                        <>
                                            <i className="fa-regular text-primary fa-thumbs-up mx-2"></i>
                                            <span className="text-primary">Beğenmekten Vazgeç</span>
                                        </>
                                }
                            </button>
                        </>
                        :
                        <>
                            {
                                val.likes.length > 0 ?
                                    <>
                                        <span className="text-primary">
                                            {val.likes.length} kişi beğendi
                                        </span>
                                    </>
                                    :
                                    <>
                                        <span className="text-danger">
                                            Kimse beğenmedi!
                                        </span>
                                    </>
                            }

                        </>
                }
                <button
                    onClick={() => showComment(index)}
                    className="btn btn-default mx-2">
                    <i className="fa-regular fa-comment mx-2"></i>
                    Yorum
                </button>
                <div
                    className="mt-4"
                    style={{ display: "none" }}
                    id={'div-' + index}>
                    {val.comments.map((commentVal, commentIndex) => {
                        return (
                            <Comment
                                key={commentIndex}
                                commentVal={commentVal}
                                formatDate={formatDate} />
                        )
                    })}

                    <div className="input-group mb-3 mt-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Recipient's username"
                            style={{
                                borderRadius:
                                    "25px 0px 0px 25px"
                            }}
                            id={"commentInput-" + val._id} />
                        <button
                            className="btn btn-success"
                            type="button"
                            id="button-addon2"
                            style={{
                                borderRadius:
                                    "0px 25px 25px 0px"
                            }}
                            onClick={() => addComment(val._id)}>
                            Gönder
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Post;