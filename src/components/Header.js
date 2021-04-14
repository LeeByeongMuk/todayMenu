import styled from 'styled-components';
import {PageColor, White} from '../styles/variable.js';

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

function Header() {
    return (
        <HeaderWrapper>
            <Title>Today Menu</Title>
        </HeaderWrapper>
    );
}

export default Header;
