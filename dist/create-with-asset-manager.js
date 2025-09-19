"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_akeneo_api_client_1 = require("@schally/node-akeneo-api-client");
const dotenv_1 = __importDefault(require("dotenv"));
function execute() {
    return __awaiter(this, void 0, void 0, function* () {
        // Load environment variables from .env file
        dotenv_1.default.config();
        console.log('Creating an image and associate it to reference entity with file management...');
        const client = new node_akeneo_api_client_1.AkeneoClient({
            baseUrl: process.env.AKENEO_URL,
            clientId: process.env.AKENEO_CLIENT_ID,
            secret: process.env.AKENEO_SECRET,
            username: process.env.AKENEO_USERNAME,
            password: process.env.AKENEO_PASSWORD,
        });
        // Step 1: Create an asset with the URL in Akeneo Asset Manager
        console.log(`Creating an asset with URL ${process.env.FILE_URL} in Akeneo Asset Manager with family ${process.env.ASSET_FAMILY_CODE} and attribute ${process.env.ASSET_URL_ATTRIBUTE_CODE}...`);
        const assetCode = `asset_${Date.now()}`;
        yield client.assetManager.assets.updateOrCreate(process.env.ASSET_FAMILY_CODE, {
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
        yield client.referenceEntities.records.updateOrCreate(process.env.REFERENCE_ENTITY_CODE, {
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
    });
}
execute().catch(console.error);
//# sourceMappingURL=create-with-asset-manager.js.map