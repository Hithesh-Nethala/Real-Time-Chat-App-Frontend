import { useState, useRef,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import axios from 'axios';
import {io} from "socket.io-client"
import loader from '../assets/talk-6615.gif'
import { API_URL } from '../Api_Path';
import '../styling/ChatContainer.css';

const ChatContainer = ({user}) => {
  const [msg, setMsg] = useState('');
  const [msgData,setMsgData]=useState(null);
  const [arrivalMsg,setArrivalMsg]=useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const inputRef = useRef(null);
  const scrollRef = useRef();
  const socket=useRef();
  const navigate = useNavigate();

  const ownerid=localStorage.getItem('ownerid');
  useEffect(()=>{
    if(user&&ownerid){
      axios.post(`${API_URL}/message/getting`,{
        from:ownerid,
        to:user._id
      })
      .then((res)=>{setMsgData(res.data)})
      .catch((err)=>console.log(err.response))
    }
  },[user,ownerid])

  useEffect(()=>{
    if(ownerid){
      socket.current=io(API_URL);
      socket.current.emit("add-user",ownerid);
    }
  },[ownerid])

  const handleLogout = () => {
    const confirm=window.confirm('Do you want to logout?')
    if(confirm){
      localStorage.clear();
      navigate('/');
    }
    
  };

  const handleInput = (e) => {
    setMsg(e.target.value);
  };

  const handleEmoji = (emoji) => {
    const input = inputRef.current;
    const start = input.selectionStart;
    const end = input.selectionEnd;

    const updatedMsg = msg.slice(0, start) + emoji.native + msg.slice(end);
    setMsg(updatedMsg);

    const newCursorPos = start + emoji.native.length;

    setTimeout(() => {
      input.focus();
      input.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    if(ownerid&&user&&msg){
      await axios.post(`${API_URL}/message/adding`,{
        from:ownerid,
        to:user._id,
        message:msg
      })
      .catch((err)=>console.log(err.response))
    }
    if(ownerid&&user){
      socket.current.emit('send-msg',{
        to:user._id,
        from:ownerid,
        msg
      })
    }

    const msgs=[...msgData];
    msgs.push({fromSelf:true,message:msg});
    setMsgData(msgs);
    setMsg('');
  };

  useEffect(()=>{
    if(socket.current){
      socket.current.on('msg-receive',(msg)=>{
        setArrivalMsg({fromSelf:false,message:msg})
      });
    }
  },[])

  useEffect(()=>{
    arrivalMsg && setMsgData((prev)=>[...prev,arrivalMsg]);
  },[arrivalMsg])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgData]);


  return (
    user!==null? (
      <div className='chat-msg-cont'>
        <section className='chat-msg-nav'>
          <img className='chat-msg-pfp' src={user.avatar} alt='User' />
          <p className='chat-msg-user'>{user.name}</p>
          <div className='chat-msg-i' onClick={handleLogout}>
            <i className='fa-solid fa-power-off fa-lg' style={{ color: '#e60a20' }}></i>
          </div>
        </section>

        <section className='msgs-cont'>
          {msgData && msgData.map((items,index)=>{
            return(
              <div key={index} ref={scrollRef} className={`message-${items.fromSelf?"sent":"received"}`}>
                <p className='message'>{items.message}</p>
              </div>
            )
          })}
        </section>

        <section className='chat-msg-footer'>
          <div className='emoji-wrapper'>
            <button
              type='button'
              className='emoji-btn'
              onClick={() => setShowPicker((prev) => !prev)}
            >
              😊
            </button>
            {showPicker && (
              <div className='emoji-picker-position'>
                <Picker data={data} onEmojiSelect={handleEmoji} />
              </div>
            )}
          </div>

          <form className='chat-msg-form' onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              className='chat-msg-input'
              value={msg}
              type='text'
              placeholder='Enter message'
              onChange={handleInput}
              onClick={(e) => {
                inputRef.current.setSelectionRange(e.target.selectionStart, e.target.selectionStart);
              }}
              onKeyUp={(e) => {
                inputRef.current.setSelectionRange(e.target.selectionStart, e.target.selectionStart);
              }}
            />
            <button type='submit' className='btn btn-primary ms-4 me-2'>
              <i className='fa-solid fa-paper-plane'></i>
            </button>
          </form>
        </section>
      </div>
    )
    :
    (<div className='chat-cont-loader'>
      <img src={loader} alt='Loading...' width='100px'/>
    </div>)
  );
};

export default ChatContainer;
