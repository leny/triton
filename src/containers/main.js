/* leny/triton
 *
 * /src/containers/main.js
 */

import {DEBUG} from "core/constants";

import {useThunkedReducer} from "hooks/use-thunked-reducer";

import SettingsContainer from "./settings";
import GraphContainer from "./graph";

import {initState, reducer, StoreContext} from "store/index";

const {Provider: StoreContextProvider} = StoreContext;

const MainContainer = () => {
    const [state, dispatch] = useThunkedReducer(reducer, null, initState);
    DEBUG && console.log("DEBUG:state:", state);

    return (
        <StoreContextProvider value={{...state, dispatch}}>
            <SettingsContainer />
            <GraphContainer />
        </StoreContextProvider>
    );
};

export default MainContainer;
