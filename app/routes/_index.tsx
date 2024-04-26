import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "RSS Subscriber" },
    {
      name: "description",
      content:
        "An RSS reader service that gets the RSS link from youtube channel and lists all the videos of your favorite channel, subscribe without clicking the subscribe button.",
    },
    {
      name: "keywords",
      content: "rss, youtube, channel, subscribe, unsubscribe, video, videos",
    },
    {
      name: "author",
      content: "Mohamed Saad",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      name: "robots",
      content: "index, follow",
    },
  ];
};

export const loader: LoaderFunction = () => {
  return {
    name: "Welcome to the RSS subscriber",
  };
};

export default function Index() {
  const { name } = useLoaderData<typeof loader>();
  return (
    <div className="text-center">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl my-6">
        {name}
      </h1>
      <Button>Click</Button>
    </div>
  );
}
