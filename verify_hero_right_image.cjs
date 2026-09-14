const fs = require('fs');
const path = require('path');

console.log('=== VERIFYING HERO RIGHT IMAGE REPLACEMENT ===\n');

const heroImgPath = path.join(__dirname, 'public/images/hero/hero-right.png');
const heroComponentPath = path.join(__dirname, 'src/components/sections/Hero.jsx');

// 1. Verify Right Image File
const imgExists = fs.existsSync(heroImgPath);
const imgSize = imgExists ? fs.statSync(heroImgPath).size : 0;
console.log('1. Right Image File (public/images/hero/hero-right.png):', imgExists ? `PASS (${imgSize} bytes)` : 'FAIL');

// 2. Read Hero Component Content
const heroContent = fs.readFileSync(heroComponentPath, 'utf8');

// 3. Verify Carousel / Slider Removal
const hasCarouselState = heroContent.includes('activeIndex') || heroContent.includes('heroImages') || heroContent.includes('setInterval');
console.log('2. Carousel / Slider Removal:', !hasCarouselState ? 'PASS' : 'FAIL');

// 4. Verify Right-side Image Placement
const hasRightImgTag = heroContent.includes('src="/images/hero/hero-right.png"');
const hasObjectContain = heroContent.includes('object-contain');
console.log('3. Right Image Tag & Preservation:', (hasRightImgTag && hasObjectContain) ? 'PASS' : 'FAIL');

// 5. Verify Left-side Content Intact
const hasBadge = heroContent.includes('GENUINE HP PRINTING SOLUTIONS');
const hasHeading = heroContent.includes('Find the Right Printer for Every Space');
const hasDesc = heroContent.includes('Whether you’re printing school papers at home');
const hasShopBtn = heroContent.includes('SHOP HP CATALOG');
const hasExploreBtn = heroContent.includes('EXPLORE SOLUTIONS');

console.log('4. Left Content Preservation:', (hasBadge && hasHeading && hasDesc && hasShopBtn && hasExploreBtn) ? 'PASS' : 'FAIL');

console.log('\n==================================================');
if (imgExists && !hasCarouselState && hasRightImgTag && hasBadge && hasHeading && hasDesc && hasShopBtn && hasExploreBtn) {
  console.log('=== HERO RIGHT IMAGE REPLACEMENT VERIFICATION PASSED SUCCESSFULLY ===');
} else {
  console.log('=== VERIFICATION FAILED ===');
  process.exit(1);
}
