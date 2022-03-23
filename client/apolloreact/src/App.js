import logo from './logo.svg';
import './App.css';
import { ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from, } from "@apollo/client";
  import { onError } from "@apollo/client/link/error";
  import CreateUser from "./Component/CreateUser";
  import GetUsers from "./Component/GetUsers";
  import { setContext } from "@apollo/client/link/context";

  const errorLink = onError(({ graphqlError, networkError }) => {
    if(graphqlError) {
      //graphqlError.map
      console.log(graphqlError);
    }
  })

  // const delay = setContext({

  // })

  const link = from([
    errorLink,
    new HttpLink({ uri:  "http://localhost:4000/graphql"})
  ])

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link
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
