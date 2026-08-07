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

const hpImageEnvy = '/images/products/prod_hp_envy.webp';
const hpImageLaserJet = '/images/products/prod_hp_laserjet.webp';

// Custom User Descriptions Dictionary
const customDescriptions = {
  'hp-smart-tank-7602-all-in-one': {
    longDescription: `The HP Smart Tank 7602 All-in-One is a great choice for home offices and small businesses that need reliable, everyday printing without the constant expense of replacing ink cartridges. With its refillable ink tank system, this printer is built for high-volume printing while helping keep long-term printing costs low.

Designed with convenience in mind, it combines printing, scanning, copying, and faxing in one compact device, making it a practical addition to any workspace.

Built for Busy Workdays:
When your day involves printing reports, invoices, forms, or presentations, the HP Smart Tank 7602 helps you stay productive. It delivers print speeds of up to 15 pages per minute in black and 9 pages per minute in color, helping you finish everyday tasks more efficiently. The 35-page automatic document feeder makes scanning and copying multi-page documents much easier, while the intuitive touchscreen keeps frequently used functions within easy reach. With dual-band Wi-Fi, you can print from your computer, smartphone, or tablet without relying on cables, giving you more flexibility wherever you work.

More Printing, Less Refilling:
One of the biggest advantages of the Smart Tank 7602 is its high-capacity ink system. The printer includes enough Original HP ink to produce up to 8,000 color pages or 6,000 black pages, reducing the need for frequent refills. The spill-resistant refill bottles are designed to make adding ink clean and straightforward, helping you get back to printing with minimal interruption. For homes and businesses that print regularly, this can mean fewer trips to purchase ink and lower printing costs over time.

A More Thoughtful Design:
The HP Smart Tank 7602 is designed with everyday use and sustainability in mind. Its refillable ink system helps reduce plastic waste compared to traditional cartridges, and the printer itself incorporates recycled materials in its construction. Pair it with responsibly sourced paper, and you'll have a printing setup that's more mindful of its environmental impact without compromising on quality or performance.`,
    features: [
      'Print, Scan, Copy & Fax',
      'Up to 15 ppm Black / 9 ppm Color',
      '35-Page Automatic Document Feeder',
      'High-Capacity Refillable Ink Tank',
      'Up to 8,000 Color or 6,000 Black Pages Included',
      'Wireless Printing & Mobile Connectivity',
      'Easy-to-Use Touchscreen Interface',
      'Spill-Resistant Ink Refill System'
    ]
  },
  'hp-deskjet-4255e-all-in-one-printer': {
    longDescription: `The HP DeskJet 4255e All-in-One is a practical choice for everyday printing at home. Whether you're printing school assignments, shopping lists, recipes, shipping labels, or important documents, this compact printer is designed to handle daily tasks without taking up much space. With printing, scanning, and copying in one device, it's a convenient option for families, students, and anyone looking for an affordable all-in-one printer.

Made for Everyday Home Printing:
The HP DeskJet 4255e keeps everyday printing simple. Its compact design fits comfortably on a desk, shelf, or small workspace, making it a great addition to apartments, dorm rooms, or home offices. The built-in 35-page Automatic Document Feeder makes it easier to scan or copy multi-page documents, saving time when handling forms, assignments, or paperwork. You can also print wirelessly from your laptop, smartphone, or tablet, making it easy to send documents from wherever you are in your home.

Easy to Use from Day One:
Getting started is straightforward with the HP DeskJet 4255e. Once connected to your Wi-Fi network, you can print, scan, and copy with just a few taps using your preferred device. Its intuitive controls and simple setup make it a good fit for users who want reliable printing without a complicated learning curve.

Ink Options That Fit Your Routine:
The HP DeskJet 4255e works with Original HP ink cartridges and is compatible with HP's Instant Ink subscription service for customers who prefer automatic ink delivery. The printer uses HP's Dynamic Security technology, which is designed to work with cartridges that contain genuine HP electronic circuitry.

Designed with Sustainability in Mind:
The HP DeskJet 4255e is made using recycled plastic as part of HP's ongoing efforts to reduce environmental impact. Pairing it with responsibly sourced paper and participating in HP's cartridge recycling program are simple ways to reduce waste while continuing to print what matters most.`,
    features: [
      'Print, Scan & Copy',
      'Compact Design for Home Use',
      '35-Page Automatic Document Feeder',
      'Wireless Printing & Mobile Connectivity',
      'Easy Setup & Everyday Operation',
      'Compatible with HP Instant Ink',
      'Made with Recycled Materials',
      'Dependable Option for Home Users & Students'
    ]
  },
  'hp-smart-tank-7301-all-in-one-printer': {
    longDescription: `The HP Smart Tank 7301 All-in-One is a great fit for families, home offices, and anyone who prints regularly. With its refillable ink tank system, this printer is built to handle everything from school projects and everyday documents to colorful presentations and creative projects—all while keeping ink costs low over time. Combining printing, scanning, and copying in one compact device, it's designed to make everyday tasks easier without adding extra clutter to your workspace.

Built for Everyday Life:
Whether you're printing homework in the evening, working from home during the day, or organizing household paperwork, the HP Smart Tank 7301 is ready for daily use. It delivers print speeds of up to 15 pages per minute in black and 9 pages per minute in color, helping you finish routine printing tasks without unnecessary delays. The 35-page Automatic Document Feeder makes it easier to scan or copy multi-page documents, while the easy-to-use control panel keeps common functions within quick reach. With built-in Wi-Fi, you can print from laptops, smartphones, and tablets without dealing with extra cables.

More Pages Between Refills:
One of the biggest advantages of the Smart Tank 7301 is its high-capacity ink tank system. The printer comes with enough Original HP ink to print up to 8,000 color pages or 6,000 black pages, making it a smart option for households that print often. The refill process is clean and straightforward, thanks to HP's spill-resistant ink bottles, so adding more ink is quick and hassle-free.

Designed with Sustainability in Mind:
The HP Smart Tank 7301 is made using recycled materials as part of HP's ongoing effort to reduce environmental impact. Its refillable ink system also helps cut down on single-use plastic compared to traditional ink cartridges.`,
    features: [
      'Print, Scan & Copy',
      'High-Capacity Refillable Ink Tank',
      'Up to 15 ppm Black / 9 ppm Color Print Speed',
      '35-Page Automatic Document Feeder',
      'Wireless Printing & Mobile Connectivity',
      'Up to 8,000 Color or 6,000 Black Pages Included',
      'Spill-Resistant Ink Refill Bottles',
      'Compact Design for Home & Family Use'
    ]
  },
  'hp-envy-photo-7975-all-in-one-printer': {
    longDescription: `The HP Envy Photo 7975 All-in-One is designed for people who want more than just everyday printing. Whether you're preserving family memories, creating greeting cards, printing school projects, or handling daily paperwork, this printer delivers vibrant color and impressive detail in one versatile device. With printing, scanning, and copying capabilities, it's an excellent choice for families, creative users, and home offices that want quality without sacrificing convenience.

From Everyday Documents to Favorite Memories:
Some days you're printing tax forms or homework, and other days you're printing vacation photos or birthday invitations. The HP Envy Photo 7975 is built to handle both with ease. HP's True-to-Screen technology helps produce prints that closely match the colors you see on your display, making photos look natural and vibrant. If you enjoy creating personalized cards or keepsakes, automatic two-sided photo printing adds a thoughtful finishing touch without the extra effort. A dedicated photo tray lets you switch between photo paper and standard paper without constantly changing media.

Simple, Everyday Convenience:
The HP Envy Photo 7975 is designed to make printing feel effortless. Its large color touchscreen keeps common functions easy to access, while wireless connectivity allows you to print from your laptop, smartphone, or tablet around the house.

Smarter Printing, Less Waste:
Thoughtful features help you get more from every print job. Built-in tools help reduce unnecessary pages and make better use of your ink, so you can spend less time reprinting documents and more time enjoying the finished result.`,
    features: [
      'Print, Scan & Copy',
      'High-Quality Borderless Photo Printing',
      'HP True-to-Screen Technology',
      'Automatic Two-Sided Photo Printing',
      'Dedicated Photo Paper Tray',
      'Large Color Touchscreen',
      'Wireless & Mobile Printing',
      'Easy Setup for Home & Creative Use'
    ]
  },
  'hp-envy-6155e-all-in-one-printer': {
    longDescription: `The HP Envy 6155e All-in-One is a versatile printer made for everyday life. Whether you're printing work documents, school assignments, family photos, or creative projects, it brings together reliable performance and vibrant color in one compact device. With printing, scanning, and copying capabilities, it's a great choice for homes that need one printer to handle a little bit of everything.

Everyday Printing Made Easy:
From important paperwork to memorable photos, the HP Envy 6155e is designed to keep up with your daily routine. It produces sharp text, rich colors, and borderless photo prints that look great whether they're framed, shared, or added to a scrapbook. Automatic two-sided printing helps reduce paper usage, while automatic two-sided photo printing makes it easy to create personalized cards and keepsakes without the extra effort.

Convenient from Start to Finish:
The HP Envy 6155e is built with simplicity in mind. Its intuitive color touchscreen makes everyday tasks easy to navigate, and wireless connectivity lets you print from your laptop, smartphone, or tablet without being tied to a cable.

Ink & Compatibility:
The HP Envy 6155e uses Original HP ink cartridges and is compatible with HP+ features for customers who choose to activate them during setup. Dynamic Security technology ensures reliable operation with genuine HP cartridges.

Designed to Fit Your Space:
With its clean, modern design, the HP Envy 6155e fits naturally into home offices, study areas, or shared family spaces without taking up unnecessary room. The printer is made using recycled plastic as part of HP's effort to reduce environmental impact.`,
    features: [
      'Print, Scan & Copy',
      'Borderless Photo Printing',
      'Automatic Two-Sided Printing',
      'Automatic Two-Sided Photo Printing',
      'Wireless & Mobile Printing',
      'Intuitive Color Touchscreen',
      'Compact Design for Home Use',
      'Made with Recycled Materials'
    ]
  }
};

