export async function POST(req) {
  try {
    const { cssLinks, link } = await req.json();
    if (!cssLinks || !link) return Response.json({ error: "Missing URLS" }, { status: 400 });

    const elements = await preprocessHTML(link);
    return Response.json({ elements }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}