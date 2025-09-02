import { defineEventHandler, createError, readBody } from 'h3';
import { db } from '../../../utils/firebase';

export default defineEventHandler(async (event) => {
    const method = event.node.req.method.toLowerCase();

    const handleDatabaseOperation = async (refPath, operation, data = null) => {
        try {
            const ref = db.ref(refPath);
            let result;

            switch (operation) {
                case 'get':
                    const snapshot = await ref.once('value');
                    const value = snapshot.val();
                    if (!value) {
                        throw createError({
                            statusCode: 404,
                            statusMessage: 'Not Found',
                            data: {
                                success: false,
                                error: 'Data not found'
                            },
                        });
                    }
                    result = value;
                    break;
                case 'post':
                    await ref.set(data);
                    result = data;
                    break;
                default:
                    throw createError({
                        statusCode: 400,
                        statusMessage: 'Bad Request',
                        data: {
                            success: false,
                            error: 'Unsupported database operation.'
                        },
                    });
            }

            return {
                success: true,
                result: result,
                message: `${operation.charAt(0).toUpperCase() + operation.slice(1)} operation successful`,
            };
        } catch (error) {
            if (error.statusCode) {
                throw error;
            }
            console.error(`Error during database operation (${operation}):`, error);
            throw createError({
                statusCode: 500,
                statusMessage: 'Internal Server Error',
                data: {
                    success: false,
                    error: `Failed to perform database operation: ${error.message}`
                },
            });
        }
    };

    if (method === 'get') {
        return handleDatabaseOperation('Locations', 'get');
    } else if (method === 'post') {
        const postData = await readBody(event);
        const existingData = await db.ref(`Locations/${postData.id}`).once('value');
        if (existingData.exists()) {
            throw createError({
                statusCode: 409,
                statusMessage: 'Conflict',
                data: {
                    success: false,
                    error: 'A record with this ID already exists. Cannot create a new one.',
                },
            });
        }
        return handleDatabaseOperation(`Locations/${postData.id}`, 'post', postData);
    } else {
        throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' });
    }
});