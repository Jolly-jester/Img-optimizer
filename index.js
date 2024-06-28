#!/usr/bin/env node

const { Command } = require('commander');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const os = require('os');
const osUtils = require('os-utils');

const program = new Command();

program
  .version('1.1.0')
  .description('CLI Image Optimizer')
  .option('-i, --input <file>', 'Input image file')
  .option('-o, --output <file>', 'Output image file')
  .option('-w, --width <number>', 'Resize width', parseInt)
  .option('-h, --height <number>', 'Resize height', parseInt)
  .option('-q, --quality <number>', 'JPEG/WEBP quality', parseInt)
  .option('-s, --settings', 'Show system settings')
  .parse(process.argv);

const options = program.opts();

if (options.settings) {
  (async () => {
    const chalk = (await import('chalk')).default;
    const ora = (await import('ora')).default;

    console.log(chalk.blue('System Settings:'));
    console.log(`OS Type: ${chalk.green(os.type())}`);
    console.log(`OS Platform: ${chalk.green(os.platform())}`);
    console.log(`OS Release: ${chalk.green(os.release())}`);
    console.log(`Total Memory: ${chalk.green((os.totalmem() / (1024 * 1024 * 1024)).toFixed(2))} GB`);
    console.log(`Free Memory: ${chalk.green((os.freemem() / (1024 * 1024 * 1024)).toFixed(2))} GB`);
    osUtils.cpuUsage((v) => {
      console.log(`CPU Usage: ${chalk.green((v * 100).toFixed(2))}%`);
    });
  })();
  return;
}

if (!options.input || !options.output) {
  console.error('Input and output files are required.');
  process.exit(1);
}

const inputPath = path.resolve(options.input);
const outputPath = path.resolve(options.output);

if (!fs.existsSync(inputPath)) {
  console.error(`Input file ${inputPath} does not exist.`);
  process.exit(1);
}

(async () => {
  const ora = (await import('ora')).default;

  const spinner = ora('Processing image...').start();

  let transformer = sharp(inputPath);

  if (options.width || options.height) {
    transformer = transformer.resize(options.width, options.height);
  }

  if (path.extname(outputPath).toLowerCase() === '.jpeg' || path.extname(outputPath).toLowerCase() === '.jpg') {
    transformer = transformer.jpeg({ quality: options.quality || 80 });
  } else if (path.extname(outputPath).toLowerCase() === '.webp') {
    transformer = transformer.webp({ quality: options.quality || 80 });
  }

  transformer.toFile(outputPath)
    .then(() => {
      spinner.succeed(`Image optimized and saved to ${outputPath}`);
    })
    .catch(err => {
      spinner.fail(`Error processing image: ${err}`);
    });
})();
