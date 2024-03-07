"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const change_case_1 = require("change-case").default;
const dynamoose = __importStar(require("dynamoose"));
const fs = __importStar(require("fs"));
const glob = __importStar(require("glob-promise"));
const yaml = __importStar(require("js-yaml"));
const path = __importStar(require("path"));
const args = process.argv.slice(2);
const matchPattern = args[1];
const outputFile = args[2];
const deletionPolicy = 'Delete';
const globalOptions = {
    throughput: 'ON_DEMAND',
    prefix: '${self:service}-${self:provider.stage}-',
    suffix: '-table',
};
async function main() {
    if (!matchPattern || !outputFile) {
        console.log('missing required arguments.');
        return;
    }
    const slsResources = { Resources: {} };
    const files = await glob.promise(matchPattern);
    await Promise.all(files.map(async (file) => {
        console.log('detected:', file);
        const fileNameExt = file.split(/[\\\/]/).pop();
        const fileName = fileNameExt.split('.').shift();
        const tableName = (0, change_case_1.pascalCase)(fileName);
        const exports = await Promise.resolve(`${`.${path.sep}${file}`}`).then(s => __importStar(require(s)));
        const schema = Object.values(exports).shift();
        if (schema.constructor.name === 'Schema') {
            const model = dynamoose.model(fileName, schema, globalOptions);
            slsResources.Resources[`${tableName}Table`] = {
                Type: 'AWS::DynamoDB::Table',
                DeletionPolicy: deletionPolicy,
                Properties: await model.table().create({ return: 'request' }),
            };
        }
    }));
    const yamlReources = yaml.dump(slsResources);
    const outputPath = outputFile.split(/[\\\/]/);
    if (outputPath.length > 1) {
        await fs.promises.mkdir(outputPath.slice(0, outputPath.length - 1).join(path.sep), { recursive: true });
    }
    await fs.promises.writeFile(outputFile, yamlReources);
    console.log(`Serverless resources file generated at ${outputFile}`);
    process.exit(0);
}
main();
//# sourceMappingURL=genres.js.map