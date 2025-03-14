import { db } from "~/server/db";
import { mockFolders, mockFiles } from "~/lib/mock-data";
import { files_table, folders_table } from "~/server/db/schema";

export default function Sandbox() {
  return (
    <div className="flex flex-col gap-4">
      <form
        action={async () => {
          "use server";
          console.log("submitted");

         const folderInsert = await db
            .insert(folders_table)
            .values(
              mockFolders.map((folder, index) => ({
                id: index + 1,
                name: folder.name,
                parent: index !== 0 ? 1 : null,
              })),
            );
          const fileInsert = await db.insert(files_table).values(mockFiles.map((file, index) => ({ 
            id: index + 1,
            name: file.name,
            size: 5000,
            url: file.url,
            parent: (index % 3) + 1,
          })));

          console.log("folderInsert", folderInsert);
          console.log("fileInsert", fileInsert);
        }}
      >
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
