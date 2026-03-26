const fs = require('fs');
const filePath = 'src/app/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');

const startTag = '<div className="absolute bottom-10 right-6 z-20 transform -rotate-2">';
const endTag = '</svg>\n</div>';

const startIndex = content.indexOf(startTag);
const endIndex = content.indexOf(endTag, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
  // Remove the block
  const before = content.substring(0, startIndex);
  const after = content.substring(endIndex + endTag.length);
  fs.writeFileSync(filePath, before + after);
  console.log('Removed signature block successfully.');
} else {
  console.log('Signature block not found.');
}
