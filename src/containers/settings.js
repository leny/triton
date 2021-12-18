/* leny/triton
 *
 * /src/containers/settings.js
 */

import {useCallback, useState} from "react";

const SettingsContainer = ({onChangeStartPoint}) => {
    const [startPointId, setStartPointId] = useState("");
    const handleSubmit = useCallback(
        e => {
            e.preventDefault();
            onChangeStartPoint(startPointId);
        },
        [onChangeStartPoint, startPointId],
    );

    return (
        <form action={"#"} id={"settings"} onSubmit={handleSubmit}>
            <fieldset>
                <legend>{"Settings"}</legend>
                <div>
                    <label htmlFor={"start-point"}>{"Start point uuid:"}</label>
                    <input
                        type={"text"}
                        name={"start-point"}
                        id={"start-point"}
                        value={startPointId}
                        onChange={e => {
                            setStartPointId(e.currentTarget.value);
                        }}
                    />
                </div>
                <button type={"submit"}>{"Load"}</button>
            </fieldset>
        </form>
    );
};

export default SettingsContainer;
