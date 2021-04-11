# OpenAPI-graph-cli

A cli to analyze your OpenAPI specifications. Yes, specifications. This means that if you have a huge project that is heavily using OpenAPI `$ref` to import external schemas, requestBodies, paths... then it is very difficult for you to mantain such a large project and for example, you might have some schemas that are not being used.

With this cli, you can analyze different aspects and helping you maintain your big project.

## Installation

Run

> npm install -g openapi-graph-cli

And then you can run the analyzer

## Analyzer

Run

> apig analyze [PATH [OPTIONS]]

The `PATH` is the common root path for all your APIs. For example, if you have a project like the social network shown [here](https://github.com/onmax/openAPI-graph-core/tree/main/tests/resources/social-network), the path could be `/tests/resources/social-network` or `.` if you are already in the folder.

### Options

You can use `--verbose` or `--debug` mode