import { defineEventHandler, createError, getRouterParams, readBody } from 'h3';
import { db } from '../../../utils/firebase';

export default defineEventHandler(async (event) => {
    const method = event.node.req.method.toLowerCase();
    const { id } = getRouterParams(event);

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
                case 'put':
                    await ref.update(data);
                    result = data;
                    break;
                case 'delete':
                    await ref.remove();
                    result = `Item with ID ${ id } deleted successfully.`;
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
        return handleDatabaseOperation(`Locations/${id}`, 'get');
    } else if (method === 'put') {
        const putData = await readBody(event);
        return handleDatabaseOperation(`Locations/${id}`, 'put', putData);
    } else if (method === 'delete') {
        return handleDatabaseOperation(`Locations/${id}`, 'delete');
    } else {
        throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' });
    }
});