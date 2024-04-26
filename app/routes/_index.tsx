import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

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

export const loader: LoaderFunction = () => {
  return {
    name: "Welcome to the RSS updater",
  };
};

export default function Index() {
  const { name } = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1 className="text-3xl font-bold underline text-center my-4">{name}</h1>
    </div>
  );
}
