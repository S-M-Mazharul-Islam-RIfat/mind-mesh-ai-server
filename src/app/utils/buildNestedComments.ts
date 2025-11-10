export const buildNestedComments = (allComments: any) => {
   const commentMap = new Map();
   allComments.forEach((comment: any) => {
      const updatedComment = {
         ...comment._doc,
         replies: [],
      }
      commentMap.set(String(updatedComment._id), updatedComment)
   });

   for (const [key, value] of commentMap) {
      if (value.parentId === null) {
         continue;
      }
      const parentId = String(value.parentId);
      const parent = commentMap.get(parentId);
      parent.replies.push(value);
   }

   const newUpdatedComments = [];
   for (const [key, value] of commentMap) {
      if (value.parentId === null) {
         newUpdatedComments.push(value);
      }
   }

   return newUpdatedComments;
}