import React from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function CardComp({ group }) {
  console.log(group.users,"users s ahahs");
  const Join_Group = async () => {
    let localGroup = localStorage.getItem('group_id');
    if (localGroup) {
      alert('You are already in a group!');
      return;
    }
    console.log("Joining group:", group._id);
    let group_id = group._id;
    let user_id = localStorage.getItem('user_id');
    localStorage.setItem('group_id', group_id);
    
    if (!user_id) {
      alert('Please login to join a group');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/post/group/join/${group_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user_id
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);

      // Display a success message to the user
      alert('Successfully joined the group!');
      
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Header>{group.title}</Card.Header>
      <ListGroup variant="flush">
        {group.users.map((user) => (
          // Display the user details here
          // Example: {user.name} - {user.rollNumber} - {user.internship} - {user.Sclass
          <ListGroup.Item key={user._id}>
            Name: {user.name} <br />
            Roll Number: {user.rollNumber} <br />
            Class: {user.Sclass} <br />
            Internship: {user.internship} <br />
            Year: {user.Year} <br />
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Card.Body>
        <Button variant="primary" onClick={Join_Group}>Join Group</Button>
      </Card.Body>
    </Card>
  );
}

export default CardComp;
