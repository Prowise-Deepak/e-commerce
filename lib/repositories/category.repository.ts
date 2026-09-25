import { pool } from "@/lib/db/pool";

export type CategoryListItem = {
  category_id: string;
  name: string;
  description: string | null;
  is_active: boolean
};

export async function findAllCategories() {
    const result = await pool.query(`
        SELECT
            category_id,
            name,
            description,
            is_active,
            created_at,
            updated_at
        FROM categories
        ORDER BY name ASC
    `);

    return result.rows;
}

export async function findActiveCategories(): Promise<CategoryListItem[]> {
  const result = await pool.query<CategoryListItem>(`
    SELECT
      category_id,
      name,
      description,
      is_active
    FROM categories
    WHERE is_active = TRUE
    ORDER BY name ASC
  `);

  return result.rows;
}

export async function findCategoryById(categoryId: string){
  const result = await pool.query(
    `
    SELECT
      category_id,
      name,
      description,
      is_active,
      created_at,
      updated_at
    FROM categories
    WHERE category_id = $1
    `,
    [categoryId]
  );

  return result.rows[0] ?? null;
}

export async function createCategory(
    name: string,
    description: string | null
) {
    const result = await pool.query(
        `
        INSERT INTO categories (
            name,
            description
        )
        VALUES ($1, $2)
        RETURNING
            category_id,
            name,
            description,
            is_active,
            created_at,
            updated_at
        `,
        [name, description]
    );

    return result.rows[0];
}

export async function updateCategory(
    categoryId: string,
    name: string,
    description: string | null
) {
    const result = await pool.query(
        `
        UPDATE categories
        SET
            name = $1,
            description = $2,
            updated_at = CURRENT_TIMESTAMP
        WHERE category_id = $3
        RETURNING
            category_id,
            name,
            description,
            is_active,
            created_at,
            updated_at
        `,
        [name, description, categoryId]
    );

    return result.rows[0] ?? null;
}

export async function deactivateCategory(categoryId: string) {
    const result = await pool.query(
        `
        UPDATE categories
        SET
            is_active = false,
            updated_at = CURRENT_TIMESTAMP
        WHERE category_id = $1
        RETURNING
            category_id,
            name,
            description,
            is_active,
            created_at,
            updated_at
        `,
        [categoryId]
    );

    return result.rows[0] ?? null;
}