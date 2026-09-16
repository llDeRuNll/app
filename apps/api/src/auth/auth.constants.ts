export const SALT_ROUNDS = 12;
export const ACCESS_TOKEN_TTL_SECONDS = 15 * 60;
export const REFRESH_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;
export const REFRESH_COOKIE_NAME = 'refreshToken';
export const REFRESH_COOKIE_PATH = '/api/auth';
export const JWT_ISSUER = 'workspace-board-api';
export const JWT_AUDIENCE = 'workspace-board-client';
export const IS_PUBLIC_KEY = 'isPublic';
