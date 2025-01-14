import { csrfFetch } from "./csrf";

const LOAD_TRANSLATION = 'friends/LOAD_TRANSLATION';

const getTranslation = (data) => ({
    type: LOAD_TRANSLATION,
    data
});

export const thunkTranslate = (request) => async dispatch => {
    const res = await csrfFetch("/api/translate/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
    });

    if (res.ok) {
        const translation = await res.json();
        if(translation.errors) { return; }
        dispatch(getTranslation(translation));
    }
}

const initialState = { translation: [] };

export default function translationReducer(state = initialState, action) {
    switch (action.type){
        case LOAD_TRANSLATION: {
            const newState = { ...state };
            newState.translation[0] = action.data.text
            return newState;
        }
        default:
            return state;
    }
}