import db from "#db/client";

export async function createFolder(name) {
  const SQL = `
    INSERT INTO folders (name)
    VALUES($1) 
    RETURNING id
    `;
  const result = await db.query(SQL, [name]);
  return result.rows[0];
}

export async function getFolders() {
  const SQL = `
    SELECT *
    FROM folders
    `;
  const { rows } = await db.query(SQL);
  return rows;
}

export async function getFolder(id) {
  const SQL = `
      SELECT folders.id, folders.name,
      (
          SELECT json_agg(files)
          FROM files
          WHERE files.folder_id = folders.id
      ) AS files
      FROM folders
      WHERE folders.id = $1
  `;
  const { rows } = await db.query(SQL, [id]);
  return rows[0];
}
