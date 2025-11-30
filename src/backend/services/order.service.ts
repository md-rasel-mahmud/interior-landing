import { Order } from "@/backend/models/order/order.model";
import { databaseOperationsClientOrServer } from "@/helper/database-operation-client-server";

const getAllOrdersFromDB = async () =>
  databaseOperationsClientOrServer(async () => await Order.find());

export { getAllOrdersFromDB };
