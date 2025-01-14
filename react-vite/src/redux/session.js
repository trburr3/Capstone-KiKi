import { csrfFetch } from "./csrf";

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const LOAD_ACHIEVMENTS = 'session/loadAchievements';
const LOAD_POSTS = 'session/loadPosts';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});

const getAchievements = (payload) => ({
  type: LOAD_ACHIEVMENTS,
  payload
})

const getPosts = (published, drafts) => ({
  type: LOAD_POSTS,
  published,
  drafts
})

export const thunkAuthenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/");
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const thunkLogin = (credentials) => async dispatch => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkSignup = (user) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkLogout = () => async (dispatch) => {
  await fetch("/api/auth/logout");
  dispatch(removeUser());
};

export const thunkGetAchievements = () => async dispatch => {
  const response = await fetch("/api/profile/achievements");

  if(response.ok) {
    const data = await response.json();
    dispatch(getAchievements(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkGetAllUserPosts = () => async dispatch => {
  const response = await fetch("/api/profile/posts");

  if(response.ok) {
    const data = await response.json();
    const {Public, Private} = data
    dispatch(getPosts(Public, Private));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

const normalData = (data) => {
  const normalData = {}
  data.forEach((event) => {
      normalData[event.id] = event
  })

  return normalData
}

const initialState = { user: null, achievements: {}, posts: { published: {}, privated: {} } };

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    case LOAD_ACHIEVMENTS:
      return { ...state, achievements: action.payload };
    case LOAD_POSTS:{
      const newState = {...state}
      let publicPostArr = action.published
      let privatePostArr = action.drafts

      if(publicPostArr) newState.posts.published = normalData(publicPostArr)

      if(privatePostArr) newState.posts.privated = normalData(privatePostArr)

      return newState

    }
    default:
      return state;
  }
}

export default sessionReducer;
