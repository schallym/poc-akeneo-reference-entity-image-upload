import { AkeneoClient } from '@schally/node-akeneo-api-client';
import dotenv from "dotenv"

async function execute() {
  // Load environment variables from .env file
  dotenv.config();
  console.log('Creating an image and associate it to reference entity with file management...');
  const client = new AkeneoClient({
    baseUrl: process.env.AKENEO_URL,
    clientId: process.env.AKENEO_CLIENT_ID,
    secret: process.env.AKENEO_SECRET,
    username: process.env.AKENEO_USERNAME,
    password: process.env.AKENEO_PASSWORD,
  });

  // Step 1: Download an image from the FILE_URL
  console.log(`Downloading image from ${process.env.FILE_URL}...`);
  const fileUrl = process.env.FILE_URL as string;
  const response = await fetch(fileUrl);
  if (!response.ok) {
    throw new Error(`Failed to download file from ${fileUrl}: ${response.statusText}`);
  }
  const blob = await response.blob();
  const fileName = fileUrl.split('/').pop() || 'downloaded_image.jpg';

  // Step 2: Upload the image to Akeneo
  console.log('Uploading image to Akeneo...');
  const uploadResponse = await client.referenceEntities.mediaFiles.create({
    file: blob,
    fileName: fileName,
  });
  console.log('Upload response:', uploadResponse);

  // Step 3: Associate the uploaded image to a reference entity
  console.log(`Associating image to reference entity ${process.env.REFERENCE_ENTITY_RECORD_CODE} from ref. entity ${process.env.REFERENCE_ENTITY_CODE}...`);
  await client.referenceEntities.records.updateOrCreate(process.env.REFERENCE_ENTITY_CODE, {
    code: process.env.REFERENCE_ENTITY_RECORD_CODE,
    values: {
      image: [
        {
          data: uploadResponse.mediaFileCode,
          locale: null,
          channel: null,
        },
      ],
    },
  });
  console.log(`Image associated to reference entity ${process.env.REFERENCE_ENTITY_RECORD_CODE} successfully.`);
}

execute().catch(console.error);

