/* leny/triton
 *
 * /src/store/actions/discard-fetch.js
 */

import {abort} from "utils/abort-controller";
import {ACTION_FETCH_DISCARD} from "store/types";

export default () => dispatch => {
    abort();
    dispatch({type: ACTION_FETCH_DISCARD});
};
