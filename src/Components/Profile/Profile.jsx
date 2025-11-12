import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-semibold">Please log in to view your profile.</h2>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-base-100 shadow-xl rounded-lg">
      <div className="flex flex-col items-center">
        <img
          src={user.photoURL || '/default-avatar.png'}
          alt="Profile"
          className="w-24 h-24 rounded-full shadow-md mb-4"
        />
        <h2 className="text-2xl font-bold">{user.displayName || 'No username set'}</h2>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>

      <div className="mt-6 space-y-2">
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold">Account Details</h3>
          <ul className="text-sm mt-2 space-y-1">
            <li><strong>UID:</strong> {user.uid}</li>
            <li><strong>Email Verified:</strong> {user.emailVerified ? 'Yes' : 'No'}</li>
            <li><strong>Provider:</strong> {user.providerData[0]?.providerId}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;