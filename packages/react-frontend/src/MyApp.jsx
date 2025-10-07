import Table from "./Table";
import Form from "./Form";
import React, { useState, useEffect } from "react";
import axios from "axios"

function MyApp() {
  const [characters, setCharacters] = useState([
    {
      name: "Charlie",
      job: "Janitor",
    },
    {
      name: "Mac",
      job: "Bouncer",
    },
    {
      name: "Dee",
      job: "Aspring actress",
    },
    {
      name: "Dennis",
      job: "Bartender",
    },
  ]);

  /*
  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    setCharacters(updated);
  } */

  function removeOneCharacter(id) {
    axios
      .delete(`http://localhost:8000/users/${id}`)
      .then((response) => {
        if (response.status === 204) {
          console.log(`User with ID ${id} deleted successfully`);
          setCharacters(characters.filter((character) => character.id !== id));
        } else {
          console.log("Delete request did not return 204:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  }
    

  function updateList(person) {
    postUser(person)
      .then((res) => res.json())
      .then((json) => setCharacters(characters.concat(json)))
      .catch((error) => console.log(error));
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => {
        console.log("Fetched from backend:", json["users_list"]);
        setCharacters(json["users_list"]);
      })
      .catch((error) => console.log(error));
  }, []);

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
