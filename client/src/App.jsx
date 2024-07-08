import React, { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
// import './App.css';  // Make sure to import the CSS file

const App = () => {
  const socket = useMemo(() => io('http://localhost:3000', { withCredentials: true }), []);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [room, setRoom] = useState('');
  const [socketID, setSocketId] = useState('');
  const [roomName, setRoomName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('message', { message, room });
    setMessage('');
  };

  const joinRoomHandler = (e) => {
    e.preventDefault();
    socket.emit('join-room', roomName);
    setRoomName('');
  };

  useEffect(() => {
    socket.on('connect', () => {
      setSocketId(socket.id);
      console.log('connected', socket.id);
    });

    socket.on('receive-message', (data) => {
      console.log(data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on('welcome', (message) => {
      console.log(message);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div className="relative min-h-screen bg-purple-100 flex items-center justify-center overflow-hidden">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md z-10">
        <p className="text-1xl mb-4">My ID: {socketID}</p>

        <form onSubmit={joinRoomHandler} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Join Room</h2>
          <div className="flex items-center mb-4">
            <input
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded mr-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300"
              type="text"
              placeholder="Room Name"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300">
              Join
            </button>
          </div>
        </form>

        <form onSubmit={handleSubmit} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Send Message</h2>
          <div className="flex flex-col mb-4">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="p-2 border border-gray-300 rounded mb-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300"
              type="text"
              placeholder="Message"
            />
            <input
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="p-2 border border-gray-300 rounded mb-2 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300"
              type="text"
              placeholder="Room"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300">
              Send
            </button>
          </div>
        </form>

        <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
          <h2 className="text-xl font-semibold mb-2">Messages</h2>
          <div className="space-y-4">
            {messages.map((m, i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                <p className="text-gray-800">{m}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="bubble"></div>
        ))}
      </div>
    </div>
  );
};

export default App;
