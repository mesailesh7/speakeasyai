import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"

import * as schema from './schema'


const sql = neon(process.env.DATABASE_URL!)

export const db = drizzle(sql, { schema }) // connection to neon via through drizzle


export { sql } // this is a raw sql which can connect directly to neon