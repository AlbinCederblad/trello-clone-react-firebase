import {
    GET_PHOTOS_REQUEST,
    GET_PHOTOS_SUCCESS,
    GET_PHOTOS_ERROR,
    CHANGE_BACKGROUND,
    CHANGE_PHOTO_ERROR,
    CHANGE_PHOTO_REQUEST,
    CHANGE_PHOTO_SUCCESS
} from "../actions/";

const initialState = {
    isLoading: false,
    error: '',
    backgroundColor: 'rgb(81, 152, 57)',
    backgroundPhoto: '',
    photosList: [

    ],
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        // PHOTOS LIST
        case GET_PHOTOS_REQUEST:
            return { ...state, isLoading: true, error: '' }
        case GET_PHOTOS_ERROR:
            return { ...state, isLoading: false, error: 'failed to load images or no images found' }
        case GET_PHOTOS_SUCCESS:
            return { ...state, isLoading: false, backgroundColor: '', photosList: payload, error: '' }

        // CHANGE PHOTO
        case CHANGE_PHOTO_REQUEST:
            return { ...state, isLoading: true, error: '' }
        case CHANGE_PHOTO_ERROR:
            return { ...state, isLoading: false, error: 'failed to change photo' }
        case CHANGE_PHOTO_SUCCESS:
            return { ...state, isLoading: false, backgroundColor: '', backgroundPhoto: payload, error: '' }

        // CHANGE BACKGROUND
        case CHANGE_BACKGROUND:
            return { ...state, isLoading: false, error: '', backgroundPhoto: '', backgroundColor: payload }

        default:
            return state
    }
}
