const fs = require('fs');
const path = require('path');

const productTabs = [
  { id: 'all', label: 'All Printers & Supplies' },
  { id: 'home-printers', label: 'Home Printers' },
  { id: 'office-printers', label: 'Office Printers' },
  { id: 'ink-toner', label: 'Ink & Toner' },
  { id: 'printer-accessories', label: 'Printer Accessories' },
  { id: 'paper-media', label: 'Paper & Media' }
];

const homePrinters = [
  { name: 'HP ENVY 6055e All-in-One Printer', model: '6055e', price: 129.99, orig: 159.99, badge: 'Save 19%', img: '/images/products/prod_hp_envy.webp', sub: 'Wireless Color All-in-One Inkjet Printer with 6 Months HP Instant Ink' },
  { name: 'HP DeskJet 2755e Wireless Color All-in-One', model: '2755e', price: 84.99, orig: 99.99, badge: 'Bestseller', img: '/images/products/prod_brother_hl.webp', sub: 'Compact Household Inkjet Printer for Everyday Printing & Scanning' },
  { name: 'HP ENVY Inspire 7955e Wireless Photo Printer', model: '7955e', price: 219.99, orig: 249.99, badge: 'Save $30', img: '/images/products/prod_hp_envy.webp', sub: 'Premium Family Photo & Document Printer with Built-in Photo Tray' },
  { name: 'HP Smart Tank 5101 Wireless All-in-One', model: '5101', price: 249.99, orig: 279.99, badge: 'High Yield', img: '/images/products/prod_epson_ecotank.webp', sub: 'Cartridge-Free Refillable Ink Tank Printer with 2 Years of Included Ink' },
  { name: 'HP ENVY 6455e Wireless Color All-in-One', model: '6455e', price: 149.99, orig: 179.99, badge: 'Auto Feeder', img: '/images/products/prod_hp_envy.webp', sub: 'All-in-One Printer with 35-Page Auto Document Feeder & Duplex Print' },
  { name: 'HP DeskJet 3755 Compact Wireless All-in-One', model: '3755', price: 79.99, orig: 89.99, badge: 'Ultra Compact', img: '/images/products/prod_brother_hl.webp', sub: 'The Smallest All-in-One Printer for Tight Spaces & Dorms' },
  { name: 'HP Smart Tank 7001 Wireless All-in-One', model: '7001', price: 299.99, orig: 339.99, badge: 'Eco Tank', img: '/images/products/prod_epson_ecotank.webp', sub: 'High-Volume Color Ink Tank Printer with Auto 2-Sided Printing' },
  { name: 'HP ENVY Inspire 7255e Photo Printer', model: '7255e', price: 189.99, orig: 219.99, badge: 'Photo Studio', img: '/images/products/prod_hp_envy.webp', sub: 'Vibrant True-to-Life Color Photo & Everyday Document Printer' },
  { name: 'HP DeskJet 4155e All-in-One Printer', model: '4155e', price: 99.99, orig: 119.99, badge: 'Smart App', img: '/images/products/prod_brother_hl.webp', sub: 'Wireless Color Printing with Mobile Fax & Auto Document Feeder' },
  { name: 'HP Smart Tank 7301 Wireless All-in-One', model: '7301', price: 349.99, orig: 399.99, badge: 'Top Rated', img: '/images/products/prod_epson_ecotank.webp', sub: 'Heavy Duty Ink Tank Printer with Ethernet & 35-Page ADF' },
  { name: 'HP ENVY Photo 7855 Wireless All-in-One', model: '7855', price: 229.99, orig: 259.99, badge: 'SD Card Reader', img: '/images/products/prod_hp_envy.webp', sub: 'Versatile Photo Printer with Ethernet, Bluetooth & SD Card Slot' },
  { name: 'HP DeskJet Plus 4122 Wireless All-in-One', model: '4122', price: 89.99, orig: 109.99, badge: 'Value Choice', img: '/images/products/prod_brother_hl.webp', sub: 'Simple Document & Coupon Wireless Color Printer' },
  { name: 'HP Tango Smart Wireless Home Printer', model: 'Tango', price: 159.99, orig: 189.99, badge: 'Smart Design', img: '/images/products/prod_hp_envy.webp', sub: 'Sleek Smart Home Printer Controlled Entirely via HP Smart App' },
  { name: 'HP Sprocket Select Portable Photo Printer', model: 'Sprocket', price: 99.99, orig: 119.99, badge: 'Pocket Size', img: '/images/products/prod_brother_hl.webp', sub: 'Instant 2.3x3.4 inch Sticky-Backed Photo Printing for Smartphones' },
  { name: 'HP ENVY 6075 All-in-One Wireless Printer', model: '6075', price: 139.99, orig: 169.99, badge: 'Family Choice', img: '/images/products/prod_hp_envy.webp', sub: 'Family Color Printer with Self-Healing Wi-Fi & Smart App Setup' },
  { name: 'HP DeskJet 2722e Wireless Color Printer', model: '2722e', price: 74.99, orig: 84.99, badge: 'Budget Friendly', img: '/images/products/prod_brother_hl.webp', sub: 'Worry-Free Wireless Setup for Essential Home Documents' }
];

