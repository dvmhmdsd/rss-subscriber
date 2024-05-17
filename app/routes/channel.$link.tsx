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
import { ChannelDetails } from "~/components/custom/ChannelDetails";

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
  params,
}: LoaderFunctionArgs) => {
  const parser = new Parser({});
  try {
    const feed = await parser.parseURL(params.link!);
    return json({ feed, error: "" });
  } catch (error) {
    return json({ feed: "", error });
  }
};

export default function SubscriptionPage() {
  const { feed, error } = useLoaderData<typeof loader>();
  const { t } = useTranslation();

  return (
    <>
      {feed && <ChannelDetails feed={feed} />}
      {error && error.code === "ENOTFOUND" && (
        <ErrorComponent
          error={t("network_error")}
          linkText={t("back_to_home")}
        />
      )}
    </>
  );
}

export function ErrorBoundary() {
  const { t } = useTranslation();
  return (
    <ErrorComponent error={t("rss_link_error")} linkText={t("back_to_home")} />
  );
}

const ErrorComponent = ({
  error,
  linkText,
}: {
  error: string;
  linkText: string;
}) => (
  <div className="text-center">
    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl my-6">
      {error}
    </h1>
    <Link to="/">{linkText}</Link>
  </div>
);

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: mainPageCss }];
};
