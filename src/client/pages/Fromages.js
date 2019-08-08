import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Helmet } from "react-helmet";
import styled from "@emotion/styled";

const GET_FROMAGES = gql`
  {
    description
    fromages {
      id
      name
      image
    }
  }
`;

const Box = styled.div`
  border-radius: 0;
`;

const Card = styled.div`
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);
  animation: flyintoright 0.4s backwards;
  border-radius: 4px;
  margin: 10px;
  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 10px 16px rgba(0, 0, 0, 0.13), 0 6px 6px rgba(0, 0, 0, 0.19);
  }
`;

const Link = styled.a`
  color: hsl(192, 17%, 99%);
`;

const Fromages = () => {
  const { loading, error, data } = useQuery(GET_FROMAGES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <React.Fragment>
      <Helmet>
        <title>Listing fromages</title>
      </Helmet>
      <Box className="box">
        <p className="has-text-centered">
          <span className="tag is-primary">
            <Link href="https://github.com/zyhou/react-apollo-ssr">Github</Link>
          </span>{" "}
          {data.description}
        </p>
      </Box>

      <section className="container">
        <div className="columns is-multiline">
          {data.fromages.map(({ id, name, image }) => (
            <div className="column is-4" key={id}>
              <LinkRouter to={`/${id}`}>
                <Card className="card">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img src={image} alt={name} />
                    </figure>
                  </div>
                  <div className="card-content">
                    <div className="content">
                      <h4>{name}</h4>
                    </div>
                  </div>
                </Card>
              </LinkRouter>
            </div>
          ))}
        </div>
      </section>
    </React.Fragment>
  );
};

export default Fromages;