// EXACT 12 HP Home Printers requested
const homePrinters = [
  { name: 'HP Smart Tank 7602 All-in-One', model: '7602', price: 369.99, orig: 419.99, badge: 'Smart Tank', img: hpImageEnvy, sub: 'Cartridge-Free Smart Tank All-in-One Printer with Auto Document Feeder & Touchscreen' },
  { name: 'HP DeskJet 4255e All-in-One Printer', model: '4255e', price: 89.99, orig: 99.99, badge: 'Compact Choice', img: hpImageEnvy, sub: 'Wireless Color All-in-One Inkjet Printer with 35-Page Auto Document Feeder' },
  { name: 'HP Smart Tank 7301 All-in-One Printer', model: '7301', price: 449.99, orig: 499.99, badge: 'High Yield Tank', img: hpImageEnvy, sub: 'High-Capacity Wireless Color Tank Printer with Ethernet & Auto 2-Sided Printing' },
  { name: 'HP Envy Photo 7975 All-in-One Printer', model: '7975', price: 199.99, orig: 229.99, badge: 'Photo Studio', img: hpImageEnvy, sub: 'True-to-Life Color Photo Printer with Dedicated Photo Paper Tray' },
  { name: 'HP Envy 6155e All-in-One Printer', model: '6155e', price: 109.99, orig: 129.99, badge: 'Family Choice', img: hpImageEnvy, sub: 'Smart Wireless Color All-in-One Printer for Everyday Home Documents & Homework' },
  { name: 'HP Envy 6555e All-in-One Printer', model: '6555e', price: 149.99, orig: 179.99, badge: 'Auto Feeder', img: hpImageEnvy, sub: 'Versatile Wireless Color Printer with Automatic Duplexing & Touch Interface' },
  { name: 'HP Smart Tank 5103 All-in-One Printer', model: '5103', price: 199.99, orig: 229.99, badge: 'Cartridge Free', img: hpImageEnvy, sub: 'High-Volume Wireless Ink Tank Printer with Up to 2 Years of Included HP Ink' },
  { name: 'HP Smart Tank 5101 All-in-One Printer', model: '5101', price: 179.99, orig: 199.99, badge: 'Eco Tank', img: hpImageEnvy, sub: 'Cartridge-Free Wireless All-in-One Color Printer with Self-Healing Wi-Fi' },
  { name: 'HP Smart Tank 7001 All-in-One Printer', model: '7001', price: 259.99, orig: 289.99, badge: 'Top Seller', img: hpImageEnvy, sub: 'Fast Color Ink Tank Printer with Auto 2-Sided Printing & Smart App Controls' },
  { name: 'HP Smart Tank Plus 651 Wireless All-in-One', model: '651', price: 329.99, orig: 369.99, badge: 'Wireless Plus', img: hpImageEnvy, sub: 'Wireless Cartridge-Free All-in-One with Fax, Touchscreen & Auto Document Feeder' },
  { name: 'HP Envy Photo 7275 All-in-One Printer', model: '7275', price: 119.99, orig: 139.99, badge: 'Borderless Photo', img: hpImageEnvy, sub: 'Crisp Wireless Photo & Document Printer with Borderless Printing' },
  { name: 'HP Smart Tank 6001 All-in-One', model: '6001', price: 239.99, orig: 269.99, badge: 'Smart Tank', img: hpImageEnvy, sub: 'High-Performance Cartridge-Free Printer with Smart-Guided Buttons & Fast Printing' }
];

