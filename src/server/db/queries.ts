import "server-only";

import { db } from "~/server/db";
import {
  files_table as filesSchema,
  folders_table as foldersSchema,
} from "~/server/db/schema";
import { eq } from "drizzle-orm";

export type DB_FileType = typeof filesSchema.$inferSelect;
export type DB_FolderType = typeof foldersSchema.$inferSelect;

export const QUERIES = {
  getAllParentsForFolder: async function (folderId: number) {
    const parents = [];
    let currentId: number | null = folderId;
    while (currentId !== null) {
      const folder = await db
        .selectDistinct()
        .from(foldersSchema)
        .where(eq(foldersSchema.id, currentId));
      if (!folder[0]) {
        throw new Error("Folder not found");
      }
      parents.unshift(folder[0]);
      currentId = folder[0]?.parent;
    }
    return parents;
  },
  getFolders: function (folderId: number) {
    return db
      .select()
      .from(foldersSchema)
      .where(eq(foldersSchema.parent, folderId));
  },
  getFiles: function (folderId: number) {
    return db
      .select()
      .from(filesSchema)
      .where(eq(filesSchema.parent, folderId));
  },
};

export const MUTATIONS = {
  createFile: async function (input: {
    userId: string;
    file: { name: string; size: number; url: string; parent: number };
  }) {
    return db.insert(filesSchema).values(input.file);
  },
  createFolder: async function (input: {
    folder: { name: string; parent: number };
  }) {
    return db.insert(foldersSchema).values(input.folder);
  },
};
