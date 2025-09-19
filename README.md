# POC Usage Guide

## Prerequisites

- Node.js (v18+ recommended)
- npm

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory and add your configuration variables:
```env
AKENEO_URL=https://your-pim.cloud.akeneo.com
AKENEO_CLIENT_ID=client_id
AKENEO_SECRET=secret
AKENEO_USERNAME=username
AKENEO_PASSWORD=password

FILE_URL=https://example.com/path/to/your/image.jpg
REFERENCE_ENTITY_CODE=your_reference_entity_code
REFERENCE_ENTITY_RECORD_CODE=your_reference_entity_code
REFERENCE_ENTITY_ASSET_ATTRIBUTE_CODE=your_reference_entity_asset_attribute_code

ASSET_FAMILY_CODE=your_asset_family_code
ASSET_URL_ATTRIBUTE_CODE=your_asset_url_attribute_code
```

3. Compile the code:
```bash
npx tsc
source .env
```

## Running the POC

To run the POC, use the following command:
```bash
# With file management
node dist/create-with-file-management.js

# With asset manager
node dist/create-with-asset-manager.js
```

