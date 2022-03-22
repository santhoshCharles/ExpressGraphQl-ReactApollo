const graphql = require("graphql");
const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLString } = graphql;
const userType = require("./Type/TypeDef");
const userData = require("../MOCK_DATA");

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getAllUsers: {
            type: new GraphQLList(userType),
            args: { id: {type: GraphQLInt}},
            resolve(parent, args) {
                return userData;
            }
        }
    }
});
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: {
            type: userType,
            args: {
                //id: {type: GraphQLInt},
                name: {type: GraphQLString},
                email: {type: GraphQLString},
                password: {type: GraphQLString}
            },
            resolve(parent, args) {
                userData.push({id: userData.length + 1, name: args.name, email: args.email, password: args.password})
                return args;
            }
        }
    }
});

//const Schema = new GraphQLSchema({query: RootQuery, mutation: Mutation});

module.exports = new GraphQLSchema({query: RootQuery, mutation: Mutation});;
