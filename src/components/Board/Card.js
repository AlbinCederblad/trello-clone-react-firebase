import React from 'react';

// Redux / Actions
import { useDispatch, useSelector, useStore } from 'react-redux';
import { deleteCard, updateBoard } from '../../actions';

// UI
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


// Drag and drop
import { Draggable } from 'react-beautiful-dnd';

const Div = styled.div`
    margin-bottom: 8px;
    margin-left: 8px;
    margin-right: 8px;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: #172b4d;
`;



const StyledCardContent = styled(CardContent)`
    display: inline-block;
`;

const CardOptions = styled.div`
    visibility: hidden;
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

const StyledCard = styled(Card)`
    justify-content: space-between;
    display: inline-flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    &:hover {
        background-color: rgb(240, 240, 240);

    }
    &:hover ${CardOptions} {
        visibility: visible;
    }
`;



const TrelloCard = ({ text, id, index, listID }) => {

    const dispatch = useDispatch();
    const store = useStore();


    const handleDeleteCard = () => {
        dispatch(deleteCard(id, listID));
        const tempboard = store.getState().board; // ugly solution, try fix
        dispatch(updateBoard(tempboard));
    }
    return (
        <Draggable draggableId={String(id)} index={index}>
            {(provided) => (
                <Div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <StyledCard>
                        <StyledCardContent>
                            {text}
                        </StyledCardContent>
                        <CardOptions onMouseUp={handleDeleteCard}><FontAwesomeIcon icon={faTrash} /></CardOptions>
                    </StyledCard>
                </Div>
            )}

        </Draggable>
    )
}

export default TrelloCard;