const officePrinters = [
  { name: 'HP LaserJet Pro M404dn Monochrome Laser', model: 'M404dn', price: 279.99, orig: 329.99, badge: 'Fast 40 PPM', img: '/images/products/prod_hp_laserjet.webp', sub: 'High-Speed Business Duplex Monochrome Laser Printer' },
  { name: 'HP OfficeJet Pro 9015e Wireless All-in-One', model: '9015e', price: 249.99, orig: 289.99, badge: 'Best Seller', img: '/images/products/prod_hp_envy.webp', sub: 'Professional Color Inkjet Printer with Smart Tasks & Security' },
  { name: 'HP Color LaserJet Pro M283fdw Wireless MFP', model: 'M283fdw', price: 499.99, orig: 549.99, badge: 'Color Laser', img: '/images/products/prod_hp_laserjet.webp', sub: 'Multifunction Wireless Color Laser Printer with Touchscreen' },
  { name: 'HP LaserJet Tank MFP 2604dw Wireless Printer', model: '2604dw', price: 329.99, orig: 379.99, badge: 'Toner Tank', img: '/images/products/prod_hp_laserjet.webp', sub: 'High-Volume Reloadable Toner Laser Printer with 5k Pre-Filled Pages' },
  { name: 'HP OfficeJet Pro 8025e All-in-One Printer', model: '8025e', price: 199.99, orig: 229.99, badge: 'Office Essential', img: '/images/products/prod_hp_envy.webp', sub: 'Fast 20 ppm Color Inkjet Printer with Auto 2-Sided Printing' },
  { name: 'HP LaserJet Pro MFP M428fdw Laser Printer', model: 'M428fdw', price: 549.99, orig: 599.99, badge: 'Enterprise Security', img: '/images/products/prod_hp_laserjet.webp', sub: '4-in-1 Multifunction Monochrome Laser with Single-Pass Duplex Scanning' },
  { name: 'HP Color LaserJet Enterprise M455dn', model: 'M455dn', price: 649.99, orig: 719.99, badge: 'Heavy Duty', img: '/images/products/prod_hp_laserjet.webp', sub: 'Enterprise-Grade Security & Dynamic Color LaserJet Workhorse' },
  { name: 'HP OfficeJet Pro 9025e All-in-One Printer', model: '9025e', price: 349.99, orig: 399.99, badge: 'Dual Trays', img: '/images/products/prod_hp_envy.webp', sub: 'High-Performance Office Printer with 500-Sheet Paper Capacity' },
  { name: 'HP LaserJet Pro M501dn High-Speed Laser', model: 'M501dn', price: 479.99, orig: 529.99, badge: '45 PPM Speed', img: '/images/products/prod_hp_laserjet.webp', sub: 'Ultra-Fast Monochrome Business Laser Printer for Workgroups' },
  { name: 'HP Color LaserJet Pro M454dw Wireless Laser', model: 'M454dw', price: 429.99, orig: 479.99, badge: 'Wireless Color', img: '/images/products/prod_hp_laserjet.webp', sub: 'Vibrant Business Color Output with Dual-Band Wi-Fi' },
  { name: 'HP OfficeJet Pro 8035e All-in-One Printer', model: '8035e', price: 219.99, orig: 249.99, badge: 'Smart Tasks', img: '/images/products/prod_hp_envy.webp', sub: 'Smart Color Printer with Automated Cloud Scanning Shortcuts' },
  { name: 'HP LaserJet Enterprise M507x Business Laser', model: 'M507x', price: 899.99, orig: 999.99, badge: 'Workgroup King', img: '/images/products/prod_hp_laserjet.webp', sub: '4.3-inch Color Touchscreen Printer with Built-in Security & Dual Trays' },
  { name: 'HP OfficeJet Enterprise Color MFP X585f', model: 'X585f', price: 1299.99, orig: 1499.99, badge: 'Enterprise MFP', img: '/images/products/prod_hp_envy.webp', sub: 'PageWide Technology Enterprise Color Multifunction Workstation' },
  { name: 'HP Color LaserJet Pro MFP M182n', model: 'M182n', price: 379.99, orig: 419.99, badge: 'Compact Laser', img: '/images/products/prod_hp_laserjet.webp', sub: 'Compact Ethernet Color Laser Printer with Sharp Text & Graphics' },
  { name: 'HP LaserJet Pro M203dw Wireless Laser Printer', model: 'M203dw', price: 219.99, orig: 249.99, badge: 'Auto Duplex', img: '/images/products/prod_hp_laserjet.webp', sub: 'Reliable Wireless Monochrome Printing for Small Offices' },
  { name: 'HP OfficeJet Pro 9010 All-in-One Printer', model: '9010', price: 239.99, orig: 269.99, badge: 'Proven Quality', img: '/images/products/prod_hp_envy.webp', sub: 'Self-Healing Wi-Fi & Smart Task Shortcuts for Productivity' }
];

