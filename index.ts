import { default as createExpressApp, static as createStaticRouter } from 'express';
import router from './server/main';
import { existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { resolve } from 'path';

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const PUBLIC_PATH = resolve(ROOT, './public');

const app = createExpressApp();
app.use(process.env.API_BASEURL, router);

if (process.argv.includes('--start')) {
  if (!existsSync(PUBLIC_PATH)) {
    throw new Error('The client bundle need to be generated before starting server!');
  }
  app.use(createStaticRouter(PUBLIC_PATH));
  app.listen({
    port: +process.env.PORT,
  }, () => {
    console.log('Application started on :3000');
  });
}

export default app;