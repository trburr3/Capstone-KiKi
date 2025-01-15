import { csrfFetch } from "./csrf";

const LOAD_MESSAGES = 'messages/loadMessages';
const LOAD_EDIT = 'messages/loadEdit';

const loadAllMessages = (payload) => ({
    type: LOAD_MESSAGES,
    payload
  });

  const loadEdit = (payload) => ({
    type: LOAD_EDIT,
    payload
  });


  export const thunkGetAllMessages = () => async dispatch => {
    const response = await csrfFetch(`/api/messages/`);

    if(response.ok) {
      const data = await response.json();
      dispatch(loadAllMessages(data['Messages']));
    } else if (response.status < 500) {
      const errorMessages = await response.json();
      return errorMessages
    } else {
      return { server: "Something went wrong. Please try again" }
    }
  };

  export const thunkDeleteMessage = (messageId) => async dispatch => {
    const response = await csrfFetch(`/api/messages/${messageId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    });

    if(response.ok) {
        console.log('Delete successful :3')
        window.location.reload()
    } else if (response.status < 500) {
      const errorMessages = await response.text();
      console.error(errorMessages)
    } else {
      return { server: "Something went wrong. Please try again" }
    }
  };

  export const thunkEditMessage = (message) => async dispatch => {
    const response = await csrfFetch(`/api/messages/${message .id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message)
    });

    if(response.ok) {
      const newMessage = await response.json();
      // console.log('WHO AM I?', newMessage)
      dispatch(loadEdit(newMessage));
    } else if (response.status < 500) {
      const errorMessages = await response.text();
      return errorMessages
    } else {
      return { server: "Something went wrong. Please try again" }
    }
  };

  export const thunkCreateMessage = (message) => async dispatch => {
    const response = await csrfFetch(`/api/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message)
    });

    if(response.ok) {
      const newMessage = await response.json();
      // console.log('WHO AM I?', newMessage)
      dispatch(loadEdit(newMessage));
    } else if (response.status < 500) {
      const errorMessages = await response.text();
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

  const initialState = { messages: {} }

  function messageReducer(state = initialState, action) {
    switch (action.type) {
      case LOAD_MESSAGES:{
        const newState = {...state}
        let messagesArr = action.payload

        if(messagesArr) newState.messages = normalData(messagesArr)

        return newState

      }
      case LOAD_EDIT:{
        const newState = {...state}
        let newMessage = action.payload

        if(newMessage) newState.messages[newMessage.id] = newMessage

        return newState

      }
      default:
        return state;
    }
  }

  export default messageReducer;