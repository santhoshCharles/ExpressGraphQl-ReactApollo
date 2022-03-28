import logo from './logo.svg';
import './App.css';
import { ApolloClient,
  ApolloLink,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from, gql } from "@apollo/client";
  import { onError } from "@apollo/client/link/error";
  import CreateUser from "./Component/CreateUser";
  import GetUsers from "./Component/GetUsers";
  import { setContext } from "@apollo/client/link/context";


  const typeDefs = gql`
    extend type User {
      age: Int
    }
  `

  const reslover = {
    User: {
      age() {
        return 40
      }
    }
  }

  const errorLink = onError(({ graphqlError, networkError }) => {
    if(graphqlError) {
      //graphqlError.map
      console.log(graphqlError);
    }
  })

  // const delay = setContext({

  // })

  const httpLink = new HttpLink({ uri:  "http://localhost:4000/graphql"});
  const delay = setContext(
    request => new Promise((reslove, reject) => {
      setTimeout(()=>{
        reslove();
      }, 800)
    }))

  const link = ApolloLink.from([
    delay,
    httpLink
  ])

  const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
    reslover,
    typeDefs
  })

function App() {
  return (
    <ApolloProvider client={client}  >
      <CreateUser/>
      {/* <GetUsers/> */}
    </ApolloProvider>
  );
}

export default App;
