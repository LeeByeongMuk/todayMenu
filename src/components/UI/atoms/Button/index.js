import React, {memo} from 'react';
import styled, {css} from "styled-components";

const styles = css`
    padding: 0;
    border: 1px solid #888;
    background: #fff;
    cursor: pointer;
    box-shadow: rgb(0 0 0 / 15%) 0 2px 2px 0;
`;

const StyledButton = styled.button`${styles}`;

const Button = memo(({children, onClick, ...props}) => {
    return (
        <StyledButton {...props}
                      onClick={onClick}>
            {children}
        </StyledButton>
    );
});

export default Button;
