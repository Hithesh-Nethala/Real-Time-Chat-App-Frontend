import { useEffect,useState} from 'react'
import { API_URL } from '../Api_Path'
import "../styling/AllContacts.css"
import loader from '../assets/talk-6615.gif'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const AllContacts = ({setActiveView}) => {
    const ownerid=localStorage.getItem('ownerid')
    const token=localStorage.getItem('token');
    const [users,setUsers]=useState(null);
    const [owner,setOwner]=useState(null);
    const navigate=useNavigate();
    if(!token){
        navigate('/')
    }
    useEffect(()=>{
        if(ownerid && token){
            axios.get(`${API_URL}/user/allcontacts/${ownerid}`,{
                headers:{
                    'x-token':token
                }
            })
            .then((res)=>setUsers(res.data))
            .catch((err)=>console.log(err))
        }
        
    },[ownerid,token])
    useEffect(()=>{
        if(ownerid){
            axios.get(`${API_URL}/user/indv/${ownerid}`)
            .then((res)=>setOwner(res.data))
            .catch((err)=>console.log(err))
        }
    },[ownerid])
    const clickHandle=()=>{
        const confirmed = window.confirm('Do you want to change profile?');
        if (confirmed) {
            navigate('/profile');
        }
    }
  return (
    users!==null?(
    <div className='allcontact-cont'>
        <div className='allcontact-members'>
            {users.map((item,index)=>{return(
                <div key={index} className='allcontact-sec' onClick={()=>setActiveView(item)}>
                    <img className='allcontact-pfp' src={item.avatar} alt={item.name}/>
                    <p className='allcontact-name'>{item.name}</p>
                </div>
            )})}
        </div>
        <div className='user-cont'>
            <p className='allcontact-name'>{owner.name}</p>
            <img className='user-pfp' src={owner.avatar} alt={owner.name} onClick={clickHandle} />
        </div>
    </div>
    )
    :
    (<div className='allcontact-loader'>
        <img src={loader} alt='Loading...' width='50px'/>
    </div>)
  )
}

export default AllContacts