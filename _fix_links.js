const fs = require('fs');

const files = ['public/index.html', 'public/program.html', 'public/about-gial.html'];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  const regex = / target="_blank"/g;
  const count = (content.match(regex) || []).length;
  content = content.replace(regex, '');
  fs.writeFileSync(f, content);
  console.log(f + ': removed ' + count + ' target="_blank" instances');
});

// Sync to root
['index.html', 'program.html', 'about-gial.html'].forEach(f => {
  fs.copyFileSync('public/' + f, f);
  console.log('Synced: ' + f);
});
