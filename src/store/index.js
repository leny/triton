/* leny/triton
 *
 * /src/store/index.js
 */

import {DEBUG} from "core/constants";
import {
    ACTION_CLEAR_ALL,
    ACTION_FETCH_VERTEX,
    ACTION_PARSE_TREE_RESPONSE,
} from "./types";

import uniqBy from "lodash.uniqby";
import {createContext} from "react";

export const StoreContext = createContext();

export const initState = () => ({
    fetching: false,
    nodes: [],
    edges: [],
});

const reducersMap = new Map();

reducersMap.set(ACTION_CLEAR_ALL, () => initState());

reducersMap.set(ACTION_FETCH_VERTEX, state => ({...state, fetching: true}));

reducersMap.set(ACTION_PARSE_TREE_RESPONSE, (state, {nodes, edges}) => ({
    ...state,
    nodes: uniqBy([...state.nodes, ...nodes], "id"),
    edges: uniqBy([...state.edges, ...edges], "id"),
}));

export const reducer = (state, {type, ...payload}) => {
    DEBUG && console.log("DEBUG:reducer:", {type, payload});

    return reducersMap.has(type)
        ? reducersMap.get(type)(state, payload)
        : state;
};
