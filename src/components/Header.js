import React, {memo} from "react";
import styled from "styled-components";
import {PageColor, White} from "../styles/variable";

const HeaderWrapper = styled.header`
    display: flex;
    align-items: center;
    height: 60px;
    padding: 0 25px;
    background: ${PageColor};
`;

const Title = styled.h1`
    font-weight: bold;
    font-size: 24px;
    color: ${White}
`;

const Header = memo(() => {
    return (
        <HeaderWrapper>
            <Title>Today Menu</Title>
        </HeaderWrapper>
    );
});

export default Header;
