import type {
  LinksFunction,
  LoaderFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import mainPageCss from "~/styles/main-page.css?url";
import Parser from "rss-parser";
import { ChannelDetails } from "~/components/custom/ChannelDetails";
import { ErrorComponent } from "~/components/custom/ErrorComponent";
import { WithLoading } from "~/components/HOCs/WithLoading";

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
    <WithLoading>
      {feed && <ChannelDetails feed={feed} />}
      {error && error.code === "ENOTFOUND" && (
        <ErrorComponent
          error={t("network_error")}
          linkText={t("back_to_home")}
        />
      )}
    </WithLoading>
  );
}

export function ErrorBoundary() {
  const { t } = useTranslation();
  return (
    <ErrorComponent error={t("rss_link_error")} linkText={t("back_to_home")} />
  );
}

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: mainPageCss }];
};
