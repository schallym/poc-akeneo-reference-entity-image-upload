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

  // Step 1: Create an asset with the URL in Akeneo Asset Manager
  console.log(`Creating an asset with URL ${process.env.FILE_URL} in Akeneo Asset Manager with family ${process.env.ASSET_FAMILY_CODE} and attribute ${process.env.ASSET_URL_ATTRIBUTE_CODE}...`);
  const assetCode = `asset_${Date.now()}`;
  await client.assetManager.assets.updateOrCreate(
    process.env.ASSET_FAMILY_CODE,
    {
    code: assetCode,
    values: {
      [process.env.ASSET_URL_ATTRIBUTE_CODE]: [
        {
          data: process.env.FILE_URL,
          locale: null,
          channel: null,
        },
      ],
    },
  });
  console.log('Asset created successfully!');

  // Step 2: Associate the asset to a reference entity
  console.log(`Associating asset to reference entity ${process.env.REFERENCE_ENTITY_RECORD_CODE} from ref. entity ${process.env.REFERENCE_ENTITY_CODE} with attribute ${process.env.REFERENCE_ENTITY_ASSET_ATTRIBUTE_CODE}...`);
  await client.referenceEntities.records.updateOrCreate(process.env.REFERENCE_ENTITY_CODE, {
    code: process.env.REFERENCE_ENTITY_RECORD_CODE,
    values: {
      [process.env.REFERENCE_ENTITY_ASSET_ATTRIBUTE_CODE]: [
        {
          data: [assetCode],
          locale: null,
          channel: null,
        },
      ],
    },
  });
  console.log(`Asset associated to reference entity ${process.env.REFERENCE_ENTITY_RECORD_CODE} successfully.`);
}

execute().catch(console.error);

