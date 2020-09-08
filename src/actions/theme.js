import unsplash from '../unsplash/unsplash';
import { toJson } from 'unsplash-js';

export const CHANGE_BACKGROUND = "CHANGE_BACKGROUND";

export const CHANGE_PHOTO_REQUEST = "CHANGE_PHOTO_REQUEST";
export const CHANGE_PHOTO_SUCCESS = "CHANGE_PHOTO_SUCCESS";
export const CHANGE_PHOTO_ERROR = "CHANGE_PHOTO_ERROR";

export const GET_PHOTOS_REQUEST = "GET_PHOTOS_REQUEST";
export const GET_PHOTOS_SUCCESS = "GET_PHOTOS_SUCCESS";
export const GET_PHOTOS_ERROR = "GET_PHOTOS_ERROR";



export const changeBackground = (newBackgroundColor) => ({
    type: CHANGE_BACKGROUND,
    payload: newBackgroundColor
})

export const changePhoto = (payload, type) => ({
    type: type,
    payload
})

export const getPhotos = (payload, type) => ({
    type: type,
    payload
})


export const getPhotosList = (keyword) => dispatch => {
    dispatch(getPhotos(null, GET_PHOTOS_REQUEST));
    unsplash.search.photos(keyword, 1, 10, { orientation: "landscape" })
        .then(toJson)
        .then(json => {
            dispatch(getPhotos(json.results, GET_PHOTOS_SUCCESS));
        }).catch(error => {
            dispatch(getPhotos(null, GET_PHOTOS_ERROR));
        });
} 