const inkToner = [
  { name: 'HP 67XL High Yield Original Black Ink Cartridge', model: '3YM57AN', price: 31.99, orig: 35.99, badge: 'Genuine HP', img: '/images/products/prod_canon_pixma.webp', sub: 'High Yield Original Ink Cartridge for ENVY & DeskJet' },
  { name: 'HP 910XL Cyan/Magenta/Yellow 3-Pack Ink Set', model: '3YP34AN', price: 64.99, orig: 74.99, badge: 'Bundle Savings', img: '/images/products/prod_canon_pixma.webp', sub: 'High Yield Color Original Ink Cartridges for OfficeJet Pro' },
  { name: 'HP 58A Black Original LaserJet Toner Cartridge', model: 'CF258A', price: 134.99, orig: 149.99, badge: 'Original Toner', img: '/images/products/prod_hp_laserjet.webp', sub: 'Standard Yield Black LaserJet Toner for Pro M404 & M428' },
  { name: 'HP 206A Black Original LaserJet Toner Cartridge', model: 'W2110A', price: 69.99, orig: 79.99, badge: 'JetIntelligence', img: '/images/products/prod_hp_laserjet.webp', sub: 'Original Laser Toner Cartridge for Color LaserJet M283/M255' },
  { name: 'HP 952XL High Yield Black Original Ink Cartridge', model: 'F6U19AN', price: 48.99, orig: 54.99, badge: 'High Yield', img: '/images/products/prod_canon_pixma.webp', sub: 'Yields up to 2,000 pages for OfficeJet Pro 8710 & 8720' },
  { name: 'HP 64XL High Yield Black Original Ink Cartridge', model: 'N9J92AN', price: 42.99, orig: 47.99, badge: 'Photo Quality', img: '/images/products/prod_canon_pixma.webp', sub: 'High Capacity Archival Black Ink for ENVY Photo Series' },
  { name: 'HP 206A Cyan/Magenta/Yellow 3-Pack Toner Set', model: '206A-3PK', price: 219.99, orig: 239.99, badge: '3-Pack Pack', img: '/images/products/prod_hp_laserjet.webp', sub: 'Complete Original Color Laser Toner Refill Set' },
  { name: 'HP 414A Black Original LaserJet Toner Cartridge', model: 'W2020A', price: 149.99, orig: 169.99, badge: 'Security Chip', img: '/images/products/prod_hp_laserjet.webp', sub: 'High Performance Toner Cartridge for Color LaserJet Pro M454' },
  { name: 'HP 63XL High Yield Black Original Ink Cartridge', model: 'F6U64AN', price: 39.99, orig: 44.99, badge: 'Top Seller', img: '/images/products/prod_canon_pixma.webp', sub: 'Delivers Crisp Black Text for DeskJet 1112, 2130, 3630 Series' },
  { name: 'HP 902XL High Yield Black Original Ink Cartridge', model: 'T6M14AN', price: 44.99, orig: 49.99, badge: 'Office Grade', img: '/images/products/prod_canon_pixma.webp', sub: 'Yields up to 825 pages for OfficeJet 6950 & 6960 Series' },
  { name: 'HP 215A Black Original LaserJet Toner Cartridge', model: 'W2310A', price: 62.99, orig: 69.99, badge: 'Compact Laser', img: '/images/products/prod_hp_laserjet.webp', sub: 'Precision Laser Toner for HP Color LaserJet Pro M155/M182' },
  { name: 'HP 962XL High Yield Black Original Ink Cartridge', model: '3JA03AN', price: 52.99, orig: 59.99, badge: '2000 Pages', img: '/images/products/prod_canon_pixma.webp', sub: 'High Volume Business Printing Ink for OfficeJet Pro 9010/9020' },
  { name: 'HP 305A Black Original LaserJet Toner Cartridge', model: 'CE410A', price: 119.99, orig: 129.99, badge: 'Enterprise Grade', img: '/images/products/prod_hp_laserjet.webp', sub: 'Consistent Monochrome Printing for LaserJet Pro 300/400' },
  { name: 'HP 61XL High Yield Black Original Ink Cartridge', model: 'CH563WN', price: 37.99, orig: 42.99, badge: 'Legacy Fit', img: '/images/products/prod_canon_pixma.webp', sub: 'High Yield Ink for DeskJet 1000, 2000, 3000 Series' },
  { name: 'HP 134A Black Original LaserJet Toner Cartridge', model: 'W1340A', price: 59.99, orig: 67.99, badge: 'Precision Toner', img: '/images/products/prod_hp_laserjet.webp', sub: 'Designed for HP LaserJet M209 and MFP M234 Series' },
  { name: 'HP 950XL High Yield Black Ink Cartridge', model: 'CN045AN', price: 46.99, orig: 51.99, badge: 'High Yield', img: '/images/products/prod_canon_pixma.webp', sub: 'Yields up to 2,300 pages for OfficeJet Pro 8600 Series' }
];

