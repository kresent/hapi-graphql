const graphql = require('graphql');
const StoryType = require('./storyType');
const Story = require('../models/story');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
} = graphql;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    story: {
      type: StoryType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return Story.findById(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: RootQuery });
