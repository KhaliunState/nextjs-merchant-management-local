"use server";
import { type Site } from "@/db/schema";
import { revalidateTag, unstable_noStore } from "next/cache";

import { getErrorMessage } from "@/lib/handle-error";

import type { CreatePspSchema, UpdatePspSchema } from "./validations";

export async function createTask(input: CreatePspSchema) {
  unstable_noStore();
  try {
    return {
      data: null,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

export async function updateTask(input: UpdatePspSchema & { id: string }) {
  unstable_noStore();
  try {
    return {
      data: null,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

export async function updateTasks(input: {
  ids: string[];
  // label?: Task["label"];
  status?: Site["status"];
  // priority?: Task["priority"];
}) {
  unstable_noStore();
  try {
    return {
      data: null,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

export async function deleteTask(input: { id: string }) {
  unstable_noStore();
  try {
    return {
      data: null,
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    };
  }
}

export async function deleteTasks(input: { ids: string[] }) {
  return {
    data: null,
    error: null,
  };
}
