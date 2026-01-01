import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Config
const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'); // Handle newline char in env
const SHEET_ID = process.env.GOOGLE_SHEET_ID;

if (!SERVICE_ACCOUNT_EMAIL || !PRIVATE_KEY) {
  throw new Error('Google Service Account Config Missing');
}

const jwt = new JWT({
  email: SERVICE_ACCOUNT_EMAIL,
  key: PRIVATE_KEY,
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
  ],
});

export const doc = new GoogleSpreadsheet(SHEET_ID as string, jwt);

export async function getRows(sheetTitle: string) {
    if (!SHEET_ID) return []; 
    try {
        await doc.loadInfo(); // loads document properties and worksheets
        const sheet = doc.sheetsByTitle[sheetTitle];
        if (!sheet) return [];
        const rows = await sheet.getRows();
        return rows.map(row => row.toObject());
    } catch (error) {
        console.error('Sheets Error:', error);
        return [];
    }
}
