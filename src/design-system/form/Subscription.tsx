// // app/components/UserData.tsx

// import { useEffect, useState } from 'react';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { getFirestore, doc, getDoc } from 'firebase/firestore';
// import app from '@/lib/firebaseConfig'; // Adjust this path to where your firebase config is

// // Initialize Firebase services
// const auth = getAuth(app);
// const db = getFirestore(app);

// interface UserData {
//   name?: string;
//   email?: string;
//   // Add other fields as needed
// }

// export default function UserData() {
//   const [userData, setUserData] = useState<UserData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         try {
//           // Get the user document from Firestore
//           const userDocRef = doc(db, 'users', user.uid);
//           const userDocSnap = await getDoc(userDocRef);

//           if (userDocSnap.exists()) {
//             setUserData(userDocSnap.data() as UserData);
//           } else {
//             setError('No user data found');
//           }
//         } catch (err: any) {
//           setError('Error fetching user data: ' + err.message);
//         }
//       } else {
//         setUserData(null);
//         setError('No user logged in');
//       }
//       setLoading(false);
//     });

//     // Cleanup subscription
//     return () => unsubscribe();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center p-4">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4 bg-red-50 text-red-500 rounded-md">
//         {error}
//       </div>
//     );
//   }

//   if (!userData) {
//     return (
//       <div className="p-4 bg-yellow-50 text-yellow-600 rounded-md">
//         Please log in to view your data
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 bg-white shadow rounded-lg">
//       <h2 className="text-xl font-semibold mb-4">User Profile</h2>
//       <div className="space-y-2">
//         <p><span className="font-medium">Name:</span> {userData.name}</p>
//         <p><span className="font-medium">Email:</span> {userData.email}</p>
//         {/* Add more fields as needed */}
//       </div>
//     </div>
//   );
// }

import React from 'react'

const Subscription = () => {
  return (
    <div>Subscription</div>
  )
}

export default Subscription