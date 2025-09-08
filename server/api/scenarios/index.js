import { defineEventHandler, createError, getRouterParams, readBody } from 'h3';
import { handleDatabaseOperation } from '../../utils/supabase-db-operations';

/**
 * Main event handler for the /api/deviations routes.
 */
export default defineEventHandler(async (event) => {
	const method = event.node.req.method.toLowerCase();

	const tableName = 'Scenario';
	switch (method) {
		case 'get':
			return handleDatabaseOperation(tableName, 'get');
		case 'post':
			const postData = await readBody(event);
			return handleDatabaseOperation(tableName, 'post', null, postData);
		default:
			throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' });
	}
});
