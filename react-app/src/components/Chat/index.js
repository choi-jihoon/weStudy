import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

let socket;

const Chat = () => {
    const { roomId } = useParams();

    const user = useSelector(state => state.session.user)

    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = (e) => {
        e.preventDefault();
        socket.emit('chat', { user: user.username, msg: chatInput });
        setChatInput("");
    }

    useEffect(() => {
        socket = io();

        socket.on('chat', (chat) => {
            setMessages(messages => [...messages, chat]);
        })

        return (() => {
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
