import type {
  ActionFunctionArgs,
  LinksFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, useActionData, useSubmit } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import mainPageCss from "~/styles/main-page.css?url";
import Parser from "rss-parser";
import { ErrorComponent } from "~/components/custom/ErrorComponent";
import { WithLoading } from "~/components/HOCs/WithLoading";
import { useEffect, useState } from "react";
import { CHANNELS_KEY } from "~/lib/utils";
import { generalMeta } from "~/constants/meta";
import FeedChannelItem from "~/components/custom/FeedChannelItem";
import { Input } from "~/components/ui/input";
import { Channel } from "~/constants/ChannelItem.interface";

export const meta: MetaFunction = () => [
  { title: "Channels' feed" },
  {
    name: "description",
    content: "All the feed of channels you've subscribed to.",
  },
  ...generalMeta,
];


export default function ChannelsList() {
  const { t } = useTranslation();
  const submit = useSubmit();
  const data = useActionData<typeof action>();
  const [channels, setChannels] = useState<Channel[] | undefined>(data?.feed);

  useEffect(() => {
    const storedChannels = localStorage.getItem(CHANNELS_KEY);
    submit({ storedChannels }, { method: "post" });
  }, [submit]);

  useEffect(() => {
    if (data?.feed) setChannels(data?.feed);
  }, [data]);


  const filterChannels = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.trim() === "") setChannels(data?.feed);

    const filteredChannels = data?.feed.filter(
      (feed) =>
        feed.title.toLowerCase().includes(value.toLowerCase()) ||
        feed.link.toLowerCase().includes(value.toLowerCase())
    );

    setChannels(filteredChannels);
  };

  return (
    <WithLoading>
      <section className="container mt-5" aria-live="polite">
        <section className="flex justify-between sm:flex-nowrap flex-wrap">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-7 w-5/6 text-left sm:mx-auto">
            {t("your_feed")}
          </h1>
          <Input
            placeholder={t("enter_channel_name")}
            className="rss-link_input mt-0"
            aria-label="Youtube Channel Name to search for"
            aria-placeholder={t("enter_channel_name")}
            onChange={filterChannels}
          />
        </section>
        {channels?.map(
          (feed) =>
            feed.items.length > 0 && (
              <FeedChannelItem key={feed?.link} item={feed} />
            )
        )}
        {channels?.length === 0 && <p className=" text-3xl flex items-center justify-center h-[calc(100vh-300px)]">{t("no_channels_found")}</p>}
      </section>
    </WithLoading>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const channels = JSON.parse(String(formData.get("storedChannels") ?? "[]"));

  const parser = new Parser({});
  const channelsData = await Promise.all(
    channels.map(async (channel: string) => {
      try {
        return await parser.parseURL(channel);
      } catch (error) {
        return json({ feed: null, error });
      }
    })
  );

  return json({ feed: channelsData, error: null });
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
