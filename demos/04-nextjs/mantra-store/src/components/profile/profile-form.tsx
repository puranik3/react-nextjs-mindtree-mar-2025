'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';
import { changePassword } from '@/services/auth';
import { z } from 'zod';

const passwordSchema = z.object({
  oldPassword: z.string().min(6, 'Old password must be at least 8 characters'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
});

export default function ProfileForm() {
  const router = useRouter();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  // const [isLoading, setIsLoading] = useState(true);

  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // useEffect(() => {
  //   getSession().then((session) => {
  //     if (!session) {
  //       router.push('/auth');
  //     } else {
  //       setIsLoading(false);
  //     }
  //   });
  // }, [router]);

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setFormError(null);
    setSuccessMessage(null);
    setFieldErrors({});

    const validation = passwordSchema.safeParse({ oldPassword, newPassword });

    if (!validation.success) {
      const zodErrors = validation.error.flatten().fieldErrors;
      setFieldErrors({
        oldPassword: zodErrors.oldPassword?.[0] || '',
        newPassword: zodErrors.newPassword?.[0] || '',
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await changePassword({ oldPassword, newPassword });
      setSuccessMessage('Password has been updated!');
      setOldPassword('');
      setNewPassword('');
    } catch (error) {
      setFormError('Failed to update password. Please try again.');
    }
  }

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen px-4">
  //       Loading...
  //     </div>
  //   );
  // }

  return (
    <section className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Change Password
      </h1>

      <form onSubmit={submitHandler} className="space-y-4">
        {formError && (
          <div className="text-red-600 text-sm font-medium">{formError}</div>
        )}
        {successMessage && (
          <div className="text-green-600 text-sm font-medium">{successMessage}</div>
        )}

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
          {fieldErrors.oldPassword && (
            <p className="text-sm text-red-500 mt-1">{fieldErrors.oldPassword}</p>
          )}
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
          {fieldErrors.newPassword && (
            <p className="text-sm text-red-500 mt-1">{fieldErrors.newPassword}</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full text-white py-2 rounded transition ${
              isSubmitting
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? 'Updating...' : 'Change password'}
          </button>
        </div>
      </form>
    </section>
  );
}