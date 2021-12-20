/* leny/triton
 *
 * /src/containers/element.js
 */

import classnames from "classnames";
import {useMemo, useContext, useCallback, Fragment, useState} from "react";
import {StoreContext} from "store/index";
import {getColorForLabel} from "utils/colors";
import fetchVertexByUuid from "store/actions/fetch-vertex-by-uuid";
import {Button, Modal, ToastContainer, Toast} from "react-bootstrap";
import {ACTION_UNSELECT_ELEMENT} from "store/types";

const ElementContainer = () => {
    const {selectedElement, dispatch} = useContext(StoreContext);
    const [showDetails, setShowDetails] = useState(false);

    const handleCloseDetails = useCallback(() => {
        setShowDetails(false);
    }, [setShowDetails]);
    const handleShowDetails = useCallback(() => {
        setShowDetails(true);
    }, [setShowDetails]);

    const element = useMemo(() => {
        setShowDetails(false);
        if (!selectedElement) {
            return null;
        }

        return {
            type: selectedElement.type,
            label: selectedElement.element.label,
            id: selectedElement.id,
            properties: selectedElement.element.properties,
        };
    }, [selectedElement, setShowDetails]);

    const handleFetchChilds = useCallback(
        e => {
            e.preventDefault();
            dispatch({type: ACTION_UNSELECT_ELEMENT});
            dispatch(fetchVertexByUuid(element.id));
        },
        [dispatch, element],
    );

    if (!element) {
        return null;
    }

    return (
        <>
            <ToastContainer
                position={"bottom-end"}
                className={classnames("p-3")}>
                <Toast>
                    <Toast.Header closeButton={false}>
                        <span
                            className={classnames(
                                "rounded",
                                "me-2",
                                "d-inline-block",
                            )}
                            style={{
                                width: 14,
                                height: 14,
                                background: getColorForLabel(element.label),
                            }}
                        />
                        <strong className={"me-auto"}>{element.label}</strong>
                        <small>
                            {element.type === "node" ? "Vertex" : "Edge"}
                        </small>
                    </Toast.Header>
                    <Toast.Body>
                        <small className={classnames("d-block")}>
                            <strong>{"Id:"}</strong>{" "}
                            <code className={"text-info"}>{element.id}</code>
                        </small>
                        <div
                            className={classnames(
                                "d-flex",
                                "justify-content-between",
                                "mt-2",
                            )}>
                            <Button
                                type={"button"}
                                size={"sm"}
                                variant={"info"}
                                onClick={handleShowDetails}>
                                {"show details"}
                            </Button>
                            <Button
                                type={"button"}
                                size={"sm"}
                                variant={"secondary"}
                                disabled={element.type !== "node"}
                                onClick={handleFetchChilds}>
                                {"fetch childs"}
                            </Button>
                        </div>
                    </Toast.Body>
                </Toast>
            </ToastContainer>
            <Modal
                centered
                size={"lg"}
                show={showDetails}
                onHide={handleCloseDetails}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span
                            className={classnames(
                                "rounded",
                                "me-2",
                                "d-inline-block",
                            )}
                            style={{
                                width: 16,
                                height: 16,
                                background: getColorForLabel(element.label),
                            }}
                        />
                        {`${element.label}(${element.id})`}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div
                        className={classnames("overflow-auto")}
                        style={{height: "50vh"}}>
                        <dl>
                            {Object.entries(element.properties).map(
                                ([key, value]) => (
                                    <Fragment key={key}>
                                        <dt>{key}</dt>
                                        <dd>
                                            <code className={"text-info"}>
                                                {`${value}`}
                                            </code>
                                        </dd>
                                    </Fragment>
                                ),
                            )}
                        </dl>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type={"button"}
                        size={"sm"}
                        variant={"secondary"}
                        disabled={element.type !== "node"}
                        onClick={handleFetchChilds}>
                        {"fetch childs"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ElementContainer;
