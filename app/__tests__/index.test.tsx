import { LoaderFunctionArgs } from "@remix-run/node";
import { loader } from "../routes/_index";

describe("first", () => {
  it("Basic loader", () => {
    expect(loader({} as LoaderFunctionArgs)).toStrictEqual({
      name: "Welcome to the RSS updater",
    });
  });
});
