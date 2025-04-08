'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';
import { changePassword } from '@/services/auth';

export default function ProfileForm() {
  const router = useRouter();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.push('/auth');
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      await changePassword({ oldPassword, newPassword });
      setOldPassword('');
      setNewPassword('');
      alert('Password has been updated');
    } catch (error) {
      alert('Password has not been updated');
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen px-4">
        Loading...
      </div>
    );
  }

  return (
    <section className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Change Password
      </h1>

      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label htmlFor="oldPassword" className="block text-sm font-medium mb-1">
            Old Password
          </label>
          <input
            required
            type="password"
            id="oldPassword"
            name="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
            New Password
          </label>
          <input
            required
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Change password
          </button>
        </div>
      </form>
    </section>
  );
}