import db from "#db/client";

export async function createFile(name, size, folder_id) {
  const SQL = `
   INSERT INTO files(name, size, folder_id) 
   VALUES($1, $2, $3)
    RETURNING *
    `;
  const result = await db.query(SQL, [name, size, folder_id]);
  return result.rows[0];
}

export async function getFiles() {
  const SQL = `
 SELECT files.id, files.name, files.size, files.folder_id, folders.name as folder_name
    FROM files
    LEFT JOIN folders ON files.folder_id = folders.id

    `;
  const { rows } = await db.query(SQL);
  return rows;
}
