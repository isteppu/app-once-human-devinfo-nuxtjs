import { initializeApp, getApps } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";
import admin from 'firebase-admin';
import serviceAccount from '../../service-account.json';

// Initialize Firebase Admin SDK only if it hasn't been initialized yet
if (!getApps().length) {
    initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://once-human-deviation-portal-default-rtdb.asia-southeast1.firebasedatabase.app/'
    });
}

// Export the database instance for use in other files
export const db = getDatabase();
