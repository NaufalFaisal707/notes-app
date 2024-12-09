import { ActionFunctionArgs, redirectDocument } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import { deleteNoteById } from "~/utils/note.function";

export const action = ({ params }: ActionFunctionArgs) => {
  if (deleteNoteById(params.noteId!)) {
    return redirectDocument("/");
  }
};

export const loader = () => {
  return redirect("/");
};
