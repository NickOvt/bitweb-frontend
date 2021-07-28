import React, { Fragment, useState } from 'react';
const axios = require('axios');

function Vote() {
  // Error or other messages state
  // msg {msg: 'Some message', isDanger: true || false}
  const [msg, setMsg] = useState(null);

  const [currentVote, setCurrentVote] = useState({ vote: 'cat' });

  const sendVote = (currentVote) => {
    const { vote } = currentVote;
    axios
      .post('http://bitwebtest_vote-rest-api_1/api/vote', {
        choice: vote,
      })
      .then((res) => {
        setMsg({ msg: res, isDanger: false });
      })
      .catch((err) => {
        setMsg({ msg: 'There was an error', isDanger: true });
      });
  };
  const onChange = (e) => {
    setCurrentVote({
      vote: e.currentTarget.value,
    });
  };

  const clearMsgs = () => {
    setMsg(null);
  };

  return (
    <>
      {msg && (
        <div
          className={`alert alert-dismissible alert-${
            msg.isDanger ? 'danger' : 'success'
          }`}
        >
          <button
            type="button"
            className="btn-close"
            onClick={clearMsgs}
          ></button>
          <p>{msg.msg}</p>
        </div>
      )}
      <p>Vote here</p>
      <select
        className="form-select"
        id="exampleSelect1"
        value={currentVote.vote}
        onChange={onChange}
      >
        <option>cat</option>
        <option>dog</option>
      </select>
      <button
        type="submit"
        className="btn btn-primary ms-2"
        onClick={() => sendVote(currentVote)}
      >
        Submit
      </button>
    </>
  );
}

export default Vote;
