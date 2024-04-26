import { LoaderFunctionArgs } from "@remix-run/node";
import { loader } from "../routes/_index";

describe("first", () => {
  it("works", () => {
    expect(loader({} as LoaderFunctionArgs)).toStrictEqual({
      name: "New Remix App",
    });
  });
});
