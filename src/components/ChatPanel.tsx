import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Smile, Gift, Heart, ThumbsUp, Siren as Fire } from 'lucide-react';
import { useGameStore } from '../stores/gameStore';
import { ChatMessage } from '../types/game';

const ChatPanel: React.FC = () => {
  const { chatMessages, addChatMessage, currentUser } = useGameStore();
  const [message, setMessage] = useState('');
  const [showEmotes, setShowEmotes] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    // Add some mock messages
    if (chatMessages.length === 0) {
      const mockMessages: ChatMessage[] = [
        {
          id: '1',
          playerId: 'player-1',
          playerName: 'Alex',
          message: 'Good luck everyone! 🎯',
          timestamp: Date.now() - 300000,
          type: 'chat'
        },
        {
          id: '2',
          playerId: 'system',
          playerName: 'System',
          message: 'Game started! First player: Alex',
          timestamp: Date.now() - 240000,
          type: 'system'
        },
        {
          id: '3',
          playerId: 'player-2',
          playerName: 'Jordan',
          message: 'Let\'s do this! 🔥',
          timestamp: Date.now() - 180000,
          type: 'chat'
        },
        {
          id: '4',
          playerId: 'player-3',
          playerName: 'Casey',
          message: 'UNO!',
          timestamp: Date.now() - 120000,
          type: 'chat'
        },
        {
          id: '5',
          playerId: 'system',
          playerName: 'System',
          message: 'Casey has 1 card remaining!',
          timestamp: Date.now() - 60000,
          type: 'system'
        }
      ];

      mockMessages.forEach(msg => addChatMessage(msg));
    }
  }, [chatMessages.length, addChatMessage]);

  const handleSendMessage = () => {
    if (!message.trim() || !currentUser) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      playerId: currentUser.id,
      playerName: currentUser.name,
      message: message.trim(),
      timestamp: Date.now(),
      type: 'chat'
    };

    addChatMessage(newMessage);
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmoteClick = (emote: string) => {
    if (!currentUser) return;

    const emoteMessage: ChatMessage = {
      id: Date.now().toString(),
      playerId: currentUser.id,
      playerName: currentUser.name,
      message: emote,
      timestamp: Date.now(),
      type: 'emote'
    };

    addChatMessage(emoteMessage);
    setShowEmotes(false);
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    });
  };

  const emotes = [
    { icon: '😀', name: 'Happy' },
    { icon: '😎', name: 'Cool' },
    { icon: '🎯', name: 'Target' },
    { icon: '🔥', name: 'Fire' },
    { icon: '💎', name: 'Diamond' },
    { icon: '⚡', name: 'Lightning' },
    { icon: '🎉', name: 'Party' },
    { icon: '😤', name: 'Frustrated' },
    { icon: '🤔', name: 'Thinking' },
    { icon: '😱', name: 'Shocked' },
    { icon: '👏', name: 'Clap' },
    { icon: '🙌', name: 'Praise' }
  ];

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-black/20 backdrop-blur-sm border-l border-white/20 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/20">
        <h3 className="text-white font-semibold">Game Chat</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {chatMessages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
              ${msg.type === 'system' 
                ? 'text-center text-yellow-400 text-sm italic' 
                : msg.type === 'emote'
                ? 'text-center'
                : 'text-left'
              }
            `}
          >
            {msg.type === 'system' ? (
              <div className="bg-yellow-400/10 rounded-lg p-2">
                {msg.message}
              </div>
            ) : msg.type === 'emote' ? (
              <div className="bg-purple-400/10 rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">{msg.message}</div>
                <div className="text-xs text-gray-400">{msg.playerName}</div>
              </div>
            ) : (
              <div className={`
                ${msg.playerId === currentUser?.id 
                  ? 'ml-4 bg-blue-600/20' 
                  : 'mr-4 bg-white/10'
                } rounded-lg p-3
              `}>
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-white text-sm">
                    {msg.playerName}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
                <div className="text-gray-200 text-sm">{msg.message}</div>
              </div>
            )}
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="p-2 border-t border-white/20">
        <div className="grid grid-cols-4 gap-2 mb-2">
          {[
            { icon: ThumbsUp, text: 'Nice!', color: 'bg-green-600' },
            { icon: Fire, text: 'Epic!', color: 'bg-orange-600' },
            { icon: Heart, text: 'Thanks!', color: 'bg-red-600' },
            { icon: Gift, text: 'GG!', color: 'bg-purple-600' }
          ].map(({ icon: Icon, text, color }, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleEmoteClick(text)}
              className={`${color} text-white p-2 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1`}
            >
              <Icon className="w-3 h-3" />
              <span>{text}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/20">
        <div className="flex space-x-2">
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowEmotes(!showEmotes)}
              className="p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
            >
              <Smile className="w-5 h-5" />
            </motion.button>

            {/* Emotes Panel */}
            {showEmotes && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-full mb-2 left-0 bg-black/80 backdrop-blur-sm rounded-lg p-3 grid grid-cols-4 gap-2 min-w-48"
              >
                {emotes.map((emote, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEmoteClick(emote.icon)}
                    className="text-2xl p-2 hover:bg-white/10 rounded"
                    title={emote.name}
                  >
                    {emote.icon}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </div>
          
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 p-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={200}
          />
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
        
        <div className="text-xs text-gray-400 mt-1 text-right">
          {message.length}/200
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;