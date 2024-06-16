import { useState } from "react";
import CardComp from './CardComp';
import './Groups.css';

const Groups = () => {
  const [groups, setGroups] = useState([]);

  // fetch data from the server
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/get/groups');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.length === 0) {
        alert('No groups available');
      }
      console.log(data);
      setGroups(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  return (
    <div>
      <h1>Groups</h1>
      <button onClick={fetchData}>See Groups</button>
      <div className="groups-container">
        {groups.map((group) => (
          <div key={group._id} className="group-item">
            <CardComp group={group} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Groups;
