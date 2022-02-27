import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { io } from 'socket.io-client';

import { getAlbums } from '../../../../../../store/albums';
import { getChatMessages, createChatMessage } from '../../../../../../store/chats';
import { getNotes } from '../../../../../../store/notes';
import { getRooms, joinChatRoom, leaveChatRoom } from '../../../../../../store/rooms';
import { getGroup } from '../../../../../../store/groups';

import './Chat.css';

let socket;

const Chat = () => {
    const { roomId, groupId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    let chats;

    const user = useSelector(state => state.session.user);
    const rooms = useSelector(state => state.rooms);
    const room = rooms.rooms[roomId];
    const groups = useSelector(state => state.groups);
    const group = groups[groupId]


    const chatsObj = useSelector(state => state.chats);
    if (chatsObj.byRoomId[roomId]) {
        chats = Object.values(chatsObj.byRoomId[roomId]);
    };


    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = (e) => {
        e.preventDefault();
        socket.emit('chat', { user: user.username, msg: chatInput, room: roomId, user_image: user.image, created_at: (new Date()).toLocaleTimeString() });
        dispatch(createChatMessage(roomId, chatInput));
        setChatInput("");
    };

    const scroll = () => {
        const chatContainer = document.querySelector('.chat-messages-container');
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }

    useEffect(() => {
        const fetch = async () => {
            const data = await dispatch(getGroup(groupId));
            if (data && data.errors) {
                return history.push('/');
            }
            else {
                dispatch(getRooms(groupId));
                dispatch(getNotes(groupId));
                dispatch(getAlbums(groupId));
                dispatch(getChatMessages(roomId));
            }
        };
        fetch();

        setMessages([]);

        scroll();
    }, [dispatch, roomId, groupId, history]);

    useEffect(() => {
        const checkAccess = (group) => {
            if (group.user_ids.includes(user.id)) {
                return true;
            }
            else return false;
        }

        if (user && group) {
            if (!checkAccess(group)) {
                return history.push('/')
            }
        }
    }, [group, user, history]);


    useEffect(() => {
        socket = io();

        dispatch(joinChatRoom(roomId));

        socket.emit('join', { 'username': user.username, 'room': roomId });
        socket.emit('join_room', { 'username': user.username, 'room': roomId })
        socket.emit('chat', { user: 'weStudy-Bot', msg: `${user.username} has joined the room.`, room: roomId });

        socket.on('chat', (chat) => {
            setMessages(messages => [...messages, chat]);
            scroll();
        });

        socket.on('join_room', (user) => {
            dispatch(getRooms(groupId));
        });

        socket.on('leave_room', (user) => {
            dispatch(getRooms(groupId));
        });


        return (() => {
            dispatch(leaveChatRoom(roomId));
            socket.emit('leave', { 'username': user.username, 'room': roomId });
            socket.emit('leave_room', { 'username': user.username, 'room': roomId })
            socket.emit('chat', { user: 'weStudy-Bot', msg: `${user.username} has left the room.`, room: roomId });

            socket.disconnect();
        })
    }, [roomId, user.username, dispatch, groupId]);


    return (
        <>
            <div className='chat-header-container'>
                <h2 className='room-name'>Welcome to #{room?.room_name}!</h2>
                <div className='active-users-container'>
                    {room?.active_users.map(user => {
                        return (
                            <div key={user.id} className='active-user-img-container'>
                                <img className='active-user-img' src={user.image} alt={user.id}></img>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='chat-room-container'>
                <div className='chat-messages-container'>
                    {chats?.map(chat => {
                        return <div
                            className={chat.username === user.username ? 'right chat-msg' : 'left chat-msg'}
                            key={chat.message + chat.id}>
                            <div className='profile-pic-div chat-profile-pic'>
                                <img src={chat.user_image} alt={chat.username}></img>
                            </div>
                            <div className='chat-message'>
                                <p className='chat-username'>{chat.username}<span className='created-at-msg'>{(new Date(chat.created_at)).toLocaleTimeString()}</span></p>
                                <p className='chat-text'>{chat.message}</p>
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
                                {message.user !== 'weStudy-Bot' &&
                                    <p className='chat-username'>{message.user}<span className='created-at-msg'>{message.created_at}</span></p>
                                }
                                <p className='chat-text'>{message.msg}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <form autoComplete="off" className='chat-input-form' onSubmit={sendChat}>
                    <input
                        value={chatInput}
                        onChange={updateChatInput}
                        placeholder={`Message #${room?.room_name}`}
                    />
                    <button disabled={chatInput.length === 0} id='send-chat' type='submit'><i className="fas fa-paper-plane"></i></button>
                </form>
            </div>
        </>
    )
}


export default Chat;
