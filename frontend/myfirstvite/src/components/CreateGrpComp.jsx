import React, { useState } from 'react';

const CreateGrpComp = () => {
    const [title, setTitle] = useState('');

    const create_group = async () => {
        let Grouptitle = title;
        if(localStorage.getItem('group_id')){
            alert("You are already in a group!");
            return;
        }
        let user_id = localStorage.getItem('user_id');
        
        if (!user_id) {
          alert('Please login to create a group');
          return;
        }
    
        try {
          const response = await fetch(`http://localhost:5000/group`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: user_id,
              title: Grouptitle
            }),
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const data = await response.json();
          console.log(data,"came_here");
          localStorage.setItem('group_id', data._id); // Use data.id instead of data._id
        } catch (error) {
          console.error("There was a problem with the fetch operation:", error);
        }
    }

    return (
        <div>
            <h1>Create Group</h1>
            <label>
                Title:
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            <button onClick={create_group}>Create Group</button>
        </div>
    )
}

export default CreateGrpComp;
