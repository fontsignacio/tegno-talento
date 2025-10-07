import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Avatar,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Send,
  SmartToy,
  Person,
} from '@mui/icons-material';
import { useChatbotMutation } from '../../hooks/useChatbotQuery';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: '¡Hola! Soy el asistente virtual del Sistema de Gestión de Talentos. ¿En qué puedo ayudarte?',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const chatbotMutation = useChatbotMutation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    try {
      const response = await chatbotMutation.mutateAsync(inputMessage);
      const botMessage = {
        id: Date.now() + 1,
        text: response.data.response,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.',
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '80vh',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: 'background.paper',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
            <SmartToy />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Asistente Virtual
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sistema de Gestión de Talentos
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Messages */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 2,
          backgroundColor: 'background.default',
        }}
      >
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              justifyContent: message.isBot ? 'flex-start' : 'flex-end',
              mb: 2,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                maxWidth: '70%',
                flexDirection: message.isBot ? 'row' : 'row-reverse',
              }}
            >
              <Avatar
                sx={{
                  bgcolor: message.isBot ? 'primary.main' : 'secondary.main',
                  width: 32,
                  height: 32,
                  mr: message.isBot ? 1 : 0,
                  ml: message.isBot ? 0 : 1,
                }}
              >
                {message.isBot ? <SmartToy /> : <Person />}
              </Avatar>
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  backgroundColor: message.isBot ? 'background.paper' : 'primary.main',
                  color: message.isBot ? 'text.primary' : 'primary.contrastText',
                  borderRadius: message.isBot ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
                  border: message.isBot ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                }}
              >
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {message.text}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    display: 'block',
                    mt: 1,
                    opacity: 0.7,
                    textAlign: 'right',
                  }}
                >
                  {formatTime(message.timestamp)}
                </Typography>
              </Paper>
            </Box>
          </Box>
        ))}
        {chatbotMutation.isPending && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              mb: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <Avatar sx={{ bgcolor: 'primary.main', mr: 1, width: 32, height: 32 }}>
                <SmartToy />
              </Avatar>
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  backgroundColor: 'background.paper',
                  borderRadius: '16px 16px 16px 4px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Escribiendo...
                </Typography>
              </Paper>
            </Box>
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>

      <Divider />

      {/* Input */}
      <Box
        sx={{
          p: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu mensaje aquí..."
            variant="outlined"
            size="small"
            disabled={chatbotMutation.isPending}
          />
          <IconButton
            color="primary"
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || chatbotMutation.isPending}
            sx={{
              alignSelf: 'flex-end',
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
              '&:disabled': {
                backgroundColor: 'action.disabled',
                color: 'action.disabled',
              },
            }}
          >
            <Send />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Chatbot;
