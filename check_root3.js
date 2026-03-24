import fs from 'fs';
fs.readdirSync('./').forEach(file => {
  if (file.includes('public')) {
    console.log(file);
  }
});
