import styled, {css} from 'styled-components';
import {BorderColor, White, Black} from './variable.js';

export const ButtonDefault = css`
    padding: 5px;
    border: 2px solid ${BorderColor};
    border-radius: 8px;
    background: ${White};
    color: ${Black};
    word-break: keep-all;
    cursor: pointer;
`;