const officePrinters = [
  { name: 'HP LaserJet Pro M404dn Monochrome Laser', model: 'M404dn', price: 279.99, orig: 329.99, badge: 'Fast 40 PPM', img: hpImageLaserJet, sub: 'High-Speed Business Duplex Monochrome Laser Printer' },
  { name: 'HP OfficeJet Pro 9015e Wireless All-in-One', model: '9015e', price: 249.99, orig: 289.99, badge: 'Best Seller', img: hpImageLaserJet, sub: 'Professional Color Inkjet Printer with Smart Tasks & Security' },
  { name: 'HP Color LaserJet Pro M283fdw Wireless MFP', model: 'M283fdw', price: 499.99, orig: 549.99, badge: 'Color Laser', img: hpImageLaserJet, sub: 'Multifunction Wireless Color Laser Printer with Touchscreen' },
  { name: 'HP LaserJet Tank MFP 2604dw Wireless Printer', model: '2604dw', price: 329.99, orig: 379.99, badge: 'Toner Tank', img: hpImageLaserJet, sub: 'High-Volume Reloadable Toner Laser Printer with 5k Pre-Filled Pages' },
  { name: 'HP OfficeJet Pro 8025e All-in-One Printer', model: '8025e', price: 199.99, orig: 229.99, badge: 'Office Essential', img: hpImageLaserJet, sub: 'Fast 20 ppm Color Inkjet Printer with Auto 2-Sided Printing' },
  { name: 'HP LaserJet Pro MFP M428fdw Laser Printer', model: 'M428fdw', price: 549.99, orig: 599.99, badge: 'Enterprise Security', img: hpImageLaserJet, sub: '4-in-1 Multifunction Monochrome Laser with Single-Pass Duplex Scanning' },
  { name: 'HP Color LaserJet Enterprise M455dn', model: 'M455dn', price: 649.99, orig: 719.99, badge: 'Heavy Duty', img: hpImageLaserJet, sub: 'Enterprise-Grade Security & Dynamic Color LaserJet Workhorse' },
  { name: 'HP OfficeJet Pro 9025e All-in-One Printer', model: '9025e', price: 349.99, orig: 399.99, badge: 'Dual Trays', img: hpImageLaserJet, sub: 'High-Performance Office Printer with 500-Sheet Paper Capacity' },
  { name: 'HP LaserJet Pro M501dn High-Speed Laser', model: 'M501dn', price: 479.99, orig: 529.99, badge: '45 PPM Speed', img: hpImageLaserJet, sub: 'Ultra-Fast Monochrome Business Laser Printer for Workgroups' },
  { name: 'HP Color LaserJet Pro M454dw Wireless Laser', model: 'M454dw', price: 429.99, orig: 479.99, badge: 'Wireless Color', img: hpImageLaserJet, sub: 'Vibrant Business Color Output with Dual-Band Wi-Fi' },
  { name: 'HP OfficeJet Pro 8035e All-in-One Printer', model: '8035e', price: 219.99, orig: 249.99, badge: 'Smart Tasks', img: hpImageLaserJet, sub: 'Smart Color Printer with Automated Cloud Scanning Shortcuts' },
  { name: 'HP LaserJet Enterprise M507x Business Laser', model: 'M507x', price: 899.99, orig: 999.99, badge: 'Workgroup King', img: hpImageLaserJet, sub: '4.3-inch Color Touchscreen Printer with Built-in Security & Dual Trays' },
  { name: 'HP OfficeJet Enterprise Color MFP X585f', model: 'X585f', price: 1299.99, orig: 1499.99, badge: 'Enterprise MFP', img: hpImageLaserJet, sub: 'PageWide Technology Enterprise Color Multifunction Workstation' },
  { name: 'HP Color LaserJet Pro MFP M182n', model: 'M182n', price: 379.99, orig: 419.99, badge: 'Compact Laser', img: hpImageLaserJet, sub: 'Compact Ethernet Color Laser Printer with Sharp Text & Graphics' },
  { name: 'HP LaserJet Pro M203dw Wireless Laser Printer', model: 'M203dw', price: 219.99, orig: 249.99, badge: 'Auto Duplex', img: hpImageLaserJet, sub: 'Reliable Wireless Monochrome Printing for Small Offices' },
  { name: 'HP OfficeJet Pro 9010 All-in-One Printer', model: '9010', price: 239.99, orig: 269.99, badge: 'Proven Quality', img: hpImageLaserJet, sub: 'Self-Healing Wi-Fi & Smart Task Shortcuts for Productivity' }
];

