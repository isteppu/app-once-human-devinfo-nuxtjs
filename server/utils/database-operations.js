import { db } from './firebase';
import { createError } from 'h3';

/**
 * Handles database GET operations.
 * @param {string} refPath - The Firebase Realtime Database path.
 * @returns {Promise<any>} The fetched data.
 */
export const handleGet = async (refPath) => {
    try {
        const snapshot = await db.ref(refPath).once('value');
        const value = snapshot.val();
        if (!value) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Not Found',
                data: { success: false, error: 'Data not found' },
            });
        }
        // Filter out any null values that may result from array-like structures after deletion.
        return Array.isArray(value) ? value.filter(item => item !== null) : value;
    } catch (error) {
        if (error.statusCode) throw error;
        console.error(`Error during GET operation:`, error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            data: { success: false, error: `Failed to perform database operation: ${error.message}` },
        });
    }
};

/**
 * Handles database POST operations.
 * @param {string} refPath - The Firebase Realtime Database path.
 * @param {object} data - The data to post.
 * @returns {Promise<any>} The posted data.
 */
export const handlePost = async (refPath, data) => {
    try {
        const existingData = await db.ref(refPath).once('value');
        if (existingData.exists()) {
            throw createError({
                statusCode: 409,
                statusMessage: 'Conflict',
                data: { success: false, error: 'A record with this ID already exists. Cannot create a new one.' },
            });
        }
        await db.ref(refPath).set(data);
        return data;
    } catch (error) {
        if (error.statusCode) throw error;
        console.error(`Error during POST operation:`, error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            data: { success: false, error: `Failed to perform database operation: ${error.message}` },
        });
    }
};

/**
 * Handles database PUT (update) operations.
 * @param {string} refPath - The Firebase Realtime Database path.
 * @param {object} data - The data to update.
 * @returns {Promise<any>} The updated data.
 */
export const handlePut = async (refPath, data) => {
    try {
        const existingData = await db.ref(refPath).once('value');
        if (!existingData.exists()) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Not Found',
                data: { success: false, error: 'Data not found for update.' },
            });
        }
        await db.ref(refPath).update(data);
        return data;
    } catch (error) {
        if (error.statusCode) throw error;
        console.error(`Error during PUT operation:`, error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            data: { success: false, error: `Failed to perform database operation: ${error.message}` },
        });
    }
};

/**
 * Handles database DELETE operations.
 * @param {string} refPath - The Firebase Realtime Database path.
 * @returns {Promise<string>} A success message.
 */
export const handleDelete = async (refPath) => {
    try {
        const existingData = await db.ref(refPath).once('value');
        if (!existingData.exists()) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Not Found',
                data: { success: false, error: 'Item not found for deletion.' },
            });
        }
        await db.ref(refPath).remove();
        return `Item at path '${refPath}' deleted successfully.`;
    } catch (error) {
        if (error.statusCode) throw error;
        console.error(`Error during DELETE operation:`, error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            data: { success: false, error: `Failed to perform database operation: ${error.message}` },
        });
    }
};
