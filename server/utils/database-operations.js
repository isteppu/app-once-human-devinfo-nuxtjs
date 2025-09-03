import { db } from './firebase';
import { createError } from 'h3';
import { schemas } from './schemas';

/**
 * Validates a data object against a predefined schema for a given collection.
 * @param {string} collectionName The name of the database collection.
 * @param {object} data The data object to validate.
 */
const validateData = (collectionName, data) => {
    const schema = schemas[collectionName];
    if (!schema) {
        return true;
    }

    const dataKeys = Object.keys(data);
    const schemaKeys = Object.keys(schema);

    // Check if the data has all the required properties from the schema.
    const missingKeys = schemaKeys.filter(key => !dataKeys.includes(key));
    if (missingKeys.length > 0) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Bad Request',
            data: { success: false, error: `Missing required fields: ${missingKeys.join(', ')}` },
        });
    }

    // Check if the data has any extra properties not defined in the schema.
    const extraKeys = dataKeys.filter(key => !schemaKeys.includes(key));
    if (extraKeys.length > 0) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Bad Request',
            data: { success: false, error: `Invalid fields present: ${extraKeys.join(', ')}` },
        });
    }

    // Validate the type of each property.
    for (const key of schemaKeys) {
        if (!schema[key](data[key])) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Bad Request',
                data: { success: false, error: `Invalid data type for field: ${key}` },
            });
        }
    }
};

/**
 * Fetches data from a specified database path.
 * @param {string} refPath The path to the database reference.
 */
export const handleGet = async (refPath) => {
    try {
        const snapshot = await db.ref(refPath).once('value');
        const value = snapshot.val();
        if (value === null) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Not Found',
                data: { success: false, error: 'Data not found' },
            });
        }
        // Filter out null values if the result is an array.
        const filteredResult = Array.isArray(value) ? value.filter(item => item !== null) : value;

        return filteredResult;
    } catch (error) {
        if (error.statusCode) {
            throw error;
        }
        console.error(`Error during GET operation:`, error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            data: { success: false, error: `Failed to perform database operation: ${error.message}` },
        });
    }
};

/**
 * Creates new data at a specified database path after validation.
 * @param {string} refPath The path to the database reference.
 * @param {object} data The data to be added.
 */
export const handlePost = async (refPath, data) => {
    try {
        const collectionName = refPath.split('/')[0];
        validateData(collectionName, data);

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
        if (error.statusCode) {
            throw error;
        }
        console.error(`Error during POST operation:`, error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            data: { success: false, error: `Failed to perform database operation: ${error.message}` },
        });
    }
};

/**
 * Updates data at a specified database path after validation.
 * @param {string} refPath The path to the database reference.
 * @param {object} data The data to be updated.
 */
export const handlePut = async (refPath, data) => {
    try {
        const collectionName = refPath.split('/')[0];
        validateData(collectionName, data);

        await db.ref(refPath).update(data);
        return data;
    } catch (error) {
        if (error.statusCode) {
            throw error;
        }
        console.error(`Error during PUT operation:`, error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            data: { success: false, error: `Failed to perform database operation: ${error.message}` },
        });
    }
};

/**
 * Deletes data from a specified database path.
 * @param {string} refPath The path to the database reference.
 */
export const handleDelete = async (refPath) => {
    try {
        const snapshot = await db.ref(refPath).once('value');
        if (!snapshot.exists()) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Not Found',
                data: { success: false, error: 'Data not found to delete' },
            });
        }

        await db.ref(refPath).remove();
        return { message: `Item at path ${refPath} deleted successfully.` };
    } catch (error) {
        if (error.statusCode) {
            throw error;
        }
        console.error(`Error during DELETE operation:`, error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            data: { success: false, error: `Failed to perform database operation: ${error.message}` },
        });
    }
};