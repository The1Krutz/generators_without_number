import supertest from 'supertest';
import insertUrlParams from 'inserturlparams';
import { parseJson, customDeepCompare } from 'jet-validators/utils';

import app from '@src/server';

import { UserRepo } from '@src/repos/UserRepo';
import { User, IUser } from '@src/models/User';
import { USER_NOT_FOUND_ERR } from '@src/services/UserService';

import { HttpStatusCodes } from '@src/common/HttpStatusCodes';
import { ValidationErr } from '@src/common/route-errors';

import Paths from 'spec/support/Paths';
import { cleanDatabase, IValidationErr, TRes } from 'spec/support';
import { isObject } from 'jet-validators';

/**
 * Variables
 */

// Dummy users for GET req
const DB_USERS = [
  User.new({ name: 'Sean Maxwell', email: 'sean.maxwell@gmail.com' }),
  User.new({ name: 'John Smith', email: 'john.smith@gmail.com' }),
  User.new({ name: 'Gordan Freeman', email: 'gordan.freeman@gmail.com' }),
];

// Don't compare "id" and "created" cause those are set dynamically by the
// database
const compareUserArrays = customDeepCompare({
  onlyCompareProps: ['name', 'email'],
});

/**
 * Tests
 * IMPORTANT: Following TypeScript best practices, we test all scenarios that can be triggered by a user under normal
 * circumstances. Not all theoretically scenarios (i.e. a failed database connection).
 */
describe('UserRouter', () => {
  const agent = supertest.agent(app);
  let dbUsers: IUser[] = [];

  // Run before all tests
  beforeEach(async () => {
    await cleanDatabase();
    dbUsers = await UserRepo.insertMult(DB_USERS);
  });

  // Get all users
  describe(`"GET:${Paths.User.Get}"`, () => {
    // Success
    it(
      'should return a JSON object with all the users and a status code ' +
        `of "${HttpStatusCodes.OK}" if the request was successful.`,
      (done) => {
        agent.get(Paths.User.Get).end((_, res: TRes<{ users: IUser[] }>) => {
          expect(res.status).toBe(HttpStatusCodes.OK);
          expect(compareUserArrays(res.body.users, DB_USERS)).toBeTruthy();
          done();
        });
      }
    );
  });

  // Test add user
  describe(`"POST:${Paths.User.Add}"`, () => {
    // Test add user success
    it(
      `should return a status code of "${HttpStatusCodes.CREATED}" if the ` +
        'request was successful.',
      (done) => {
        const user = User.new({ name: 'a', email: 'a@a.com' });
        agent
          .post(Paths.User.Add)
          .send({ user })
          .end((_, res) => {
            expect(res.status).toBe(HttpStatusCodes.CREATED);
            done();
          });
      }
    );

    // Missing param
    it(
      'should return a JSON object with an error message of and a status ' +
        `code of "${HttpStatusCodes.BAD_REQUEST}" if the user param was ` +
        'missing.',
      (done) => {
        agent
          .post(Paths.User.Add)
          .send({ user: null })
          .end((_, res: TRes) => {
            expect(res.status).toBe(HttpStatusCodes.BAD_REQUEST);
            const errorObj = parseJson<IValidationErr>(res.body.error),
              parseErr = errorObj.parameters[0];
            expect(errorObj.message).toBe(ValidationErr.MSG);
            expect(isObject(parseErr) && parseErr.prop === 'user').toBeTruthy();
            done();
          });
      }
    );
  });

  // Update users
  describe(`"PUT:${Paths.User.Update}"`, () => {
    // Success
    it(
      `should return a status code of "${HttpStatusCodes.OK}" if the ` +
        'request was successful.',
      (done) => {
        const user = DB_USERS[0];
        user.name = 'Bill';
        agent
          .put(Paths.User.Update)
          .send({ user })
          .end((_, res) => {
            expect(res.status).toBe(HttpStatusCodes.OK);
            done();
          });
      }
    );

    // Param missing
    it(
      'should return a JSON object with an error message and a status code ' +
        `of "${HttpStatusCodes.BAD_REQUEST}" if the user param was missing`,
      (done) => {
        agent
          .put(Paths.User.Update)
          .send({ user: null })
          .end((_, res: TRes) => {
            expect(res.status).toBe(HttpStatusCodes.BAD_REQUEST);
            const errorObj = parseJson<IValidationErr>(res.body.error),
              parseErr = errorObj.parameters[0];
            expect(errorObj.message).toBe(ValidationErr.MSG);
            expect(isObject(parseErr) && parseErr.prop === 'user').toBeTruthy();
            done();
          });
      }
    );

    // User not found
    it(
      'should return a JSON object with the error message of ' +
        `"${USER_NOT_FOUND_ERR}" and a status code of ` +
        `"${HttpStatusCodes.NOT_FOUND}" if the id was not found.`,
      (done) => {
        const user = User.new({ id: 4, name: 'a', email: 'a@a.com' });
        agent
          .put(Paths.User.Update)
          .send({ user })
          .end((_, res: TRes) => {
            expect(res.status).toBe(HttpStatusCodes.NOT_FOUND);
            expect(res.body.error).toBe(USER_NOT_FOUND_ERR);
            done();
          });
      }
    );
  });

  // Delete User
  describe(`"DELETE:${Paths.User.Delete}"`, () => {
    const getPath = (id: number) => insertUrlParams(Paths.User.Delete, { id });

    // Success
    it(
      `should return a status code of "${HttpStatusCodes.OK}" if the ` +
        'request was successful.',
      (done) => {
        const id = dbUsers[0].id;
        agent.delete(getPath(id)).end((_, res) => {
          expect(res.status).toBe(HttpStatusCodes.OK);
          done();
        });
      }
    );

    // User not found
    it(
      'should return a JSON object with the error message of ' +
        `"${USER_NOT_FOUND_ERR}" and a status code of ` +
        `"${HttpStatusCodes.NOT_FOUND}" if the id was not found.`,
      (done) => {
        agent.delete(getPath(-1)).end((_, res: TRes) => {
          expect(res.status).toBe(HttpStatusCodes.NOT_FOUND);
          expect(res.body.error).toBe(USER_NOT_FOUND_ERR);
          done();
        });
      }
    );
  });
});
