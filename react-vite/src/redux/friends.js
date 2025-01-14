import { csrfFetch } from "./csrf";

const LOAD_FRIENDS = 'friends/LOAD_FRIENDS';
const SINGLE_FRIEND = 'friends/SINGLE_FRIEND';

const getAllFriends = (payload) => ({
    type: LOAD_FRIENDS,
    payload
});

const getSingleFriend = (payload) => ({
    type: SINGLE_FRIEND,
    payload
});


export const thunkAllFriends = () => async dispatch => {
    const res = await csrfFetch("/api/friends/");

    if (res.ok) {
        const friends = await res.json();
        if(friends.errors) { return; }
        dispatch(getAllFriends(friends));
    }
}

export const thunkSingleFriend = (friendId) => async dispatch => {
    const res = await csrfFetch(`/api/friends/${friendId}`);

    if(res.ok) {
        const friend = await res.json();
        if(friend.errors) { return; }

        dispatch(getSingleFriend(friend));
    }
}

export const thunkAddFriend = (request) => async dispatch => {
    const res = await csrfFetch(`/api/friends`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
    });

    if(res.ok) {
        const friends = await csrfFetch(`/api/friends`);
        if(friends.errors) { return; }

        dispatch(getAllFriends(friends));
    }
}

export const thunkRemoveFriend = (friendId) => async dispatch => {
    const res = await csrfFetch(`/api/friends/${friendId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true'
        }
    });

    if(res.ok) {
        // const friends = await csrfFetch(`/api/friends`);
        // if(friends.errors) { return; }
        // dispatch(getAllFriends(friends))
        window.location.reload()
    }
}

const initialState = { allFriends: {}, friend: {} };

export default function friendReducer(state = initialState, action) {
    switch (action.type){
        case LOAD_FRIENDS: {
            const newState = { ...state, allFriends: {} };
            const friendsArray = action.payload.Friends;
            friendsArray.forEach((friend) => {
                newState.allFriends[friend.id] = friend;
            });
            return newState;
        }
        case SINGLE_FRIEND: {
            const newState = { ...state, friend: {} };
            const friend = action.payload;
            friend.forEach((friend) => {
                newState.friend[friend.id] = friend;
            })
            return newState;
        }
        default:
            return state;
    }
}