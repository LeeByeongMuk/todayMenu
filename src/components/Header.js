import styled from 'styled-components';

const HeaderWrapper = styled.header`
    display: flex;
    align-items: center;
    height: 60px;
    padding: 0 25px;
    background: #2a3b4b;
`;

const Title = styled.h1`
    font-weight: bold;
    font-size: 24px;
    color: #ffffff
`;

function Header() {
    return (
        <HeaderWrapper>
            <Title>Today Menu</Title>
        </HeaderWrapper>
    );
}

export default Header;
