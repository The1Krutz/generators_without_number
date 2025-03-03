import { IUser } from '@src/models/User';
import { getRandomInt } from '@src/util/misc';

import { MockOrm } from './MockOrm';

/**
 * Functions
 */

/**
 * Get one user.
 */
async function getOne(email: string): Promise<IUser | null> {
  const db = await MockOrm.openDb();
  for (const user of db.users) {
    if (user.email === email) {
      return user;
    }
  }
  return null;
}

/**
 * See if a user with the given id exists.
 */
async function persists(id: number): Promise<boolean> {
  const db = await MockOrm.openDb();
  for (const user of db.users) {
    if (user.id === id) {
      return true;
    }
  }
  return false;
}

/**
 * Get all users.
 */
async function getAll(): Promise<IUser[]> {
  const db = await MockOrm.openDb();
  return db.users;
}

/**
 * Add one user.
 */
async function add(user: IUser): Promise<void> {
  const db = await MockOrm.openDb();
  user.id = getRandomInt();
  db.users.push(user);
  return MockOrm.saveDb(db);
}

/**
 * Update a user.
 */
async function update(user: IUser): Promise<void> {
  const db = await MockOrm.openDb();
  for (let i = 0; i < db.users.length; i++) {
    if (db.users[i].id === user.id) {
      const dbUser = db.users[i];
      db.users[i] = {
        ...dbUser,
        name: user.name,
        email: user.email,
      };
      return MockOrm.saveDb(db);
    }
  }
}

/**
 * Delete one user.
 */
async function delete_(id: number): Promise<void> {
  const db = await MockOrm.openDb();
  for (let i = 0; i < db.users.length; i++) {
    if (db.users[i].id === id) {
      db.users.splice(i, 1);
      return MockOrm.saveDb(db);
    }
  }
}

// **** Unit-Tests Only **** //

/**
 * Delete every user record.
 */
async function deleteAllUsers(): Promise<void> {
  const db = await MockOrm.openDb();
  db.users = [];
  return MockOrm.saveDb(db);
}

/**
 * Insert multiple users. Can't do multiple at once cause using a plain file
 * for nmow.
 */
async function insertMult(users: IUser[] | readonly IUser[]): Promise<IUser[]> {
  const db = await MockOrm.openDb(),
    usersF = [...users];
  for (const user of usersF) {
    user.id = getRandomInt();
    user.created = new Date();
  }
  db.users = [...db.users, ...users];
  await MockOrm.saveDb(db);
  return usersF;
}

/**
 * Export default
 */
export const UserRepo = {
  getOne,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
  deleteAllUsers,
  insertMult,
};
