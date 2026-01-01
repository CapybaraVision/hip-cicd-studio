import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Config
// Lazy initialization
let docInstance: GoogleSpreadsheet | null = null;

export const getDoc = () => {
  if (docInstance) return docInstance;

  const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const SHEET_ID = process.env.GOOGLE_SHEET_ID;

  if (!SERVICE_ACCOUNT_EMAIL || !PRIVATE_KEY || !SHEET_ID) {
    console.warn('Google Sheets environment variables missing.');
    // Return a dummy or null, but for this app's architecture, we'll throw ONLY when used
    throw new Error('Google Service Account Config Missing');
  }

  const jwt = new JWT({
    email: SERVICE_ACCOUNT_EMAIL,
    key: PRIVATE_KEY,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  docInstance = new GoogleSpreadsheet(SHEET_ID, jwt);
  return docInstance;
};

// Backwards compatibility proxy (warning: this might still throw if accessed at top level)
// We will change the usages to call getDoc()
export const doc = new Proxy({} as GoogleSpreadsheet, {
  get: (_target, prop) => {
    const instance = getDoc();
    return (instance as any)[prop];
  }
});

export async function getRows(sheetTitle: string) {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) return [];
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
