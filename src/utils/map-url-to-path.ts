import { Hash, createHash } from 'crypto';

export default function mapUrlToPath(url: string): string {
  const md5: Hash = createHash('md5');
  md5.update(url);
  const extension: string = url.split('.').pop() as string;
  return `/tmp/${md5.digest('hex')}.${extension}`;
}
