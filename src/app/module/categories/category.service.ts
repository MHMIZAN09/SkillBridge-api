import { Category } from "../../../generated/prisma/browser";
import { prisma } from "../../lib/prisma";

const createCategory = async (payload: Category): Promise<Category> => {
  const category = await prisma.category.create({
    data: payload,
  });
  return category;
};

export const CategoryService = {
  createCategory,
};
