import type { AWS } from "@serverless/typescript";
import getProductsList from "@functions/getProductsList";
import getProductById from "@functions/getProductById";

const serverlessConfiguration: AWS = {
  service: "product-service",
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  plugins: ["serverless-webpack"],
  useDotenv: true,
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      PG_HOST: "${env:PG_HOST}",
      PG_DATABASE: "${env:PG_DATABASE}",
      PG_PORT: "${env:PG_PORT}",
      PG_USER: "${env:PG_USER}",
      PG_PASSWORD: "${env:PG_PASSWORD}",
    },
    lambdaHashingVersion: "20201221",
    stage: "dev",
    region: "eu-west-1",
  },
  functions: { getProductsList, getProductById },
};

module.exports = serverlessConfiguration;
