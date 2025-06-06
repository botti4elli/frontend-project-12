import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import socket from '../services/socket'
import { addMessage } from '../slices/messagesSlice'
import { addChannel } from '../slices/channelsSlice'
// import { addChannel, setCurrentChannelId } from '../slices/channelsSlice';

const useSocketEvents = (onConnect, onDisconnect) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const handleNewMessage = (msg) => dispatch(addMessage(msg))
    socket.on('newMessage', handleNewMessage)
    return () => socket.off('newMessage', handleNewMessage)
  }, [dispatch])

  useEffect(() => {
    const handleNewChannel = (channel) => {
      dispatch(addChannel(channel))
      // dispatch(setCurrentChannelId(channel.id));
    }
    socket.on('newChannel', handleNewChannel)
    return () => socket.off('newChannel', handleNewChannel)
  }, [dispatch])

  useEffect(() => {
    if (onConnect) socket.on('connect', onConnect)
    if (onDisconnect) socket.on('disconnect', onDisconnect)

    return () => {
      if (onConnect) socket.off('connect', onConnect)
      if (onDisconnect) socket.off('disconnect', onDisconnect)
    }
  }, [onConnect, onDisconnect])
}

export default useSocketEvents
