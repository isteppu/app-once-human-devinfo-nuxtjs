import { defineEventHandler, createError, getRouterParams, readBody } from 'h3';
import { handleGet, handlePut, handleDelete } from '../../utils/database-operations';

export default defineEventHandler(async (event) => {
    const method = event.node.req.method.toLowerCase();
    const { id } = getRouterParams(event);

    if (!id) {
        throw createError({ statusCode: 400, statusMessage: 'Bad Request', data: { success: false, error: 'Missing ID in URL.' } });
    }

    const refPath = `Scenario/${id}`;

    try {
        let result;

        switch (method) {
            case 'get':
                result = await handleGet(refPath);
                break;
            case 'put':
                const putData = await readBody(event);
                result = await handlePut(refPath, putData);
                break;
            case 'delete':
                result = await handleDelete(refPath);
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
