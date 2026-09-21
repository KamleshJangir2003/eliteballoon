const fs = require('fs');
const today = '2025-01-15';
const base = 'https://theballoonatelier.in';
const slugify = v => v.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');

const staticRoutes = [
  ['/',1.0,'daily'],
  ['/birthday-decorations',0.9,'weekly'],
  ['/kids-theme-decorations',0.9,'weekly'],
  ['/baby-welcome-decorations',0.9,'weekly'],
  ['/baby-shower-decorations',0.9,'weekly'],
  ['/haldi-decorations',0.9,'weekly'],
  ['/anniversary-decorations',0.9,'weekly'],
  ['/canopy-decorations',0.8,'weekly'],
  ['/proposal-decorations',0.8,'weekly'],
  ['/car-boot-decorations',0.8,'weekly'],
  ['/room-decorations',0.8,'weekly'],
  ['/balloon-bouquets',0.8,'weekly'],
  ['/candle-light-dinner',0.8,'weekly'],
  ['/flower-decorations',0.8,'weekly'],
  ['/office-decorations',0.8,'weekly'],
  ['/premium-decorations',0.8,'weekly'],
  ['/terrace-decorations',0.8,'weekly'],
  ['/congratulation-decorations',0.8,'weekly'],
  ['/retirement-decorations',0.8,'weekly'],
  ['/housewarming-decorations',0.8,'weekly'],
  ['/ganpati-decorations',0.8,'weekly'],
  ['/jain-festival-decorations',0.7,'weekly'],
  ['/diwali-decorations',0.8,'weekly'],
  ['/new-year-decorations',0.8,'weekly'],
  ['/christmas-decorations',0.8,'weekly'],
  ['/guruji-decorations',0.7,'weekly'],
  ['/bachelorette-decoration',0.7,'weekly'],
  ['/ceremony-decorations',0.8,'weekly'],
  ['/ceremony-decorations/naming',0.7,'weekly'],
  ['/ceremony-decorations/annaprashan-rice',0.7,'weekly'],
  ['/party-decorations',0.7,'weekly'],
  ['/decorations/birthday',0.9,'weekly'],
  ['/decorations/balloon',0.9,'weekly'],
  ['/decorations/anniversary',0.9,'weekly'],
  ['/decorations/baby-shower',0.9,'weekly'],
  ['/decorations/wedding',0.9,'weekly'],
  ['/decorations/birthday-balloon-decoration',0.8,'weekly'],
  ['/decorations/1st-birthday-decor',0.8,'weekly'],
  ['/decorations/kids-birthday-themes',0.8,'weekly'],
  ['/decorations/birthday-balloon-arch',0.8,'weekly'],
  ['/decorations/birthday-party-backdrops',0.8,'weekly'],
  ['/decorations/balloon-arches',0.8,'weekly'],
  ['/decorations/organic-balloon-decor',0.8,'weekly'],
  ['/decorations/number-balloons',0.8,'weekly'],
  ['/decorations/balloon-backdrops',0.8,'weekly'],
  ['/decorations/romantic-room-decoration',0.8,'weekly'],
  ['/decorations/anniversary-balloon-decor',0.8,'weekly'],
  ['/decorations/candlelight-setup',0.8,'weekly'],
  ['/decorations/proposal-decoration',0.8,'weekly'],
  ['/decorations/surprise-decoration',0.8,'weekly'],
  ['/decorations/baby-shower-decor',0.8,'weekly'],
  ['/decorations/newborn-welcome',0.8,'weekly'],
  ['/decorations/naming-ceremony',0.8,'weekly'],
  ['/decorations/kids-theme-decor',0.8,'weekly'],
  ['/decorations/first-birthday',0.8,'weekly'],
  ['/decorations/engagement-decoration',0.8,'weekly'],
  ['/decorations/haldi-decoration',0.8,'weekly'],
  ['/decorations/mehendi-decoration',0.7,'weekly'],
  ['/decorations/wedding-backdrops',0.8,'weekly'],
  ['/city/ahmedabad',0.9,'weekly'],
  ['/city/gandhinagar',0.9,'weekly'],
  ['/city/chandigarh',0.9,'weekly'],
  ['/contact',0.7,'monthly'],
  ['/about',0.6,'monthly'],
  ['/privacy-policy',0.4,'monthly'],
  ['/terms',0.4,'monthly'],
  ['/cancellation-policy',0.4,'monthly'],
];

const ahmedabadAreas = ['Bopal','Satellite','Prahlad Nagar','Prahladnagar','Vastrapur','Bodakdev','Thaltej','SG Highway','Navrangpura','Maninagar','Paldi','Ambawadi','Ambli','Jodhpur','Makarba','Gota','Chandkheda','Chandlodia','Motera','Sabarmati','Shahibaug','Shahpur','Ghatlodia','Ranip','Naranpura','Nikol','Naroda','Odhav','Isanpur','Vatva','Shilaj','Shela','South Bopal','Sanand','Changodar','Amraiwadi','Asarwa','Ashram Road','Astodia','Bapunagar','Behrampura','Bhadra','Bhairavnath','Chanakyapuri','CTM','Dariapur','Danilimda','Dudheshwar','Ellisbridge','Ghodasar','Gurukul','Juhapura','Kalupur','Kankaria','Khadia','Khanpur','Khokhra','Kubernagar','Lambha','Memnagar','Nava Vadaj','Rakhial','Ramol','Sarkhej','Shyamal','Sola','Vastral','Vasna','Vejalpur','Science City','Ghuma','Mumatpura','Sindhu Bhavan Road','Hebatpur','Chharodi','Ognaj','Jagatpur','Vaishnodevi Circle','Zundal','Koba','Bhat','Kotarpur','Hansol','Airport area'];

const gandhinagarAreas = ['Kudasan','Sargasan','Raysan','Infocity','Gift City','Randesan','Koba','Vavol','Pethapur','Sector 11','Sector 1','Sector 2','Sector 5','Sector 6','Sector 7','Sector 8','Sector 9','Sector 10','Sector 21','Sector 22','Sector 23','Sector 24','Sector 25','Sector 26','Sector 27','Sector 28','Sector 29','Sector 30','Adalaj','Adraj Moti','Alampur','Ambapur','Amiyapur','Bhat','Borij','Chandrala','Chhala','Chiloda','Dabhoda','Dashela','Dhanap','Dholakuva','Dolarana Vasana','Indroda','Tarapur','Uvarsad','Vasna Hadmatiya','Palaj','Bhoyan Rathod','Dantali','Kolavada','Khoraj','Ratanpur','Shertha','Valad','Zundal','Kalol'];

const url = (loc, priority, freq) =>
  `  <url>\n    <loc>${base}${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

staticRoutes.forEach(([path, priority, freq]) => { xml += url(path, priority, freq); });
ahmedabadAreas.forEach(area => { xml += url('/city/ahmedabad/' + slugify(area), 0.7, 'weekly'); });
gandhinagarAreas.forEach(area => { xml += url('/city/gandhinagar/' + slugify(area), 0.7, 'weekly'); });

xml += '</urlset>';

fs.writeFileSync('public/sitemap.xml', xml, 'utf8');
const count = (xml.match(/<url>/g) || []).length;
console.log('sitemap.xml created with', count, 'URLs');
