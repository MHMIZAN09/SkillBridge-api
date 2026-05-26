/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

interface ICreateCategoryPayload {
  name: string;
  slug?: string;
  description?: string;
}

interface IUpdateCategoryPayload {
  name?: string;
  slug?: string;
  description?: string;
}

const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

const createCategory = async (payload: ICreateCategoryPayload) => {
  const slug = payload.slug || generateSlug(payload.name);

  const existingCategory = await prisma.category.findFirst({
    where: {
      OR: [{ name: payload.name }, { slug }],
    },
  });

  if (existingCategory) {
    throw new Error("Category already exists");
  }

  const category = await prisma.category.create({
    data: {
      name: payload.name,
      slug,
      description: payload.description,
    },
  });

  return category;
};

const getAllCategories = async (query: any) => {
  const { search, page = 1, limit = 10 } = query;

  const skip = (Number(page) - 1) * Number(limit);

  const where: Prisma.CategoryWhereInput = {};

  if (search) {
    where.OR = [
      {
        name: {
          contains: String(search),
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: String(search),
          mode: "insensitive",
        },
      },
    ];
  }

  const [categories, total] = await Promise.all([
    prisma.category.findMany({
      where,
      skip,
      take: Number(limit),
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: {
            tutors: true,
          },
        },
      },
    }),

    prisma.category.count({ where }),
  ]);

  return {
    meta: {
      page: Number(page),
      limit: Number(limit),
      total,
    },
    data: categories,
  };
};

const getCategoryById = async (id: string) => {
  const category = await prisma.category.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          tutors: true,
        },
      },
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

const getCategoryBySlug = async (slug: string) => {
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      _count: {
        select: {
          tutors: true,
        },
      },
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

const updateCategory = async (id: string, payload: IUpdateCategoryPayload) => {
  const existingCategory = await prisma.category.findUnique({
    where: { id },
  });

  if (!existingCategory) {
    throw new Error("Category not found");
  }

  const slug = payload.slug
    ? payload.slug
    : payload.name
      ? generateSlug(payload.name)
      : undefined;

  if (payload.name || slug) {
    const duplicate = await prisma.category.findFirst({
      where: {
        id: {
          not: id,
        },
        OR: [
          payload.name ? { name: payload.name } : undefined,
          slug ? { slug } : undefined,
        ].filter(Boolean) as Prisma.CategoryWhereInput[],
      },
    });

    if (duplicate) {
      throw new Error("Category name or slug already exists");
    }
  }

  const updatedCategory = await prisma.category.update({
    where: { id },
    data: {
      name: payload.name,
      slug,
      description: payload.description,
    },
  });

  return updatedCategory;
};

const deleteCategory = async (id: string) => {
  const existingCategory = await prisma.category.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          tutors: true,
        },
      },
    },
  });

  if (!existingCategory) {
    throw new Error("Category not found");
  }

  if (existingCategory._count.tutors > 0) {
    throw new Error("Cannot delete category because tutors are using it");
  }

  const deletedCategory = await prisma.category.delete({
    where: { id },
  });

  return deletedCategory;
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getCategoryById,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
};
