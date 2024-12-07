import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import {
  ChevronLeft,
  EllipsisVertical,
  PencilLine,
  SwatchBook,
  Trash2,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Notes } from "~/db/db.notes";
import { getNoteById } from "~/utils/notes.function";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export const loader = ({ params }: LoaderFunctionArgs) => {
  return Response.json(getNoteById(params.noteId!));
};

export default function PreviewNoteById() {
  const loaderData = useLoaderData<Notes>();

  return (
    <div className="w-svw h-svh max-w-screen-sm mx-auto flex flex-col relative">
      <div className="sticky top-0 p-4 flex items-center gap-2 justify-between">
        <Link to="/">
          <Button variant="outline" title="Kembali">
            <ChevronLeft />
          </Button>
        </Link>

        <div className="flex gap-2">
          <Button variant="outline" title="Pilih Tema Catatan">
            <SwatchBook />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" title="Menu">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="grid gap-1">
              <Link to={"/" + loaderData.note_id + "/edit"}>
                <Button variant="ghost" title="Edit Catatan" className="w-full">
                  <PencilLine />
                  <span>Edit</span>
                </Button>
              </Link>

              <Link to={"/" + loaderData.note_id + "/delete"}>
                <Button
                  variant="destructive"
                  title="Hapus Catatan"
                  className="w-full"
                >
                  <Trash2 />
                  <span>Hapus</span>
                </Button>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-4">
        <h1 className="text-lg capitalize font-semibold">{loaderData.title}</h1>

        <p
          className="whitespace-pre-wrap overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {loaderData.content}
        </p>
      </div>
    </div>
  );
}
