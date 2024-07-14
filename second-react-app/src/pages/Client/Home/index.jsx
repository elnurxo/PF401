import { styles } from "./style.js";
import styled from "styled-components";
//classes, styles
import classes from "./index.module.css";

// const Btn = styled.button`
//   border-radius: 6px;
//   border: none;
//   background-color: ${(props) =>
//     props.color == "danger"
//       ? `red`
//       : props.color == "success"
//       ? "green"
//       : props.color == "info"
//       ? "lightblue"
//       : "transparent"};
//   color: black;
//   padding: 12px 20px;
// `;

const Title = styled.h1`
  color: gray;
  font-size: 35px;
`;

const Button = styled.button`
  color: #bf4f74;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #bf4f74;
  border-radius: 3px;
`;

// A new component based on Button, but with some override styles
const TomatoButton = styled(Button)`
  color: tomato;
  border-color: tomato;
`;

const EggPlantButton = styled(Button)`
  color: purple;
  border-color: purple;
`;

const Link = ({ className, children }) => (
  <a className={className}>{children}</a>
);

const StyledLink = styled(Link)`
  color: #bf4f74;
  font-weight: bold;
`;

const Home = () => {
  return (
    <>
      <div style={styles.styledDiv}>Home</div>
      <h2 style={styles.styledHeading}>test title</h2>
      <Button>click me default!</Button>
      <TomatoButton>tomato button</TomatoButton>
      <EggPlantButton>eggplant button</EggPlantButton>
      <Title>Lorem, ipsum dolor.</Title>
      <hr />
      <div>
        <Link>Unstyled, boring Link</Link>
        <br />
        <StyledLink>Styled, exciting Link</StyledLink>
      </div>
      <hr />
      <div className={classes.box}>test</div>
    </>
  );
};

export default Home;
