import React, { useEffect, useState } from 'react';
import '../styling/Avatar.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import loader from '../assets/talk-6615.gif'
import { API_URL } from '../Api_Path';

const Avatar = () => {
  const [avatar, setAvatar] = useState(null);
  const [data, setData] = useState([]);
  const [updatedAvatar,setUpdatedAvatar]=useState(null)
  const ownerid=localStorage.getItem('ownerid');
  const token=localStorage.getItem('token');
  const navigate=useNavigate();
    if(!token){
      navigate('/')
    }
  const AvatarGenerate = () => {
    const newAvatars = [];
    for (let i = 0; i < 4; i++) {
      const api = `https://api.dicebear.com/9.x/bottts/svg?seed=${Math.random()}`;
      newAvatars.push(api);
    }
    setData(newAvatars);
  };

  useEffect(() => {
    AvatarGenerate(); // runs once on page load
  }, []);

  const clickHandle = (imageurl) => {
    if (imageurl) {
      setAvatar(imageurl);
    }
  };
  const submitHandle=()=>{
    if(avatar && ownerid && token){
         axios.post(`${API_URL}/user/avatar`,{ image_url: avatar, ownerid:ownerid },{
          headers:{
            'x-token':token
          }
         })
        .then((res)=>{setUpdatedAvatar(res.data);
          if(res.data){
            navigate('/chat')
          }
        })
        .catch((err)=>console.log(err))
    }
    else{
        console.log('Setting Avatar Failed')
    }
  }
  return (
    <div className='avatar-cont'>
      <h3 className="avatar-heading">Pick an Avatar for Profile</h3>
      <div className='avatar-main'>
        {data!==null? (data.map((item, index) => (
          <div key={index} className={`avatar-img-cont ${avatar === item ? 'selected' : ''}`} onClick={() => clickHandle(item)}>
            <img src={item} alt={`avatar-${index}`} />
          </div>
        )))
        :
        (
          <div className='avatar-loader'>
            <img src={loader} alt='Loading...' width='70px'/>
          </div>
        )
        }
      </div>
      {updatedAvatar && <p>{updatedAvatar}</p>}
      <div className='avatar-tail'>
        <i
          className="fa-solid fa-arrows-rotate"
          onClick={AvatarGenerate}
        />
        <button className='btn btn-outline-primary' onClick={submitHandle}>Save</button>
      </div>
    </div>
    
    
  );
};

export default Avatar;