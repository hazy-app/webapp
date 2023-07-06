import { getPaginationFromQuery } from '../../shared/pagination';
import { RequestHandler } from 'express';
import { FindUserById, FindUserByUsername, createUser, deleteUser, editUser, getUser, getUsers, isEditUser, isNewUser } from '../models/users';

export const handleGetUsers: RequestHandler = async (req, res) => {
  const pagination = getPaginationFromQuery(req.query);
  const resp = await getUsers({
    pagination,
  });
  res.json(resp);
  return resp;
};

export const handleCreateUser: RequestHandler = async (req, res) => {
  if (!isNewUser(req.body)) {
    res.sendStatus(400);
    return null;
  }

  const resp = await createUser(req.body);
  res.json(resp);
  return resp;
}

export const handleEditUser: RequestHandler = async (req, res) => {
  if (!isEditUser(req.body)) {
    res.sendStatus(400);
    return null;
  }

  const resp = await editUser({
    newUser: req.body,
    user: {
      findBy: 'id',
      value: +req.params.user,
    },
  });

  res.json(resp);
  return resp;
}

export const handleDeleteUser: RequestHandler = async (req, res) => {
  const resp = await deleteUser({
    findBy: 'id',
    value: +req.params.user,
  });
  
  res.json(resp);
  return resp;
}

export const handleGetUser: RequestHandler = async (req, res) => {
  let finderObj: FindUserById | FindUserByUsername;
  const findBy = req.params.user.startsWith('@') ? 'username' : 'id';
  if (findBy === 'username') {
    finderObj = {
      findBy,
      value: req.params.user.substring(1, 0),
    };
  } else {
    finderObj = {
      findBy,
      value: +req.params.user,
    };
  }

  const resp = await getUser(finderObj);

  res.json(resp);
  return resp;
}