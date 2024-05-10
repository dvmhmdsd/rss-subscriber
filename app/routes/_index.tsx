import type {
  ActionFunctionArgs,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import {
  Form,
  Link,
  json,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Skeleton } from "~/components/ui/skeleton";
import { extractRssLink, isValidYoutubeChannelLink } from "~/lib/utils";
import mainPageCss from "~/styles/main-page.css?url";
import {
  CopyIcon,
  CheckIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from "@radix-ui/react-icons";

export const meta: MetaFunction = () => [
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

export const loader: LoaderFunction = () => ({
  name: "Welcome to the RSS subscriber",
});

const CHANNELS_KEY = "channels_links";

export default function Index() {
  const { name } = useLoaderData<typeof loader>();
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);

  const data = useActionData<typeof action>();

  const [clicked, setClicked] = useState(false);

  const transition = useNavigation();
  const isSubmitting = transition.state === "submitting";
  const isLinkAvailable = data?.rssLink && transition.state === "idle";

  useEffect(() => {
    if (data?.error) inputRef.current?.focus();
  }, [data?.error]);

  useEffect(() => {
    if (isLinkAvailable)
      localStorage.setItem(CHANNELS_KEY, data?.rssLink ?? "");
  }, [isLinkAvailable, data?.rssLink]);

  const handleCopyBtnClick = () => {
    setClicked(true);
    navigator.clipboard.writeText(data?.rssLink ?? "");
    setTimeout(() => {
      setClicked(false);
    }, 1000);
  };

  return (
    <>
      <div className="text-center mb-7">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl my-6">
          {name}
        </h1>
        <Button onClick={() => changeLanguage(language === "en" ? "ar" : "en")}>
          {t("lang")}
        </Button>
      </div>
      {transition.state === "loading" ? (
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
      ) : (
        <Card className="w-5/6 mx-auto py-4">
          <CardContent>
            <Form className="space-y-8" method="post">
              <Label htmlFor="youtubeChannelLink">
                {t("youtube_link_label")}
              </Label>
              <Input
                id="youtubeChannelLink"
                ref={inputRef}
                placeholder={t("e.g")}
                name="youtubeChannelLink"
                className="rss-link_input mt-0"
                aria-label="Youtube Channel Link"
                aria-placeholder="e.g. https://www.youtube.com/@ahmedalemam"
                aria-labelledby="youtubeChannelLink"
                aria-invalid={data?.error ? true : undefined}
              />

              {data?.error && (
                <p className="rss-link_error text-sm text-red-500">
                  {data.error}
                </p>
              )}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? t("subscribing") : t("subscribe")}
              </Button>
            </Form>
          </CardContent>
          {isLinkAvailable && (
            <CardFooter>
              <div className="rounded-md border px-4 py-1 text-sm m-auto w-full flex justify-between items-center">
                {data?.rssLink}
                <Button
                  variant="ghost"
                  onClick={handleCopyBtnClick}
                  aria-label="Copy"
                >
                  {clicked ? <CheckIcon color="green" /> : <CopyIcon />}
                </Button>
              </div>
            </CardFooter>
          )}
        </Card>
      )}

      {isLinkAvailable && (
        <div className="text-center mt-10">
          <Button variant="ghost" className="text-center mt-10">
            <Link to={`/subscription-page?link=${data?.rssLink}`} className="flex gap-1 items-center">
              {t("go_channel_content")}{" "}
              {language === "ar" ? <ArrowLeftIcon /> : <ArrowRightIcon />}
            </Link>
          </Button>
        </div>
      )}
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const url = String(formData.get("youtubeChannelLink"));

  if (!url)
    return json({ error: "Youtube Channel Link is required", rssLink: "" });
  else if (!isValidYoutubeChannelLink(url))
    return json({ error: "Invalid Youtube Channel Link", rssLink: "" });

  const resp = await fetch(url);
  let rssLink = "";
  await resp.text().then((r) => {
    rssLink = extractRssLink(r);
  });

  return json({ rssLink, error: "" });
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
