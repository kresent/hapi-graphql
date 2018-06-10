const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLList} = graphql;

const StoryType = new GraphQLObjectType({
  name: 'story',
  fields: () => ({
    id: { type: GraphQLString },
    url: { type: GraphQLString },
    name: { type: GraphQLString },
    chapters: { type: GraphQLList(graphql.GraphQLString) },
  }),
});

module.exports = StoryType;
