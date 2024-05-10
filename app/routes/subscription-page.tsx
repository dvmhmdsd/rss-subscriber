import type {
  LinksFunction,
  LoaderFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { Link, json, useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import mainPageCss from "~/styles/main-page.css?url";
import Parser from "rss-parser";

export const meta: MetaFunction = () => [
  { title: "RSS Subscriber" },
  {
    name: "description",
    content:
      "An RSS reader service that gets the RSS link from youtube channel and lists all the videos of your favorite channel, subscribe without clicking the subscribe button.",
  },
  {
    name: "keywords",
    content:
      "rss, youtube, channel, subscribe, unsubscribe, video, videos, RSS, YouTube, Channel, Subscribe, Unsubscribe",
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

export const loader: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);
  const parser = new Parser({});
  try {
    const feed = await parser.parseURL(searchParams.get("link")!);
    return json({ link: searchParams.get("link"), feed, error: "" });
  } catch (error) {
    return json({ link: "", feed: "", error });
  }
};

export default function SubscriptionPage() {
  const { link, feed, error } = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  console.log(link, feed);
  return (
    <>
      {error && error.code === "ENOTFOUND" && (
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl my-6">
            {t("network_error")}
          </h1>
          <Link to="/">{t("back_to_home")}</Link>
        </div>
      )}
    </>
  );
}

export function ErrorBoundary() {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl my-6">
        {t("rss_link_error")}
      </h1>
      <Link to="/">{t("back_to_home")}</Link>
    </div>
  );
}

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: mainPageCss }];
};
