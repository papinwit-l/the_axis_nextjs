// app/api/leads/route.ts
import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

const rateLimit = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3; // max 3 submissions per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimit.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
  rateLimit.set(ip, recent);
  if (recent.length >= RATE_LIMIT_MAX) return true;
  recent.push(now);
  return false;
}

async function getSheets() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(
        /\\n/g,
        "\n",
      ),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, mobile, email, lineId, hearAbout, website } = body;

    // Honeypot check — "website" field should be empty
    if (website) {
      return NextResponse.json({ success: true }); // fake success for bots
    }

    // Rate limit
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    // Validate required fields
    if (!fullName || !mobile) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const sheets = await getSheets();
    const timestamp = new Date().toLocaleString("th-TH", {
      timeZone: "Asia/Bangkok",
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: "Sheet1!A:F",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[timestamp, fullName, mobile, email, lineId, hearAbout]],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Sheets API error:", error);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
