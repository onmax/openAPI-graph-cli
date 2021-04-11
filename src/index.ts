#!/usr/bin/env node
import { Command } from 'commander'
import { LogLevel, OpenAPIGraphLibConfigInterface, OpenAPIGraphsInterface } from 'openapi-graph-types';
import { OpenAPIGraphs, Analyzer } from 'openapi-graph-core';
import { log } from 'openapi-graph-core/lib/utils';

const program = new Command();
program
    .version('0.0.1')
    .description("A CLI to manage analyze API projects defined by OpenAPIv3 specification")

program
    .command('analyze <source>')
    .description('Analyze the OpenAPI specification')
    .option('-v, --verbose', 'Use verbose mode')
    .option('-d, --debug', 'Use debug mode. It will activate verbose mode automatically.')
    .action(analyze);
program.parse(process.argv);

async function analyze(source: string, options: OpenAPIGraphLibConfigInterface) {
    log(`Analyzing from ${source}`)

    const graphs: OpenAPIGraphsInterface = new OpenAPIGraphs(source, options);
    await graphs.build();

    const analyzer = new Analyzer(graphs);

    const deprecatedSchemasBeingUsed = analyzer.getDeprecatedSchemasBeingUsed()
    log('########## Deprecated schemas being used ##########', LogLevel.INFO, true)
    Object.keys(deprecatedSchemasBeingUsed)
        .map(p => ({ s: deprecatedSchemasBeingUsed[p], p }))
        .filter(o => o.s.length > 0)
        .forEach(o => log(`${o.p}:\n${o.s.map(s => s.name).join(', ')}\n`, LogLevel.INFO, true));

    log('########## Unused schemas ##########', LogLevel.INFO, true)
    const unusedSchemas = analyzer.getUnusedSchemas()
    Object.keys(unusedSchemas)
        .map(p => ({ s: unusedSchemas[p], p }))
        .filter(o => o.s.length > 0)
        .forEach(o => log(`${o.p}:\n${o.s.map(s => s.name).join(', ')}\n`, LogLevel.INFO, true));
}
