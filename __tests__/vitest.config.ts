import nodeFetch from 'node-fetch';

global.fetch = nodeFetch as Window['fetch'];
