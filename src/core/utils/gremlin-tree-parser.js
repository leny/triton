/* leny/triton
 *
 * /src/core/utils/gremlin-tree-parser.js
 */

export const gremlinTreeParser = tree => {
    const vertices = [];
    const edges = [];

    const parse = step => {
        const {"@type": type, "@value": value} = step;
        switch (type) {
            case "g:List":
                value.forEach(m => parse(m));
                break;
            case "g:Tree":
                value.forEach(m => {
                    parse(m.key);
                    parse(m.value);
                });
                break;
            case "g:Edge": {
                const {id, inV: to, outV: from, label, properties} = value;
                edges.push({id, from, to, label, properties});
                break;
            }
            case "g:Vertex": {
                const {id, label, properties} = value;
                vertices.push({id, label, properties});
                break;
            }
            default:
                console.log("---", type, value);
        }
    };

    parse(tree);

    return {vertices, edges};
};