const inkToner = [
  { name: 'HP 67XL High Yield Original Black Ink Cartridge', model: '3YM57AN', price: 31.99, orig: 35.99, badge: 'Genuine HP', img: hpImageEnvy, sub: 'High Yield Original Ink Cartridge for ENVY & DeskJet' },
  { name: 'HP 910XL Cyan/Magenta/Yellow 3-Pack Ink Set', model: '3YP34AN', price: 64.99, orig: 74.99, badge: 'Bundle Savings', img: hpImageEnvy, sub: 'High Yield Color Original Ink Cartridges for OfficeJet Pro' },
  { name: 'HP 58A Black Original LaserJet Toner Cartridge', model: 'CF258A', price: 134.99, orig: 149.99, badge: 'Original Toner', img: hpImageLaserJet, sub: 'Standard Yield Black LaserJet Toner for Pro M404 & M428' },
  { name: 'HP 206A Black Original LaserJet Toner Cartridge', model: 'W2110A', price: 69.99, orig: 79.99, badge: 'JetIntelligence', img: hpImageLaserJet, sub: 'Original Laser Toner Cartridge for Color LaserJet M283/M255' },
  { name: 'HP 952XL High Yield Black Original Ink Cartridge', model: 'F6U19AN', price: 48.99, orig: 54.99, badge: 'High Yield', img: hpImageEnvy, sub: 'Yields up to 2,000 pages for OfficeJet Pro 8710 & 8720' },
  { name: 'HP 64XL High Yield Black Original Ink Cartridge', model: 'N9J92AN', price: 42.99, orig: 47.99, badge: 'Photo Quality', img: hpImageEnvy, sub: 'High Capacity Archival Black Ink for ENVY Photo Series' },
  { name: 'HP 414A Black Original LaserJet Toner Cartridge', model: 'W2020A', price: 119.99, orig: 129.99, badge: 'Color Laser', img: hpImageLaserJet, sub: 'Standard Yield LaserJet Toner for Color LaserJet M454 & M479' },
  { name: 'HP 63XL High Yield Black Original Ink Cartridge', model: 'F6U64AN', price: 39.99, orig: 44.99, badge: 'Top Seller', img: hpImageEnvy, sub: 'Reliable Everyday Ink for DeskJet 1112, 2130, 3630 Series' },
  { name: 'HP 902XL High Yield Black Original Ink Cartridge', model: 'T6M14AN', price: 44.99, orig: 49.99, badge: 'High Yield', img: hpImageEnvy, sub: 'High Capacity Original Black Ink for OfficeJet 6950, 6960, 6970' },
  { name: 'HP 148A Black Original LaserJet Toner Cartridge', model: 'W1480A', price: 124.99, orig: 139.99, badge: 'New Gen Toner', img: hpImageLaserJet, sub: 'Original LaserJet Toner Cartridge for Pro 4001 & 4101 Series' },
  { name: 'HP 62XL High Yield Black Original Ink Cartridge', model: 'C2P05AN', price: 41.99, orig: 46.99, badge: 'High Capacity', img: hpImageEnvy, sub: 'Laser-Quality Black Text for ENVY 5640, 5660, 7640 Series' },
  { name: 'HP 202A Black Original LaserJet Toner Cartridge', model: 'CF500A', price: 65.99, orig: 72.99, badge: 'Precision Toner', img: hpImageLaserJet, sub: 'Standard Yield Black Toner for Color LaserJet Pro M254 & M281' },
  { name: 'HP 962XL High Yield Black Original Ink Cartridge', model: '3JA03AN', price: 49.99, orig: 55.99, badge: 'Office Pro', img: hpImageEnvy, sub: 'High Output Black Cartridge for OfficeJet Pro 9010 & 9020 Series' },
  { name: 'HP 87A Black Original LaserJet Toner Cartridge', model: 'CF287A', price: 219.99, orig: 239.99, badge: 'Enterprise Grade', img: hpImageLaserJet, sub: 'High Volume Black LaserJet Toner for Enterprise M506 & M527' },
  { name: 'HP GT53 Black Original Refill Ink Bottle 90ml', model: '1VV22AA', price: 15.99, orig: 18.99, badge: 'Tank Refill', img: hpImageEnvy, sub: 'High Capacity 6,000 Page Black Ink Refill Bottle for Smart Tank' },
  { name: 'HP 61XL High Yield Black Original Ink Cartridge', model: 'CH563WN', price: 37.99, orig: 42.99, badge: 'Legacy Best', img: hpImageEnvy, sub: 'Original High Yield Black Ink for DeskJet 1000, 2050, 3050 Series' }
];

