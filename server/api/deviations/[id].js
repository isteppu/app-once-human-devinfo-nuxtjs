import { defineEventHandler, createError, getRouterParams, readBody } from 'h3';
import { db } from '../../utils/firebase';

export default defineEventHandler(async (event) => {
    const method = event.node.req.method.toLowerCase();
    const { id } = getRouterParams(event);

    const handleDatabaseOperation = async (refPath, operation, data = null) => {
        try {
            const ref = db.ref(refPath);
            let result;
            let snapshot;

            switch (operation) {
                case 'get':
                    snapshot = await ref.once('value');
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
                    result = Array.isArray(value) ? value.filter(item => item !== null) : value;
                    break;
                case 'post':
                    snapshot = await db.ref(`Deviations/${data.id}`).once('value');
                    if (snapshot.exists()) {
                        throw createError({
                            statusCode: 409,
                            statusMessage: 'Conflict',
                            data: {
                                success: false,
                                error: 'A record with this ID already exists. Cannot create a new one.',
                            },
                        });
                    }
                    await ref.set(data);
                    result = data;
                    break;
                case 'put':
                    await ref.update(data);
                    result = data;
                    break;
                case 'delete':
                    snapshot = await ref.once('value');
                    if (!snapshot.exists()) {
                        throw createError({
                            statusCode: 404,
                            statusMessage: 'Not Found',
                            data: {
                                success: false,
                                error: `Item with ID ${id} not found.`
                            },
                        });
                    }
                    await ref.remove();
                    result = `Item with ID ${id} deleted successfully.`;
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
        const refPath = id ? `Deviations/${id}` : 'Deviations';
        return handleDatabaseOperation(refPath, 'get');
    } else if (method === 'post') {
        const postData = await readBody(event);
        return handleDatabaseOperation(`Deviations/${postData.id}`, 'post', postData);
    } else if (method === 'put') {
        if (!id) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Bad Request',
                data: { success: false, error: 'Missing ID for PUT request.' }
            });
        }
        const putData = await readBody(event);
        return handleDatabaseOperation(`Deviations/${id}`, 'put', putData);
    } else if (method === 'delete') {
        if (!id) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Bad Request',
                data: { success: false, error: 'Missing ID for DELETE request.' }
            });
        }
        return handleDatabaseOperation(`Deviations/${id}`, 'delete');
    } else {
        throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' });
    }
});