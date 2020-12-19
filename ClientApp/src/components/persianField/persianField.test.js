import React from "react";
import {render,unmountComponentAtNode } from "react-dom";
import {act} from "react-dom/test-utils";

import Persianfield from './persianfield'

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("render with props of type",()=>{
    act(()=>{
        render(<Persianfield />,container);
    });
    expect(container.textContent).toBe("hey,stranger");
})