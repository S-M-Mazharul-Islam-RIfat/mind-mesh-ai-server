import { TThread } from "./thread.interface";
import { ThreadModel } from "./thread.model";

const createThread = async (payload: TThread) => {
   const res = await ThreadModel.create(payload);
   return res;
}

const getAllThread = async (payload: { page: number, limit: number }) => {
   const page = payload.page;
   const limit = payload.limit;
   const skip = (page - 1) * limit;

   const threads = await ThreadModel.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);


   const total = await ThreadModel.countDocuments();

   return { threads, total };
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