#!/usr/bin/env node

import { Command } from "commander";
import diff from "../src/diff.js";
const program = new Command();

program
  .version("1.0.0", "-V, --version", "output the version number")
  .description("Compares two configuration files and shows a difference.")
  .option("-f, --format [type]", "output format", "stylish")
  .arguments("<filepath1> <filepath2>")
  .action((filepath1, filepath2, options) => {
    console.log(diff(filepath1, filepath2, options.format));
  });

program.parse();