const accessories = [
  { name: 'HP LaserJet 550-Sheet Feeder Tray', model: 'D9P29A', price: 199.99, orig: 229.99, badge: 'Expand Capacity', img: hpImageLaserJet, sub: 'Optional 550-Sheet Heavy Duty Paper Input Tray for LaserJet Pro M404/M428' },
  { name: 'HP High-Speed USB 2.0 A-to-B Printer Cable 6ft', model: 'USB-6FT', price: 14.99, orig: 19.99, badge: 'Gold Plated', img: hpImageLaserJet, sub: 'Heavy Duty Shielded Gold-Plated USB Printer Cable for Fast Data Sync' },
  { name: 'HP Jetdirect 2900nw Print Server Adapter', model: 'J8031A', price: 249.99, orig: 279.99, badge: 'Wireless Server', img: hpImageLaserJet, sub: 'High-Performance Wireless & Dual-Band Ethernet Network Print Server' },
  { name: 'HP LaserJet 110V Maintenance & Fuser Kit', model: 'RM2-2577', price: 179.99, orig: 199.99, badge: 'OEM Maintenance', img: hpImageLaserJet, sub: 'Official Replacement Fuser & Roller Maintenance Kit for M501/M506' },
  { name: 'HP Automatic Duplexer Unit Accessory', model: 'C6464A', price: 89.99, orig: 109.99, badge: 'Auto 2-Sided', img: hpImageLaserJet, sub: 'Plug & Play Automatic Double-Sided Printing Add-On Module' },
  { name: 'HP LaserJet 500-Sheet Feeder and Cabinet', model: 'F2A72A', price: 399.99, orig: 449.99, badge: 'Floor Stand', img: hpImageLaserJet, sub: 'Floor Standing Heavy Duty Storage Cabinet with 500-Sheet Paper Tray' },
  { name: 'HP Envelope Feeder Accessory Tray', model: 'CB524A', price: 149.99, orig: 169.99, badge: 'Mail Solution', img: hpImageLaserJet, sub: 'Precision Automatic Envelope Feeder Tray Holds up to 75 Envelopes' },
  { name: 'HP Wireless Direct BLE/NFC Accessory', model: '3JN69A', price: 79.99, orig: 89.99, badge: 'Touch-to-Print', img: hpImageLaserJet, sub: 'NFC Touch-to-Print & Bluetooth Low Energy Mobile Accessory for LaserJet' },
  { name: 'HP LaserJet 220V Maintenance Fuser Kit', model: 'RM2-5476', price: 189.99, orig: 209.99, badge: 'Heavy Duty', img: hpImageLaserJet, sub: '220V High Temperature Replacement Fuser Maintenance Assembly' },
  { name: 'HP USB Parallel Centronics Printer Adapter', model: 'HPU-PAR', price: 29.99, orig: 34.99, badge: 'Legacy Adapter', img: hpImageLaserJet, sub: 'Bi-Directional USB to 36-Pin Parallel Printer Converter Cable' },
  { name: 'HP LaserJet Roller Replacement Kit', model: 'W1B50A', price: 49.99, orig: 59.99, badge: 'Pickup Rollers', img: hpImageLaserJet, sub: 'OEM Pickup, Feed, and Separation Roller Replacement Pack' },
  { name: 'HP Smart Card Reader Access Accessory', model: 'CC543A', price: 129.99, orig: 149.99, badge: 'Secure Access', img: hpImageLaserJet, sub: 'Authentication Smart Card Reader for Enterprise Secure Printing' },
  { name: 'HP Wireless Dual-Band Wi-Fi 5 Module', model: '4QL32A', price: 119.99, orig: 139.99, badge: 'Wi-Fi 5 Fast', img: hpImageLaserJet, sub: 'Add Wireless 802.11ac Connectivity to Enterprise LaserJet Printers' },
  { name: 'HP LaserJet 1GB DDR3 90-Pin SDRAM DIMM', model: 'E5K48A', price: 99.99, orig: 119.99, badge: 'Memory Upgrade', img: hpImageLaserJet, sub: 'High Speed Memory Expansion for Complex Graphics & PDF Spooling' },
  { name: 'HP Cabinet Stand Wheel Base Assembly', model: 'Y4878A', price: 219.99, orig: 249.99, badge: 'Mobile Stand', img: hpImageLaserJet, sub: 'Heavy Duty Lockable Caster Wheel Base Stand for Office Printers' },
  { name: 'HP Wireless Direct Touch-to-Print BLE Dongle', model: '2MU47A', price: 69.99, orig: 79.99, badge: 'Mobile Print', img: hpImageLaserJet, sub: 'Instant Mobile Printing Bluetooth Dongle for HP LaserJet Pro' }
];

