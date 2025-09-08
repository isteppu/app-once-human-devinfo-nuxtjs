import { createError } from 'h3';
import { schemas } from './schemas';

/**
 * Validates a data object against the Deviation schema.
 * @param {object} data The data to validate.
 * @param {boolean} isPartial If true, only checks fields that are present in the data (for PUT requests).
 */
export const validateDeviationSchema = (data, isPartial = false) => {
  const schema = schemas.Deviations;
  const requiredFields = Object.keys(schema).filter(key => key !== 'note');
  const allFields = Object.keys(schema);

  // Check for unknown fields
  for (const field in data) {
    if (!allFields.includes(field)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        data: {
          success: false,
          error: `Unknown field in request body: '${field}'`,
        },
      });
    }
  }

  // Check for missing required fields (only for POST)
  if (!isPartial) {
    for (const field of requiredFields) {
      if (!(field in data)) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Bad Request',
          data: {
            success: false,
            error: `Missing required field: '${field}'`,
          },
        });
      }
    }
  }

  // Check for empty string values for all fields
  for (const field in data) {
    if (data[field] === '') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        data: {
          success: false,
          error: `Field '${field}' cannot be an empty string.`,
        },
      });
    }
  }

  // Validate types for all provided fields
  for (const field in data) {
    if (!schema[field](data[field])) {
      // Add a specific error message for the location field
      if (field === 'location' && !Array.isArray(data[field]) && data[field] !== 'none') {
        throw createError({
          statusCode: 400,
          statusMessage: 'Bad Request',
          data: {
            success: false,
            error: "Field 'location' must be an array or the string 'none'.",
          },
        });
      }

      // Add a more specific validation for the structure of the `location` array
      if (field === 'location' && Array.isArray(data[field])) {
        for (const item of data[field]) {
          if (typeof item !== 'object' || item === null || !('id' in item) || !('loc' in item)) {
            throw createError({
              statusCode: 400,
              statusMessage: 'Bad Request',
              data: {
                success: false,
                error: "Each item in 'location' array must be an object with 'id' and 'loc' properties.",
              },
            });
          }
          if (typeof item.id !== 'number' && isNaN(Number(item.id))) {
            throw createError({
              statusCode: 400,
              statusMessage: 'Bad Request',
              data: {
                success: false,
                error: "The 'id' property in a 'location' item must be a number.",
              },
            });
          }
          if (!Array.isArray(item.loc) && item.loc !== 'none') {
            throw createError({
              statusCode: 400,
              statusMessage: 'Bad Request',
              data: {
                success: false,
                error: "The 'loc' property in a 'location' item must be an array of numbers or the string 'none'.",
              },
            });
          }
        }
      } else {
        // Generic type error for other fields
        const expectedType = schema[field].name.replace('is', '').toLowerCase();
        throw createError({
          statusCode: 400,
          statusMessage: 'Bad Request',
          data: {
            success: false,
            error: `Field '${field}' must be of type ${expectedType}.`,
          },
        });
      }
    }
  }
};
