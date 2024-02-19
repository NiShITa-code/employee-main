import styled from 'styled-components';
import React from 'react';
const StyledInput = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);

  ${props => props.type === 'checkbox' && `
    width: 0;
    height: 0;
    opacity: 0;
  `}
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 20px; // make the slider smaller
    width: 20px; // make the slider smaller
    left: 2px; // adjust the position of the slider
    bottom: 2px; // adjust the position of the slider
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 50%; // make the slider cylindrical
    
  }
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 40px; // make the switch smaller
  height: 24px; // make the switch smaller
  border-radius: 24px; // make the switch cylindrical

  ${StyledInput}:checked + ${Slider} {
    background-color: #2196F3;
  }

  ${StyledInput}:checked + ${Slider}:before {
    -webkit-transform: translateX(16px); // adjust the position of the slider
    -ms-transform: translateX(16px); // adjust the position of the slider
    transform: translateX(16px); // adjust the position of the slider
  }
`;

const Input = React.forwardRef(({ type, onChange, ...props }, ref) => (
  type === 'checkbox' ? (
    <Switch>
      <StyledInput
        ref={ref}
        type={type}
        onChange={onChange}
        {...props}
      />
      <Slider />
    </Switch>
  ) : (
    <StyledInput
      ref={ref}
      type={type}
      onChange={onChange}
      {...props}
    />
  )
));

export default Input;
