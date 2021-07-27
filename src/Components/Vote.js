import React, { Fragment, useState } from 'react';
const axios = require('axios');

function Vote() {
  // Error or other messages state
  const [msg, setMsg] = useState();

  const [currentVote, setCurrentVote] = useState({ vote: 'cat' });

  const sendVote = (currentVote) => {
    const { vote } = currentVote;
    axios
      .post('http://bitwebtest_vote-rest-api_1/api/vote', {
        choice: vote,
      })
      .then((res) => {
        setMsg({ msg: res });
      })
      .catch((err) => {
        setMsg({ msg: 'There was an error' });
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
        <div className={`alert alert-dismissible`}>
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
