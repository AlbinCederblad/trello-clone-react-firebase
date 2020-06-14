import React, { Component } from 'react'

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BoardTile from './BoardTile';
import CreateBoardModal from './CreateBoardModal';

import { connect } from 'react-redux';
import { loadUserBoards } from '../../actions/';
import { loadBoard } from '../../actions/board';

import FadeIn from 'react-fade-in';

import styled from 'styled-components';

const Collection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 70vh;
`;

const Title = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px;
    font-size: 16px;
    font-weight: 700;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: #172b4d;
`;

const Spacing = styled.div`
    margin: 5px;
`;

const Boards = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 600px;
    margin-bottom: 10px;
`;

class BoardCollection extends Component {
    // I had to make this a class Component otherwise i wouldnt be able to call loadUserBoards
    // without it getting stuck in an endless re-render loop.
    constructor(props) {
        super(props);
        this.handleClickBoard = this.handleClickBoard.bind(this);
    };
    componentDidMount() {
        this.props.loadUserBoards();
    };

    handleClickBoard(uid) {
        const { history } = this.props;
        this.props.loadBoard(uid);
        history.push("/board/" + uid);
    };

    render() {
        const boards = this.props.boards;
        return (
            <FadeIn>
                <Collection>
                    <Title>
                        <AccountCircleIcon />
                        <Spacing></Spacing>
                        <p>Your boards</p>
                    </Title>
                    <Boards>
                        {
                            boards.map((board, index) => (
                                <Spacing key={board.uid}>
                                    <BoardTile onClick={() => this.handleClickBoard(board.uid)} index={index} title={board.title} key={board.uid} />
                                </Spacing>
                            ))
                        }
                    </Boards>
                    <Spacing />
                    <CreateBoardModal />
                </Collection>
            </FadeIn>
        )
    }
}

const mapStateToProps = state => ({
    boards: state.boards
});

export default connect(mapStateToProps, { loadUserBoards, loadBoard })(BoardCollection);