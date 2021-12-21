/* leny/triton
 *
 * /src/containers/progress.js
 */

import classnames from "classnames";
import {useContext, useCallback} from "react";
import {StoreContext} from "store/index";
import discardFetch from "store/actions/discard-fetch";
import {ProgressBar, Button, Modal} from "react-bootstrap";

const ProgressContainer = () => {
    const {
        fetching,
        drawing,
        batches: {elements, current, total} = {},
        dispatch,
    } = useContext(StoreContext);

    const handleDiscardFetch = useCallback(() => {
        dispatch(discardFetch());
    }, [dispatch]);

    if (!fetching && !drawing) {
        return null;
    }

    return (
        <Modal centered size={"m"} show>
            <Modal.Header>
                <Modal.Title>
                    {`${drawing ? "Drawing" : "Fetching"} vertices…`}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {fetching && (
                    <p>
                        {elements == null
                            ? `Counting elements…`
                            : `There's ${elements} elements to fetch. This can take some time…`}
                    </p>
                )}
                {fetching && elements != null && (
                    <>
                        <div
                            className={classnames(
                                "d-flex",
                                "mb-3",
                                "align-items-center",
                                "justify-content-between",
                            )}>
                            <ProgressBar
                                className={classnames("me-1", "flex-fill")}
                                animated={fetching}
                                striped={fetching}
                                now={current}
                                max={total}
                                variant={"info"}
                            />
                            <small>{`batch ${current}/${total}`}</small>
                        </div>
                        <div className={classnames("text-center")}>
                            <Button
                                type={"button"}
                                size={"sm"}
                                variant={"outline-info"}
                                onClick={handleDiscardFetch}>
                                {"discard"}
                            </Button>
                        </div>
                    </>
                )}
                {drawing && (
                    <>
                        <ProgressBar
                            className={classnames("mb-1")}
                            animated={drawing}
                            striped={drawing}
                            variant={"warning"}
                            now={drawing ? 100 : 0}
                            max={100}
                        />

                        <small>
                            {
                                "Regarding of the amount of elements to display, the drawing step can take some time."
                            }
                        </small>
                    </>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default ProgressContainer;
