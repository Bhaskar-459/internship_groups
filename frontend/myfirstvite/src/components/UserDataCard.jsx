import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';

function UserDataCard() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('user_data');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{userData.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{userData.rollNumber}</Card.Subtitle>
        <Card.Text>
          Internship: {userData.internship}
          <br />
          Class: {userData.Sclass}
          <br />
          Year: {userData.Year}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default UserDataCard;
