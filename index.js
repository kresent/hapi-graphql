const hapi = require('hapi');
const mongoose = require('mongoose');
const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');
const schema = require('./graphql/shema');

const Vision = require('vision');
const Inert = require('inert');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');

const Story = require('./models/story');

mongoose.connect('<MONGOOSE DB CONNECTION>');

mongoose.connection.once('open', () => {
  console.log('Connected to db');
});

const server = hapi.server({
  port: 3000,
  host: 'localhost',
});

const init = async () => {
  await server.register({
    plugin: graphiqlHapi,
    options: {
      path: '/grapihql',
      graphiqlOptions: {
        endpointURL: '/graphql',
      },
      route: {
        cors: true,
      },
    },
  });

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: {
        info: {
          title: 'Stories API Swagger',
          version: Pack.version,
        },
      },
    },
  ]);

  await server.register({
    plugin: graphqlHapi,
    options: {
      path: '/graphql',
      graphqlOptions: {
        schema,
      },
      route: {
        cors: true,
      },
    },
  });

  server.route([
    {
      method: 'GET',
      path: '/',
      handler: () => '<h1>Server answer is positive!</h1>',
    },
    {
      method: 'GET',
      path: '/api/v1/stories',
      config: {
        description: 'GET all stories',
        tags: ['api', 'v1'],
      },
      handler: () => Story.find(),
    },
    {
      method: 'POST',
      path: '/api/v1/stories',
      config: {
        description: 'Add a new story',
        tags: ['api', 'v1'],
      },
      handler: (req) => {
        const { name, url, chapters } = req.payload;
        const story = new Story({
          name,
          url,
          chapters,
        });

        return story.save();
      },
    },
  ]);

  await server.start();
  console.log('Hapi server running on port 3000 ')
};

init();
