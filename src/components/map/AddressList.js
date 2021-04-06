import React from 'react';
import styled from 'styled-components';

const List = styled.ul`
    display: ${props => props.visibility ? 'block' : 'none'};
    overflow-y: scroll;
    position: absolute;
    top: 29px;
    left: 0;
    z-index: 10000;
    width: 100%;
    max-height: 200px;
    border: 1px solid black;
    background: #fff;
    box-sizing: border-box;
`;

const ListItem = styled.li`
    padding: 5px 0 5px 20px;
    font-size: 16px;
    line-height: 20px;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
        background: #2a3b4b;
        color: #fff;
    }
`;

class AddressList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <List visibility={this.props.addresses.length > 0 ? 1 : 0}>
                { this.props.addresses.map((address, index) => {
                    return (
                        <ListItem
                            key={index}
                            data-lat={address.y}
                            data-lng={address.x}
                            onClick={this.props.setMap}>
                            {address.address_name}
                        </ListItem>
                    )
                })}
            </List>
        )
    }
}

export default AddressList;
