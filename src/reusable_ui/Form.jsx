import styled, { css } from "styled-components";

const Form = styled.form`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 1.4rem 2rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-lg); // Increased border-radius
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); // Added box-shadow
      transition: all 0.3s ease; // Added transition
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
      bcakground-color: var(--color-grey-0);
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); // Added box-shadow
      transition: all 0.3s ease; // Added transition
    `}
    
  overflow: hidden;
  font-size: 1rem;
`;
export default Form;