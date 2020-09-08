import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react';
import FadeIn from 'react-fade-in';
import { useDispatch } from "react-redux";
import styled from 'styled-components';

import { deleteBoard } from '../../actions';

const TileOptions = styled.div`
    position: absolute;
    top: 0px;
    right: 0px;
    visibility: hidden;
    display: inline-block;
    margin: 5px;
    border-radius: .3rem;
    padding: 0.4rem 0.6rem 0.4rem 0.6rem;
    color: #172b4d;
    opacity: 0.4;
    
    &:hover {
        background-color: #e1e2e6;
    }
`;
const Tile = styled.div`
    position: relative;
    display: flex;
    height: 80px;
    width: 160px;
    border-radius: 5px;
    flex-direction: column;
    align-items: left;
    text-align: left;
    color: #fff;
    background-color: #519839;
    line-height: 20px;
    cursor: pointer;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 16px;
    font-weight: 500;

    &:hover ${TileOptions} {
        visibility: visible;
    }
`;

const TileText = styled.div`
    margin-left: 10px;
    margin-top: 10px;
`;

export default function BoardTile(props) {

    const dispatch = useDispatch();

    const handleDeleteBoard = (e) => {
        dispatch(deleteBoard(props.boardId));
    }

    return (
        <FadeIn>
            <Tile className={"outer"} onClick={props.onClick}>
                <TileOptions className={"inner"} onMouseDown={handleDeleteBoard}>
                    <FontAwesomeIcon className={"inner"} icon={faTrash} />
                </TileOptions>
                <TileText >{props.title}</TileText>
            </Tile>
        </FadeIn>
    )
}
