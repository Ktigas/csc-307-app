import Table from "./Table";
import Form from "./Form";
import React, {useState, useEffect} from 'react';

function MyApp() {
  const [characters, setCharacters] = useState([
    {
      name: "Charlie",
      job: "Janitor"
    },
    {
      name: "Mac",
      job: "Bouncer"
    },
    {
      name: "Dee",
      job: "Aspring actress"
    },
    {
      name: "Dennis",
      job: "Bartender"
    }
  ]);

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    setCharacters(updated);
  }

  function updateList(person) { 
    postUser(person)
      .then(() => setCharacters([...characters, person]))
      .catch((error) => {
        console.log(error);
      })
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
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp; 



