
export interface DataType {
  id: number;
  name: string;
  type: "folder" | "file";
  children?: DataType[];
}

export const fileExplorerData: DataType = {
  id: 1,
  name: "FileExplorer",
  type: "folder",
  children: [
    {
      id: 2,
      name: "src",
      type: "folder",
      children: [
        {
          id: 3,
          name: "assets",
          type: "folder",
          children: [
            {
              id: 4,
              name: "images",
              type: "folder",
              children: [
                {
                  id: 5,
                  name: "logo.png",
                  type: "file",
                },
                {
                  id: 6,
                  name: "backgrounds",
                  type: "folder",
                  children: [
                    {
                      id: 7,
                      name: "home.jpg",
                      type: "file",
                    },
                    {
                      id: 8,
                      name: "dashboard.jpg",
                      type: "file",
                    },
                  ],
                },
              ],
            },
            {
              id: 9,
              name: "fonts",
              type: "folder",
              children: [
                {
                  id: 10,
                  name: "Roboto-Regular.ttf",
                  type: "file",
                },
                {
                  id: 11,
                  name: "Roboto-Bold.ttf",
                  type: "file",
                },
              ],
            },
          ],
        },
        {
          id: 12,
          name: "components",
          type: "folder",
          children: [
            {
              id: 13,
              name: "common",
              type: "folder",
              children: [
                {
                  id: 14,
                  name: "Button",
                  type: "folder",
                  children: [
                    {
                      id: 15,
                      name: "Button.jsx",
                      type: "file",
                    },
                    {
                      id: 16,
                      name: "Button.css",
                      type: "file",
                    },
                  ],
                },
                {
                  id: 17,
                  name: "Modal",
                  type: "folder",
                  children: [
                    {
                      id: 18,
                      name: "Modal.jsx",
                      type: "file",
                    },
                    {
                      id: 19,
                      name: "Modal.test.js",
                      type: "file",
                    },
                  ],
                },
              ],
            },
            {
              id: 20,
              name: "pages",
              type: "folder",
              children: [
                {
                  id: 21,
                  name: "Home",
                  type: "folder",
                  children: [
                    {
                      id: 22,
                      name: "Home.jsx",
                      type: "file",
                    },
                    {
                      id: 23,
                      name: "Home.css",
                      type: "file",
                    },
                  ],
                },
                {
                  id: 24,
                  name: "Dashboard",
                  type: "folder",
                  children: [
                    {
                      id: 25,
                      name: "Dashboard.jsx",
                      type: "file",
                    },
                    {
                      id: 26,
                      name: "Dashboard.css",
                      type: "file",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 27,
          name: "hooks",
          type: "folder",
          children: [
            {
              id: 28,
              name: "useAuth.js",
              type: "file",
            },
            {
              id: 29,
              name: "useDebounce.js",
              type: "file",
            },
          ],
        },
        {
          id: 30,
          name: "utils",
          type: "folder",
          children: [
            {
              id: 31,
              name: "constants",
              type: "folder",
              children: [
                {
                  id: 32,
                  name: "api.js",
                  type: "file",
                },
                {
                  id: 33,
                  name: "routes.js",
                  type: "file",
                },
              ],
            },
            {
              id: 34,
              name: "helpers",
              type: "folder",
              children: [
                {
                  id: 35,
                  name: "dateHelper.js",
                  type: "file",
                },
                {
                  id: 36,
                  name: "stringHelper.js",
                  type: "file",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 37,
      name: "public",
      type: "folder",
      children: [
        {
          id: 38,
          name: "index.html",
          type: "file",
        },
        {
          id: 39,
          name: "favicon.ico",
          type: "file",
        },
      ],
    },
    {
      id: 40,
      name: "config",
      type: "folder",
      children: [
        {
          id: 41,
          name: "env",
          type: "folder",
          children: [
            {
              id: 42,
              name: ".env.dev",
              type: "file",
            },
            {
              id: 43,
              name: ".env.prod",
              type: "file",
            },
          ],
        },
        {
          id: 44,
          name: "webpack.config.js",
          type: "file",
        },
      ],
    },
    {
      id: 45,
      name: "package.json",
      type: "file",
    },
    {
      id: 46,
      name: "README.md",
      type: "file",
    },
  ],
};
