# VUEDO

Simple vuetify + magnet app with login, registration, and todo management.

The express API, though feature complete, is an example of a service mock. This pattern allows a
front end application to be developed in parallel to the back end, without any direct dependency.
The express API follows a RESTful pattern, and talks to a mock database (in memory only, will reset)
if the server is restarted.

## Project setup

Install dependencies:

```bash
npm install
```

Run the front and back ends:

```bash
npm start
```

Run the unit tests:

```bash
npm test
```

### Important Libraries used

- [Vue CLI 3.x](https://cli.vuejs.org/)
- [Vuetify 2.0.0](https://github.com/vuetifyjs/vuetify/)
- [@thrivehive/magnet](https://github.com/thrivehive/magnet)
- [@thrivehive/eslint-config-vue](https://github.com/thrivehive/eslint-configs)
- [Express](https://expressjs.com/)
- [Jest](https://jestjs.io/)

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
