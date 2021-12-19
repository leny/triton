/* leny/triton
 *
 * /src/containers/graph.js
 */

import {useRef, useEffect, useContext} from "react";
import {StoreContext} from "store/index";
import {Network} from "vis-network";
import {getColorForLabel} from "utils/colors";

const GraphContainer = () => {
    const {nodes, edges} = useContext(StoreContext);
    const $graph = useRef(null);
    const network = useRef(null);

    useEffect(() => {
        if (nodes.length === 0 && edges.length === 0) {
            return;
        }

        const {width, height} = $graph.current.getBoundingClientRect();

        network.current = new Network(
            $graph.current,
            {
                nodes: nodes.map(node => ({
                    ...node,
                    _label: node.label,
                    label: "",
                    color: getColorForLabel(node.label),
                })),
                edges: edges.map(edge => ({
                    ...edge,
                    _label: edge.label,
                    label: "",
                })),
            },
            {
                width: `${Math.floor(width)}px`,
                height: `${Math.floor(height)}px`,
                layout: {improvedLayout: false},
                interaction: {
                    hideEdgesOnDrag: true,
                    tooltipDelay: 200,
                },
                nodes: {
                    shape: "dot",
                    font: {
                        size: 12,
                        face: "Tahoma",
                    },
                    size: 7,
                },
                edges: {
                    color: {inherit: true},
                    width: 0.15,
                    smooth: {
                        type: "continuous",
                    },
                },
                physics: false,
            },
        );
    }, [nodes, edges, $graph]);

    return <div id={"graph"} ref={$graph} />;
};

export default GraphContainer;
