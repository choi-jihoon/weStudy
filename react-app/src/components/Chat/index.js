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
        socket.emit('chat', { user: user.username, msg: chatInput, room: room.room_name });
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

        socket.emit('chat', { user: 'weStudy-Bot', msg: `${user.username} has joined the room.`, room: room.room_name })
        // dispatch(createChatMessage(roomId, `${user.username} has joined the room.`))

        socket.on('chat', (chat) => {
            setMessages(messages => [...messages, chat]);
        })

        return (() => {
            console.log('leaving room')
            socket.emit('leave', { 'username': user.username, 'room': room.room_name })
            socket.emit('chat', { user: 'weStudy-Bot', msg: `${user.username} has left the room.`, room: room.room_name })
            // dispatch(createChatMessage(roomId, `${user.username} has left the room.`))

            socket.disconnect();
        })
    }, [])

    return (
        <div className='chat-room-container'>
            <div>
                {chats.map(chat => {
                    return <div key={chat.id}>{`${chat.username}: ${chat.message}`}</div>
                })}
            </div>
            <div>
                {messages.map((message, idx) => (
                    <div key={idx}>{`${message.user}: ${message.msg}`}</div>
                ))}
            </div>
            <form className='chat-form' onSubmit={sendChat}>
                <input
                    value={chatInput}
                    onChange={updateChatInput}
                />
                <button type='submit'>Send</button>
            </form>
        </div>
    )
}


export default Chat;
