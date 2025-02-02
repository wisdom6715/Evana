import admin from 'firebase-admin';
import serviceAccount from './lib/serviceAccountKey.json'; // Path to your service account key

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;