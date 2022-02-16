import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { getRoom } from '../../store/rooms';
import { getChatMessages, createChatMessage } from '../../store/chats';

import './Chat.css';

let socket;

const Chat = () => {
    const { roomId } = useParams();
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user);
    const rooms = useSelector(state => state.rooms);
    const room = rooms[roomId];

    const chatsObj = useSelector(state => state.chats);
    const chats = Object.values(chatsObj);


    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = (e) => {
        e.preventDefault();
        socket.emit('chat', { user: user.username, msg: chatInput, room: room?.room_name, user_image: user.image });
        dispatch(createChatMessage(roomId, chatInput));
        setChatInput("");
    }

    useEffect(() => {
        dispatch(getRoom(roomId));
        dispatch(getChatMessages(roomId));
    }, [dispatch, roomId])

    useEffect(() => {
        socket = io();
        socket.emit('join', { 'username': user.username, 'room': room?.room_name })
        console.log(user.username, 'joined room')

        socket.emit('chat', { user: 'weStudy-Bot', msg: `${user.username} has joined the room.`, room: room?.room_name })


        socket.on('chat', (chat) => {
            setMessages(messages => [...messages, chat]);
        })

        return (() => {
            console.log('leaving room')
            socket.emit('leave', { 'username': user.username, 'room': room?.room_name })
            socket.emit('chat', { user: 'weStudy-Bot', msg: `${user.username} has left the room.`, room: room?.room_name })

            socket.disconnect();
        })
    }, [])

    return (
        // <div className='chat-and-input-container'>
        <>
            <div className='chat-room-container'>
                {chats.map(chat => {
                    return <div
                        className={chat.username === user.username ? 'right chat-msg' : 'left chat-msg'}
                        key={chat.id}>
                        <div className='profile-pic-div chat-profile-pic'>
                            <img src={chat.user_image} alt={chat.username}></img>
                        </div>
                        <div className='chat-message'>
                            {chat.message}
                        </div>
                    </div>
                })}
                {messages.map((message, idx) => (
                    <div
                        className={message.user === 'weStudy-Bot' ? 'center chat-msg' : message.user === user.username ? 'right chat-msg' : 'left chat-msg'}
                        key={idx}>
                        {message.user !== 'weStudy-Bot' &&
                            <div className='profile-pic-div chat-profile-pic'>
                                <img src={message.user_image} alt={message.user}></img>
                            </div>
                        }
                        <div className='chat-message'>
                            {message.msg}
                        </div>
                        {/* {`${message.user}: ${message.msg}`} */}
                    </div>
                ))}
            </div>
            <form className='chat-input-form' onSubmit={sendChat}>
                <input
                    value={chatInput}
                    onChange={updateChatInput}
                    placeholder={`Message #${room?.room_name}`}
                />
                <button type='submit'>Send</button>
            </form>
        </>
        // </div>
    )
}


export default Chat;
