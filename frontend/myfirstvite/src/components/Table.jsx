import MyTable from './MyTable.jsx';
import React from 'react';

const Table = () => {
  return (
    <div style={{ margin: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>ALL STUDENTS</h2>
      <MyTable />
    </div>
  );
};

export default Table;
