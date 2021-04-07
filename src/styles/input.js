import { BorderColor, FontColor } from './variable.js';
import styled from 'styled-components';

export const Input = styled.input`
    width: 100%;
    padding-left: 15px;
    border: 1px solid ${BorderColor};
    font-size: 16px;
    color: ${FontColor};
    box-sizing: border-box;
    outline: none;
`;
