import React, { Component } from 'react'

// Components
import List from './List';
import ActionButton from './ActionButton';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

// Store
import { connect } from 'react-redux';
import { sort, updateBoard, loadBoard, listenBoard } from '../../actions/board';

// CSS
import styled from 'styled-components';
import FadeIn from 'react-fade-in';
import BoardNav from '../Navbar/BoardNav';


const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const BoardStyle = styled.div`
    position: absolute;
    background-color: #519839;
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
        document.body.style.backgroundColor = '#519839';
    }
    componentWillUnmount() {
        document.body.style.backgroundColor = '#FFFFFF';
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
                    <BoardStyle>
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
    auth: state.auth
});

export default connect(mapStateToProps, { sort, updateBoard, loadBoard, listenBoard })(Board);
