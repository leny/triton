/* leny/triton
 *
 * /src/components/toolbar/fetch-vertex-popover.js
 */

import classnames from "classnames";
import {useCallback, useState, useContext, useEffect} from "react";
import {StoreContext} from "store/index";
import fetchVertexByUuid from "store/actions/fetch-vertex-by-uuid";

import {
    Form,
    FormControl,
    Button,
    OverlayTrigger,
    Popover,
} from "react-bootstrap";

const FetchVertexPopover = () => {
    const {dispatch, fetching, nodes} = useContext(StoreContext);
    const [vertexUid, setVertexUid] = useState("");
    const [showFetchPopover, setShowFetchPopover] = useState(false);
    const handleSubmitFetchVertex = useCallback(
        e => {
            e.preventDefault();
            dispatch(fetchVertexByUuid(vertexUid));
        },
        [vertexUid, dispatch],
    );

    useEffect(() => {
        setShowFetchPopover(nodes.length === 0);
    }, [nodes, setShowFetchPopover]);

    const vertexFetchingPopover = (
        <Popover className={classnames("w-75")}>
            <Popover.Header as={"h3"}>{"Fetch Vertex by UUID"}</Popover.Header>
            <Popover.Body>
                <Form onSubmit={handleSubmitFetchVertex}>
                    <FormControl
                        type={"text"}
                        className={"mb-2"}
                        placeholder={"Vertex UUID"}
                        size={"sm"}
                        value={vertexUid}
                        onChange={e => setVertexUid(e.currentTarget.value)}
                    />
                    <Button
                        variant={"outline-primary"}
                        disabled={fetching}
                        type={"submit"}
                        className={classnames("w-100")}
                        size={"sm"}>
                        {fetching ? "Fetching vertex…" : "Fetch vertex"}
                    </Button>
                </Form>
            </Popover.Body>
        </Popover>
    );

    return (
        <OverlayTrigger
            trigger={"click"}
            placement={"bottom"}
            show={showFetchPopover}
            onToggle={() => setShowFetchPopover(!showFetchPopover)}
            overlay={vertexFetchingPopover}>
            <Button variant={"secondary"} size={"sm"}>
                {"Fetch vertex"}
            </Button>
        </OverlayTrigger>
    );
};

export default FetchVertexPopover;
