import React, { useEffect, useLayoutEffect, useState } from "react";
import Card from "../../components/card/Card";
import profileImg from "../../assets/avatarr.png";
import "./Profile.scss";
import PageMenu from "../../components/pageMenu/PageMenu";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, selectUser, updateUser } from "../../redux/features/auth/authSlice";
import Loader from '../../components/loader/Loader'
import { toast } from "react-toastify";
import Notification from "../../components/notification/Notification";


const cloud_name = process.env.REACT_APP_CLOUD_NAME
const upload_preset = process.env.REACT_APP_UPLOAD_PRESET

export const shortenText = ( text , n) =>{
  if(text.length > n){
    const shortenedText = text.substring( 0 , n).concat("...")
    return shortenedText
  }    
  return text
}

const Profile = () => {

 

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isLoggedIn , isLoading , isSuccess , message , user } = useSelector((state)=> state.auth)

  const initialState = {
    name : user?.name || "" ,
    email : user?.email || "",
    phone : user?.phone || "",
    bio : user?.bio || "",
    photo : user?.photo || "",
    role : user?.role || "",
    isVerified : user?.isVerified || false,
  }//question mark is for the time that the user is not found and then app wont throw an error for that matter

//TODO it seems like it is a backend problem in the end of the course we replace backend with this
  useRedirectLoggedOutUser("/login");
  const [profile, setProfile] = useState(initialState);
  const { name , email , phone , bio , photo , role , isVerified } = profile
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);


  useEffect(()=>{
    dispatch(getUser())
  } , [dispatch])

  const saveProfile = async(e)=>{
    e.preventDefault()
    let imageURL
    try {

      if( profileImage !== null && 
        (profileImage.type === "image/jpeg" || 
          profileImage.type === "image/jpg"|| 
          profileImage.type === "image/png" ) ){
              const image = new FormData()
              image.append("file" , profileImage)
              image.append("cloud_name" , cloud_name)
              image.append("upload_preset" , upload_preset)

              //save image
              const response = await fetch(
                "https://api.cloudinary.com/v1_1/dyv7sasni/image/upload",
                {method : "post" , body : image}
              )

              const imgData = await response.json()
              console.log(imgData);
              imageURL = imgData.url.toString()
      }

      //save to mongoDB
      const userData = {
        name : profile.name ,
        phone : profile.phone ,
        bio : profile.bio ,
        photo : profileImage? imageURL : profile.photo
      }

      dispatch( updateUser(userData) )

    } catch (error) {
      toast.error(error.message)
    }
  }

  //show changes another type of useEffect
  useLayoutEffect(()=>{
    if(user){
      setProfile({
        ...profile ,
        name : user.name ,
        email : user.email ,
        phone : user.phone ,
        photo : user.photo ,
        bio : user.bio ,
        role : user.role ,
        isVerified : user.isVerified
      })
    }
  }, [user] )

  const handleImageChange = (e) =>{
    setProfileImage(e.target.files[0])//sets the image you select
    setImagePreview(URL.createObjectURL(e.target.files[0]))
  }

  const handleInputChange = (e) =>{
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  }


  return (
    <>
          {isLoading && <Loader/>}
        {/* code below shows when the user is not verified */}
        {/* code says if profile is not veified then show notification component */}
          { !profile.isVerified && <Notification /> }
      <section>
      
        <div className="container">
          <PageMenu />
          <h2>Profile</h2>
          <div className="--flex-start profile">
            <Card cardClass={"card"}>
              {/* this condition is for not having a glitch on page when it reloads  */}
                {!isLoading && user && (
                  <>
                  <div className="profile-photo">
                    <div>
                      <img
                        src={imagePreview === null ? user?.photo : imagePreview }
                        alt="ProfileImg"
                      />
                      <h3>Role: {profile.role}</h3>
                    </div>
                  </div>
                  <form onSubmit={saveProfile}>
                    <p>
                      <label>Change Photo:</label>
                      <input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleImageChange}
                      />
                    </p>
                    <p>
                      <label>Name:</label>
                      <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleInputChange}
                      />
                    </p>
                    <p>
                      <label>Email:</label>
                      <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleInputChange}
                        disabled
                      />
                    </p>
                    <p>
                      <label>Phone:</label>
                      <input
                        type="text"
                        name="phone"
                        value={profile.phone}
                        onChange={handleInputChange}
                      />
                    </p>
                    <p>
                      <label>Bio:</label>
                      <textarea
                        name="bio"
                        value={profile.bio}
                        onChange={handleInputChange}
                        cols="30"
                        rows="10"
                      ></textarea>
                    </p>
                    <button className="--btn --btn-primary --btn-block">
                      Update Profile
                    </button>
                  </form>
                </>
                )}
                
              
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export const UserName = () =>{
  const user = useSelector(selectUser)

  const userName = user?.name || "..."

  return <p className="--color-white">Hi, {shortenText(userName, 9)} |</p>

}



export default Profile;
