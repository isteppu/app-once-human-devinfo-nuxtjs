import { defineEventHandler, createError, readBody, setHeader } from 'h3';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { createClient } from '@supabase/supabase-js';

const JWT_SECRET = process.env.JWT_SECRET || 'ohnoohnoohnononono';
const JWT_EXPIRES_IN = '5h';

/**
 * Handles POST requests to the /api/auth endpoint for user authentication.
 */
export default defineEventHandler(async (event) => {

  const method = event.node.req.method.toLowerCase();

  if (method === 'post') {
    const { username, password } = await readBody(event);

    if (!username || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        data: {
          success: false,
          message: "Username and password are required."
        },
      });
    }

      // Attempt to sign in the user using the provided credentials
      const supabaseUrl = process.env.SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase URL and Key are not configured.');
      }

      const supabase = createClient(supabaseUrl, supabaseKey);

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: `${username}@gmail.com`,
        password: password,
      });

      if (authError) {
        throw createError({
          statusCode: 401,
          statusMessage: 'Unauthorized',
          data: {
            success: false,
            error: authError.message || 'Authentication failed.'
          },
        });
      }

      // Generate a JWT token
      const token = jwt.sign({ username: username }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });

      // Set the token in a secure, httpOnly cookie
      const cookie = serialize('auth_system_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 5, // 5 hours
      });

      const supabase_cookie = serialize('auth_token', data.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 5, // 5 hours
      });

      setHeader(event, 'Set-Cookie', [
        cookie,
        supabase_cookie
      ]);

      return {
        success: true,
        message: "Authentication successful.",
        user: data.user,
        session: data.session,
      };
    
  } else {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed"
    });
  }
});