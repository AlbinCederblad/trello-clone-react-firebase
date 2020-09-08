import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import AddIcon from '@material-ui/icons/Add';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextAreaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';

import { addCard, addList, updateBoard } from '../../actions/board';

class ActionButton extends Component {

    state = {
        formOpen: false,
        text: ''
    }

    //TODO: fix this mess
    openForm = () => {
        this.setState({
            formOpen: true
        })
    }
    //TODO: fix this mess
    closeForm = e => {
        this.setState({
            formOpen: false,
            text: e.target.value
        })
    }

    handleInputChange = e => {
        this.setState({
            text: e.target.value
        })
    }

    handleAddList = () => {
        const { text } = this.state;
        if (text) {
            this.props.addList(text);
        }
        setTimeout(() => {
            this.props.updateBoard(this.props.board);
        }, 100);
    }

    handleAddCard = () => {
        const { text } = this.state;
        if (text) {
            this.setState({ text: "" });
            this.props.addCard(this.props.listID, text);
        }
        setTimeout(() => {
            this.props.updateBoard(this.props.board);
        }, 100);
    }

    renderAddButton = () => {
        const list = this.props.list;

        const buttonText = list ? 'Add another card' : 'Add another list';
        const buttonTextOpacity = list ? 1 : 1;
        const buttonTextColor = list ? '#5e6c84' : 'white';
        const buttonTextBackground = list ? 'inherit' : 'rgba(0,0,0,0.16)';

        const Button = styled.div`
            display: inline-flex;
            flex-direction: row;
            align-items: center;
            margin: 8px 8px 8px 8px;
            cursor: pointer;
            border-radius: 8px;
            height: 36px;
            width: 275px;
            padding-left: 8px;
            min-width: 275px;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;
            font-size: 14px;
            line-height: 20px;
            font-weight: 400;

            opacity: ${buttonTextOpacity};
            color: ${buttonTextColor};
            background-color: ${buttonTextBackground};
            
            &:hover {
                background-color: ${list ? '#e1e2e6' : 'rgba(0, 0, 0, 0.1)'};
                transition: 0.3s; 
            }
        `;

        return (
            <Button onClick={this.openForm}>
                <AddIcon />
                <p>{buttonText}</p>

            </Button>
        )
    }

    renderForm = () => {
        const { list } = this.props;
        const placeholderText = list ? 'Enter a title for this card...' : 'Enter a list title...';
        const buttonText = list ? 'Add Card' : 'Add List';

        const Buttons = styled.div`
            display: inline-block;
        `;

        return (
            <div>
                <Card style={{
                    margin: '8px',
                    overflow: 'hidden',
                    minHeight: '80px',
                    minWidth: '272px'
                }}>
                    <TextAreaAutosize
                        placeholder={placeholderText}
                        autoFocus onBlur={this.closeForm}
                        value={this.state.text}
                        onChange={this.handleInputChange}
                        style={{
                            resize: 'none',
                            width: '93%',
                            border: 'none',
                            outline: 'none',
                            margin: '8px',
                            height: '300px'
                        }} />
                </Card>
                <div style={{
                    alignItems: 'center',
                    display: 'flex',
                }}>
                    <Buttons>
                        <Button
                            onMouseDown={list ? this.handleAddCard : this.handleAddList}
                            title={buttonText}
                            variant='contained'
                            style={{
                                color: 'white',
                                backgroundColor: '#5aac44',
                                margin: '0px 8px 8px 8px',
                                textTransform: 'capitalize',
                                fontSize: '14px',
                            }}>{buttonText}</Button>
                        <Button style={{
                            margin: '0px 8px 8px 0px',
                            fontSize: '14px',
                            textTransform: 'capitalize',
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            color: 'black',
                        }} variant='contained'>close</Button>
                    </Buttons>
                </div>
            </div>
        );
    }

    render() {
        return this.state.formOpen ? this.renderForm() : this.renderAddButton();
    }
}

const mapStateToProps = state => ({
    board: state.board
});


export default connect(mapStateToProps, { addList, addCard, updateBoard })(ActionButton);