import React, { useState, useEffect } from 'react';
import UserList from '../User/UsersList';


const User: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
  

  
    return (
      <div>
              <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 py-4">List of Users</h2>
        <UserList />
      </div>
    );
  };
  
  export default User;
