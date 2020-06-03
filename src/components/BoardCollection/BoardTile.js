import React from 'react';
import styled from 'styled-components';
import FadeIn from 'react-fade-in';

const Tile = styled.div`
    display: flex;
    height: 80px;
    width: 160px;
    border-radius: 5px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #fff;
    background-color: #519839;
    line-height: 20px;
    cursor: pointer;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 16px;
    font-weight: 500;
`;

export default function BoardTile(props) {
    return (
        <FadeIn>
            <Tile onClick={props.onClick}>
                {props.title}
            </Tile>
        </FadeIn>
    )
}