const accessories = [
  { name: 'HP High-Speed USB 2.0 Printer Cable (10 Feet)', model: 'USB-10FT', price: 14.99, orig: 19.99, badge: 'Gold Plated', img: '/images/products/prod_hp_envy.webp', sub: 'Heavy-Duty Gold-Plated USB-A to USB-B Printer Cable' },
  { name: 'HP Auto-Duplex 250-Sheet Paper Feeder Tray', model: 'D9P29A', price: 139.99, orig: 169.99, badge: 'Capacity Boost', img: '/images/products/prod_hp_laserjet.webp', sub: 'Add-On 250-Sheet Input Tray for LaserJet Pro M404 / M428' },
  { name: 'HP LaserJet 550-Sheet Feeder Tray', model: 'F2A72A', price: 199.99, orig: 229.99, badge: 'High Capacity', img: '/images/products/prod_hp_laserjet.webp', sub: 'Expand Paper Capacity up to 1,200 Sheets for Enterprise Workgroups' },
  { name: 'HP Jetdirect 2900nw Print Server Adapter', model: 'J8031A', price: 149.99, orig: 179.99, badge: 'Wireless Server', img: '/images/products/prod_hp_envy.webp', sub: 'Add Secure Wireless Networking to USB LaserJet Printers' },
  { name: 'HP LaserJet 110V Fuser Maintenance Kit', model: 'RM2-2577', price: 179.99, orig: 199.99, badge: 'OEM Maintenance', img: '/images/products/prod_hp_laserjet.webp', sub: 'Extends Roller & Fuser Lifespan up to 150,000 Pages' },
  { name: 'HP High-Speed USB 3.0 Printer Cable (15 Feet)', model: 'USB3-15FT', price: 18.99, orig: 24.99, badge: 'Shielded Cable', img: '/images/products/prod_hp_envy.webp', sub: 'Extra Long Shielded Connection Cable for Large Office Desks' },
  { name: 'HP Wireless Direct Print USB Dongle', model: 'W8X25A', price: 39.99, orig: 49.99, badge: 'Direct Wi-Fi', img: '/images/products/prod_hp_envy.webp', sub: 'Enables Wi-Fi Direct Smartphone Printing for Wired Printers' },
  { name: 'HP LaserJet Pickup & Feed Roller Kit', model: 'L2725-67901', price: 49.99, orig: 59.99, badge: 'Anti Jam', img: '/images/products/prod_hp_laserjet.webp', sub: 'Restores Smooth Paper Feeding and Eliminates Multi-Sheet Jams' },
  { name: 'HP DeskJet Power Adapter & AC Cord', model: '0957-2385', price: 24.99, orig: 29.99, badge: 'Power Supply', img: '/images/products/prod_brother_hl.webp', sub: 'Official Replacement 30W Power Adapter for DeskJet & ENVY' },
  { name: 'HP LaserJet Cabinet Stand with Locking Wheels', model: 'F2A73A', price: 249.99, orig: 289.99, badge: 'Office Stand', img: '/images/products/prod_hp_laserjet.webp', sub: 'Sturdy Floor Stand with Paper Storage Cabinet for Enterprise Printers' },
  { name: 'HP Heavy-Duty Printer Dust Cover Enclosure', model: 'COVER-XL', price: 29.99, orig: 34.99, badge: 'Protective Cover', img: '/images/products/prod_hp_envy.webp', sub: 'Waterproof & Anti-Static Nylon Dust Cover for Office Printers' },
  { name: 'HP Gigabit Ethernet 10/100/1000T EIO Card', model: 'J7961G', price: 89.99, orig: 109.99, badge: 'Network Card', img: '/images/products/prod_hp_laserjet.webp', sub: 'High Speed Wired Gigabit Interface Expansion Module' },
  { name: 'HP Mobile Bluetooth 5.0 Printer Adapter', model: 'BT-500', price: 34.99, orig: 42.99, badge: 'Bluetooth 5', img: '/images/products/prod_hp_envy.webp', sub: 'Wireless Bluetooth Adapter for Mobile OfficeJet Printers' },
  { name: 'HP Envelope Feeder Tray Attachment', model: 'CB524A', price: 119.99, orig: 139.99, badge: 'Bulk Envelope', img: '/images/products/prod_hp_laserjet.webp', sub: 'Automated 75-Envelope Feed Attachment for Commercial Mailings' },
  { name: 'HP LaserJet 3-Bin Stapler Stacker Output Unit', model: 'B5L28A', price: 299.99, orig: 349.99, badge: 'Auto Stapler', img: '/images/products/prod_hp_laserjet.webp', sub: 'Automatic Document Finishing and Stapling Expansion Unit' },
  { name: 'HP USB-C to USB-B Printer Adapter Cable (6 Feet)', model: 'USBC-6FT', price: 16.99, orig: 21.99, badge: 'Type-C Cable', img: '/images/products/prod_hp_envy.webp', sub: 'Direct Connection for Modern USB-C MacBooks & Laptops' }
];

