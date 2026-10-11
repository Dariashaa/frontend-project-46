#!/usr/bin/env node

import { Command } from "commander";
import diffJSON from "../src/diffJSON.js";
const program = new Command();

program
  .version("1.0.0", "-V, --version", "output the version number")
  .description("Compares two configuration files and shows a difference.")
  .option("-f, --format [type]", "output format")
  .arguments("<filepath1> <filepath2>")
  .action((filepath1, filepath2) => {
    console.log(diffJSON(filepath1, filepath2));
  });

program.parse();
