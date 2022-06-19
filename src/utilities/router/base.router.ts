import wretch from 'wretch';

export const baseRouter = wretch(import.meta.env.VITE_API_URL);
