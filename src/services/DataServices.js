import axios from "axios";
import { data } from "../data/data";

export const getAllTask = async (dataDispatch) => {
  // try {
  //   const response = await axios.get("https://gcp-mock.apiwiz.io/v1/tasks", {
  //     headers: "x-tenant: b4349714-47c7-4605-a81c-df509fc7e653",
  //   });
  //   if (response.status === 200) {
  //     console.log(response.data);
  //     dataDispatch({ type: "getAllTask", payload: data });
  //   }
  // } catch (error) {
  //   console.error(error);
  // }
  return dataDispatch({ type: "getAllTask", payload: data });
};
