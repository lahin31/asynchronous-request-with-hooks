import React, { useState, useEffect } from "react";
import { fetchUsers } from "./api";
import axios from "axios";

function App() {
  const [dummyUsers, setDummyUsers] = useState([]);
  const [customUsers, setCustomUsers] = useState(fetchUsers);
  const [showCustomUsers, setShowCustomUsers] = useState(false);

  // componentDidMount
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(resp => {
        setDummyUsers(resp.data);
        setShowCustomUsers(true);
      })
      .catch(() => {
        setCustomUsers([]);
        setShowCustomUsers(false);
      });
  }, []); //  Don't forget to put [] square brackets, which will help to run it only after the dom render(once)

  const deleteDummyUsers = index => {
    const _dummyUsers = [...dummyUsers];
    _dummyUsers.splice(index, 1);
    setDummyUsers(_dummyUsers);
  };

  const deleteCustomUser = index => {
    const _customUsers = [...customUsers];
    _customUsers.splice(index, 1);
    setCustomUsers(_customUsers);
  };
  return (
    <div>
      <h4>From DummyData(JsonPlaceholder)</h4>
      {showCustomUsers === false && customUsers.length !== 0 ? (
        <p>...loading</p>
      ) : (
        <ul>
          {dummyUsers.map((dummyUser, i) => {
            return (
              <li key={dummyUser.id}>
                <b>Name</b>:{dummyUser.name}
                <b> ID</b>: {dummyUser.id}
                <button onClick={() => deleteDummyUsers(i)}>Delete</button>
              </li>
            );
          })}
        </ul>
      )}
      <h4>From Custom Api</h4>
      <ul>
        {customUsers.map((customUser, i) => {
          return (
            <li key={customUser.id}>
              <b>Name</b>:{customUser.name}
              <b> ID</b>: {customUser.id}
              <button onClick={() => deleteCustomUser(i)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
