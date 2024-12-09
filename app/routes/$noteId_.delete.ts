import { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import { deleteNoteById } from "~/utils/note.function";

export const action = ({ params }: ActionFunctionArgs) => {
  if (deleteNoteById(params.noteId!)) {
    return redirect("/");
  }
};

export const loader = () => {
  return redirect("/");
};
