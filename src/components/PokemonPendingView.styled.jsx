import styled, { keyframes } from "styled-components";
import { ImSpinner } from "react-icons/im";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled(ImSpinner)`
  margin-right: 10px;
  animation: ${rotate} 2s linear infinite;
`;

const StyledSpinner = styled.div`
  display: flex;
  align-items: center;
`;

export { Spinner, StyledSpinner };
