import { rest } from 'msw';
import { setupServer } from 'msw/node';

export const apiGetRequest = (url: string, response: any) => {
  const restHandlers = [
    rest.get(`${import.meta.env.VITE_API_URL}/${url}`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(response));
    })
  ];

  const server = setupServer(...restHandlers);

  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());
};
