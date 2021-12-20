/* leny/triton
 *
 * /src/containers/settings.js
 */

import classnames from "classnames";
import {useContext} from "react";
import {StoreContext} from "store/index";

import {Container, Row, Col, ButtonGroup} from "react-bootstrap";

import FetchVertexPopover from "components/toolbar/fetch-vertex-popover";

const ToolbarContainer = () => {
    const {nodes, edges} = useContext(StoreContext);

    return (
        <Container
            fluid
            className={classnames("py-2", "border-bottom", "border-dark")}>
            <Row>
                <Col>
                    <ButtonGroup>
                        <FetchVertexPopover />
                    </ButtonGroup>
                </Col>
                <Col className={"text-end"}>
                    <small>{`${nodes.length} vertices, ${edges.length} edges`}</small>
                </Col>
            </Row>
        </Container>
    );
};

export default ToolbarContainer;
