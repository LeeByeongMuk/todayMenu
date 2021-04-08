import React from 'react';
import styled from 'styled-components';
import {PageColor, White, BorderColor} from '../../styles/variable.js';

const List = styled.ul`
    display: ${props => props.visibility ? 'block' : 'none'};
    overflow-y: scroll;
    position: absolute;
    top: 29px;
    left: 0;
    z-index: 10000;
    width: 100%;
    max-height: 200px;
    border: 1px solid ${BorderColor};
    background: ${White};
    box-sizing: border-box;
`;

const ListItem = styled.li`
    padding: 5px 0 5px 20px;
    font-size: 16px;
    line-height: 20px;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
        background: ${PageColor};
        color: ${White};
    }
`;

class AddressList extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.addresses.length === 0 &&
            nextProps.addresses.length === 0) {
            return false;
        }

        return true;
    }

    render() {
        let listItem = null;

        if (this.props.addresses.length > 0) {
            listItem = this.props.addresses.map((address, index) => {
                return (
                    <ListItem
                        key={index}
                        data-lat={address.y}
                        data-lng={address.x}
                        onClick={this.props.setMap}>
                        {address.address_name}
                    </ListItem>
                );
            });
        }

        return (
            <List visibility={this.props.addresses.length > 0 ? 1 : 0}>
                {listItem}
            </List>
        )
    }
}

export default AddressList;
