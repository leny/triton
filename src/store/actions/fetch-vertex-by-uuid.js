/* leny/triton
 *
 * /src/store/actions/fetch-vertex-by-uuid.js
 */

import {controller} from "utils/abort-controller";
import {
    ACTION_FETCH_COUNT,
    ACTION_FETCH_PROGRESS,
    ACTION_PARSE_TREE_RESPONSE,
} from "store/types";
import ky from "ky";
import {gremlinTreeParser} from "utils/gremlin-tree-parser";

const BATCH_SIZE = 250;

export default (uid, parent = false) =>
    async dispatch => {
        dispatch({type: ACTION_FETCH_COUNT});
        const {
            result: {data: countData},
        } = await ky
            .post(`https://localhost:8183/gremlin`, {
                json: {
                    gremlin: `g.V('${uid}')${
                        parent ? ".inE()" : ".outE()"
                    }.count()`,
                },
                timeout: false,
            })
            .json();
        const count = countData["@value"][0]["@value"];

        if (count === 0) {
            dispatch({
                type: ACTION_PARSE_TREE_RESPONSE,
                nodes: [],
                edges: [],
            });
            return;
        }

        const batches = Array.from(
            new Array(Math.ceil(count / BATCH_SIZE)).keys(),
        );
        dispatch({
            type: ACTION_FETCH_PROGRESS,
            elements: count,
            current: 0,
            total: batches.length,
        });

        const vertices = [],
            edges = [];

        try {
            await batches.reduce(async (prev, i) => {
                await prev;
                const {result: {data} = {}} = await ky
                    .post(`https://localhost:8183/gremlin`, {
                        json: {
                            gremlin: `g.V('${uid}')${
                                parent ? ".inE()" : ".outE()"
                            }.range(${i * BATCH_SIZE}, ${
                                i * BATCH_SIZE + BATCH_SIZE
                            })`,
                        },
                        timeout: false,
                        signal: controller().signal,
                    })
                    .json();
                const parsed = gremlinTreeParser(data);
                vertices.push(...parsed.vertices);
                edges.push(...parsed.edges);

                dispatch({
                    type: ACTION_FETCH_PROGRESS,
                    elements: count,
                    current: i + 1,
                    total: batches.length,
                });

                return Promise.resolve(true);
            }, Promise.resolve(true));
        } catch {
            // fail silently
        }

        dispatch({
            type: ACTION_PARSE_TREE_RESPONSE,
            nodes: vertices,
            edges,
        });
    };
