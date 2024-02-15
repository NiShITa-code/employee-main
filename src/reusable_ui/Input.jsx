import styled from "styled-components";
import React from "react";
const StyledInput = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
`;
const Input = React.forwardRef(({ type, onChange, ...props }, ref) => (
  <StyledInput
    ref={ref}
    type={type}
    onChange={onChange}
    {...props}
  />
));

export default Input;
