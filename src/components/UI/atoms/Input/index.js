import React, {memo} from "react";
import styled from 'styled-components';
import {FontColor} from "../../../constant/Variable";

const styledInput = styled.input`
    padding-left: 10px;
    border: 0;
    font-size: 16px;
    color: ${FontColor};
    box-sizing: border-box;
    outline: none;
`;

const Input = memo(({...props}) => {
    return (
        <styledInput {...props} />
    );
});

export default Input;