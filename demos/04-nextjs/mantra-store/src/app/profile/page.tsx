import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import type { Metadata } from 'next';
import ProfileForm from '@/components/profile/profile-form';

export const metadata: Metadata = {
  title: 'My profile',
  description: 'User profile information',
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth'); // server-side redirect
  }

  return <ProfileForm />;
}