import { Maybe } from 'purify-ts';
import { authServiceFactory } from '../../src/service/AuthService';
import { Configuration } from '../../src/configuration/ViteConfiguration';
import { vitest } from 'vitest';

describe('AuthService', () => {
  const mockConfiguration = {
    auth: {
      jwtTokenKey: 'jwtToken',
      refreshTokenKey: 'refreshToken',
    },
  };

  const mockStorage: Storage = {
    getItem: vitest
      .fn()
      .mockReturnValueOnce('jwtTokenValue')
      .mockReturnValueOnce('refreshTokenValue'),
    setItem: vitest.fn(),
    removeItem: vitest.fn(),
    clear: vitest.fn(),
    length: 0,
    key: vitest.fn(),
  };

  const badMockStorage: Storage = {
    getItem: vitest.fn().mockReturnValueOnce('jwtTokenValue').mockReturnValueOnce(null),
    setItem: vitest.fn(),
    removeItem: vitest.fn(),
    clear: vitest.fn(),
    length: 0,
    key: vitest.fn(),
  };

  describe('getAuth', () => {
    it('should return Maybe with AuthToken if both jwtToken and refreshToken exist in storage', () => {
      const authService = authServiceFactory(mockConfiguration as Configuration, mockStorage);
      const result = authService.getAuth();

      expect(result.extract()).toEqual({ jwt: 'jwtTokenValue', refresh: 'refreshTokenValue' });
      expect(mockStorage.getItem).toHaveBeenCalledWith('jwtToken');
      expect(mockStorage.getItem).toHaveBeenCalledWith('refreshToken');
    });

    it('should return Maybe.empty if jwtToken or refreshToken is missing in storage', () => {
      const authService = authServiceFactory(mockConfiguration as Configuration, badMockStorage);
      const result = authService.getAuth();

      expect(result).toEqual(Maybe.empty());
      expect(mockStorage.getItem).toHaveBeenCalledWith('jwtToken');
      expect(mockStorage.getItem).toHaveBeenCalledWith('refreshToken');
    });
  });

  describe('setAuth', () => {
    it('should set jwtToken and refreshToken in storage', () => {
      const authService = authServiceFactory(mockConfiguration as Configuration, mockStorage);
      const auth = { jwt: 'jwtTokenValue', refresh: 'refreshTokenValue' };

      authService.setAuth(auth);

      expect(mockStorage.setItem).toHaveBeenCalledWith('jwtToken', 'jwtTokenValue');
      expect(mockStorage.setItem).toHaveBeenCalledWith('refreshToken', 'refreshTokenValue');
    });
  });

  describe('authServiceFactory', () => {
    it('should return AuthService with getAuth and setAuth functions', () => {
      const authService = authServiceFactory(mockConfiguration as Configuration, mockStorage);

      expect(authService).toHaveProperty('getAuth');
      expect(authService).toHaveProperty('setAuth');
      expect(typeof authService.getAuth).toBe('function');
      expect(typeof authService.setAuth).toBe('function');
    });
  });
});
