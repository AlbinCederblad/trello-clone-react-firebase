import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';

import { addUserToBoard, listenBoardName, loadUserBoards, updateBoardName } from "../../actions";
import BoardMenu from './BoardMenu';
import BoardTitleMenu from './BoardTitleMenu';
import InviteMenu from './InviteMenu';

const NavWrapper = styled.div`
    display: inline-flex;
    align-items: center;
    /*background-color: ${(props) => props.color || 'rgba(0,0,0,.15)'};*/
    background-color: rgba(0,0,0,0.15);
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
    display: inline-flex;
`;
const MenuActionButton = styled.div`
    border-radius: .3rem;
    background-color: rgba(0,0,0,0.16);
    color: white;
    padding: 0.4rem 0.6rem 0.4rem 0.6rem;
    margin-right: 0.4rem;
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
    background-color: rgba(0,0,0,0.16);
    color: white;
    
    &:hover {
        background-color: rgba(255,255,255,0.35);
        cursor: pointer;
    }
    
`;

function BoardNav(props) {

    const [showNameMenu, setShowNameMenu] = useState(false);
    const [boardName, setBoardName] = useState("");
    const [showInviteMenu, setShowInviteMenu] = useState(false);
    const [inviteEmail, setInviteEmail] = useState("");
    const [showBoardMenu, setShowBoardMenu] = useState(false);

    const { backgroundColor } = props.theme;

    const handleShowBoardMenu = () => {
        setShowBoardMenu(!showBoardMenu);
    }

    const handleShowNameMenu = () => {
        setShowNameMenu(!showNameMenu);
    }

    const handleShowInvite = () => {
        setShowInviteMenu(!showInviteMenu);
    }

    const handleSubmitInvite = (e) => {
        e.preventDefault();
        const email = inviteEmail;
        if (email.length > 0 && email.length < 50) {
            props.addUserToBoard(email, props.boardId);
        }
        setShowInviteMenu(!showInviteMenu);
    }

    const handleNameSubmit = (e) => {
        e.preventDefault();
        const newName = boardName;
        if (newName.length > 0 && newName.length < 30) {
            props.updateBoardName(newName, props.boardId);
        }
        setShowNameMenu(!showNameMenu);
    }

    const onNameChange = (e) => {
        e.preventDefault();
        setBoardName(e.target.value);
    }

    const onEmailChange = (e) => {
        e.preventDefault();
        setInviteEmail(e.target.value);
    }

    const getName = () => {
        const boardId = props.boardId;
        let title = '';
        props.boards.boards.forEach((board) => {
            if (board.boardId === boardId) {
                title = board.title;
            }
        });
        return title;
    }

    useEffect(() => {
        const boardId = props.boardId;
        props.loadUserBoards();
        props.listenBoardName(boardId);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    if (props.boards.isLoading) {
        return (<div></div>);
    } else {
        return (
            <NavWrapper color={backgroundColor}>
                <Nav>
                    <NavActionsWrapper>
                        <MenuActionButton onClick={handleShowNameMenu}>
                            {getName()}
                        </MenuActionButton>
                        {showNameMenu && (
                            <BoardTitleMenu
                                handleShowNameMenu={handleShowNameMenu}
                                handleNameSubmit={handleNameSubmit}
                                placeholder={boardName}
                                onNameChange={onNameChange}
                            />
                        )}
                        <MenuActionButton onClick={handleShowInvite}>
                            Invite
                    </MenuActionButton>
                        {showInviteMenu && (
                            <InviteMenu
                                handleShowInvite={handleShowInvite}
                                handleSubmitInvite={handleSubmitInvite}
                                onEmailChange={onEmailChange}
                            />
                        )}

                    </NavActionsWrapper>
                </Nav>

                <BoardMenu showBoardMenu={showBoardMenu} toggleMenu={handleShowBoardMenu} />
                <MenuButton onClick={handleShowBoardMenu}>
                    <FontAwesomeIcon icon={faEllipsisH} style={{ marginRight: '0.4rem' }} />
                    Show Menu
                </MenuButton>

            </NavWrapper>
        );
    }


}

const mapStateToProps = state => ({
    boards: state.boards,
    board: state.board,
    theme: state.theme,
});

export default connect(mapStateToProps, { listenBoardName, updateBoardName, loadUserBoards, addUserToBoard })(BoardNav);