import styled, { css } from "styled-components";

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 1.6rem;  
  box-sizing: border-box;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      grid-template-columns: 1fr;
      gap: 1.6rem;
    `}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
