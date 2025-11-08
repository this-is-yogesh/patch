import { useState } from "react";
import "./App.css";
import type { dataType } from "./types/types";
import NestedComp from "./components/NestedFolder/NestedFolder";

function App() {
  const [count, setCount] = useState(0);
  const data: dataType[] = [
    {
      id: 1,
      name: "src",
      type: "folder",
      children: [
        {
          id: 2,
          name: "components",
          type: "folder",
          children: [
            {
              id: 3,
              name: "Header.js",
              type: "file",
              children: [],
            },
            {
              id: 4,
              name: "Footer.js",
              type: "file",
              children: [],
            },
            {
              id: 5,
              name: "ui",
              type: "folder",
              children: [
                {
                  id: 6,
                  name: "Button.js",
                  type: "file",
                  children: [],
                },
                {
                  id: 7,
                  name: "Modal.js",
                  type: "file",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 8,
          name: "pages",
          type: "folder",
          children: [
            {
              id: 9,
              name: "Home.js",
              type: "file",
              children: [],
            },
            {
              id: 10,
              name: "About.js",
              type: "file",
              children: [],
            },
            {
              id: 11,
              name: "dashboard",
              type: "folder",
              children: [
                {
                  id: 12,
                  name: "index.js",
                  type: "file",
                  children: [],
                },
                {
                  id: 13,
                  name: "Profile.js",
                  type: "file",
                  children: [],
                },
                {
                  id: 14,
                  name: "Settings.js",
                  type: "file",
                  children: [],
                },
              ],
            },
          ],
        },
        {
          id: 15,
          name: "utils",
          type: "folder",
          children: [
            {
              id: 16,
              name: "helpers.js",
              type: "file",
              children: [],
            },
            {
              id: 17,
              name: "constants.js",
              type: "file",
              children: [],
            },
          ],
        },
        {
          id: 18,
          name: "App.js",
          type: "file",
          children: [],
        },
        {
          id: 19,
          name: "index.js",
          type: "file",
          children: [],
        },
      ],
    },
    {
      id: 20,
      name: "public",
      type: "folder",
      children: [
        {
          id: 21,
          name: "images",
          type: "folder",
          children: [
            {
              id: 22,
              name: "logo.png",
              type: "file",
              children: [],
            },
            {
              id: 23,
              name: "banner.jpg",
              type: "file",
              children: [],
            },
          ],
        },
        {
          id: 24,
          name: "favicon.ico",
          type: "file",
          children: [],
        },
      ],
    },
    {
      id: 25,
      name: "package.json",
      type: "file",
      children: [],
    },
    {
      id: 26,
      name: "README.md",
      type: "file",
      children: [],
    },
  ];

  return (
    <>
      <NestedComp folderData={data} />
    </>
  );
}

export default App;
