import Tweet from '../types/tweet';

export default function mapTweetToStatus(tweet: Tweet): string {
  if (typeof tweet.link !== 'string') {
    return tweet.status;
  }
  return `${tweet.status} ${tweet.link}`;
}
