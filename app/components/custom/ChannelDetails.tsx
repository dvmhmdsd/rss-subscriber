import { FeedItem } from "~/constants/FeedItem.interface";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { Link } from "@remix-run/react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { formatIsoDateToNormalDateAndTime } from "~/lib/utils";
import { useTranslation } from "react-i18next";
import GeneralActionsBtns from "./GeneralActionsBtns";

export const ChannelDetails = ({
  feed,
}: {
  feed: { title: string; link: string; items: FeedItem[] };
}) => {
  const { t } = useTranslation();
  return (
    <div className="container text-left mx-auto my-9">
      <header>
        <section className="flex justify-between items-center flex-wrap mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl flex items-center hover:text-slate-700">
            <Link to={feed.link} target="_blank" rel="noopener noreferrer">
              {feed.title}
            </Link>
            <p className="ml-2">
              <ExternalLinkIcon />
            </p>
          </h1>
          <GeneralActionsBtns />
        </section>
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
      <Card className="sm:w-5/6 py-4 mb-2 hover:bg-slate-50 cursor-pointer">
        <Link to={channelData.link} target="_blank" rel="noopener noreferrer">
          <CardHeader className="text-xl flex flex-row">
            <p>{channelData.title}</p>
            <p className="ml-2">
              <ExternalLinkIcon />
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">
              <time
                dateTime={formatIsoDateToNormalDateAndTime(channelData.pubDate)}
              >
                {formatIsoDateToNormalDateAndTime(channelData.pubDate)}
              </time>
            </p>
          </CardContent>
        </Link>
      </Card>
    </li>
  );
};
