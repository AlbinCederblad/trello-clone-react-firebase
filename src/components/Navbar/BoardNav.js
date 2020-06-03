// Components
import React, { Component } from 'react';
import BoardMenu from './BoardMenu';
import BoardTitleMenu from './BoardTitleMenu';

// Icons/UI
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

// Router

// Redux
import { connect } from "react-redux";

// Actions
import { listenBoardName, updateBoardName, loadUserBoards } from "../../actions";


// CSS
const NavWrapper = styled.div`
display: inline-flex;
    align-items: center;
    background: rgba(0,0,0,.15);
    justify-content: space-between;
    width: 100%;
    z-index: 2;
    padding: 0.3rem 0.5rem 0.3rem 0.5rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;
const Nav = styled.div`
    z-index: 3;
`;
const NavActionsWrapper = styled.div`
    position: relative;
`;
const NameMenuButton = styled.div`
    border-radius: .3rem;
    background-color: rgba(255,255,255,0.24);
    color: white;
    padding: 0.4rem 0.6rem 0.4rem 0.6rem;
    &:hover {
        background-color: rgba(255,255,255,0.35);
        cursor: pointer;
    }
    font-size: 18px;
    font-weight: bold;
    top: 50%;
    align-items: center;
`;
const MenuButton = styled.div`
    border-radius: .3rem;
    padding: 0.4rem 0.6rem 0.4rem 0.6rem;
    background-color: rgba(255,255,255,0.24);
    color: white;
    
    &:hover {
        background-color: rgba(255,255,255,0.35);
        cursor: pointer;
    }
    
`;

class BoardNav extends Component {

    constructor(props) {
        super(props);
        const boardId = this.props.boardId;
        this.props.loadUserBoards();
        this.props.listenBoardName(boardId);
    }

    state = {
        showNameMenu: false,
        boardName: '',
    }

    handleShowMenu = () => {
        this.setState({
            showNameMenu: !this.state.showNameMenu,
        });
    }

    handleNameSubmit = (e) => {
        e.preventDefault();
        const newName = this.state.boardName;
        if (newName.length > 0 && newName.length < 30) {
            this.props.updateBoardName(newName, this.props.boardId);
        }
        this.setState({
            showNameMenu: !this.state.showNameMenu,
        });
    }

    onNameChange = (e) => {
        e.preventDefault();
        this.setState({
            boardName: e.target.value,
        });
    }

    getName = () => {
        const boardId = this.props.boardId;
        let title = '';
        this.props.boards.forEach((board) => {
            if (board.uid === boardId) {
                title = board.title;
            }
        });
        return title;
    }


    /*componentDidMount = () => {
        const boardId = this.props.boardId;
        this.props.loadUserBoards();
        this.props.listenBoardName(boardId);
    }*/

    render() {
        return (
            <NavWrapper>
                <BoardMenu />
                <NameMenuButton onClick={this.handleShowMenu}>
                    {this.getName()}
                </NameMenuButton>
                {this.state.showNameMenu && (
                    <BoardTitleMenu
                        handleShowMenu={this.handleShowMenu}
                        handleNameSubmit={this.handleNameSubmit}
                        placeholder={this.state.boardName}
                        onNameChange={this.onNameChange}
                    />
                )}
                <Nav>

                    <NavActionsWrapper>


                    </NavActionsWrapper>
                </Nav>
                <MenuButton onClick={this.toggleCloseButton}>
                    <FontAwesomeIcon icon={faEllipsisH} style={{ marginRight: '0.4rem' }} />
                    Show Menu
                </MenuButton>
            </NavWrapper>
        );
    }
}

const mapStateToProps = state => ({
    boards: state.boards,
    board: state.board
});

export default connect(mapStateToProps, { listenBoardName, updateBoardName, loadUserBoards })(BoardNav);