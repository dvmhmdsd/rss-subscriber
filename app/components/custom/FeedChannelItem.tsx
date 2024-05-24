import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { Link } from "@remix-run/react";
import { Channel } from "~/constants/ChannelItem.interface";
import { Card, CardContent, CardHeader } from "../ui/card";

export default function FeedChannelItem({ item }: Readonly<{ item: Channel }>) {
  return (
      <Card className="text-left my-5">
        <CardHeader>
          <h2 className="text-xl font-extrabold tracking-tight w-1/5 hover:text-slate-700">
            <Link to={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
              <p>{item.title}</p>
              <p className="ml-2">
                <ExternalLinkIcon />
              </p>
            </Link>
          </h2>
        </CardHeader>
        <CardContent>
          <ul>
            {item.items.map((item) => (
              <li key={item.link} className="py-1 hover:underline">
                <Link
                  to={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-700"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
  );
}