const paperMedia = [
  { name: 'HP Premium Plus Glossy Photo Paper (8.5x11, 50 Sheets)', model: 'CR668A', price: 24.99, orig: 29.99, badge: 'Studio Gloss', img: '/images/products/prod_epson_ecotank.webp', sub: 'Heavyweight Studio Glossy Photo Paper 80 lb / 300 gsm' },
  { name: 'HP Multipurpose 20 lb Copy Paper (500 Sheets)', model: '112000', price: 11.99, orig: 14.99, badge: 'ColorLok Tech', img: '/images/products/prod_epson_ecotank.webp', sub: 'High Brightness Everyday Multipurpose Printing Paper' },
  { name: 'HP Everyday Photo Paper Glossy (4x6, 100 Sheets)', model: 'Q8723A', price: 12.99, orig: 15.99, badge: 'Quick Dry', img: '/images/products/prod_epson_ecotank.webp', sub: 'Smudge-Resistant Everyday Family Snapshot Glossy Photo Paper' },
  { name: 'HP Premium Choice Laser Paper 32 lb (500 Sheets)', model: '112400', price: 19.99, orig: 23.99, badge: 'Super Smooth', img: '/images/products/prod_epson_ecotank.webp', sub: 'Ultra Thick 32 lb Uncoated Paper for High-Impact Presentations' },
  { name: 'HP Professional Matte Brochure Paper (100 Sheets)', model: 'Q6545A', price: 22.99, orig: 26.99, badge: 'Double Sided', img: '/images/products/prod_epson_ecotank.webp', sub: 'Heavyweight 48 lb Matte Coated Paper for Flyers & Sales Materials' },
  { name: 'HP Glossy Photo Cards (5x7, 60 Sheets)', model: 'HG208A', price: 14.99, orig: 17.99, badge: 'Frame Ready', img: '/images/products/prod_epson_ecotank.webp', sub: 'Pre-Cut 5x7 Studio Glossy Photo Cards for Greeting Cards & Framing' },
  { name: 'HP 100% Recycled 20 lb Copy Paper (500 Sheets)', model: '207000', price: 13.99, orig: 16.99, badge: 'Eco Friendly', img: '/images/products/prod_epson_ecotank.webp', sub: '100% Post-Consumer Recycled Content Paper with ColorLok' },
  { name: 'HP Premium Plus Soft Gloss Photo Paper (8.5x11)', model: 'Q8027A', price: 26.99, orig: 31.99, badge: 'Satin Finish', img: '/images/products/prod_epson_ecotank.webp', sub: 'Glare-Free Satin Soft Gloss Studio Paper for Portfolio Printing' },
  { name: 'HP Heavyweight Project Paper 28 lb (250 Sheets)', model: 'HP2825', price: 17.99, orig: 21.99, badge: 'Bright White', img: '/images/products/prod_epson_ecotank.webp', sub: 'Premium Heavyweight Paper Designed for Color Inkjet Reports' },
  { name: 'HP Glossy Tri-Fold Brochure Paper (100 Sheets)', model: 'Q2525A', price: 25.99, orig: 29.99, badge: 'Pre-Score Fold', img: '/images/products/prod_epson_ecotank.webp', sub: 'Pre-Scored Tri-Fold Glossy Paper for In-House Professional Marketing' },
  { name: 'HP Canvas Media Roll 24x50ft Wide Format', model: 'Q8674A', price: 119.99, orig: 139.99, badge: 'Wide Format', img: '/images/products/prod_epson_ecotank.webp', sub: 'Matte Artist Canvas Roll for Plotters & Designjet Printers' },
  { name: 'HP Iron-On Heat Transfer Paper for Light Fabrics (12 Sheets)', model: 'C6831A', price: 16.99, orig: 19.99, badge: 'T-Shirt Print', img: '/images/products/prod_epson_ecotank.webp', sub: 'Custom T-Shirt & Fabric Heat Transfer Media for Inkjets' },
  { name: 'HP Presentation Paper Matte 24 lb (150 Sheets)', model: 'Q1406A', price: 18.99, orig: 22.99, badge: 'Matte Coated', img: '/images/products/prod_epson_ecotank.webp', sub: 'Non-Glare Matte Paper for High Resolution Graphics & Charts' },
  { name: 'HP Heavy Duty Cover Cardstock 110 lb (100 Sheets)', model: 'CARD-110', price: 21.99, orig: 25.99, badge: 'Extra Thick', img: '/images/products/prod_epson_ecotank.webp', sub: 'Heavyweight White Cardstock for Book Covers & Business Cards' },
  { name: 'HP Premium Glossy Photo Paper (4x6, 250 Sheets Bulk)', model: 'CR667A', price: 29.99, orig: 35.99, badge: 'Bulk Pack', img: '/images/products/prod_epson_ecotank.webp', sub: 'Value Pack 4x6 Photo Paper for High Volume Photo Printing' },
  { name: 'HP Bright White Inkjet Paper 24 lb (500 Sheets)', model: 'HP2450', price: 15.99, orig: 18.99, badge: '100 Bright', img: '/images/products/prod_epson_ecotank.webp', sub: 'Extra Bright White Inkjet Paper for Bold Color Contrast' }
];

