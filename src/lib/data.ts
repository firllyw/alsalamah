// Utility function to fetch static data
export async function fetchStaticData() {
  try {
    const response = await fetch('/data.json');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching static data:', error);
    // Return fallback data or throw error
    throw error;
  }
}

// For server-side usage during build time
export function getStaticData() {
  // This will be used during build time
  const fs = require('fs');
  const path = require('path');
  
  try {
    const dataPath = path.join(process.cwd(), 'public', 'data.json');
    const fileContents = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading static data:', error);
    throw error;
  }
}
