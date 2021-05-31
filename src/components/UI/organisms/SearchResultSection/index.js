import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
    display: ${props => props.visibility ? 'block' : 'none'};
    position: absolute;
    top: 39px;
    left: 0;
    z-index: 10000;
    width: 100%;
    border: 1px solid #888;
    background: #fff;
    box-sizing: border-box;
`;

const ListItem = styled.li`
    padding: 5px 0 5px 10px;
    font-size: 16px;
    line-height: 20px;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
        background: #2a3b4b;
        color: #fff;
    }
`;

class SearchResultSection extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.searchResult.length === 0 &&
            nextProps.searchResult.length === 0) {
            return false;
        }

        return true;
    }

    render() {
        let listItem = null;

        if (this.props.searchResult.length > 0) {
            listItem = this.props.searchResult.map((address, index) => {
                return (
                    <ListItem
                        key={index}
                        data-lat={address.y}
                        data-lng={address.x}
                        onClick={this.props.changeLatLng}>
                        {address.address_name}
                    </ListItem>
                );
            });
        }

        return (
            <List visibility={this.props.searchResult.length > 0 ? 1 : 0}>
                {listItem}
            </List>
        )
    }
}

export default SearchResultSection;
