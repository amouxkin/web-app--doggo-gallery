import { rest } from 'msw';
import { beforeAll, beforeEach } from 'vitest';
import { server } from '../vitest.config';



export const apiGetRequest = (url: string, response: any) => {
  beforeEach(() =>
    server.use(
      rest.get(`${import.meta.env.VITE_API_URL}/${url}`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(response));
      })
    )
  );
};
