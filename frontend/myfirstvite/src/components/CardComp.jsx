import React from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';




const base_url = import.meta.env.VITE_REACT_APP_API_BASE_URL;

function CardComp({ group }) {
  const localGroup = localStorage.getItem('group_id');

  const Join_Group = async () => {
    const storedGroupId = localStorage.getItem('group_id');
    const userId = localStorage.getItem('user_id');

    if (storedGroupId) {
      alert('You are already in a group!');
      return;
    }

    if (!userId) {
      alert('Please login to join a group');
      return;
    }
    if(group.users.length === 4){
      alert('Group is full');
      return;
    }

    try {
      const response = await fetch(`${base_url}/post/group/join/${group._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);

      alert('Successfully joined the group!');
      localStorage.setItem('group_id', group._id);
      window.location.reload();
      
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const Leave_Group = async () => {
    const userId = localStorage.getItem('user_id');

    if (!localGroup) {
      alert('You are not in a group!');
      return;
    }

    if (!userId) {
      alert('Please login to leave a group');
      return;
    }

    try {
      const response = await fetch(`${base_url}/delete/group/leave/${group._id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);

      alert('Successfully left the group!');
      localStorage.removeItem('group_id');
      window.location.reload();
      
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Header>{group.title}</Card.Header>
      <ListGroup variant="flush">
        {group.users.map(user => (
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
        {localGroup === group._id && (
          <Button variant="danger" onClick={Leave_Group} style={{ marginLeft: '10px' }}>Leave Group</Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default CardComp;
