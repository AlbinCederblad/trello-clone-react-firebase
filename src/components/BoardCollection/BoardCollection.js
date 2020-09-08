import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import React, { Component } from 'react'
import FadeIn from 'react-fade-in';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { loadUserBoards } from '../../actions/';
import { loadBoard } from '../../actions/board';
import BoardTile from './BoardTile';
import CreateBoardModal from './CreateBoardModal';

const Collection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 70vh;
`;

const Paper = styled.div`
    background: rgba(255,255,255,0.85);
    padding: 2rem;
    border-radius: 1rem;
`;

const Title = styled.div`
    position: center;
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
    margin-bottom: 2rem;
    margin-top: 1rem;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

class BoardCollection extends Component {
    constructor(props) {
        super(props);
        this.handleClickBoard = this.handleClickBoard.bind(this);
    };
    componentDidMount() {
        this.props.loadUserBoards();
    };

    handleClickBoard(e, boardId) {
        if (e.target.className instanceof SVGAnimatedString || e.target.className.includes('inner')) {

        } else {
            const { history } = this.props;
            this.props.loadBoard(boardId);
            history.push("/board/" + boardId);
        }

    };

    render() {
        return (
            <FadeIn>
                <Collection>
                    <Paper>
                        <Title>
                            <AccountCircleIcon />
                            <p>Your boards</p>
                        </Title>
                        <Boards>
                            {
                                this.props.boards.isLoading ? <Loader /> :
                                    this.props.boards.boards.map((board, index) => (
                                        <Spacing key={board.boardId}>
                                            <BoardTile onClick={(e) => this.handleClickBoard(e, board.boardId)} index={index} title={board.title} key={board.boardId} boardId={board.boardId} />
                                        </Spacing>
                                    ))
                            }
                        </Boards>
                        <Spacing />
                        <CreateBoardModal />
                    </Paper>
                </Collection>
            </FadeIn>
        )
    }
}

const mapStateToProps = state => ({
    boards: state.boards
});

export default connect(mapStateToProps, { loadUserBoards, loadBoard })(BoardCollection);
