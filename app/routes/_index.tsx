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
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Skeleton } from "~/components/ui/skeleton";
import {
  extractRssLink,
  isValidYoutubeChannelLink,
  storeLink,
} from "~/lib/utils";
import mainPageCss from "~/styles/main-page.css?url";
import { ArrowRightIcon, ArrowLeftIcon } from "@radix-ui/react-icons";
import LinkResult from "~/components/custom/LinkResult";
import { ErrorComponent } from "~/components/custom/ErrorComponent";
import { generalMeta } from "~/constants/meta";

export const meta: MetaFunction = () => [
  { title: "RSS Subscriber" },
  {
    name: "description",
    content:
      "An RSS reader service that gets the RSS link from youtube channel and lists all the videos of your favorite channel, subscribe without clicking the subscribe button.",
  },
  ...generalMeta,
];

export const loader: LoaderFunction = () => ({
  name: "Welcome to the RSS subscriber",
});

export default function Index() {
  const { name } = useLoaderData<typeof loader>();
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);

  const data = useActionData<typeof action>();

  const transition = useNavigation();
  const isSubmitting = transition.state === "submitting";
  const isLinkAvailable = data?.rssLink && transition.state === "idle";

  useEffect(() => {
    if (data?.error) inputRef.current?.focus();
  }, [data?.error]);

  useEffect(() => {
    if (isLinkAvailable) storeLink(data?.rssLink);
  }, [isLinkAvailable, data?.rssLink]);

  return (
    <>
      <header className="text-center mb-7">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl my-6">
          {name}
        </h1>
        <section className="mx-auto flex justify-center">
          <Button
            onClick={() => changeLanguage(language === "en" ? "ar" : "en")}
          >
            {t("lang")}
          </Button>
          <Button variant="outline" asChild>
            <Link to="/channels">{t("your_feed")}</Link>
          </Button>
        </section>
      </header>

      {transition.state === "loading" ? (
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
      ) : (
        <Card className="w-full sm:w-5/6 mx-auto py-4">
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
                aria-placeholder="e.g. https://www.youtube.com/@ahmedelemam"
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
              <LinkResult link={data?.rssLink} />
            </CardFooter>
          )}
        </Card>
      )}

      {isLinkAvailable && (
        <div className="text-center mt-10">
          <Link
            to={`/channel/${encodeURIComponent(data?.rssLink)}`}
            className="text-center mt-10"
          >
            <Button variant="ghost">
              {t("go_channel_content")}{" "}
              {language === "ar" ? <ArrowLeftIcon /> : <ArrowRightIcon />}
            </Button>
          </Link>
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
    <ErrorComponent error={t("rss_link_error")} linkText={t("back_to_home")} />
  );
}

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: mainPageCss }];
};
