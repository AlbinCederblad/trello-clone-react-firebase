import {
    GET_BOARDS_REQUEST,
    GET_BOARDS_SUCCESS,
    GET_BOARD_NAME_SUCCESS,
} from "../actions/";

export default (
    state = [],
    action
) => {
    switch (action.type) {
        case GET_BOARDS_SUCCESS:
            return action.boards;
        case GET_BOARD_NAME_SUCCESS:
            const newState = state.map(board => {
                if (board.uid === action.boardId) {
                    return { ...board, title: action.name }
                } else {
                    return { ...board }
                }
            });
            return newState;

        default:
            return state;
    }
};