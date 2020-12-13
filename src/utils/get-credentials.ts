import SecretsManager from 'aws-sdk/clients/secretsmanager';
import Credentials from '../types/credentials';

export default async function getCredentials(): Promise<Credentials> {
  const secretId: string = process.env.SECRET_ID || 'twitter-bot';

  const secretsManager: SecretsManager = new SecretsManager();
  const secretValue = await secretsManager
    .getSecretValue({
      SecretId: secretId,
    })
    .promise();

  if (typeof secretValue.SecretString !== 'string') {
    throw new Error(`Expected secret "${secretId}" to have SecretString.`);
  }

  return JSON.parse(secretValue.SecretString);
}
