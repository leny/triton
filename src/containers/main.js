/* leny/triton
 *
 * /src/containers/main.js
 */

import {DEBUG} from "core/constants";

import {useThunkedReducer} from "hooks/use-thunked-reducer";

import ToolbarContainer from "./toolbar";
import GraphContainer from "./graph";
import ElementContainer from "./element";

import {initState, reducer, StoreContext} from "store/index";

const {Provider: StoreContextProvider} = StoreContext;

const MainContainer = () => {
    const [state, dispatch] = useThunkedReducer(reducer, null, initState);
    DEBUG && console.log("DEBUG:state:", state);

    return (
        <StoreContextProvider value={{...state, dispatch}}>
            <ToolbarContainer />
            <GraphContainer />
            <ElementContainer />
        </StoreContextProvider>
    );
};

export default MainContainer;
