import styled, { css } from "styled-components";

// const test = css`
//   text-align: center;
//   ${10 > 5 && "background-color: yellow"}
// `;

const Heading = styled.h1`
  color: #3f51b5;
  line-height: 1.4;
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: bold;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: semi-bold;
    `}
    
    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: medium;
    `}
    ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 1.5rem;
      font-weight: regular;
      text-align: center;
    `}
    
  line-height: 1.4;
`;

export default Heading;
