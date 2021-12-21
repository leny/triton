/* leny/triton
 *
 * /src/store/index.js
 */

import {DEBUG} from "core/constants";
import {
    ACTION_CLEAR_ALL,
    ACTION_FETCH_COUNT,
    ACTION_FETCH_PROGRESS,
    ACTION_PARSE_TREE_RESPONSE,
    ACTION_SELECT_ELEMENT,
    ACTION_UNSELECT_ELEMENT,
    ACTION_DRAWING_DONE,
    ACTION_FETCH_DISCARD,
} from "./types";

import uniqBy from "lodash.uniqby";
import {createContext} from "react";

export const StoreContext = createContext();

export const initState = () => ({
    fetching: false,
    batches: {
        elements: null,
        current: null,
        total: null,
    },
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

reducersMap.set(ACTION_FETCH_COUNT, state => ({
    ...state,
    fetching: true,
    batches: {elements: null, current: null, total: null},
}));

reducersMap.set(ACTION_FETCH_PROGRESS, (state, {elements, current, total}) => ({
    ...state,
    batches: {elements, current, total},
}));

reducersMap.set(ACTION_PARSE_TREE_RESPONSE, (state, {nodes, edges}) => ({
    ...state,
    fetching: false,
    drawing: true,
    nodes: uniqBy([...state.nodes, ...nodes], "id"),
    edges: uniqBy([...state.edges, ...edges], "id"),
}));

reducersMap.set(ACTION_DRAWING_DONE, state => ({
    ...state,
    drawing: false,
    batches: {},
}));

reducersMap.set(ACTION_FETCH_DISCARD, state => state);

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
