import { isAdmin } from "@/server/auth";
import { listApplications, listCandidates, readStoredFile } from "@/server/store";

/** Authenticated resume download. Files are never served from /public. */
export async function GET(_request: Request, ctx: RouteContext<"/api/admin/files/[id]">) {
  if (!(await isAdmin())) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { id } = await ctx.params;

  const records = [...(await listApplications()), ...(await listCandidates())];
  const meta = records.find((r) => r.resume.id === id)?.resume;
  const bytes = meta ? await readStoredFile(id) : null;
  if (!meta || !bytes) return new Response("Not found", { status: 404 });

  const safeName = meta.originalName.replace(/"/g, "");
  return new Response(new Uint8Array(bytes), {
    headers: {
      "Content-Type": meta.contentType,
      "Content-Disposition": `attachment; filename="${safeName}"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
