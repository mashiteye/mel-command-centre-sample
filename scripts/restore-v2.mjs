import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';

const archivePath = path.resolve('v2-full.zip.b64');

if (!fs.existsSync(archivePath)) {
  console.log('V2 archive not found. Continuing with existing source files.');
  process.exit(0);
}

const encoded = fs.readFileSync(archivePath, 'utf8').replace(/\s+/g, '');
const zipBuffer = Buffer.from(encoded, 'base64');
const zip = new AdmZip(zipBuffer);
zip.extractAllTo(process.cwd(), true);

console.log('V2 full preview source restored from archive.');
