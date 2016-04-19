import test from "ava";
// import sinon from 'sinon';
import { handleDropdownEvents } from "../src/index.js";

test("", t => {
    // const onUserBlur = sinon.spy();
    // const input = render(
    //     React.createElement(CustomInput, {onUserBlur),
    //     div
    // )

    // Simulate.blur(input);

    // t.true(onUserBlur.calledOnce);
  console.log(document)
  t.true(typeof handleDropdownEvents === "function");
});
