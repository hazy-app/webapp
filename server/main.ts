import { Router as createExpressRouter, json } from 'express';
import { handleCreateUser, handleDeleteUser, handleEditUser, handleGetUser, handleGetUsers } from './controllers/users';

const router = createExpressRouter();

router.use(json());

router.get('/users', handleGetUsers);
router.post('/users', handleCreateUser);
router.get('/users/:user', handleGetUser);
router.delete('/users/:user', handleDeleteUser);
router.patch('/users/:user', handleEditUser);

export default router;