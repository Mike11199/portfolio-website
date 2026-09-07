export const postgresqlExample = {
    language: "PostgreSQL", file: "similar_images.sql", command: "psql -f similar_images.sql",
    code: `-- Find the five closest images to photo 42.
-- Compare their embeddings using pgvector.

SELECT id, filename
FROM images
WHERE id <> 42
-- Smaller cosine distance means more similar images.
ORDER BY embedding <=> (
    SELECT embedding
    FROM images
    WHERE id = 42
)
LIMIT 5;`,
    output: " id | filename\n----+-------------------\n 17 | snowy_trail.jpg\n 28 | mountain_path.jpg\n  9 | winter_camp.jpg",
  };
