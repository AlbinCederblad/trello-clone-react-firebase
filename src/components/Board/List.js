import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import FadeIn from 'react-fade-in';
import { useDispatch, useStore } from 'react-redux';
import styled from 'styled-components';

import { deleteList, updateBoard } from '../../actions';
import ActionButton from './ActionButton';
import TrelloCard from './Card';

const ListStyle = styled.div`
    background-color: #ebecf0;
    border-radius: 3px;
    width: 300px;
    height: 100%;
    padding: 8px 1px 8px 1px;
    margin: 8px 0px 0px 8px;
    
`;

const Title = styled.div`
    color: #172b4d;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    margin: 15px 15px 15px 22px;
    font-weight: bold;
    opacity: 0.7;
    display: inline-block;
`;

const DroppableCards = styled.div`
    min-height: 20px;
`;

const ListHeader = styled.div`
    justify-content: space-between;
    display: inline-flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
`;

const ListOptions = styled.div`
    display: inline-block;
    margin-right: 15px;
    border-radius: .3rem;
    padding: 0.4rem 0.6rem 0.4rem 0.6rem;
    color: #172b4d;
    opacity: 0.7;
    
    &:hover {
        background-color: #e1e2e6;
        
    }
`;


const List = ({ title, cards, listID, index }) => {
    const dispatch = useDispatch();
    const store = useStore();

    const handleDeleteList = () => {
        dispatch(deleteList(listID));
        const tempboard = store.getState().board; // ugly solution, try fix
        dispatch(updateBoard(tempboard));
    }
    return (
        <FadeIn>
            <Draggable draggableId={String(listID)} index={index}>
                {provided => (
                    <ListStyle {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                        <ListHeader>
                            <Title>{title}</Title>
                            <ListOptions onMouseUp={handleDeleteList}><FontAwesomeIcon icon={faTrash} /></ListOptions>
                        </ListHeader>
                        <Droppable droppableId={String(listID)}>
                            {(provided) => (
                                <DroppableCards {...provided.droppableProps} ref={provided.innerRef}>

                                    {(cards != null) ?
                                        cards.map((card, index) => (
                                            <TrelloCard index={index} text={card.text} key={card.id} id={card.id} listID={listID} />
                                        )) : null
                                    }
                                    {provided.placeholder}
                                </DroppableCards>
                            )}
                        </Droppable>
                        <ActionButton listID={listID} list />
                    </ListStyle>
                )}
            </Draggable>
        </FadeIn>
    )
}

export default List;