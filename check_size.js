import fs from 'fs';
import path from 'path';
const dir = './public';
fs.readdirSync(dir).forEach(file => {
  const stat = fs.statSync(path.join(dir, file));
  console.log(`${file}: ${stat.size} bytes`);
});
