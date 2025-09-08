import { defineEventHandler, createError, getRouterParams, readBody } from 'h3';
import { handleDatabaseOperation } from '../../utils/supabase';

/**
 * Main event handler for the /api/deviations routes.
 */
export default defineEventHandler(async (event) => {
	const method = event.node.req.method.toLowerCase();
	const params = getRouterParams(event);
	const path = params.path.split('/');

	if (path[0] === 'droptype') {
		const id = path[1] === 'id' ? path[2] : null;
		const tableName = 'ScenarioDropType';

		switch (method) {
			case 'get':
				return handleDatabaseOperation(tableName, 'get', id);
			case 'post':
				const postData = await readBody(event);
				return handleDatabaseOperation(tableName, 'post', null, postData);
			case 'put':
				const putData = await readBody(event);
				return handleDatabaseOperation(tableName, 'put', id, putData);
			case 'delete':
				return handleDatabaseOperation(tableName, 'delete', id);
			default:
				throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' });
		}
	}  else if (path[0] === 'id') {
		const id = path[1];
		const tableName = 'Scenario';

		switch (method) {
			case 'get':
				return handleDatabaseOperation(tableName, 'get', id);
			case 'delete':
				return handleDatabaseOperation(tableName, 'delete', id);
			case 'put':
				const putData = await readBody(event);
				return handleDatabaseOperation(tableName, 'put', id, putData);
			default:
				throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' });
		}
	} else if (path.length === 1 && path[0] === '') {
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
	}

	throw createError({
		statusCode: 404,
		statusMessage: 'Not Found',
		data: {
			success: false,
			message: `The requested URL was not found on this server.`
		}
	});
});
