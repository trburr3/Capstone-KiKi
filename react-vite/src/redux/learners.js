import { csrfFetch } from "./csrf";

const LOAD_LEARNERS = 'learners/loadlearners';

const getAllLeaners = (payload) => ({
    type: LOAD_LEARNERS,
    payload
  });

  export const thunkGetAllUsers = () => async dispatch => {
    const response = await csrfFetch("/api/users/");

    if(response.ok) {
      const data = await response.json();
      dispatch(getAllLeaners(data['Users']));
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
  };

  const initialState = { learners: {} };

  function learnerReducer(state = initialState, action) {
    switch (action.type) {
      case LOAD_LEARNERS:{
        const newState = {...state}
        let learnersArr = action.payload

        if(learnersArr) newState.learners = normalData(learnersArr)

        return newState

      }
      default:
        return state;
    }
  }

  export default learnerReducer;