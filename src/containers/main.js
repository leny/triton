/* leny/triton
 *
 * /src/containers/main.js
 */

import {useCallback, useState} from "react";

import SettingsContainer from "./settings";
import GraphContainer from "./graph";

const MainContainer = () => {
    // TODO: use context for settings
    const [startPointId, setStartPointId] = useState(null);
    const handleChangeStartPoint = useCallback(s => {
        setStartPointId(s);
    });

    return (
        <>
            <SettingsContainer onChangeStartPoint={handleChangeStartPoint} />
            <GraphContainer startPointId={startPointId} />
        </>
    );
};

export default MainContainer;
