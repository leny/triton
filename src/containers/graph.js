/* leny/triton
 *
 * /src/containers/graph.js
 */

import {useRef, useEffect, useContext, useCallback} from "react";
import {StoreContext} from "store/index";
import {Network} from "vis-network";
import {getColorForLabel} from "utils/colors";
import {
    ACTION_SELECT_ELEMENT,
    ACTION_UNSELECT_ELEMENT,
    ACTION_DRAWING_DONE,
} from "store/types";

const GraphContainer = () => {
    const {nodes, edges, graphConfiguration, dispatch} =
        useContext(StoreContext);
    const container = useRef(null);
    const network = useRef(null);

    const handleDeselect = useCallback(
        () => dispatch({type: ACTION_UNSELECT_ELEMENT}),
        [dispatch],
    );

    const handleSelectNode = useCallback(
        ({nodes: selection}) => {
            // TODO: handle multi-select
            if (selection.length === 1) {
                dispatch({
                    type: ACTION_SELECT_ELEMENT,
                    target: "node",
                    id: selection[0],
                });
            } else {
                dispatch({type: ACTION_UNSELECT_ELEMENT});
            }
        },
        [dispatch],
    );

    const handleSelectEdge = useCallback(
        ({edges: selection}) => {
            // TODO: handle multi-select
            if (selection.length === 1) {
                dispatch({
                    type: ACTION_SELECT_ELEMENT,
                    target: "edge",
                    id: selection[0],
                });
            } else {
                dispatch({type: ACTION_UNSELECT_ELEMENT});
            }
        },
        [dispatch],
    );

    const handleDrawingFinished = useCallback(
        () => dispatch({type: ACTION_DRAWING_DONE}),
        [dispatch],
    );

    useEffect(() => {
        if (nodes.length === 0 && edges.length === 0) {
            return;
        }

        const {width, height} = container.current.getBoundingClientRect();

        network.current = new Network(
            container.current,
            {
                nodes: nodes.map(node => ({
                    ...node,
                    _label: node.label,
                    label: "",
                    title: `${node.label}(${node.id})`,
                    color: getColorForLabel(node.label),
                })),
                edges: edges.map(edge => ({
                    ...edge,
                    _label: edge.label,
                    label: "",
                    title: `${edge.label}(${edge.id})`,
                })),
            },
            {
                width: `${Math.floor(width)}px`,
                height: `${Math.floor(height)}px`,
                ...graphConfiguration,
            },
        );

        network.current.on("selectNode", handleSelectNode);
        network.current.on("deselectNode", handleDeselect);
        network.current.on("selectEdge", handleSelectEdge);
        network.current.on("deselectEdge", handleDeselect);
        network.current.once("afterDrawing", handleDrawingFinished);

        network.current.stabilize();
    }, [
        nodes,
        edges,
        graphConfiguration,
        container,
        handleSelectNode,
        handleDeselect,
    ]);

    return <div id={"graph"} ref={container} />;
};

export default GraphContainer;
