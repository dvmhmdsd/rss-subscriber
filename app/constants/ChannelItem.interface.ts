import { FeedItem } from "./FeedItem.interface";

export interface Channel {
  link: string;
  title: string;
  items: FeedItem[];
}
