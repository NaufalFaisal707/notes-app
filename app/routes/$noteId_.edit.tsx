import { LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, redirect, useLoaderData } from "@remix-run/react";
import { PencilLine, Save } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Notes } from "~/db/db.notes";
import { getNoteById, updateNoteById } from "~/utils/notes.function";

export const loader = ({ params }: LoaderFunctionArgs) => {
  if (params.noteId) {
    return Response.json(getNoteById(params.noteId));
  }

  throw "can't find notes id";
};

export const action = async ({ request, params }: LoaderFunctionArgs) => {
  const { title, content } = Object.fromEntries(await request.formData()) as {
    title: string;
    content: string;
  };

  const success = updateNoteById(params.noteId!, { title, content });

  if (success) {
    return redirect("/");
  }
};

export default function UpdateNoteById() {
  const loaderData = useLoaderData<Notes>();

  return (
    <div className="w-svw h-svh max-w-screen-sm mx-auto flex flex-col relative">
      <div className="sticky top-0 p-4 flex items-center gap-4 justify-between">
        <div className="flex text-center gap-2 truncate select-none">
          <PencilLine className="min-w-fit" />
          <h1 className="text-lg">Edit Catatan</h1>
        </div>
      </div>

      <Form method="POST" className="grow p-4 flex flex-col gap-4">
        <Input
          required
          minLength={6}
          maxLength={64}
          name="title"
          placeholder="Judul"
          defaultValue={loaderData.title}
        />

        <Textarea
          required
          minLength={6}
          maxLength={300}
          name="content"
          placeholder="Isi catatan"
          spellCheck="false"
          style={{ whiteSpace: "pre-line" }}
          defaultValue={loaderData.content}
        />

        <div className="flex gap-2 self-end">
          <Link to="/">
            <Button variant="outline" type="button">
              Batalkan
            </Button>
          </Link>
          <Button type="submit">
            <Save />
            <span>Simpan catatan</span>
          </Button>
        </div>
      </Form>
    </div>
  );
}