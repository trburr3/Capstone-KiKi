import { csrfFetch } from "./csrf";

const LOAD_POSTS = 'friends/LOAD_POSTS';
const SINGLE_POST = 'friends/SINGLE_POST';

const getAllPosts = (payload) => ({
    type: LOAD_POSTS,
    payload
});

const getSinglePost = (payload) => ({
    type: SINGLE_POST,
    payload
});


export const thunkGetAllPosts = () => async dispatch => {
    const res = await csrfFetch("/api/friends/");

    if (res.ok) {
        const posts = await res.json();
        if(posts.errors) { return; }
        dispatch(getAllPosts(posts));
    }
}

export const thunkSinglePost = (postId) => async dispatch => {
    const res = await csrfFetch(`/api/posts/${postId}`);

    if(res.ok) {
        const post = await res.json();
        if(post.errors) { return; }

        dispatch(getSinglePost(post));
    }
}

export const thunkCreatePost = (request) => async dispatch => {
    const res = await csrfFetch(`/api/posts`, methods={
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
    });

    if(res.ok) {
        const posts = await csrfFetch(`api/posts`);
        if(posts.errors) { return; }

        dispatch(getAllPosts(posts));
    }
}

export const thunkEditPost = (postId) => async dispatch => {
    const res = await csrfFetch(`/api/posts/${postId}`, methods={
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
    });

    if(res.ok) {
        const posts = await csrfFetch(`api/posts`);
        if(posts.errors) { return; }
        dispatch(getAllPosts(posts))
    }
}

export const thunkDeletePost = (postId) => async dispatch => {
    const res = await csrfFetch(`/api/posts/${postId}`, methods={
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
    });

    if(res.ok) {
        const posts = await csrfFetch(`api/posts`);
        if(posts.errors) { return; }
        dispatch(getAllPosts(posts))
    }
}

const initialState = { allPosts: {}, post: {} };

export default function postReducer(state = initialState, action) {
    switch (action.type){
        case LOAD_POSTS: {
            const newState = { ...state, allPosts: {} };
            const postsArray = action.payload;
            postsArray.forEach((post) => {
                newState.allPosts[post.id] = post;
            });
            return newState;
        }
        case SINGLE_POST: {
            const newState = { ...state, post: {} };
            const post = action.payload;
            post.forEach((post) => {
                newState.post[post.id] = post;
            })
            return newState;
        }
        default:
            return state;
    }
}