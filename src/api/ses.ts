import {
  SESv2Client, ListEmailTemplatesCommand,
  CreateEmailTemplateCommand, CreateEmailTemplateCommandInput,
  DeleteEmailTemplateCommand,
  DeleteEmailTemplateCommandInput
} from "@aws-sdk/client-sesv2";

import { AwsCredentialIdentity} from "@aws-sdk/types";

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

// Add new Template
export const addNewTemplate = (input: CreateEmailTemplateCommandInput) => {
  const command = new CreateEmailTemplateCommand(input);
  return sesClient.send(command);
}

// Delete existing Template

export const deleteTemplate = (input:DeleteEmailTemplateCommandInput) => {
  const command = new DeleteEmailTemplateCommand(input);
  return sesClient.send(command);
}