import React, {memo} from "react";
import styled from "styled-components";
import Heading from "../../atoms/Heading";

const HeaderWrapper = styled.header`
    display: flex;
    align-items: center;
    height: 60px;
    padding: 0 25px;
`;

const Header = memo(() => {
    return (
        <HeaderWrapper>
            <Heading level={1}
                     children={"Today Menu"} />
        </HeaderWrapper>
    );
});