import { Category } from "@/backend/models/category/category.model";
import { databaseOperationsClientOrServer } from "@/helper/database-operation-client-server";

const getCategoriesFromDB = async () => {
  return databaseOperationsClientOrServer(async () => await Category.find());
};

export { getCategoriesFromDB };
