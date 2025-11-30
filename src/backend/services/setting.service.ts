import { Setting } from "@/backend/models/setting/setting.model";
import { databaseOperationsClientOrServer } from "@/helper/database-operation-client-server";

const getSettingFromDB = async () => {
  return databaseOperationsClientOrServer(async () => await Setting.find()); // Fetch all settings from the database
};
export { getSettingFromDB };
