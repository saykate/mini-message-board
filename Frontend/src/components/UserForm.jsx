import { useState } from "react";

const initState = {
  username: "",
  birthdate: "",
};
const UserForm = ({ setCurrentUser }) => {
  const [userInput, setUserInput] = useState(initState);

  const handleCreateOrGetUser = async (e) => {
    e.preventDefault();
    if (!userInput) {
      alert("Please add your name");
      return;
    }
    try {
      console.log("userInput", userInput);
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInput),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const { data } = await response.json();
      console.log("User successfully add:", data);
      // Check if user already exists from initial fetch
      // setUsers((prevUsers) => [...prevUsers, data]);
      setCurrentUser(data._id);
      setUserInput(initState);
    } catch (error) {
      console.error("Failed to post message:", error);
    }
  };

  return (
    <div className="add-user">
      <div>
        <label htmlFor="userName">Please choose a User Name</label>
        <input
          id="userName"
          type="text"
          value={userInput.username}
          placeholder="choose your posting name"
          onChange={(e) =>
            setUserInput({ ...userInput, username: e.target.value })
          }
        />
      </div>
      <div>
        <label htmlFor="birthdate">Please enter your Birthdate</label>
        <input
          id="birthdate"
          type="date"
          value={userInput.birthdate}
          onChange={(e) =>
            setUserInput({ ...userInput, birthdate: e.target.value })
          }
        />
      </div>
      <button onClick={handleCreateOrGetUser}>Add User Name</button>
    </div>
  );
}

export default UserForm;
