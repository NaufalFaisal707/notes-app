import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import {
  ClientLoaderFunction,
  Form,
  Link,
  useLoaderData,
} from "@remix-run/react";
import {
  ChevronLeft,
  EllipsisVertical,
  PencilLine,
  SearchX,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

export const meta: MetaFunction = ({ data }) => {
  if (data) {
    const { title } = data as Notes;

    return [{ title: title.split(/\s+/).slice(0, 6).join(" ") + "..." }];
  }

  return [{ title: "Catatan tidak di temukan" }];
};

export const loader = ({ params }: LoaderFunctionArgs) => {
  return Response.json(getNoteById(params.noteId!));
};

let cached: Notes;
export const clientLoader: ClientLoaderFunction = async ({
  serverLoader,
  params,
}) => {
  if (cached && cached.note_id === params.noteId!) {
    return cached;
  }
  cached = await serverLoader();
  return cached;
};

export const ErrorBoundary = () => {
  return (
    <div className="w-svw h-svh max-w-screen-sm mx-auto flex flex-col relative">
      <div className="select-none opacity-60 grow flex flex-col items-center justify-center gap-4">
        <SearchX className="size-12" />
        <h1>Catatan tidak di temukan</h1>
        <Link to="/">
          <Button variant="outline" title="Kembali">
            Kembali
          </Button>
        </Link>
      </div>
    </div>
  );
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

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="destructive"
                    title="Hapus Catatan"
                    className="w-full"
                  >
                    <Trash2 />
                    <span>Hapus</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      Yakin ingin menghapus catatan ini?
                    </DialogTitle>
                    <DialogDescription>
                      Catatan akan di hapus permanen!
                    </DialogDescription>
                  </DialogHeader>

                  <Form
                    method="POST"
                    action={"/" + loaderData.note_id + "/delete"}
                  >
                    <Button
                      variant="destructive"
                      title="Hapus Catatan"
                      className="w-full"
                    >
                      <Trash2 />
                      <span>Ya, hapus</span>
                    </Button>
                  </Form>
                </DialogContent>
              </Dialog>
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
