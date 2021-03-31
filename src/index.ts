#!/usr/bin/env node
import { Command } from 'commander'
import { OpenAPIGraphsInterface } from 'openapi-graph-types';
import { OpenAPIGraphs, Analyzer } from 'openapi-graph-core';

const program = new Command();
program
    .version('0.0.1')
    .description("A CLI to manage analyze API projects defined by OpenAPIv3 specification")

program
    .command('analyze <source>')
    .description('Analyze the OpenAPI specification')
    .action(analyze);
program.parse(process.argv);

async function analyze(source: string) {
    console.log(`Analyzing from ${source}`);
    const graphs: OpenAPIGraphsInterface = new OpenAPIGraphs(source);
    await graphs.build();
    const analyzer = new Analyzer(graphs);

    const deprecatedSchemasBeingUsed = analyzer.getDeprecatedSchemasBeingUsed()
    const unusedSchemas = analyzer.getUnusedSchemas()
    console.log("Deprecated schemas being used:\n", Object.keys(deprecatedSchemasBeingUsed).map(p => deprecatedSchemasBeingUsed[p].map(s => `${p} -> ${s.name}\n`)))
    console.log("Unused schemas:\n", Object.keys(unusedSchemas).map(p => unusedSchemas[p].map(s => `${p} -> ${s.name}`)))
}
