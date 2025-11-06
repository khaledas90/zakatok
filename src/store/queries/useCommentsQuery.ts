import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { commentsService } from "../services";
import { AddCommentRequest } from "../services/commentsService";

export const useCommentsQuery = (subject: string) =>
  useQuery<Comment[], Error>({
    queryKey: ["comments", subject],
    queryFn: async () => {
      const comments = await commentsService.getBySubject(subject);
      if (!Array.isArray(comments)) {
        throw new Error("Expected comments to be an array");
      }
      return comments as unknown as Comment[];
    },
    enabled: Boolean(subject),
  });

export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: AddCommentRequest) => commentsService.add(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.commentSubject],
      });
    },
  });
};

export const useLikeComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: string) => commentsService.like(commentId),
    onSuccess: (_, commentId) => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "comments",
      });
    },
  });
};

export const useDislikeComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: string) => commentsService.dislike(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "comments",
      });
    },
  });
};

export const useReplyToComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      commentId,
      commentText,
    }: {
      commentId: string;
      commentText: string;
    }) => commentsService.reply(commentId, commentText),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "comments",
      });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: string) => commentsService.delete(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "comments",
      });
    },
  });
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: AddCommentRequest) => commentsService.update(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.commentSubject],
      });
    },
  });
};
