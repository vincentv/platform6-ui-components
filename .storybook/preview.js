import { addParameters } from "@storybook/html";

addParameters({
  a11y: {
    element: "#root",
    config: {},
    options: {},
    manual: true,
  },
});

export const parameters = {
  controls: { expanded: true },
};
