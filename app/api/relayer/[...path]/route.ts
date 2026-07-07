const TARGET = "https://relayer.testnet.zama.org/v2";

export async function POST(req: Request) {
  const path = new URL(req.url).pathname.replace("/api/relayer", "");
  const body = await req.text();
  const res = await fetch(`${TARGET}${path}`, { method: "POST", headers: { "Content-Type": "application/json" }, body });
  const data = await res.text();
  return new Response(data, { status: res.status, headers: { "Content-Type": "application/json" } });
}

export async function GET(req: Request) {
  const path = new URL(req.url).pathname.replace("/api/relayer", "");
  const res = await fetch(`${TARGET}${path}`);
  const data = await res.text();
  return new Response(data, { status: res.status, headers: { "Content-Type": "application/json" } });
}
