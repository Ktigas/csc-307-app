import Table from "./Table";
import Form from "./Form";
import React, { useState, useEffect } from "react";
import axios from "axios";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  // Fetch users from backend
  useEffect(() => {
    axios
      .get("http://localhost:8000/users")
      .then((res) => {
        console.log("Fetched from backend:", res.data.users_list);
        setCharacters(res.data.users_list); // each user already has `id` mapped
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Delete a user
  function removeOneCharacter(id) {
    axios
      .delete(`http://localhost:8000/users/${id}`)
      .then((response) => {
        // Our backend now returns 200 with a message
        if (response.status === 200) {
          console.log(`User with ID ${id} deleted successfully`);
          setCharacters(characters.filter((character) => character.id !== id));
        } else {
          console.log("Delete request returned:", response.status);
        }
      })
      .catch((error) => console.error("Error deleting user:", error));
  }

  // Add a new user
  function updateList(person) {
    axios
      .post("http://localhost:8000/users", person)
      .then((res) => {
        const newUser = res.data; // backend returns user with `id` field
        setCharacters((prev) => [...prev, newUser]);
      })
      .catch((error) => console.error("Error adding user:", error));
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
