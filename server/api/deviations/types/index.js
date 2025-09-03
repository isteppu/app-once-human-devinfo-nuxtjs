import { defineEventHandler, createError, readBody } from 'h3';
import { handleGet, handlePost } from '../../../utils/database-operations';

export default defineEventHandler(async (event) => {
    const method = event.node.req.method.toLowerCase();

    try {
        let result;

        switch (method) {
            case 'get':
                result = await handleGet('DeviationTypes');
                break;
            case 'post':
                const postData = await readBody(event);
                if (!postData.id) {
                    throw createError({ statusCode: 400, statusMessage: 'Bad Request', data: { success: false, error: 'Missing ID for POST request.' } });
                }
                result = await handlePost(`DeviationTypes/${postData.id}`, postData);
                break;
            default:
                throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' });
        }

        return {
            success: true,
            result: result,
            message: `${method.charAt(0).toUpperCase() + method.slice(1)} operation successful`,
        };
    } catch (error) {
        if (error.statusCode) {
            throw error;
        }
        console.error(`Error in event handler:`, error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            data: { success: false, error: `Failed to perform database operation: ${error.message}` },
        });
    }
});
