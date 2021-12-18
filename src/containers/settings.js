/* leny/triton
 *
 * /src/containers/settings.js
 */

import {useCallback, useState, useContext} from "react";
import {StoreContext} from "store/index";
import fetchVertexByUuid from "store/actions/fetch-vertex-by-uuid";

const SettingsContainer = () => {
    const {dispatch, fetching} = useContext(StoreContext);
    const [vertexUid, setVertexUid] = useState("");
    const handleSubmit = useCallback(
        e => {
            e.preventDefault();
            dispatch(fetchVertexByUuid(vertexUid));
        },
        [vertexUid],
    );

    return (
        <form action={"#"} id={"settings"} onSubmit={handleSubmit}>
            <fieldset>
                <legend>{"Settings"}</legend>
                <div>
                    <label htmlFor={"vertex-uid"}>{"Fetch vertex:"}</label>
                    <input
                        type={"text"}
                        name={"vertex-uid"}
                        id={"vertex-uid"}
                        placeholder={"Vertex UUID"}
                        value={vertexUid}
                        onChange={e => {
                            setVertexUid(e.currentTarget.value);
                        }}
                    />
                </div>
                <button type={"submit"} disabled={fetching}>
                    {fetching ? "Fetching vertex…" : "Fetch vertex"}
                </button>
            </fieldset>
        </form>
    );
};

export default SettingsContainer;
