import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import admin from '@/lib/firebaseAdmin'; // Import Firebase Admin instance

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if the route needs protection
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/welcome') || pathname.startsWith('/payment')) {
    // Get the 'authToken' cookie
    const tokenCookie = req.cookies.get('authToken');

    if (!tokenCookie) {
      return NextResponse.redirect(new URL('/404', req.url)); // Redirect if no cookie
    }

    const token = tokenCookie.value; // Extract the token value

    try {
      // Verify the token using Firebase Admin SDK
      const decodedToken = await admin.auth().verifyIdToken(token);
      console.log('Authenticated UID:', decodedToken.uid);

      return NextResponse.next(); // Token is valid, proceed
    } catch (error) {
      console.error('Token verification failed:', error);

      return NextResponse.redirect(new URL('/404', req.url)); // Redirect if token invalid
    }
  }

  // Allow other routes to proceed
  return NextResponse.next();
}