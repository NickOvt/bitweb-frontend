import React, { Fragment, useState } from 'react';
import SockJsClient from 'react-stomp';

const SOCKET_URL = 'http://localhost:8081/results/';

function Result() {
  // Message state to hold relevant message
  const [msg, setMsg] = useState('Retrieving relevant data...');
  // Optional data variable to hold incoming data, in case to be used in the future
  const [data, setData] = useState([]);
  const [dogChoices, setDogchoises] = useState(null);
  const [catChoices, setCatchoices] = useState(null);

  const onConnected = () => {
    setMsg(null);
  };

  const onMessageReceiver = (msg) => {
    setData(msg);
    const currentDogChoices = msg.filter(
      (choice) => choice.choice == 'dog'
    ).length;
    const currentCatChoices = msg.filter(
      (choice) => choice.choice == 'cat'
    ).length;
    setDogchoises(currentDogChoices);
    setCatchoices(currentCatChoices);

    if (currentCatChoices == 0 && currentDogChoices == 0) {
      setMsg(null);
    } else if (currentDogChoices > currentCatChoices) {
      setMsg('DOGS are winning the vote!');
    } else if (currentDogChoices < currentCatChoices) {
      setMsg('CATS are winning the vote!');
    } else if (currentCatChoices == currentDogChoices) {
      setMsg("It's a TIE!");
    } else {
      setMsg('There was an error');
    }
  };

  return (
    <>
      <SockJsClient
        url={SOCKET_URL}
        topics={['/topic/results']}
        onConnect={onConnected}
        onMessage={onMessageReceiver}
        debug={false}
      />
      <div className="mt-4">
        {msg && <p>{msg}</p>}
        {(dogChoices >= 0 || catChoices >= 0) && (
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Animal</th>
                <th scope="col">Dogs</th>
                <th scope="col">Cats</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-dark">
                <th scope="row"></th>
                <td>{dogChoices}</td>
                <td>{catChoices}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default Result;
