const XLSX = require('xlsx');
const fs = require('fs');

// Read the Excel file
const workbook = XLSX.readFile('src/DEW-Main referencce List-16.10.25.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert to JSON
const data = XLSX.utils.sheet_to_json(worksheet);

console.log('Total projects:', data.length);
console.log('\nFirst 5 projects:');
console.log(JSON.stringify(data.slice(0, 5), null, 2));

console.log('\nAll column names:');
if (data.length > 0) {
    console.log(Object.keys(data[0]));
}

// Count projects by country
const countryCounts = {};
data.forEach(row => {
    const country = row.Country || row.COUNTRY || row.country;
    if (country) {
        countryCounts[country] = (countryCounts[country] || 0) + 1;
    }
});

console.log('\nProjects by country:');
console.log(JSON.stringify(countryCounts, null, 2));

// Save full data to a JSON file for review
fs.writeFileSync('projects-data-full.json', JSON.stringify(data, null, 2));
console.log('\nFull data saved to projects-data-full.json');