const paperMedia = [
  { name: 'HP Everyday Copy & Multipurpose Paper 500 Sheets', model: 'HPS20', price: 12.99, orig: 15.99, badge: 'ColorLok Tech', img: hpImageEnvy, sub: '92 Brightness 20lb Copy Paper Ream for Jam-Free Daily Printing' },
  { name: 'HP Advanced Glossy Photo Paper 8.5x11 (50 Sheets)', model: 'Q6638A', price: 24.99, orig: 29.99, badge: 'Lab Quality', img: hpImageEnvy, sub: 'Smudge-Resistant Instant-Dry Premium Glossy Photo Paper' },
  { name: 'HP Premium Choice LaserJet Paper 24lb (500 Sheets)', model: 'HAP2420', price: 18.99, orig: 22.99, badge: '98 Bright', img: hpImageLaserJet, sub: 'Heavyweight Extra Smooth 98 Brightness Paper for Proposals & Reports' },
  { name: 'HP Social Media Snapshots Removable Sticky Photo Paper', model: 'W4Z13A', price: 14.99, orig: 17.99, badge: 'Sticky Back', img: hpImageEnvy, sub: '4x5 inch Restickable Glossy Photo Cards for DIY Crafts & Wall Art' },
  { name: 'HP Brochure & Flyer Glossy Paper 180g (150 Sheets)', model: 'Q6612A', price: 29.99, orig: 34.99, badge: 'Marketing Grade', img: hpImageEnvy, sub: 'Heavyweight 48lb Two-Sided Glossy Paper for Sales Presentations' },
  { name: 'HP Office 20lb Copy Paper 10 Ream Case (5000 Sheets)', model: '112000', price: 64.99, orig: 74.99, badge: 'Bulk Box', img: hpImageLaserJet, sub: 'High Volume 5,000 Sheet Pallet Box for Busy Office Printers' },
  { name: 'HP Everyday Photo Paper Matte 4x6 (100 Sheets)', model: 'CR757A', price: 11.99, orig: 14.99, badge: 'Matte Finish', img: hpImageEnvy, sub: 'Quick Drying Matte Photo Cards for Everyday Family Prints' },
  { name: 'HP Professional Matte Laser Paper 32lb (150 Sheets)', model: 'CG965A', price: 22.99, orig: 26.99, badge: 'Heavy Matte', img: hpImageLaserJet, sub: 'Ultra Smooth Heavyweight Matte Paper for Vibrant Color Laser Prints' },
  { name: 'HP All-in-One22 Printing Paper 22lb (500 Sheets)', model: 'HPT1122', price: 16.99, orig: 19.99, badge: 'Extra Bright', img: hpImageLaserJet, sub: 'Premium 96 Brightness Multipurpose Paper for Sharp Black & Color' },
  { name: 'HP Premium Glossy Photo Paper 4x6 (100 Sheets)', model: 'CR759A', price: 15.99, orig: 18.99, badge: 'Instant Dry', img: hpImageEnvy, sub: 'Heavyweight 68lb Archival Quality Glossy Photo Paper' },
  { name: 'HP Heavyweight Project Paper Matte 8.5x11 (100 Sheets)', model: 'Q6550A', price: 19.99, orig: 23.99, badge: 'Project Grade', img: hpImageEnvy, sub: 'Durable Non-Glare Heavyweight Paper for Signs, Flyers & School Work' },
  { name: 'HP Translucent Clear Overlay Film (50 Sheets)', model: 'HP-FILM', price: 34.99, orig: 39.99, badge: 'Specialty Film', img: hpImageLaserJet, sub: 'Clear High Transparency Overhead Projection & Craft Film' },
  { name: 'HP Tri-fold Brochure Paper Glossy 150 Sheets', model: 'Q2525A', price: 31.99, orig: 36.99, badge: 'Pre-Scored', img: hpImageEnvy, sub: 'Pre-Folded Glossy Marketing Paper for Professional Pamphlets' },
  { name: 'HP Recycled Copy Paper 100% Post-Consumer 500 Sheets', model: 'HPE20R', price: 15.99, orig: 18.99, badge: '100% Eco', img: hpImageLaserJet, sub: 'Environmentally Friendly 100% Recycled 20lb Copy Paper Ream' },
  { name: 'HP Bright White Inkjet Paper 24lb (500 Sheets)', model: 'HPB1120', price: 17.99, orig: 21.99, badge: 'ColorLok 99', img: hpImageEnvy, sub: '99 Brightness Ultra White Paper for High Contrast Inkjet Documents' },
  { name: 'HP Iron-On T-Shirt Transfers for Light Fabrics (12 Sheets)', model: 'C6818A', price: 19.99, orig: 24.99, badge: 'Apparel DIY', img: hpImageEnvy, sub: 'Custom Heat Transfer Paper for Personalized T-Shirts, Bags & Aprons' }
];

