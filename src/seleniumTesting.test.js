"use strict";

const { Locator, test, go, resize, click, l, type } = require('testim');

Locator.set(require('./locators/locators.js'));

test("untitled test", async () => {
  await go("http://localhost:3000/");
  await resize({width: 1024, height: 680});
  await click(l("Delete"));
  await click(l("RV0dA6ixmuTnjZgq"));
  await click(l("1vp0XNQGljB06kQn"));
  await type(l("1vp0XNQGljB06kQn"), 'mohammad');
  await click(l("RV0dA6ixmuTnjZgq"));
  await click(l("T5L0sd4EK9JLdodc"));
  await type(l("T5L0sd4EK9JLdodc"), 'beirut');
  await click(l("RV0dA6ixmuTnjZgq"));
  await click(l("1ua7Sx1cpj5km8OP"));
  await type(l("1ua7Sx1cpj5km8OP"), '12345');
  await click(l("RV0dA6ixmuTnjZgq"));
  await click(l("JtRGHYnR60B774dN"));
  await click(l("JvgyG7UyotIZpxf8"));
  await type(l("JvgyG7UyotIZpxf8"), '1212');
  await click(l("JtRGHYnR60B774dN"));
  // Converting a 'drag' step has to be done manually at this time
  await type(l("JvgyG7UyotIZpxf8"), '62c19a162ebab4b68b52cc9f');
  await click(l("JtRGHYnR60B774dN"));
  await click(l("nEcCg3bxhHwsChwr"));
  await click(l("9EhswX4igPfNJeGr"));
  await type(l("9EhswX4igPfNJeGr"), 'mhmd');
  await click(l("nEcCg3bxhHwsChwr"));
  await click(l("Enter_new_address"));
  await type(l("Enter_new_address"), 'marjeyoun');
  await click(l("nEcCg3bxhHwsChwr"));
  await click(l("Enter_new_mobile_number"));
  await type(l("Enter_new_mobile_number"), '123');
  await click(l("nEcCg3bxhHwsChwr"));
  await click(l("Name:_mhmd_Address:_marjeyoun_Mobil"));
});
