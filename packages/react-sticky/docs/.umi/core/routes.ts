// @ts-nocheck
import React from "react";
import { ApplyPluginsType } from "F:/codes/react-sticky/node_modules/@umijs/runtime";
import * as umiExports from "./umiExports";
import { plugin } from "./plugin";

export function getRoutes() {
  const routes = [
    {
      path: "/~demos/:uuid",
      layout: false,
      wrappers: [
        require("F:/codes/react-sticky/node_modules/@umijs/preset-dumi/lib/theme/layout")
          .default,
      ],
      component: (props) => {
        const {
          default: getDemoRenderArgs,
        } = require("F:/codes/react-sticky/node_modules/@umijs/preset-dumi/lib/plugins/features/demo/getDemoRenderArgs");
        const {
          default: Previewer,
        } = require("dumi-theme-default/es/builtins/Previewer.js");
        const { default: demos } = require("@@/dumi/demos");
        const { usePrefersColor } = require("dumi/theme");

        const renderArgs = getDemoRenderArgs(props, demos);

        // for listen prefers-color-schema media change in demo single route
        usePrefersColor();

        switch (renderArgs.length) {
          case 1:
            // render demo directly
            return renderArgs[0];

          case 2:
            // render demo with previewer
            return React.createElement(Previewer, renderArgs[0], renderArgs[1]);

          default:
            return `Demo ${props.match.params.uuid} not found :(`;
        }
      },
    },
    {
      path: "/_demos/:uuid",
      redirect: "/~demos/:uuid",
    },
    {
      __dumiRoot: true,
      layout: false,
      path: "/",
      wrappers: [
        require("F:/codes/react-sticky/node_modules/@umijs/preset-dumi/lib/theme/layout")
          .default,
        require("F:/codes/react-sticky/node_modules/dumi-theme-default/es/layout.js")
          .default,
      ],
      routes: [
        {
          path: "/",
          component: require("F:/codes/react-sticky/src/readme.md").default,
          exact: true,
          meta: {
            filePath: "src/readme.md",
            updatedTime: 1635152741000,
            slugs: [
              {
                depth: 1,
                value: "Sticky",
                heading: "sticky",
              },
              {
                depth: 2,
                value: "概览 & 实例",
                heading: "概览--实例",
              },
              {
                depth: 2,
                value: "render 入参",
                heading: "render-入参",
              },
              {
                depth: 3,
                value: "完整实例",
                heading: "完整实例",
              },
              {
                depth: 3,
                value: "<StickyContainer /> Props",
                heading: "stickycontainer--props",
              },
              {
                depth: 3,
                value: "<Sticky /> Props",
                heading: "sticky--props",
              },
              {
                depth: 4,
                value: "relative (default: false)",
                heading: "relative-default-false",
              },
              {
                depth: 4,
                value: "topOffset (default: 0)",
                heading: "topoffset-default-0",
              },
              {
                depth: 4,
                value: "bottomOffset (default: 0)",
                heading: "bottomoffset-default-0",
              },
              {
                depth: 4,
                value: "disableCompensation (default: false)",
                heading: "disablecompensation-default-false",
              },
              {
                depth: 4,
                value: "disableHardwareAcceleration (default: false)",
                heading: "disablehardwareacceleration-default-false",
              },
              {
                depth: 1,
                value: "Hooks 钩子",
                heading: "hooks-钩子",
              },
              {
                depth: 2,
                value: "useSticky",
                heading: "usesticky",
              },
              {
                depth: 3,
                value: "Demo",
                heading: "demo",
              },
            ],
            title: "Sticky",
          },
          title: "Sticky - sticky-hook",
        },
        {
          path: "/readme_en",
          component: require("F:/codes/react-sticky/src/readme_en.md").default,
          exact: true,
          meta: {
            filePath: "src/readme_en.md",
            updatedTime: 1635152741000,
            slugs: [
              {
                depth: 1,
                value: "react-sticky",
                heading: "react-sticky",
              },
              {
                depth: 2,
                value: "Overview & Basic Example",
                heading: "overview--basic-example",
              },
              {
                depth: 3,
                value: "Full Example",
                heading: "full-example",
              },
              {
                depth: 3,
                value: "<StickyContainer /> Props",
                heading: "stickycontainer--props",
              },
              {
                depth: 3,
                value: "<Sticky /> Props",
                heading: "sticky--props",
              },
              {
                depth: 4,
                value: "relative (default: false)",
                heading: "relative-default-false",
              },
              {
                depth: 4,
                value: "topOffset (default: 0)",
                heading: "topoffset-default-0",
              },
              {
                depth: 4,
                value: "bottomOffset (default: 0)",
                heading: "bottomoffset-default-0",
              },
              {
                depth: 4,
                value: "disableCompensation (default: false)",
                heading: "disablecompensation-default-false",
              },
              {
                depth: 4,
                value: "disableHardwareAcceleration (default: false)",
                heading: "disablehardwareacceleration-default-false",
              },
              {
                depth: 2,
                value: "useSticky",
                heading: "usesticky",
              },
              {
                depth: 3,
                value: "Demo",
                heading: "demo",
              },
              {
                depth: 2,
                value: "FAQ",
                heading: "faq",
              },
              {
                depth: 3,
                value: "I get errors while using React.Fragments",
                heading: "i-get-errors-while-using-reactfragments",
              },
            ],
            title: "react-sticky",
          },
          title: "react-sticky - sticky-hook",
        },
      ],
      title: "sticky-hook",
      component: (props) => props.children,
    },
  ];

  // allow user to extend routes
  plugin.applyPlugins({
    key: "patchRoutes",
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
