import React, { Component } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import FadeIn from 'react-fade-in';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { listenBoard, loadBoard, sort, updateBoard } from '../../actions/board';
import BoardNav from '../Navbar/BoardNav';
import ActionButton from './ActionButton';
import List from './List';

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const BoardStyle = styled.div`
    position: absolute;
    /*background-color: ${(props) => props.color || '#519839'};*/
`;

class Board extends Component {

    constructor(props) {
        super(props);

        const boardId = this.props.match.params.id;
        this.props.loadBoard(boardId);
    }

    componentDidMount() {
        const boardId = this.props.match.params.id;
        this.props.listenBoard(boardId);
    }

    componentWillUnmount() {

    }

    onDragEnd = (result) => {
        const { destination, source, draggableId, type } = result;
        if (!destination) {
            return;
        }
        this.props.sort(
            source.droppableId,
            destination.droppableId,
            source.index,
            destination.index,
            draggableId,
            type
        );
        this.props.updateBoard(this.props.board);
    }

    render() {
        const { lists } = this.props.board;

        return (
            <FadeIn>
                {this.props.auth.isAuthenticated && <BoardNav boardId={this.props.match.params.id} />}
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <BoardStyle color={this.props.theme.backgroundColor}>
                        <Droppable droppableId="all-lists" direction="horizontal" type="list">
                            {provided => (
                                <ListsContainer {...provided.droppableProps} ref={provided.innerRef}>
                                    {(lists != null) ? lists.map((list, index) => (
                                        <List index={index}
                                            listID={list.id}
                                            title={list.title}
                                            key={list.id}
                                            cards={list.cards}
                                        />
                                    )) : null}
                                    {provided.placeholder}
                                    <ActionButton type='list' />
                                </ListsContainer>
                            )}
                        </Droppable>
                    </BoardStyle>
                </DragDropContext>
            </FadeIn>
        )
    }
}

const mapStateToProps = state => ({
    board: state.board,
    auth: state.auth,
    theme: state.theme,
});

export default connect(mapStateToProps, { sort, updateBoard, loadBoard, listenBoard })(Board);
