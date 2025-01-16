import { csrfFetch } from "./csrf";

const LOAD_CONVERSATIONS = 'messages/loadConversations';
const LOAD_MESSAGES = 'messages/loadMessages';
const LOAD_EDIT = 'messages/loadEdit';

const loadAllConversations = (payload) => ({
  type: LOAD_CONVERSATIONS,
  payload
});

const loadAllMessages = (payload) => ({
    type: LOAD_MESSAGES,
    payload
  });

  const loadEdit = (payload) => ({
    type: LOAD_EDIT,
    payload
  });

  export const thunkGetAllConversations = () => async dispatch => {
    const response = await csrfFetch(`/api/conversations/`);

    if(response.ok) {
      const data = await response.json();
      dispatch(loadAllConversations(data['Conversations']));
    } else if (response.status < 500) {
      const errorMessages = await response.json();
      return errorMessages
    } else {
      return { server: "Something went wrong. Please try again" }
    }
  };

  export const thunkDeleteConversation = (conversationId) => async dispatch => {
    const response = await csrfFetch(`/api/conversations/${conversationId}`, {
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

  export const thunkEditConversation = (conversation) => async dispatch => {
    const response = await csrfFetch(`/api/conversations/${conversation.id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(conversation)
    });

    if(response.ok) {
      const newMessage = await response.json();
      // console.log('WHO AM I?', newMessage)
      // dispatch(loadEdit(newMessage));
      window.location.reload()
    } else if (response.status < 500) {
      const errorMessages = await response.text();
      return errorMessages
    } else {
      return { server: "Something went wrong. Please try again" }
    }
  };

  export const thunkCreateConversation = (conversation) => async dispatch => {
    const response = await csrfFetch(`/api/conversations/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(conversation)
    });

    if(response.ok) {
      const data = await response.json();
      // dispatch(loadAllMessages(data['Conversations']));
      // dispatch(newConversation(conversation))
    } else if (response.status < 500) {
      const errorMessages = await response.json();
      return errorMessages
    } else {
      return { server: "Something went wrong. Please try again" }
    }
  };


  export const thunkGetAllMessages = (conversationId) => async dispatch => {
    const response = await csrfFetch(`/api/conversations/${conversationId}/messages/`);

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

  export const thunkDeleteMessage = (conversationId, messageId) => async dispatch => {
    const response = await csrfFetch(`/api/conversations/${conversationId}/messages/${messageId}`, {
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

  export const thunkEditMessage = (conversationId, messageId, payload) => async dispatch => {
    const response = await csrfFetch(`/api/conversations/${conversationId}/messages/${messageId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if(response.ok) {
      const newMessage = await response.json();
      console.log('WHO AM I?', newMessage)
      // dispatch(loadEdit(newMessage));
      window.location.reload()
    } else if (response.status < 500) {
      const errorMessages = await response.text();
      return errorMessages
    } else {
      return { server: "Something went wrong. Please try again" }
    }
  };

  export const thunkCreateMessage = (conversationId, message) => async dispatch => {
    const response = await csrfFetch(`/api/conversations/${conversationId}/messages`, {
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
    data.forEach((element) => {
        normalData[element.id] = element
    })

    return normalData
  };

  const initialState = { conversations: {}, messages: {} }

  function messageReducer(state = initialState, action) {
    switch (action.type) {
      case LOAD_CONVERSATIONS:{
        const newState = {...state}
        let conversationsArr = action.payload

        if(conversationsArr) newState.conversations = normalData(conversationsArr)

        return newState

      }
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