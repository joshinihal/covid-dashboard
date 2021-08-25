import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import Patients from "./components/Patients";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="container">
        <h4 className="logo">COVID DASHBOARD</h4>
        <Patients></Patients>
      </div>
    </ApolloProvider>
  );
}

export default App;
