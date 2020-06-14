import {
    GET_BOARDS_REQUEST,
    GET_BOARDS_SUCCESS,
    GET_BOARD_NAME_SUCCESS,
} from "../actions/";

export default (
    state = {
        isLoading: true,
        boards: []
    },
    action
) => {
    switch (action.type) {
        case GET_BOARDS_SUCCESS:
            return { ...state, isLoading: false, boards: action.boards };
        case GET_BOARD_NAME_SUCCESS:
            if (!state.boards)
                return { ...state };

            const newState = state.boards.map(board => {
                if (board.boardId === action.boardId) {
                    return { ...board, title: action.name }
                } else {
                    return { ...board }
                }
            });
            return { ...state, boards: newState };

        case GET_BOARDS_REQUEST:
            return { ...state, isLoading: true };
        default:
            return state;
    }
};