import FileUrl from "../../common/file-url";

const Comment = ({commentVal, formatDate}) => {
    return (
        <>
            <div className="mt-2">
                <img
                    className="profile-comment-avatar mx-2"
                    src={FileUrl + "/" + commentVal.user.avatar.path} />
                {commentVal.user.name} - {formatDate(commentVal.createdDate)}
                <br />
                <br />
                <span className="mx-3" style={{ border: "1px solid #f1f1f1", borderRadius: "25px", padding: "5px" }}>
                    {commentVal.content}
                </span>
            </div>
        </>
    )
}

export default Comment;