let globalId = 1;
const allProducts = [];

function addCategoryItems(items, catId, catName) {
  items.forEach(item => {
    allProducts.push({
      id: globalId++,
      name: item.name,
      modelNumber: item.model,
      sku: 'HP-' + catId.toUpperCase().replace('-', '_') + '-' + globalId,
      brand: 'HP',
      subtitle: item.sub,
      price: item.price,
      originalPrice: item.orig,
      discountBadge: item.badge,
      rating: +(4.7 + (globalId % 3) * 0.1).toFixed(1),
      reviewCount: 120 + (globalId * 17) % 400,
      category: catId,
      categoryName: catName,
      image: item.img,
      inStock: true,
      availability: 'In Stock & Ready to Ship',
      shortDescription: item.sub + ' Engineered for reliability and high performance.',
      longDescription: item.name + ' delivers reliable, high-quality performance for homes and offices. Features easy smartphone wireless setup, sharp text output, and official HP warranty coverage.',
      features: [
        'Automatic wireless setup with self-healing connection',
        'Official HP precision engineering for long-lasting quality',
        'Energy Star certified power efficient operation',
        'Includes 2-Year official manufacturer warranty coverage'
      ],
      specs: {
        technology: catId.includes('laser') ? 'Laser' : (catId.includes('ink') ? 'HP Thermal Inkjet' : 'Precision Hardware'),
        speed: catId.includes('laser') ? 'Up to 38 ppm' : 'Up to 15 ppm black, 10 ppm color',
        connectivity: 'Wi-Fi 802.11b/g/n, Bluetooth 5.0, Hi-Speed USB 2.0',
        functions: catId.includes('paper') || catId.includes('access') ? 'Hardware Accessory / Media' : 'Print, Scan, Copy',
        paperSupport: 'Letter, Legal, Executive, Envelopes, 4x6 in'
      },
      tags: ['HP', catName, item.model, 'Official HP']
    });
  });
}

addCategoryItems(homePrinters, 'home-printers', 'Home Printers');
addCategoryItems(officePrinters, 'office-printers', 'Office Printers');
addCategoryItems(inkToner, 'ink-toner', 'Ink & Toner');
addCategoryItems(accessories, 'printer-accessories', 'Printer Accessories');
addCategoryItems(paperMedia, 'paper-media', 'Paper & Media');

const fileContent = 'export const productTabs = ' + JSON.stringify(productTabs, null, 2) + ';\n\n' +
  'export const productsData = ' + JSON.stringify(allProducts, null, 2) + ';\n';

fs.writeFileSync(path.join(__dirname, 'products.js'), fileContent, 'utf8');
console.log('Successfully generated 80 products across 5 categories in products.js!');
