import { generateAgentResponse } from "@/ai/flows/generate-agent-response";

export async function POST(req: Request) {
  const { messages } = await req.json();
  
  try {
    const stream = await generateAgentResponse({ messages });
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
