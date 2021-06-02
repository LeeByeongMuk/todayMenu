import React, {memo} from "react";
import styled from "styled-components";

const StyledTooltip = styled.div`
    position: absolute;
    top: 50%;
    right: 115%;
    width: auto;
    margin-top: -12px; // TODO:
    padding: 5px;
    border-radius: 1px;
    background-color: black;
    font-size: 13px;
    color: #fff;
    text-align: center;
    white-space: nowrap; // TODO:
    
    &::after {
        position: absolute;
        top: 50%;
        left: 100%;
        margin-top: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent transparent black;
        content: '';
    }
`;

const Tooltip = memo(({text}) => {
    return (
        <StyledTooltip>
            <span>{text}</span>
        </StyledTooltip>
    );
});

export default Tooltip;