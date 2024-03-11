export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request) {
  res.status(200).json({ name: "Home API route" });
}