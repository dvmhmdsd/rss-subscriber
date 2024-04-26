import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";

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
    <div className="text-center">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl my-6">{name}</h1>
      <Button>Click</Button>
    </div>
  );
}
