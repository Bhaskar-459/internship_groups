import React, { useEffect, useState } from 'react';

const MyTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/get/students');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Roll Number</th>
          <th>Internship</th>
          <th>Class</th>
          <th>Year</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row._id}>
            <td>{row.name}</td>
            <td>{row.rollNumber}</td>
            <td>{row.internship}</td>
            <td>{row.Sclass}</td>
            <td>{row.Year}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MyTable;
