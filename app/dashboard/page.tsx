'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>Welcome back!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="text-lg font-medium">
              {user.displayName || 'No name set'}
            </p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="text-lg font-medium">
              {user.email || 'No email'}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">User ID</p>
            <p className="text-xs font-mono text-muted-foreground">
              {user.uid}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Account Type</p>
            <p className="text-lg font-medium">
              {user.isAnonymous ? '👤 Guest User' : '✅ Registered User'}
            </p>
          </div>

          <Button onClick={handleLogout} variant="destructive" className="w-full">
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}