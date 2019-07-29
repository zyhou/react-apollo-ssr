import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { Helmet } from "react-helmet";

const GET_FROMAGE = gql`
  query Fromage($id: String!) {
    fromage(id: $id) {
      id
      name
      image
      detailUrl
    }
  }
`;

const Fromage = ({
  match: {
    params: { id }
  }
}) => (
  <Query query={GET_FROMAGE} variables={{ id }}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return (
        <div className="hero-body">
          <Helmet>
            <title>{data.fromage.name} - Fromage</title>
          </Helmet>
          <div className="container has-text-centered">
            <div className="columns is-vcentered">
              <div className="column is-5">
                <figure className="image is-4by3">
                  <img src={data.fromage.image} alt={data.fromage.name} />
                </figure>
              </div>
              <div className="column is-6 is-offset-1">
                <h1 className="title is-2">{data.fromage.name}</h1>
                <br />
                <p className="has-text-centered">
                  <a
                    className="button is-medium is-info is-outlined"
                    href={data.fromage.detailUrl}
                  >
                    Learn more
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }}
  </Query>
);

export default Fromage;
