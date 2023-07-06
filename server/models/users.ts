import { getDatabase } from '../lib/database';
import { Pagination, getRange } from '../../shared/pagination';
import { Database } from '../../shared/types';

export const getUsers = async (input: {
  pagination: Pagination,
}) => {
  const db = getDatabase();
  return await db.from('users').select('id, username, created_at').range(...getRange(input.pagination));
}

export type FindUserById = {
  findBy: 'id',
  value: Database['public']['Tables']['users']['Row']['id']
}

export type FindUserByUsername = {
  findBy: 'username',
  value: Database['public']['Tables']['users']['Row']['username'],
}

export const getUser = async (input: (FindUserById | FindUserByUsername) & {
  password?: Database['public']['Tables']['users']['Row']['password'],
}) => {
  const db = getDatabase();
  let query = db.from('users').select('id, username, created_at').eq(input.findBy, input.value).limit(1);
  if (typeof input.password === 'string') {
    query = query.eq('password', input.password);
  }
  const resp = await query;
  return resp;
}

export type NewUser = Pick<Database['public']['Tables']['users']['Insert'], 'password' | 'username'>;

export const isNewUser = (obj: unknown): obj is NewUser => {
  return typeof obj === 'object' && obj !== null && ('password' in obj && 'username' in obj);
}

export const createUser = async (input: NewUser) => {
  const db = getDatabase();
  return await db.from('users').insert(input);
}

export const deleteUser = async (input: FindUserById | FindUserByUsername) => {
  const db = getDatabase();
  return await db.from('users').delete().eq(input.findBy, input.value);
}

export type EditUser = Database['public']['Tables']['users']['Update'];

export const isEditUser = (obj: unknown): obj is EditUser => {
  return typeof obj === 'object' && obj !== null && ('password' in obj || 'username' in obj);
}

export const editUser = async (input: {
  user: FindUserById,
  newUser: EditUser,
}) => {
  const db = getDatabase();
  return await db.from('users').update(input.newUser).eq(input.user.findBy, input.user.value).limit(1);
}