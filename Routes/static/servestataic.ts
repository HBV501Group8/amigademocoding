import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';

const staticRoutes = new Hono();

staticRoutes.get('*', serveStatic({ root: './src/static' }));
staticRoutes.get('*', serveStatic({ root: './Video' }));
staticRoutes.get('*', serveStatic({ root: './images' }));
staticRoutes.get('*', serveStatic({ root: './src/views/artifacts/part1' }));
staticRoutes.get('*', serveStatic({ root: './src/views/artifacts/part2' }));
staticRoutes.get('*', serveStatic({ root: './src/views/artifacts/part3' }));
staticRoutes.get(
  '*',
  serveStatic({ root: './src/views/artifacts/part2/styles' })
);
staticRoutes.get('*', serveStatic({ root: './ADF' }));

export default staticRoutes;
