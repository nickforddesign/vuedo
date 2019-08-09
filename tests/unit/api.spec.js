const UserController = require('../../src/services/api/mocks/controllers/user');

const userController = new UserController();

let token;

describe('Users Controller', () => {
  it('userController.register - missing params', () => {
    expect(() => {
      userController.register({
        body: {
          user: {
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jdoe@gmail.com'
          }
        }
      });
    })
      .toThrow('Missing params: password');
  });

  it('userController.register', () => {
    const response = userController.register({
      body: {
        user: {
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jdoe@gmail.com',
          password: 'hunter2'
        }
      }
    });
    expect(response.message)
      .toBe('User jdoe@gmail.com was succesfully created.');
    expect(response.user.email)
      .toBe('jdoe@gmail.com');
    expect(response.user.id)
      .toBe(1);
  });

  it('userController.login', () => {
    expect(() => {
      userController.login({
        body: {
          user: {
            email: 'jdoe@gmail.com',
            password: 'hunter'
          }
        }
      });
    })
      .toThrow('Invalid credentials');
  });

  it('userController.login', () => {
    const response = userController.login({
      body: {
        user: {
          email: 'jdoe@gmail.com',
          password: 'hunter2'
        }
      }
    });
    token = response.user.token;
    expect(response.message)
      .toBe('Logged in successfully');
    expect(response.user.email)
      .toBe('jdoe@gmail.com');
    expect(typeof response.user.token)
      .toBe('string');
  });

  it('userController.refresh', () => {
    const response = userController.refresh({
      header: () => token
    });
    expect(response.message)
      .toBe('Refreshed session');
    expect(response.user.email)
      .toBe('jdoe@gmail.com');
    expect(typeof response.user.token)
      .toBe('string');
  });
});
