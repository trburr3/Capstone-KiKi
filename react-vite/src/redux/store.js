import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import friendReducer from "./friends";
import postReducer from "./posts";
import translationReducer from "./translate";
import messageReducer from "./messages";
import learnerReducer from "./learners";

const rootReducer = combineReducers({
  session: sessionReducer,
  friends: friendReducer,
  posts: postReducer,
  translation: translationReducer,
  messages: messageReducer,
  learners:learnerReducer,
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
