'use strict';
const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@metropolia.fi',
    password: '$2b$12$HEzo0dvH1EwrQxINKf5/ieedrVBq0XIpwIuEftarLObHgI16fRqem',
  },
  {
    id: '2',
    name: 'Jane Doez',
    email: 'jane@metropolia.fi',
    password: '$2b$12$hy64nNkEl8iWRXX.6eEm0ezjKK7lY8JTCfV69/IYrZUwMul8.3itC',
  },
];

const getUser = (id) => {
  const user = users.filter((usr) => {
    if (usr.id === id) {
      delete usr.password;
      return usr;
    }
  });
  return user[0];
};

const getUserLogin = (email) => {
  const user = users.filter((usr) => {
    if (usr.email === email) {
      return usr;
    }
  });
  return user[0];
};

module.exports = {
  users,
  getUser,
  getUserLogin,
};
