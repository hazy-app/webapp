import { Router as createExpressRouter, json } from 'express';
import { getDatabase } from './lib/database';

const router = createExpressRouter();

router.use(json());

router.get('/users', async (_req, res) => {
  const db = getDatabase();
  const users = await db.from('users').select('*');
  res.json(users.data);
});

router.post('/users', async (req, res) => {
  const db = getDatabase();
  const body = req.body;
  const user = await db.from('users').insert(body);
  res.json(user.data);
});

router.delete('/users/:user_id', async (req, res) => {
  const db = getDatabase();
  const user = await db.from('users').delete().eq('id', req.params.user_id);
  res.json(user.data);
});

export default router;