import { isValidYoutubeChannelLink } from "~/lib/utils";

describe("validate youtube link", () => {
  it("should validate youtube link correctly", () => {
    expect(isValidYoutubeChannelLink("test")).toBe(false);
    expect(isValidYoutubeChannelLink("https://youtube.com/@test")).toBe(true);
  });
});
