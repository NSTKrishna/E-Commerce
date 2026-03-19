'use strict';
/**
 * Tests for utils/jwt.js – generateToken utility
 *
 * Strategy: mock jsonwebtoken so we control the
 * return value and verify our wrapper passes the
 * correct arguments.
 */

const jwt = require('jsonwebtoken');
const generateToken = require('../../utils/jwt');

describe('generateToken', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV, JWT_SECRET: 'test-secret-key' };
  });

  afterEach(() => {
    process.env = OLD_ENV;
    jest.restoreAllMocks();
  });

  it('should return a non-empty string', () => {
    const token = generateToken('user-123', 'BUYER');
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
  });

  it('should produce a verifiable JWT containing id and role', () => {
    const userId = 'user-abc';
    const role = 'SELLER';

    const token = generateToken(userId, role);
    const decoded = jwt.verify(token, 'test-secret-key');

    expect(decoded.id).toBe(userId);
    expect(decoded.role).toBe(role);
  });

  it('should embed an expiry of ~30 days in the token', () => {
    const token = generateToken('user-xyz', 'BUYER');
    const decoded = jwt.verify(token, 'test-secret-key');

    const nowSec = Math.floor(Date.now() / 1000);
    const thirtyDaysSec = 30 * 24 * 60 * 60;

    // Allow ±60 s tolerance for test execution time
    expect(decoded.exp).toBeGreaterThanOrEqual(nowSec + thirtyDaysSec - 60);
    expect(decoded.exp).toBeLessThanOrEqual(nowSec + thirtyDaysSec + 60);
  });

  it('should throw when JWT_SECRET is undefined', () => {
    delete process.env.JWT_SECRET;
    expect(() => generateToken('user-123', 'BUYER')).toThrow();
  });
});
