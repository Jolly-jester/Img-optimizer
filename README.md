# CLI Image Optimizer

CLI Image Optimizer is a command-line tool for resizing and optimizing images using Node.js and Sharp.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd image-optimizer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

To use the CLI Image Optimizer, run the following command:

```bash
node index.js [options]
```

### Options

- `-i, --input <file>`: Specify the input image file.
- `-o, --output <file>`: Specify the output image file.
- `-w, --width <number>`: Resize image width (optional).
- `-h, --height <number>`: Resize image height (optional).
- `-q, --quality <number>`: JPEG/WEBP quality (optional, default: 80).
- `-s, --settings`: Show system settings.

### Examples

1. Optimize an image:
   ```bash
   node index.js -i input.jpg -o output.jpg
   ```

2. Resize an image to specific dimensions:
   ```bash
   node index.js -i input.jpg -o output.jpg -w 800 -h 600
   ```

3. Convert an image to WEBP format with custom quality:
   ```bash
   node index.js -i input.jpg -o output.webp -q 90
   ```

4. Show system settings:
   ```bash
   node index.js -s
   ```

## Dependencies

- [Commander](https://www.npmjs.com/package/commander): For command-line interface.
- [Sharp](https://www.npmjs.com/package/sharp): For image processing.
- [chalk](https://www.npmjs.com/package/chalk): For colored text output.
- [ora](https://www.npmjs.com/package/ora): For spinner animation.


