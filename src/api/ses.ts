import { SESv2Client, ListEmailTemplatesCommand } from "@aws-sdk/client-sesv2";

import { AwsCredentialIdentity } from "@aws-sdk/types";

let sesClient: SESv2Client;

// plug this in custom hook
export const setupSesClient = (creds: AwsCredentialIdentity) => {
  sesClient = new SESv2Client({
    region: "us-east-1",
    credentials: {
      // take-from-user
      accessKeyId: creds.accessKeyId,
      secretAccessKey: creds.secretAccessKey,
    },
  });
};

export const listTemplates = (NextToken?: string) => {
  const cmd = new ListEmailTemplatesCommand({
    PageSize: 12,
    // for pagination
    NextToken,
  });
  return sesClient.send(cmd);
};