let globalId = 1;
const allProducts = [];

function addCategoryItems(items, catId, catName) {
  items.forEach(item => {
    const slug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    // Strict Verification: Only update image path if matching local folder & 1.jpg actually exists!
    let mainImage = item.img;
    let galleryList = [
      '/images/hero/hero-1.webp',
      '/images/hero/hero-2.webp',
      '/images/hero/hero-3.webp',
      '/images/hero/hero-4.webp'
    ];

    if (catId === 'home-printers') {
      const publicDir = path.join(__dirname, '../../public');
      const folderPath = path.join(publicDir, 'images/products/home-printers', slug);
      const img1Path = path.join(folderPath, '1.jpg');
      
      if (fs.existsSync(folderPath) && fs.existsSync(img1Path)) {
        mainImage = `/images/products/home-printers/${slug}/1.jpg`;
        galleryList = [
          `/images/products/home-printers/${slug}/2.jpg`,
          `/images/products/home-printers/${slug}/3.jpg`,
          `/images/products/home-printers/${slug}/4.jpg`,
          `/images/products/home-printers/${slug}/5.jpg`
        ].filter(g => fs.existsSync(path.join(publicDir, g)));
      }
    }

    const allImages = [mainImage, ...galleryList];

    // Check for custom descriptions and key highlights
    const custom = customDescriptions[slug];
    const longDesc = custom ? custom.longDescription : (item.name + ' delivers reliable, high-quality performance for homes and offices. Features easy smartphone wireless setup, sharp text output, and official HP warranty coverage.');
    const featureList = custom ? custom.features : [
      'Automatic wireless setup with self-healing connection',
      'Official HP precision engineering for long-lasting quality',
      'Energy Star certified power efficient operation',
      'Includes 2-Year official manufacturer warranty coverage',
      'Compatible with HP Smart App for remote scanning & printing'
    ];

    allProducts.push({
      id: globalId++,
      slug: slug,
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
      image: mainImage,
      gallery: galleryList,
      images: allImages,
      inStock: true,
      availability: 'In Stock & Ready to Ship',
      shortDescription: item.sub + ' Engineered for reliability and high performance.',
      longDescription: longDesc,
      features: featureList,
      specs: {
        technology: catId.includes('laser') ? 'Laser' : (catId.includes('ink') ? 'HP Thermal Inkjet' : 'Precision Hardware'),
        speed: catId.includes('laser') ? 'Up to 38 ppm' : 'Up to 15 ppm black, 10 ppm color',
        connectivity: 'Wi-Fi 802.11b/g/n, Bluetooth 5.0, Hi-Speed USB 2.0',
        functions: catId.includes('paper') || catId.includes('access') ? 'Hardware Accessory / Media' : 'Print, Scan, Copy',
        paperSupport: 'Letter, Legal, Executive, Envelopes, 4x6 in',
        warranty: '2-Year Official Manufacturer Warranty'
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
console.log('Successfully generated updated HP products dataset with user-provided descriptions!');
