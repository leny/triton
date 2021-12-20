/* leny/triton
 *
 * /src/store/index.js
 */

import {DEBUG} from "core/constants";
import {
    ACTION_CLEAR_ALL,
    ACTION_FETCH_VERTEX,
    ACTION_PARSE_TREE_RESPONSE,
    ACTION_SELECT_ELEMENT,
    ACTION_UNSELECT_ELEMENT,
} from "./types";

import uniqBy from "lodash.uniqby";
import {createContext} from "react";

export const StoreContext = createContext();

export const initState = () => ({
    fetching: false,
    drawing: false,
    nodes: [],
    edges: [],
    selectedElement: null,
    graphConfiguration: {
        layout: {improvedLayout: false},
        interaction: {
            hideEdgesOnDrag: true,
            tooltipDelay: 100,
            selectConnectedEdges: false,
        },
        nodes: {
            shape: "dot",
            font: {
                size: 12,
                face: "Tahoma",
            },
            size: 10,
        },
        edges: {
            color: {inherit: true},
            width: 0.15,
            smooth: {
                type: "continuous",
            },
            arrows: {to: {enabled: true, scaleFactor: 0.6}},
        },
        physics: {
            solver: "forceAtlas2Based",
        },
    },
});

const reducersMap = new Map();

reducersMap.set(ACTION_CLEAR_ALL, () => initState());

reducersMap.set(ACTION_FETCH_VERTEX, state => ({...state, fetching: true}));

reducersMap.set(ACTION_PARSE_TREE_RESPONSE, (state, {nodes, edges}) => ({
    ...state,
    fetching: false,
    nodes: uniqBy([...state.nodes, ...nodes], "id"),
    edges: uniqBy([...state.edges, ...edges], "id"),
}));

reducersMap.set(ACTION_SELECT_ELEMENT, (state, {target, id}) => ({
    ...state,
    selectedElement: {
        type: target,
        id,
        element: state[target === "node" ? "nodes" : "edges"].find(
            elt => elt.id === id,
        ),
    },
}));
reducersMap.set(ACTION_UNSELECT_ELEMENT, state => ({
    ...state,
    selectedElement: null,
}));

export const reducer = (state, {type, ...payload}) => {
    DEBUG && console.log("DEBUG:reducer:", {type, payload});

    return reducersMap.has(type)
        ? reducersMap.get(type)(state, payload)
        : state;
};
