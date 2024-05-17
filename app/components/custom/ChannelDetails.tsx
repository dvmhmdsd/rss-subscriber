import { FeedItem } from "~/constants/FeedItem.interface";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { Link } from "@remix-run/react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { formatIsoDateToNormalDateAndTime } from "~/lib/utils";
import { useTranslation } from "react-i18next";

export const ChannelDetails = ({
  feed,
}: {
  feed: { title: string; link: string; items: FeedItem[] };
}) => {
  const {
    t,
  } = useTranslation();
  return (
    <div className="container text-left mx-auto my-9">
      <header>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl flex items-center mb-7 hover:text-slate-700">
            <Link to={feed.link} target="_blank" rel="noopener noreferrer">
              {feed.title}
            </Link>
            <p className="ml-2">
              <ExternalLinkIcon />
            </p>
          </h1>
      </header>
      <section>
        <ul>
          {feed.items.length > 0 ? (
            feed.items.map((item) => (
              <ChannelCard key={item.link} channelData={item} />
            ))
          ) : (
            <p className=" text-3xl flex items-center justify-center h-[calc(100vh-300px)]">
              {t("no_items")}
            </p>
          )}
        </ul>
      </section>
    </div>
  );
};

const ChannelCard = ({ channelData }: { channelData: FeedItem }) => {
  return (
    <li key={channelData.link}>
      <Link to={channelData.link} target="_blank" rel="noopener noreferrer">
        <Card className="w-5/6 mx-auto py-4 mb-2 hover:bg-slate-50 cursor-pointer">
          <CardHeader className="text-xl">{channelData.title}</CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">
              <time
                dateTime={formatIsoDateToNormalDateAndTime(channelData.pubDate)}
              >
                {formatIsoDateToNormalDateAndTime(channelData.pubDate)}
              </time>
            </p>
          </CardContent>
        </Card>
      </Link>
    </li>
  );
};
