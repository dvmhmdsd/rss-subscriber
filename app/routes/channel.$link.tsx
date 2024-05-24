import type {
  LinksFunction,
  LoaderFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { MetaArgs, json, useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import mainPageCss from "~/styles/main-page.css?url";
import Parser from "rss-parser";
import { ChannelDetails } from "~/components/custom/ChannelDetails";
import { ErrorComponent } from "~/components/custom/ErrorComponent";
import { WithLoading } from "~/components/HOCs/WithLoading";
import { generalMeta } from "~/constants/meta";
import { FeedItem } from "~/constants/FeedItem.interface";

export const meta: MetaFunction = ({ data }: MetaArgs) => [
  { title: (data as { feed: FeedItem })?.feed?.title },
  {
    name: "description",
    content: "The channel's RSS feed.",
  },
  ...generalMeta,
];

export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  const parser = new Parser({});
  try {
    const feed = await parser.parseURL(params.link!);
    return json({ feed, error: "" });
  } catch (error) {
    return json({ feed: null, error });
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

export const ErrorBoundary = () => (
  <ErrorComponent error={"rss_link_error"} linkText={"back_to_home"} />
);

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: mainPageCss }];
};
