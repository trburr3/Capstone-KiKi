import { csrfFetch } from "./csrf";

const LOAD_FRIENDS = 'friends/LOAD_FRIENDS';
const SINGLE_FRIEND = 'friends/SINGLE_FRIEND';
const LOAD_REQUESTS = 'friends/LOAD_REQUESTS';

const getAllFriends = (payload) => ({
    type: LOAD_FRIENDS,
    payload
});

const getSingleFriend = (payload) => ({
    type: SINGLE_FRIEND,
    payload
});

const getAllRequests = (sent, received) => ({
    type: LOAD_REQUESTS,
    sent,
    received
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
        window.location.reload()
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
        window.location.reload()
    }
}

export const thunkGetAllRequests = () => async dispatch => {
    const res = await csrfFetch("/api/friends/");

    if (res.ok) {
        const requests = await res.json();
        if(requests.errors) { return; }
        const {Sent, Received} = requests
        dispatch(getAllRequests(Sent, Received));
    }
}

const normalData = (data) => {
    const normalData = {}
    data.forEach((event) => {
        normalData[event.id] = event
    })

    return normalData
  };

const initialState = { allFriends: {}, friend: {}, requests: { sent: {}, received: {}} };

export default function friendReducer(state = initialState, action) {
    switch (action.type){
        case LOAD_FRIENDS: {
            const newState = { ...state, allFriends: {} };
            const friendsArr = action.payload.Friends;
            if (friendsArr) newState.allFriends = normalData(friendsArr);
            return newState
        }
        case SINGLE_FRIEND: {
            const newState = { ...state, friend: {} };
            const friend = action.payload;
            friend.forEach((friend) => {
                newState.friend[friend.id] = friend;
            })
            return newState
        }
        case LOAD_REQUESTS:{
            const newState = {...state}
            let sentMessagesArr = action.sent
            let receivedMessagesArr = action.received

            if(sentMessagesArr) newState.messages.sent = normalData(sentMessagesArr);

            if(receivedMessagesArr) newState.messages.received = normalData(receivedMessagesArr);

            return newState

          }
        default:
            return state;
    }
}