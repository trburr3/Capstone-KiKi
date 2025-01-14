import { csrfFetch } from "./csrf";

const LOAD_POSTS = 'posts/LOAD_POSTS';
const SINGLE_POST = 'posts/SINGLE_POST';
const LOAD_COMMENTS = 'posts/LOAD_COMMENTS';

const getAllPosts = (payload) => ({
    type: LOAD_POSTS,
    payload
});

const getSinglePost = (payload) => ({
    type: SINGLE_POST,
    payload
});

const getAllComments = (payload) => ({
    type: LOAD_COMMENTS,
    payload
});


export const thunkGetAllPosts = () => async dispatch => {
    const res = await csrfFetch("/api/posts/");

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
    const res = await csrfFetch(`/api/posts/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
    });

    if(res.ok) {
        const post = await res.json();
        if(post.errors) { return; }
        // console.log(post)
        // dispatch(getSinglePost(post));
    }
}

export const thunkEditPost = (request, postId) => async dispatch => {
    const res = await csrfFetch(`/api/posts/${postId}`, {
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
    const res = await csrfFetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if(res.ok) {
        // const posts = await csrfFetch(`api/posts`);
        // if(posts.errors) { return; }
        // dispatch(getAllPosts(posts))
        window.location.reload()
    }
}

export const thunkGetAllComments = (postId) => async dispatch => {
    const res = await csrfFetch(`/api/posts/${postId}/comments`);

    if (res.ok) {
        const comments = await res.json();
        if(comments.errors) { return; }
        dispatch(getAllComments(comments));
    }
}

export const thunkCreateComment = (request, postId) => async dispatch => {
    const res = await csrfFetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
    });

    if(res.ok) {
        const post = await res.json();
        if(post.errors) { return; }
        // console.log(post)
        // dispatch(getSinglePost(post));
        window.location.reload();
    }
}

export const thunkEditComment = (request, postId, commentId) => async dispatch => {
    const res = await csrfFetch(`/api/posts/${postId}/comments/${commentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
    });

    if(res.ok) {
        // const posts = await csrfFetch(`api/posts`);
        // if(posts.errors) { return; }
        // dispatch(getAllPosts(posts))
        window.location.reload()
    }
}

export const thunkDeleteComment = (postId, commentId) => async dispatch => {
    const res = await csrfFetch(`/api/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if(res.ok) {
        // const posts = await csrfFetch(`api/posts`);
        // if(posts.errors) { return; }
        // dispatch(getAllPosts(posts))
        window.location.reload()
    }
}


const initialState = { allPosts: {}, post: {}, comments:{} };

export default function postReducer(state = initialState, action) {
    switch (action.type){
        case LOAD_POSTS: {
            const newState = { ...state, allPosts: {} };
            const postsArray = action.payload['Posts'];
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
        case LOAD_COMMENTS: {
            const newState = { ...state, comments: {} };
            const commentsArray = action.payload['Comments'];
            commentsArray.forEach((comment) => {
                newState.comments[comment.id] = comment;
            });
            return newState;
        }
        default:
            return state;
    }
}