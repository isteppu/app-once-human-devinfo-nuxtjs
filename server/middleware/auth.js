import { defineEventHandler, createError, getHeader, getQuery } from 'h3';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

// Use an environment variable for a real application.
const API_KEY = process.env.API_KEY;
const JWT_SECRET = process.env.JWT_SECRET || 'ohnoohnoohnononono';

/**
 * Server middleware to authenticate incoming requests with an API key or a JWT token.
 * This runs before all other server routes.
 */
export default defineEventHandler(async (event) => {
    const method = event.node.req.method.toLowerCase();
    const url = event.node.req.url;

    if (method === 'get' || url.startsWith('/api/auth')) {
        return;
    }

    const incomingApiKey = getHeader(event, 'x-api-key') || getQuery(event).apiKey;
    const cookies = parse(getHeader(event, 'cookie') || '');
    const authToken = cookies.auth_token;

    let isTokenValid = false;
    if (authToken) {
        try {
            jwt.verify(authToken, JWT_SECRET);
            isTokenValid = true;
        } catch (e) {
            if (e.name === 'TokenExpiredError') {
                throw createError({
                    statusCode: 401,
                    statusMessage: 'Unauthorized',
                    data: {
                        success: false,
                        error: 'Token has expired.'
                    },
                });
            }
            console.error('JWT verification failed:', e.message);
        }
    }

    if (incomingApiKey === API_KEY || isTokenValid) {
        return;
    }

    throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
        data: {
            success: false,
            error: 'Invalid authentication credentials or your token has expired.'
        },
    });
});