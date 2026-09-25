import { findActiveCategories } from "@/lib/repositories/category.repository.ts";

export default async function Categories(){
    const categories  = await findActiveCategories();

    return(
        <div>
            <h1>Categories Page</h1>
            
            {categories.map((category) => (
                <div key={category.category_id}>
                    <h2>{category.name}</h2>
                    <p>{category.category_id}</p>
                    <p>{category.description}</p>
                    <p>Active: {String(category.is_active)}</p>
                </div>
            ))}
        </div>
    );
}