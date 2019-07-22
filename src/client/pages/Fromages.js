import React from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { Helmet } from "react-helmet";

import Title from "../components/Title";

const GET_FROMAGES = gql`
  {
    hello
    fromages {
      id
      name
    }
  }
`;

const Fromages = () => (
  <Query query={GET_FROMAGES}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return (
        <div className="App">
          <Helmet>
            <title>Listing fromages</title>
          </Helmet>
          <h2>{data.hello}</h2>
          {Title()}
          <ol>
            {data.fromages.map(({ id, name }) => (
              <li key={id}>
                <Link to={`/${id}`}>{name}</Link>
              </li>
            ))}
          </ol>
        </div>
      );
    }}
  </Query>
);

export default Fromages;
