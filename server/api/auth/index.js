import { defineEventHandler, createError, readBody, setHeader } from 'h3';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const users = [
  { username: "ohportal_admin", password: "00oncehuman00" }
];

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

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      // Generate a JWT token
      const token = jwt.sign({ username: user.username }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });

      // Set the token in a secure, httpOnly cookie
      const cookie = serialize('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 5, // 5 hours
      });

      setHeader(event, 'Set-Cookie', cookie);

      return {
        success: true,
        message: "Authentication successful."
      };
    } else {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
        data: {
          success: false,
          message: "Invalid username or password."
        },
      });
    }
  } else {
    throw createError({
      statusCode: 405,
      statusMessage: "Method Not Allowed"
    });
  }
});