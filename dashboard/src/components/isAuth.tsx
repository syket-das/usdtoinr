// @ts-nocheck
'use client';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import useAuthStore from '@/store/authStore';

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const { authToken } = useAuthStore((state) => state);

    const auth = authToken;

    useEffect(() => {
      if (!auth) {
        return redirect('/login');
      }
    }, []);

    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}
