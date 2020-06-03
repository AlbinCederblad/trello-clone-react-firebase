import React, { Component } from 'react'
import styled from 'styled-components';


const Menu = styled.div`
    z-index: 10;
    overflow-x: hidden;
    position: absolute;
    top: 45px;
    display: block;
    right: 0%;
    height: 100%;

    transition: 5s all !important;
    
`;
export default class BoardMenu extends Component {

    render() {
        return (
            <Menu>

            </Menu>
        )
    }
}
