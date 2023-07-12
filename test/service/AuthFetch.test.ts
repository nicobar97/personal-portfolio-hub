import { Right, Left, Maybe, Just } from 'purify-ts';
import { AuthToken } from '../../src/model/Authentication';
import { AuthError, AuthFetchError } from '../../src/model/errors';
import { authFetchFactory } from '../../src/service/AuthFetch';
import { AuthService } from '../../src/service/AuthService';
import { vitest } from 'vitest';

describe('authFetch', () => {
  describe('fetchWithAuth', () => {
    const mockAuthToken: AuthToken = {
      jwt: 'mockJwtToken',
      refresh: 'mockRefreshToken',
    };

    const mockMapper = (state: unknown) => Right(state);

    const mockAuthService: AuthService = {
      getAuth: vitest.fn(() => Just(mockAuthToken)),
      setAuth: vitest.fn(),
    };

    const authError: AuthError = { type: 'auth_error', code: '0', message: 'Missing auth token' };

    const badMockAuthService: AuthService = {
      getAuth: vitest.fn(() => Maybe.empty()),
      setAuth: vitest.fn(),
    };

    const authFetch = authFetchFactory(mockAuthService);
    const badAuthFetch = authFetchFactory(badMockAuthService);

    it('should return EitherAsync with the fetch result if authentication is successful', async () => {
      const mockUrl = 'https://example.com/api';
      const mockConfig: RequestInit = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const mockResponse = { data: 'example response' };
      const mockFetchPromise = Promise.resolve({
        json: () => Promise.resolve(mockResponse),
        status: 200,
      });
      global.fetch = vitest.fn().mockImplementation(() => mockFetchPromise);

      const result = await authFetch.fetch(mockUrl, mockConfig, mockMapper).run();

      expect(result).toEqual(Right(mockResponse));
      expect(global.fetch).toHaveBeenCalledWith(mockUrl, {
        ...mockConfig,
        headers: {
          ...mockConfig.headers,
          Authorization: `Bearer ${mockAuthToken.jwt}`,
        },
      });
      expect(mockAuthService.getAuth).toHaveBeenCalled();
    });

    it('should return EitherAsync with an AuthError if authentication fails', async () => {
      const mockUrl = 'https://example.com/api';
      const mockConfig: RequestInit = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const result = await badAuthFetch.fetch(mockUrl, mockConfig, mockMapper).run();

      expect(result).toEqual(Left(authError));
    });

    it('should return EitherAsync with an AuthFetchError if an error occurs during the fetch', async () => {
      const mockUrl = 'https://example.com/api';
      const mockConfig: RequestInit = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // Mock the global fetch function to throw an error
      const mockErrorMessage = 'Network error';
      global.fetch = vitest
        .fn()
        .mockImplementation(() => Promise.reject(new Error(mockErrorMessage)));

      const expectedError: AuthFetchError = {
        type: 'auth_fetch_error',
        code: '0',
        message: mockErrorMessage,
      };

      const result = await authFetch.fetch(mockUrl, mockConfig, mockMapper).run();

      expect(result).toEqual(Left(expectedError));
      expect(global.fetch).toHaveBeenCalledWith(mockUrl, {
        ...mockConfig,
        headers: {
          ...mockConfig.headers,
          Authorization: `Bearer ${mockAuthToken.jwt}`,
        },
      });
      expect(mockAuthService.getAuth).toHaveBeenCalled();
    });
  });
});
