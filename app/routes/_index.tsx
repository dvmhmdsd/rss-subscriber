import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "RSS Updater" },
    {
      name: "description",
      content:
        "An RSS reader service that gets the RSS link from youtube channel and lists all the videos of your favorite channel",
    },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1 className="text-3xl font-bold underline text-center my-4">Welcome to the RSS updater</h1>
    </div>
  );
}
