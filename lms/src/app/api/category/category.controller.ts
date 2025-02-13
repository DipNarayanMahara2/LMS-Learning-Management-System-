import dbConnect from "@/database/connection";
import Category from "@/database/models/category.schema";
import authMiddleware from "../../../../middleware/auth..middleware";
import { NextRequest } from "next/server";

export async function createCategory(req: Request) {
  try {
    const response = authMiddleware(req as NextRequest);

    await dbConnect();
    const { name, description } = await req.json();

    const existingCategory = await Category.findOne({ name: name });

    if (existingCategory) {
      return Response.json(
        {
          message: "Category already found",
        },
        { status: 400 }
      );
    }
    await Category.create({
      name: name,
      description: description,
    });
    return Response.json(
      {
        message: "Category created Successfully !",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "Something went wrong!",
      },
      { status: 500 }
    );
  }
}

export async function getCategories(req: Request) {
  try {
    authMiddleware(req as NextRequest);
    await dbConnect();

    const Categories = await Category.find();

    if (Categories.length === 0) {
      return Response.json(
        {
          message: "Category Not Found !!",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        message: "category found",
        data: Categories,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "Something went wrong!",
      },
      { status: 500 }
    );
  }
}
