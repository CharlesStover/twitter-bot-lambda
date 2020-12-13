import fetch, { Response } from 'node-fetch';
import Tweet from '../types/tweet';
import semiShuffleEntries from '../utils/semi-shuffle-entries';

const MILLISECONDS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const MINUTES_PER_HOUR = 60;
const MILLISECONDS_PER_MINUTE = MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE;
const MILLISECONDS_PER_HOUR = MILLISECONDS_PER_MINUTE * MINUTES_PER_HOUR;

const TWEET_FREQUENCY = 11 * MILLISECONDS_PER_HOUR;

export default async function getTweet(): Promise<Tweet> {
  const tweetsUrl: string | undefined = process.env.TWEETS_URL;
  if (!tweetsUrl) {
    throw new Error('Missing environment variable: TWEETS_URL');
  }

  const tweetsResponse: Response = await fetch(tweetsUrl);
  const tweetsRecord: Record<string, Tweet[]> = await tweetsResponse.json();
  const tweetsEntries: [string, Tweet[]][] = Object.entries(tweetsRecord);
  semiShuffleEntries(tweetsEntries);
  const tweets: Tweet[][] = tweetsEntries.map(entry => entry[1]);

  // Increment 1 index every 11 hours.
  const index: number =
    Math.round(Date.now() / TWEET_FREQUENCY) % tweets.length;

  return tweets[index][Math.floor(Math.random() * tweets[index].length)];
}
