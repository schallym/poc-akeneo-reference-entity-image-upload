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
        // Step 1: Download an image from the FILE_URL
        console.log(`Downloading image from ${process.env.FILE_URL}...`);
        const fileUrl = process.env.FILE_URL;
        const response = yield fetch(fileUrl);
        if (!response.ok) {
            throw new Error(`Failed to download file from ${fileUrl}: ${response.statusText}`);
        }
        const blob = yield response.blob();
        const fileName = fileUrl.split('/').pop() || 'downloaded_image.jpg';
        // Step 2: Upload the image to Akeneo
        console.log('Uploading image to Akeneo...');
        const uploadResponse = yield client.referenceEntities.mediaFiles.create({
            file: blob,
            fileName: fileName,
        });
        console.log('Upload response:', uploadResponse);
        // Step 3: Associate the uploaded image to a reference entity
        console.log(`Associating image to reference entity ${process.env.REFERENCE_ENTITY_RECORD_CODE} from ref. entity ${process.env.REFERENCE_ENTITY_CODE}...`);
        yield client.referenceEntities.records.updateOrCreate(process.env.REFERENCE_ENTITY_CODE, {
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
    });
}
execute().catch(console.error);
//# sourceMappingURL=create-with-file-management.js.map