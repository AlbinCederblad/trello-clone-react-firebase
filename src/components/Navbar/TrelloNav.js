import React from 'react';


// UI
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

// Router
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

// Actions
import { useDispatch } from "react-redux";
import { logoutUser } from "../../actions";

const MainNav = styled.div`
    background: rgba(0,0,0,.35);
    margin: auto;
    width: 100%;
    padding: 4px;
    display: flex;
    justify-content: space-between;
    position: relative;
`;

const Logo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 50%;
    right: 50%;
`;

const Img = styled.img`
    opacity: 0.5;
    width: 6rem;
    height: 2rem;
    :hover {
        opacity: 0.8;
        cursor: pointer;
    }
`;

const Buttons = styled.div`
    justify-content: flex-end;
    display: inline-flex;
    align-items: center;
`;

const SignButton = styled.div`
    border-radius: .3rem;
    background-color: rgba(255,255,255,0.24);
    color: white;
    padding: 0.4rem 0.6rem 0.4rem 0.6rem;
    &:hover {
        background-color: rgba(255,255,255,0.35);
        cursor: pointer;
    }
    margin: 0 4px 0 4px;
`;



const TrelloNav = ({ isAuthenticated, isLoading }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSignOut = () => {
        dispatch(logoutUser());
        history.push('/signin');
    }

    const isLoggedIn = (
        <SignButton onMouseDown={handleSignOut}>Sign out</SignButton>
    );
    const isLoggedOut = (
        <Buttons>
            <Link to="/signin" style={{ textDecoration: 'none' }}><SignButton>Sign in</SignButton></Link>
            <Link to="/signup" style={{ textDecoration: 'none' }}><SignButton>Register</SignButton></Link>
        </Buttons>
    );
    return (
        <MainNav>
            <Link to="/">
                <SignButton>
                    <FontAwesomeIcon icon={faHome} size="lg" />
                </SignButton>
            </Link>
            <Link to="/">
                <Logo>
                    <Img src="https://d2k1ftgv7pobq7.cloudfront.net/meta/u/res/images/trello-header-logos/af7af6ed478d3460709d715d9b3f74a4/trello-logo-white.svg" />
                </Logo>
            </Link>
            <Buttons>
                {!isLoading ? (isAuthenticated ? isLoggedIn : isLoggedOut) : null}
            </Buttons>
        </MainNav>
    );
}

export default TrelloNav;
