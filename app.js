const express = require("express");
const app = express();
const graphql = require("graphql");
const{graphqlHTTP} = require("express-graphql");
const userData = require("./MOCK_DATA");
const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLString } = graphql;
const schema = require("./Schema/index");

// const userType = new GraphQLObjectType({
//     name: "User",
//     fields: () => ({
//         id: {type: GraphQLInt},
//         name: {type: GraphQLString},
//         email: {type: GraphQLString},
//         password: {type: GraphQLString}
//     })
// })

// const RootQuery = new GraphQLObjectType({
//     name: "RootQueryType",
//     fields: {
//         getAllUsers: {
//             type: new GraphQLList(userType),
//             args: { id: {type: GraphQLInt}},
//             resolve(parent, args) {
//                 return userData;
//             }
//         }
//     }
// });
// const Mutation = new GraphQLObjectType({
//     name: "Mutation",
//     fields: {
//         createUser: {
//             type: userType,
//             args: {
//                 //id: {type: GraphQLInt},
//                 name: {type: GraphQLString},
//                 email: {type: GraphQLString},
//                 password: {type: GraphQLString}
//             },
//             resolve(parent, args) {
//                 userData.push({id: userData.length + 1, name: args.name, email: args.email, password: args.password})
//                 return args;
//             }
//         }
//     }
// });

//const schema = new GraphQLSchema({query: RootQuery, mutation: Mutation});

app.use("/graphql", graphqlHTTP({schema, graphiql: true}));

app.listen(4000);