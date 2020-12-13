import Twit from 'twit';
import Credentials from './types/credentials';
import Tweet from './types/tweet';
import getCredentials from './utils/get-credentials';
import getTweet from './utils/get-tweet';
import getTweetMediaIds from './utils/get-tweet-media-ids';
import mapTweetToStatus from './utils/map-tweet-to-status';

export default async function handler(): Promise<void> {
  const tweet: Tweet = await getTweet();

  const credentials: Credentials = await getCredentials();
  const twit: Twit = new Twit({
    ...credentials,
    strictSSL: true,
    timeout_ms: 15000,
  });

  const mediaIds: string[] = await getTweetMediaIds(twit, tweet);
  const status: string = mapTweetToStatus(tweet);

  await twit.post('statuses/update', {
    media_ids: mediaIds,
    status,
  });
}
