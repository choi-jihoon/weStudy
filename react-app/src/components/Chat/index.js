import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { getRoom } from '../../store/rooms';

let socket;

const Chat = () => {
    const { roomId } = useParams();
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user)
    const rooms = useSelector(state => state.rooms)
    const room = rooms[roomId]

    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = (e) => {
        e.preventDefault();
        socket.emit('chat', { user: user.username, msg: chatInput, room: room.room_name });
        setChatInput("");
    }

    useEffect(() => {
        dispatch(getRoom(roomId));
    }, [dispatch, roomId])

    useEffect(() => {
        socket = io();
        socket.emit('join', {'username': user.username, 'room': room?.room_name})
        console.log('joined room')

        socket.on('chat', (chat) => {
            setMessages(messages => [...messages, chat]);
        })

        return (() => {
            console.log('leaving room')
            socket.emit('leave', {'username': user.username, 'room': room.room_name})
            socket.disconnect();
        })
    }, [])

    return (
        <>
            <div>
                {messages.map((message, idx) => (
                    <div key={idx}>{`${message.user}: ${message.msg}`}</div>
                ))}
            </div>
            <form onSubmit={sendChat}>
                <input
                    value={chatInput}
                    onChange={updateChatInput}
                />
                <button type='submit'>Send</button>
            </form>
        </>
    )
}


export default Chat;
