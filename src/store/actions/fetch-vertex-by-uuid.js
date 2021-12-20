/* leny/triton
 *
 * /src/store/actions/fetch-vertex-by-uuid.js
 */

import {ACTION_FETCH_VERTEX, ACTION_PARSE_TREE_RESPONSE} from "store/types";
import ky from "ky";
import {gremlinTreeParser} from "utils/gremlin-tree-parser";

export default uid => async dispatch => {
    dispatch({type: ACTION_FETCH_VERTEX});
    const {result: {data} = {}} = await ky
        .post(`https://localhost:8183/gremlin`, {
            json: {
                gremlin: `g.V('${uid}').outE().inV().tree()`,
            },
        })
        .json();
    const {vertices, edges} = gremlinTreeParser(data);

    dispatch({
        type: ACTION_PARSE_TREE_RESPONSE,
        nodes: vertices,
        edges,
    });
};
