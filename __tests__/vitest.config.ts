import nodeFetch from 'node-fetch';
import { setupServer } from 'msw/node';

global.fetch = nodeFetch as Window['fetch'];

export const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: 'error'}));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
