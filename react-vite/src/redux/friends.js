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

export const thunkRequestResponse = (response) => async dispatch => {
    const res = await csrfFetch(`/api/requests/${response.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(response)
    });

    if(res.ok) {
        // window.location.reload()
    }
}

export const thunkCreateRequest = (request) => async dispatch => {
    const res = await csrfFetch(`/api/requests/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
    });

    if(res.ok) {
        // window.location.reload()
    }
}

export const thunkGetAllRequests = () => async dispatch => {
    const res = await csrfFetch(`/api/requests/`);

    if (res.ok) {
        const requests = await res.json();
        if(requests.errors) { return; }
        const {Sent, Received} = requests
        // console.log(requests)
        dispatch(getAllRequests(Sent, Received));
    }
}

export const thunkDeleteRequest = (requestId) => async dispatch => {
    const res = await csrfFetch(`/api/requests/${requestId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Credentials': 'true'
        }
    });

    if(res.ok) {
        // window.location.reload()
    }
}

const normalData = (data) => {
    const normalData = {}
    data.forEach((element) => {
        normalData[element.id] = element
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
            let sentRequaestsArr = action.sent
            let receivedRequaestsArr = action.received
            // console.log('do we make it', normalData(sentMessagesArr), '|||||', receivedMessagesArr)

            if(sentRequaestsArr) newState.requests.sent = normalData(sentRequaestsArr);

            if(receivedRequaestsArr) newState.requests.received = normalData(receivedRequaestsArr);

            return newState

          }
        default:
            return state;
    }
}