"use server";

import { Role } from "@/lib/auth/roles";
import { requireSession } from "@/lib/auth/permissions";

import {
    createCategory,
    updateCategory,
    deactivateCategory,
} from "@/lib/repositories/category.repository";

export async function createCategoryAction(formData: FormData){
    await requireSession(Role.ADMIN);

    const name = formData.get("name");
    const description = formData.get("description");

    if(typeof name !== "string"){
        return {
            success: false,
            message: "Category name is required.",
        };
    }

    const trimmedName = name.trim();

    if(!trimmedName){
        return {
            sucess: false,
            message: "Category name is required.",
        };
    }

    if(trimmedName.length > 50){
        return {
            success: false,
            message: "Category name cannot exceed 50 characters",
        }
    }

    let trimmedDescription: string | null = null;

    if(typeof description === "string"){
        trimmedDescription = description.trim() || null;
    }

    try{
        const category = await createCategory(
            trimmedName,
            trimmedDescription
        );

        return {
            sucess: true,
            category,
        };
    } catch (error: any){
        if(error.code === "23505"){
            return {
                success: false,
                message: "A category with this name already exists.",
            };
        }

        console.error("Failed to create category:", error);

        return {
            success: false,
            message: "Failed to create category.",
        };
    }
}


export async function updateCategoryAction(formData: FormData){
    await requireSession(Role.ADMIN);

    const categoryId = formData.get("category_id");
    const name = formData.get("name");
    const description = formData.get("description");

    if(typeof categoryId !== "string" || !categoryId.trim()){
        return{
            success: false,
            message: "Category ID is required.",
        };
    }

    if(typeof name !== "string"){
        return{
            success: false,
            message: "Category name is required.",
        };
    }

    const trimmedCategoryId = categoryId.trim()
    const trimmedName = name.trim();

    if(!trimmedName){
        return {
            success: false,
            message: "Category name is required.",
        };
    }

    if(trimmedName.length > 50){
        return{
            success: false,
            message: "Category name cannot exceed 50 characters.",
        };
    }


    let trimmedDescription: string | null = null;

    if(typeof description === "string"){
        trimmedDescription = description.trim() || null;
    }

    try{
        const category = await updateCategory(
            trimmedCategoryId,
            trimmedName,
            trimmedDescription
        );

        if(!category){
            return{
                success: false,
                message: "Category not found.",
            };
        }

        return{
            success: true,
            category,
        };
    } catch(error){
        console.error("Failed to update category:", error);

        return{
            success: false,
            message: "Failed to update category.",
        };
    }
}

export async function deactivateCategoryAction(formData: FormData){
    await requireSession(Role.ADMIN);

    const categoryId = formData.get("category_id");

    if(typeof categoryId !== "string" || !categoryId.trim()){
        return {
            success: false,
            message: "Category ID is requierd.",
        };
    }

    try {
        const category = await deactivateCategory(categoryId.trim());

        if(!category){
            return{
                success: false,
                message: "Category not found.",
            };
        }

        return{
            success: true,
            category,
        }
    } catch(error){
        console.error("Failed to deactivate category:", error);

        return{
            success: false,
            message: "Failed to deactivate category.",
        };
    }
}