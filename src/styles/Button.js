import styled, {css} from 'styled-components';
import {White, Black} from './variable.js';

export const ResetButton = css`
    padding: 0;
    border: 0;
    background: none;
    cursor: pointer;
    box-shadow: rgb(0 0 0 / 15%) 0 2px 2px 0;
`;

export const DefaultButton = css`
    padding: 5px;
    border: 1px solid ${Black};
    border-radius: 3px;
    background: ${White};
    color: ${Black};
    word-break: keep-all;
    cursor: pointer;
    box-shadow: rgb(0 0 0 / 15%) 0 2px 2px 0;
`;

export const PanelButton = styled.button`
    ${ResetButton};
    overflow: hidden;
    position: relative;
    height: 48px;
    border: 1px solid ${Black};
    border-radius: 3px;
    background: ${White};
    line-height: 46px;
`;

export const LargeButton = styled.button`
    ${DefaultButton};
    width: 200px;
    height: 80px;
    font-weight: bold;
    font-size: 22px;
`;