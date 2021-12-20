/* leny/triton
 *
 * /src/core/hooks/use-thunked-reducer.js
 */

import {useReducer, useMemo} from "react";

export const useThunkedReducer = (...props) => {
    const [state, dispatch] = useReducer(...props);
    const thunkedDispatch = useMemo(
        () => action => {
            if (typeof action === "function") {
                action(thunkedDispatch);
            } else {
                dispatch(action);
            }
        },
        [dispatch],
    );

    return [state, thunkedDispatch];
};
