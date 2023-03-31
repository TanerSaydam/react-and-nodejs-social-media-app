import FileUrl from "../../common/file-url"

const Profil = ({getUser}) => {
    return (
        <>
            <img
                className="profile-img"
                src={FileUrl + "/" + getUser().avatar.path} />
            <h4 className="mt-2">{getUser().name}</h4>
            <hr />
            <p>{getUser().profession}</p>
            <p>{getUser().about} </p>
        </>
    )
}

export default Profil