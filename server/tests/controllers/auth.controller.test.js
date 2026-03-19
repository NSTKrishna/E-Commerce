'use strict';
/**
 * Unit tests for controllers/auth.controller.js
 *
 * All Prisma DB calls and bcrypt are mocked so no
 * database connection is required.
 */

// ── Mock dependencies BEFORE importing the controller ──────────────────────
jest.mock('../../utils/db', () => ({
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock('bcryptjs', () => ({
  genSalt: jest.fn().mockResolvedValue('salt'),
  hash: jest.fn().mockResolvedValue('hashed-password'),
  compare: jest.fn(),
}));

jest.mock('../../utils/jwt', () => jest.fn(() => 'mock-jwt-token'));

// ── Imports ────────────────────────────────────────────────────────────────
const bcrypt = require('bcryptjs');
const prisma = require('../../utils/db');
const { loginUser, registerUser } = require('../../controllers/auth.controller');

// ── Helpers ────────────────────────────────────────────────────────────────
const mockUser = {
  id: 'user-1',
  name: 'Alice',
  email: 'alice@example.com',
  password: 'hashed-password',
  role: 'BUYER',
};

/** Create a minimal Express req/res pair */
function makeReqRes(body = {}) {
  const req = { body };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  const next = jest.fn();
  return { req, res, next };
}

// ── loginUser tests ────────────────────────────────────────────────────────
describe('loginUser', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns 200 with token on valid credentials', async () => {
    prisma.user.findUnique.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);

    const { req, res, next } = makeReqRes({
      email: 'alice@example.com',
      password: 'password123',
    });

    await loginUser(req, res, next);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        _id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        token: 'mock-jwt-token',
      })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('throws an error when user is not found', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    bcrypt.compare.mockResolvedValue(false);

    const { req, res, next } = makeReqRes({
      email: 'unknown@example.com',
      password: 'wrong',
    });

    await loginUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });

  it('throws an error when password is incorrect', async () => {
    prisma.user.findUnique.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(false);

    const { req, res, next } = makeReqRes({
      email: 'alice@example.com',
      password: 'wrong-password',
    });

    await loginUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});

// ── registerUser tests ─────────────────────────────────────────────────────
describe('registerUser', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns 400 when email already exists', async () => {
    prisma.user.findUnique.mockResolvedValue(mockUser); // user already exists

    const { req, res, next } = makeReqRes({
      name: 'Alice',
      email: 'alice@example.com',
      password: 'password123',
    });

    await registerUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'User already exists' });
  });

  it('creates a new user and returns 201 with token', async () => {
    prisma.user.findUnique.mockResolvedValue(null); // no existing user
    prisma.user.create.mockResolvedValue({
      id: 'user-2',
      name: 'Bob',
      email: 'bob@example.com',
      role: 'BUYER',
    });

    const { req, res, next } = makeReqRes({
      name: 'Bob',
      email: 'bob@example.com',
      password: 'securepass',
    });

    await registerUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        _id: 'user-2',
        email: 'bob@example.com',
        token: 'mock-jwt-token',
      })
    );
  });
});
