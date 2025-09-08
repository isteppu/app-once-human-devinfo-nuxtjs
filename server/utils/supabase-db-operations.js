import { createClient } from '@supabase/supabase-js';
import { createError } from 'h3';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// Check if environment variables are set
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Key are not configured.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Generic handler for database operations to reduce code duplication.
 * This now uses Supabase's table-based querying instead of Firebase's path-based references.
 */
export const handleDatabaseOperation = async (tableName, operation, id = null, data = null) => {
  try {
    let query = supabase.from(tableName.toLowerCase());
    let result;
    let error;

    switch (operation) {
      case 'get':
        if (id) {
          // Select a single item by its ID
          query = query.select().eq('id', id);
        } else {
          // Select all items from the table
          query = query.select();
        }
        ({ data: result, error } = await query);
        break;
      case 'post':
        // Insert a new item into the table
        ({ data: result, error } = await query.insert(data).select());
        break;
      case 'put':
        // Update an item by its ID
        ({ data: result, error } = await query.update(data).eq('id', id).select());
        break;
      case 'delete':
        // Delete an item by its ID
        ({ error } = await query.delete().eq('id', id));
        result = null; // No data returned on delete
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
      console.error(`Supabase error during operation (${operation}):`, error);
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        data: {
          success: false,
          error: `Failed to perform database operation: ${error.message}`
        },
      });
    }

    if (!result && operation === 'get') {
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
