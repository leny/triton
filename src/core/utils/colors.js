/* leny/triton
 *
 * /src/core/utils/colors.js
 */

import ColorScheme from "color-scheme";

let hue = 0;
let colors = new ColorScheme()
    .from_hue(hue)
    .scheme("tetrade")
    .variation("soft")
    .colors();

const registry = new Map();

export const getColorForLabel = label => {
    if (!registry.has(label)) {
        registry.set(label, `#${colors.pop()}`);
        if (colors.length === 0) {
            hue += 25;
            colors = new ColorScheme()
                .from_hue(hue)
                .scheme("tetrade")
                .variation("soft")
                .colors();
        }
    }
    return registry.get(label);
};
