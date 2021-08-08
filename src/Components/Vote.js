import React, { Fragment, useState } from 'react';
const axios = require('axios');

function Vote() {
  // Error or other messages state
  // msg {msg: 'Some message', isDanger: true || false}
  const [msg, setMsg] = useState(null);

  const [currentVote, setCurrentVote] = useState({ vote: 'cat' });

  const sendVote = async (currentVote) => {
    const { vote } = currentVote;

    try {
      const res = await axios.post('http://localhost:8080/api/vote', {
        choice: vote,
      });
      setMsg({ msg: res.data.msg, isDanger: false });
    } catch (err) {
      setMsg({ msg: 'There was an error', isDanger: true });
    }
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
          <span>{msg.msg}</span>
          <button
            type="button"
            className="btn-close"
            onClick={clearMsgs}
          ></button>
        </div>
      )}
      <h1 className="display-6">Who do you like more, Cats or Dogs?</h1>
      <p>Vote here &darr;</p>
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
        className="btn btn-primary"
        onClick={() => sendVote(currentVote)}
      >
        Submit
      </button>
    </>
  );
}

export default Vote;
