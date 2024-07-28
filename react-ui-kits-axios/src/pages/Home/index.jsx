import { Helmet } from "react-helmet";
import Container from "../../components/Container";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <Container>
        <h3 style={{ textAlign: "center", marginTop: "200px" }}>
          This is Home Page
        </h3>
      </Container>
    </>
  );
};

export default Home;
