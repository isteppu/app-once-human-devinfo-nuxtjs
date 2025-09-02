import { defineEventHandler, createError, readBody } from 'h3';
import { db } from '../../utils/firebase';

export default defineEventHandler(async (event) => {
    const method = event.node.req.method.toLowerCase();
    const { id } = event.context.params || {};

    const handleGet = async (refPath) => {
        try {
            const snapshot = await db.ref(refPath).once('value');
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
            const filteredResult = Array.isArray(value) ? value.filter(item => item !== null) : value;

            return {
                success: true,
                result: filteredResult,
                message: 'Get operation successful',
            };
        } catch (error) {
            if (error.statusCode) {
                throw error;
            }
            console.error(`Error during GET operation:`, error);
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

    const handlePost = async (refPath, data) => {
        try {
            await db.ref(refPath).set(data);
            return {
                success: true,
                result: data,
                message: 'Post operation successful',
            };
        } catch (error) {
            console.error(`Error during POST operation:`, error);
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
        return handleGet('Deviations');;
    } else if (method === 'post') {
        const postData = await readBody(event);
        const existingData = await db.ref(`Deviations/${postData.id}`).once('value');
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
        return handlePost(`Deviations/${postData.id}`, postData);
    } else {
        throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' });
    }
});