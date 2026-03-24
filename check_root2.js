import fs from 'fs';
fs.readdirSync('/').forEach(file => {
  if (file.includes('虚幻')) {
    console.log(file);
  }
});
