import { defineEventHandler, createError, getRouterParams, readBody } from 'h3';
import { handleDatabaseOperation } from '../../utils/supabase-db-operations';

/**
 * Main event handler for the /api/deviations routes.
 */
export default defineEventHandler(async (event) => {
	const method = event.node.req.method.toLowerCase();
	const params = getRouterParams(event);
	const path = (params.path || params._)?.split('/') || [];
	const jwtToken = getCookie(event, 'auth_token');
	console.log("📃 Deviation path: ", path)

	if (path[0] === 'needs') {
		const id = path[1] === 'id' ? path[2] : null;
		const tableName = 'DeviationNeeds';

		switch (method) {
			case 'get':
				return handleDatabaseOperation(tableName, 'get', id);
			case 'post':
				const postData = await readBody(event);
				return handleDatabaseOperation(tableName, 'post', null, postData, jwtToken);
			case 'put':
				const putData = await readBody(event);
				return handleDatabaseOperation(tableName, 'put', id, putData, jwtToken);
			case 'delete':
				return handleDatabaseOperation(tableName, 'delete', id);
			default:
				throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' });
		}
	} else if (path[0] === 'types') {
		const id = path[1] === 'id' ? path[2] : null;
		const tableName = 'DeviationTypes';

		switch (method) {
			case 'get':
				return handleDatabaseOperation(tableName, 'get', id);
			case 'post':
				const postData = await readBody(event);
				return handleDatabaseOperation(tableName, 'post', null, postData, jwtToken);
			case 'put':
				const putData = await readBody(event);
				return handleDatabaseOperation(tableName, 'put', id, putData, jwtToken);
			case 'delete':
				return handleDatabaseOperation(tableName, 'delete', id);
			default:
				throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' });
		}
	} else if (path[0] === 'types') {
		const id = path[1] === 'id' ? path[2] : null;
		const tableName = 'DeviationTypes';

		switch (method) {
			case 'get':
				return handleDatabaseOperation(tableName, 'get', id);
			case 'post':
				const postData = await readBody(event);
				return handleDatabaseOperation(tableName, 'post', null, postData, jwtToken);
			case 'put':
				const putData = await readBody(event);
				return handleDatabaseOperation(tableName, 'put', id, putData, jwtToken);
			case 'delete':
				return handleDatabaseOperation(tableName, 'delete', id);
			default:
				throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' });
		}
	} else if (path[0] === 'locations') {
		const id = path[1];
		const tableName = 'Locations';

		switch (method) {
			case 'get':
				return handleDatabaseOperation(tableName, 'get', id);
			case 'delete':
				return handleDatabaseOperation(tableName, 'delete', id);
			case 'put':
				const putData = await readBody(event);
				return handleDatabaseOperation(tableName, 'put', id, putData, jwtToken);
			default:
				throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' });
		}
	} else if (path.length === 1 && /\d/.test(path[0])) {
		const tableName = 'Deviations';
		const id = path[0];
		switch (method) {
			case 'get':
				return handleDatabaseOperation(tableName, 'get', id);
			case 'put':
				const putData = await readBody(event);
				console.log("📃 putData: ", putData)
				return handleDatabaseOperation(tableName, 'put', id, putData, jwtToken);
			default:
				throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' });
		}
	}

	throw createError({
		statusCode: 404,
		statusMessage: 'Not Found',
		data: {
			success: false,
			message: `The requested URL was not found on this server`
		}
	});
});
