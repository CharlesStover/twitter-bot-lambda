import fs from 'fs';
import fetch, { Response } from 'node-fetch';
import Twit from 'twit';
import { promisify } from 'util';
import Tweet from '../types/tweet';
import mapUrlToPath from '../utils/map-url-to-path';

interface PostMediaChunkedResponse {
  media_id_string: string;
}

export default async function getTweetMediaIds(
  twit: Twit,
  tweet: Tweet,
): Promise<string[]> {
  if (typeof tweet.media !== 'object') {
    return [];
  }

  const mediaUrls: [string, string][] = Object.entries(tweet.media);
  const mediaPaths: [string, string][] = [];
  const mediaIds: string[] = [];

  for (const [altText, url] of mediaUrls) {
    const path: string = mapUrlToPath(url);
    const response: Response = await fetch(url);
    const data: ArrayBuffer = await response.arrayBuffer();
    fs.writeFileSync(path, Buffer.from(new Uint8Array(data)));
    mediaPaths.push([altText, path]);
  }

  const postMediaChunked = promisify(twit.postMediaChunked).bind(twit);
  for (const [altText, path] of mediaPaths) {
    const { media_id_string } = (await postMediaChunked({
      file_path: path,
    })) as PostMediaChunkedResponse;
    await twit.post('media/metadata/create', {
      alt_text: {
        text: altText,
      },
      media_id: media_id_string,
    });
    mediaIds.push(media_id_string);
  }

  return mediaIds;
}
