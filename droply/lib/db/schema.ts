// Pgtable is needed to create table in all other are the values we want to keep
import { pgTable, text, uuid, integer, boolean, timestamp } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const files = pgTable("files", {
    id: uuid("id").defaultRandom().primaryKey(),
    //basic file/folder information
    name: text("name").notNull(),
    path: text("path").notNull(), // /document/project/resume
    size: integer("size").notNull(),
    type: text("type").notNull(), // "Folder"

    //storage information
    fileUrl: text("file_url").notNull(), // url to access file
    thumbnailUrl: text("thumbnail_url"),

    // Ownership information
    userId: text("user_id").notNull(),
    parentId: uuid("parent_id"), // Parent folder if (null for root items)


    // file/folder flags
    isFolder: boolean("is_folder").default(false).notNull(),
    isStarred: boolean("is_starred").default(false).notNull(),
    isTrash: boolean("is_trash").default(false).notNull(),

    // TimeStamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()

})

/*
parent: Each file/folder can have one parent folder
children: Each folder can have many child files/folder
*/

export const fileRelations = relations(files, ({ one, many }) => ({
    parent: one(files, {
        fields: [files.parentId], //foreign key
        references: [files.id] // self reference id
    }),

    //relationship to child file/folder
    children: many(files)
}))



//  Type definations

export const File = typeof files.$inferSelect
export const NewFile = typeof files.$inferInsert