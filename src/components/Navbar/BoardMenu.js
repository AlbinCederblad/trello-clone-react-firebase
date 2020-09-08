import { faAngleLeft, faEllipsisH, faPaintBrush, faSearch, faStickyNote, faTasks, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useEffect, useState } from 'react';
import Loader from "react-loader-spinner";
import { connect, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { changeBackground, getPhotosList } from '../../actions/';

const BackgroundMenu = styled.div`
    display: inline-block;
    overflow-x: hidden;

    width: 340px;
    height: 90%;
    background-color: whitesmoke;
    z-index: 1000;
    transform: ${(props) => props.changeBackground ? 'translateX(0)' : `translateX(100%)`};
    transition: transform 0.3s ease;
    position: absolute;
`;

const PhotoMenu = styled.div`
    display: inline-block;
    overflow-x: hidden;

    width: 340px;
    height: 90%;
    background-color: whitesmoke;
    z-index: 1000;
    transform: ${(props) => props.changePhoto ? 'translateX(0)' : `translateX(100%)`};
    transition: transform 0.3s ease;
    position: absolute;
`;

const BackgroundTile = styled.div`
    background-color: ${(props) => props.color || 'blue'};
    height: 10%;
    width: 40%;
    margin: .5rem;
    margin-top: 1rem;
    border-radius: .8rem;
    display: inline-block;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
`;

const PhotoTile = styled.div`
    background-image: ${(props) => `url(` + props.url + `)` || ''};
    background-size: contain;
    background-size: cover;
    height: 10%;
    width: 40%;
    margin: .5rem;
    margin-top: 1rem;
    border-radius: .8rem;
    display: inline-block;
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
`;

const BackgroundColorMenu = styled.div`
    display: inline-block;
    overflow-x: hidden;

    width: 340px;
    height: 90%;
    background-color: whitesmoke;
    z-index: 1001;
    transform: ${(props) => props.changeBackgroundColor ? 'translateX(0)' : `translateX(100%)`};
    transition: transform 0.3s ease;
    position: absolute;
`;

const MenuWrapper = styled.div`
    z-index: 999;
    overflow-x: hidden;
    width: 340px;
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    background-color: whitesmoke;
    transform: ${(props) => props.showBoardMenu ? 'translateX(0)' : `translateX(100%)`};
    transition: transform 0.3s ease;
    display: block;
    height: 100%;
`;

const Menu = styled.div`
    box-sizing: border-box;
    width: 340px;
    padding: 0px 12px;
    color: #172b4d;
`;

const MenuItems = styled.div`
    border-bottom: 1px solid #ccd2d7;
    align-items: center;
`;

const Title = styled.h2`
    font-size: 1.2rem;

    font-weight: 500;
    color: #193345;
    text-align: center;
`;

const MenuArrow = styled.button`
    border: none;
    font-size: 1.5rem;
    background: none;
    color: #42526e;
    font-weight: bold;

    position: absolute;
    top: 16px;
    transition: .25s all;
    left: 2rem;

    &:hover {
        color: #193345;
        cursor: pointer;
    }
`;

const CloseMenu = styled.button`
    border: none;
    font-size: 1.5rem;
    background: none;
    color: #42526e;
    position: absolute;
    top: 18px;
    right: 12px;

    &:hover {
        color: #193345;
        cursor: pointer;
    }
`;

const OptionsList = styled.ul`
    text-align: left;
    list-style: none;
    cursor: pointer;
    padding-inline-end: 40px;
`;

const OptionsItem = styled.li`
    display: flex;
    align-items: center;
    color: #193345;
    font-size: 1rem;
    padding: .4rem .4rem;
    line-height: 1.2rem;
    border-radius: 3px;
    font-weight: 600;
    &:hover {
        background-color: #6b808c3f;
    }
`;

const Icon = styled.div`
    color: #193345;
    padding: .3rem;
    margin-right: .3rem;
`;

const SearchIcon = styled.span`
    position: absolute;
    left: 10px;
    top: 15px;
    color: #42526e;
`;

const SearchPhotos = styled.input`
    box-sizing: border-box;
    width: 316px;
    background-color: #fafbfc;
    display: block;
    color: #172b4d;
    box-shadow: inset 0 0 0 2px #dfe1e6;
    margin: 8px 0px;
    padding: 0.6rem 2rem;
    border: none;
    font-size: 14px;
    transition-property: background-color, border-color, box-shadow;
    transition-duration: 85ms;
    transition-timing-function: ease;

    &:focus{
        box-shadow: inset 0 0 0 2px rgb(0, 121, 191);
        background-color: #FFFFFF;
    }
`;


function BoardMenu(props) {

    // Background states
    const [changeBackground, setChangeBackground] = useState(false);
    const [changePhoto, setChangePhoto] = useState(false);
    const [changeBackgroundColor, setChangeBackgroundColor] = useState(false);

    // redux state
    const { photosList } = props.theme;

    // passed props
    const { showBoardMenu, toggleMenu } = props;


    const colorsList = [
        'rgb(0, 121, 191)',
        'rgb(210, 144, 52)',
        'rgb(81, 152, 57)',
        'rgb(176, 70, 50)',
        'rgb(137, 96, 158)',
        'rgb(205, 90, 145)',
        'rgb(75, 191, 107)',
        'rgb(0, 174, 204)'
    ];

    // hide/show the menu section where you pick either background or photo
    const toggleBackground = () => {
        if (changeBackgroundColor && changeBackground) {
            setChangeBackgroundColor(!changeBackgroundColor);
        }
        else if (changePhoto && changeBackground) {
            setChangePhoto(!changePhoto);
        }
        else {
            setChangeBackground(!changeBackground);
        }
    }

    // hide/show the color picker menu section
    const toggleBackgroundColor = () => {
        setChangeBackgroundColor(!changeBackgroundColor);
    }

    // hide/show the photo picker menu section
    const togglePhotos = () => {
        setChangePhoto(!changePhoto);
    }


    const selectBackgroundColor = (color) => {
        props.changeBackground(color);
        document.body.style.backgroundColor = color;
        document.body.style.backgroundImage = "";
        toggleBackgroundColor();
    }

    const selectBackgroundPhoto = (url) => {
        document.body.style.backgroundImage = 'url(' + url + ')';
        document.body.style.backgroundColor = "";
    }

    return (
        <MenuWrapper showBoardMenu={showBoardMenu}>
            <Menu>
                <MenuItems>
                    {changeBackground ? <Title>Change Background</Title> : <Title>Menu</Title>}
                    {changeBackground ? <MenuArrow onClick={toggleBackground}><FontAwesomeIcon icon={faAngleLeft} /></MenuArrow> : null}
                    <CloseMenu onClick={toggleMenu}><FontAwesomeIcon icon={faTimes} /></CloseMenu>
                </MenuItems>
                <BackgroundMenu changeBackground={changeBackground}>
                    <PhotoTile onClick={toggleBackgroundColor} url={'https://a.trellocdn.com/prgb/dist/images/colors@2x.864f4df15d825e89e199.jpg'} />
                    <PhotoTile onClick={togglePhotos} url={'https://a.trellocdn.com/prgb/dist/images/photos-thumbnail@3x.48948499e309aef794d7.jpg'} />
                </BackgroundMenu>
                <PhotoMenu changePhoto={changePhoto}>
                    <Search />
                    <SearchIcon><FontAwesomeIcon icon={faSearch} /></SearchIcon>
                    {
                        photosList.map((object, index) => (
                            <PhotoTile key={index} url={object.urls.thumb} onClick={() => selectBackgroundPhoto(object.urls.full)} />
                        ))
                    }
                </PhotoMenu>
                <BackgroundColorMenu changeBackgroundColor={changeBackgroundColor}>
                    {
                        colorsList.map((color, index) => (
                            <BackgroundTile color={color} onClick={() => selectBackgroundColor(color)} key={index} />
                        ))
                    }
                </BackgroundColorMenu>
                <MenuItems>
                    <OptionsList>
                        <OptionsItem onClick={toggleBackground}>
                            <Icon><FontAwesomeIcon icon={faPaintBrush} /></Icon>
                                Change Background
                        </OptionsItem>
                        <OptionsItem>
                            <Icon><FontAwesomeIcon icon={faSearch} /></Icon>
                                Search Cards
                            </OptionsItem>
                        <OptionsItem>
                            <Icon><FontAwesomeIcon icon={faStickyNote} /></Icon>
                                Stickers
                            </OptionsItem>
                        <OptionsItem>
                            <Icon><FontAwesomeIcon icon={faEllipsisH} /></Icon>
                                More
                            </OptionsItem>
                    </OptionsList>
                </MenuItems>
                <MenuItems>
                    <OptionsList>
                        <OptionsItem>
                            <Icon><FontAwesomeIcon icon={faTasks} /></Icon>Activity
                        </OptionsItem>
                    </OptionsList>
                </MenuItems>
            </Menu>
        </MenuWrapper>
    )
}

function Search() {
    const [searchTerm, setSearchTerm] = useState('forest');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    // called every time searchTerm is changed 
    useEffect(() => {
        setLoading(true);
        const delayDebounceFn = setTimeout(() => {
            //gets executed after 700ms
            dispatch(getPhotosList(searchTerm));
            setLoading(false);
        }, 700)

        // delays delayDebounceFn from being executed by clearing timer
        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm, dispatch])

    return (
        <Fragment>
            <SearchPhotos
                placeholder='Photos'
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {
                loading && <Loader />
            }
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    theme: state.theme,
});

export default connect(mapStateToProps, { changeBackground, getPhotosList })(BoardMenu);