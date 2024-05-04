import { LoaderFunctionArgs, json } from "@remix-run/node";
import { loader, action } from "../routes/_index";

describe("first", () => {
  it("Basic loader", () => {
    expect(loader({} as LoaderFunctionArgs)).toStrictEqual({
      name: "Welcome to the RSS subscriber",
    });
  });

  describe("youtube link", () => {
    it("should not be empty", async () => {
      const response = await action(buildExampleActionArgs(""));
      const txt = await response.text();
      expect(txt).toEqual(
        await json({
          error: "Youtube Channel Link is required",
          rssLink: "",
        }).text()
      );
    });

    it("should be valid", async () => {
      const response = await action(buildExampleActionArgs("invalid url"));
      const txt = await response.text();
      expect(txt).toEqual(
        await json({
          error: "Invalid Youtube Channel Link",
          rssLink: "",
        }).text()
      );
    });
  });
});

function buildExampleActionArgs(url: string) {
  const fd = new FormData();
  fd.set("youtubeChannelLink", url);
  const req = new Request("http://link.com");
  return {
    request: {
      ...req,
      formData: () =>
        Promise.resolve({
          get: (key: string) => fd.get(key),
        } as FormData),
    },
    params: {},
    context: {},
  };
}
