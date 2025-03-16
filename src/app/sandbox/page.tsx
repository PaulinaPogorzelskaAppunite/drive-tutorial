import { db } from "~/server/db";
import { mockFolders } from "~/lib/mock-data";
import {  folders_table } from "~/server/db/schema";
import { auth } from "@clerk/nextjs/server";
export default function Sandbox() {
  return (
    <div className="flex flex-col gap-4">
      <form
        action={async () => {
          "use server";
          console.log("submitted");

          const user = await auth();
          if (!user.userId) {
            throw new Error("User not found");
          }

       
          const rootFolder = await db
            .insert(folders_table)
            .values({
              name: "root",
              ownerId: user.userId,
              parent: null,
            })
            .$returningId();

          const insertableFolders = mockFolders.map((folder) => ({
            name: folder.name,
            ownerId: user.userId,
            parent: rootFolder[0]!.id,
          }));

          console.log("rootFolder", rootFolder);
          console.log("insertableFolders", insertableFolders);

          await db.insert(folders_table).values(insertableFolders);
        }}
      >
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
