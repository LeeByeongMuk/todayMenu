import React from 'react';
import styled, {css} from "styled-components";
import {Link} from "react-router-dom";

const styles = css`
    padding: 0;
    border: 0;
    background: none;
    cursor: pointer;
    box-shadow: rgb(0 0 0 / 15%) 0 2px 2px 0;
`;

const StyledLink = styled(({
   disabled, transparent, reverse, palette, height, theme, ...props
}) => <Link {...props} />`${styles}`);

const Anchor = styled.a`${styles}`;
const StyledButton = styled.button`${styles}`;

const Button = ({type, ...props}) => {
    const {to, href} = props;

    if (to) {
        return <StyledLink {...props} />
    }

    if (href) {
        return <Anchor {...props} />
    }

    return <StyledButton {...props} type={type} />
};

export default Button;
