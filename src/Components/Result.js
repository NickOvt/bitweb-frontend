import React, { Fragment, useState } from 'react';
import SockJsClient from 'react-stomp';

const SOCKET_URL = 'http://websocket-service:8080/results';

function Result() {
  const [msg, setMsg] = useState('Your server message here');

  const onConnected = () => {
    console.log('Connected!!');
  };

  const onMessageReceiver = (msg) => {
    setMsg(msg.message);
  };

  return (
    <>
      <SockJsClient
        url={SOCKET_URL}
        topics={['/topic/results']}
        onConnect={onConnected}
        onDisconnect={console.log('Disconnected')}
        onMessage={(msg) => onMessageReceiver(msg)}
        debug={true}
      />
      <p>{msg}</p>
    </>
  );
}

export default Result;
