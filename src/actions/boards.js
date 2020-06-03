import { myFirebase } from "../firebase/firebase";

export const CREATE_BOARD_REQUEST = "CREATE_BOARD_REQUEST";
export const CREATE_BOARD_SUCCESS = "CREATE_BOARD_SUCCESS";
export const CREATE_BOARD_FAIL = "CREATE_BOARD_FAIL";

export const GET_BOARDS_REQUEST = "GET_BOARDS_REQUEST";
export const GET_BOARDS_SUCCESS = "GET_BOARDS_SUCCESS";
export const GET_BOARDS_FAIL = "GET_BOARDS_FAIL";

export const GET_BOARD_NAME_SUCCESS = "GET_BOARD_NAME_SUCCESS";

// Get Boards
const requestBoards = () => {
    return {
        type: GET_BOARDS_REQUEST
    };
};
const receiveBoards = (boards) => {
    return {
        type: GET_BOARDS_SUCCESS,
        boards
    };
};
const getError = () => {
    return {
        type: GET_BOARDS_FAIL
    };
};


// Create Board
const requestCreateBoard = () => {
    return {
        type: CREATE_BOARD_REQUEST
    };
};
const receiveCreateBoard = (uid) => {
    return {
        type: CREATE_BOARD_SUCCESS,
        uid
    };
};
const createBoardError = () => {
    return {
        type: CREATE_BOARD_FAIL
    };
};

// Listen Board Name
const receiveBoardName = (name, boardId) => {
    return {
        type: GET_BOARD_NAME_SUCCESS,
        name,
        boardId,
    };
};




export const createBoard = (title) => dispatch => {
    dispatch(requestCreateBoard());

    const user = myFirebase.auth().currentUser;
    if (!user) {
        dispatch(createBoardError());
    } else {
        const uid = user.uid;
        const key = myFirebase.database().ref('boards/')
            .push({
                title: title,
                members: {
                    uid
                },
                admins: {
                    uid
                },
            }, (err) => {
                if (err) {
                    dispatch(createBoardError());
                }
            }).key;
        myFirebase.database().ref('/users/' + uid + "/boards").push({
            key,
        });
        myFirebase.database().ref('/board/' + key).set({
            boardId: key,
            lists: { 0: { id: '0', title: 'Todo' } },
        });
        dispatch(receiveCreateBoard(key));
    }
};

export const loadUserBoards = () => dispatch => {
    dispatch(requestBoards());
    const user = myFirebase.auth().currentUser;
    myFirebase.database().ref('/boards/').orderByChild("members/uid").equalTo(user.uid).once("value").then(function (snapshot) {
        let boards = [];

        snapshot.forEach(function (data) {
            const board = {
                uid: data.key,
                title: data.val().title,
                admins: data.val().admins,
                members: data.val().members,
            }
            boards.push(board);
        });
        dispatch(receiveBoards(boards));
    }).catch(err => {
        dispatch(getError());
    });
    return true;
};

export const updateBoardName = (boardName, boardId) => dispatch => {
    myFirebase.database().ref('/boards/' + boardId).update({ title: boardName });
};

export const listenBoardName = (boardId) => dispatch => {
    myFirebase.database().ref('/boards/' + boardId).on('value', function (snapshot) {
        if (snapshot.val() != null)
            dispatch(receiveBoardName(snapshot.val().title, boardId));
    });
};

