import fs from 'fs';
const dir = './';
fs.readdirSync(dir).forEach(file => {
  if (file.includes('虚幻')) {
    console.log(file);
  }
});
