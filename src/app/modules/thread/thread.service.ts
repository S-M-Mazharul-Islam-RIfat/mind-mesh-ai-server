import { TThread } from "./thread.interface";
import { ThreadModel } from "./thread.model";

const createThread = async (payload: TThread) => {
   const res = await ThreadModel.create(payload);
   return res;
}

const getAllThread = async () => {
   const res = await ThreadModel.find();
   return res;
}

const getSingleThread = async (id: string) => {
   const res = await ThreadModel.findById(id);
   return res;
}

export const ThreadServices = {
   createThread,
   getAllThread,
   getSingleThread,
}