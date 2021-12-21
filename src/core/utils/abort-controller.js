/* leny/triton
 *
 * /src/core/utils/abort-controller.js
 */

let instance;

export const controller = () => (instance = new AbortController());

export const abort = () => instance.abort();
