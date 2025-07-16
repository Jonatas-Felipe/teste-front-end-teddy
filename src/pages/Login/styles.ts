import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  .input {
    height: 60px;

    input {
      font-size: 24px;
    }
  }

  .btn-submit {
    background-color: #ec6724;
    color: #fff;
    transition-duration: 0.3s;
    border-radius: 4px;
    height: 60px;

    :hover {
      background-color: ${darken(0.05, '#EC6724')} !important;
    }
  }
`;
