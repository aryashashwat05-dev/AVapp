const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

const sizes = [
  72, 96, 128, 144, 152, 192, 384, 512
];

async function generateIcons() {
  const svgPath = path.join(__dirname, '../public/icon.svg');
  const svgContent = fs.readFileSync(svgPath, 'utf8');
  
  for (const size of sizes) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Create a simple fallback since canvas might not render SVG directly
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, size, size);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${size * 0.35}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('AV', size / 2, size / 2);
    
    const buffer = canvas.toBuffer('image/png');
    const outputPath = path.join(__dirname, `../public/icon-${size}x${size}.png`);
    fs.writeFileSync(outputPath, buffer);
    console.log(`Generated ${outputPath}`);
  }
}

generateIcons().catch(console.error);
