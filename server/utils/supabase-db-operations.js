import { createClient } from '@supabase/supabase-js';
import { createError } from 'h3';

// Initialize a public Supabase client for read-only access.
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Check if environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Key are not configured.');
}

const supabasePublic = createClient(supabaseUrl, supabaseAnonKey);

// This helper function now takes the JWT token directly.
function getSupabaseClient(operation, jwtToken) {
  if (operation === 'get') {
    return supabasePublic;
  } else {
    // For write operations, use an authenticated client
    if (!jwtToken) {
      throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
    }

    return createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      },
    });
  }
}

/**
 * Generic handler for database operations.
 * It now accepts the jwtToken and data as parameters.
 */
export const handleDatabaseOperation = async (tableName, operation, id = null, data = null, jwtToken = null) => {
  const supabaseClient = jwtToken ? getSupabaseClient(operation, jwtToken) : supabasePublic;

  try {
    let query = supabaseClient.from(tableName.toLowerCase());
    let result;
    let error;

    switch (operation) {
      case 'get':
        if (id) {
          query = query.select().eq('id', id);
        } else {
          query = query.select();
        }
        ({ data: result, error } = await query);
        break;
      case 'post':
        ({ data: result, error } = await query.insert(data).select());
        break;
      case 'put':
        ({ data: result, error } = await query.update(data).eq('id', id).select());
        break;
      case 'delete':
        ({ error } = await query.delete().eq('id', id));
        result = null;
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

    if (error) {
      console.error(`Supabase error (${operation}):`, error);
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        data: {
          success: false,
          error: `Failed to perform operation: ${error.message}`
        },
      });
    }

    if (!result && operation === 'get' && id) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Not Found',
        data: {
          success: false,
          error: 'Data not found'
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
    console.error(`Error during operation (${operation}):`, error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: {
        success: false,
        error: `Failed to perform operation: ${error.message}`
      },
    });
  }
};
