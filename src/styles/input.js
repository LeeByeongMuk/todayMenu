import {BorderColor, FontColor} from './variable.js';
import styled from 'styled-components';

export const Input = styled.input`
    width: 100%;
    padding: 15px 0;
    border: 1px solid ${BorderColor};
    font-size: 16px;
    color: ${FontColor};
    box-sizing: border-box;
    outline: none;
`;

export const ResetInput = styled.input`
    padding-left: 10px;
    border: 0;
    font-size: 16px;
    color: ${FontColor};
    box-sizing: border-box;
    outline: none;
`;