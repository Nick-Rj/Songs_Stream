import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || composeWithDevTools;

// const Store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );

const Store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default Store;
