import { mainApi } from ".";

interface Comment {
  id: string;
  customerId: string;
  customerName: string;
  commentTitle: string;
  commentText: string;
  commentSubject: string;
  createdAt: string | Date;
  likedBy: string[];
  dislikedBy: string[];
  likeCount: number;
  dislikeCount: number;
  parentCommentId: string;
}

interface AddCommentRequest {
  id?: string;
  customerId: string;
  customerName: string;
  commentTitle: string;
  commentText: string;
  commentSubject: string;
  parentCommentId: string;
}

const CommentsApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getCommentsBySubject: builder.query<Comment[], { subject: string }>({
      query: ({ subject }) => ({
        url: `comments/subject/${subject}`,
        method: "GET",
      }),
    }),
    addComment: builder.mutation<Comment, AddCommentRequest>({
      query: (comment) => ({
        url: `comments`,
        method: "POST",
        body: comment,
      }),
    }),
    likeComment: builder.mutation<Comment, { commentId: string }>({
      query: ({ commentId }) => ({
        url: `comments/${commentId}/like`,
        method: "POST",
      }),
    }),
    dislikeComment: builder.mutation<Comment, { commentId: string }>({
      query: ({ commentId }) => ({
        url: `comments/${commentId}/dislike`,
        method: "POST",
      }),
    }),
    replyToComment: builder.mutation<
      Comment,
      { commentId: string; commentText: string }
    >({
      query: ({ commentId, commentText }) => ({
        url: `comments/${commentId}/reply`,
        method: "POST",
        body: { commentText },
      }),
    }),
    deleteComment: builder.mutation<Comment, { commentId: string }>({
      query: ({ commentId }) => ({
        url: `comments/${commentId}`,
        method: "DELETE",
      }),
    }),
    updateComment: builder.mutation<Comment, AddCommentRequest>({
      query: (comment) => ({
        url: `comments/${comment.id}`,
        method: "PUT",
        body: comment,
      }),
    }),
  }),
});

export const {
  useGetCommentsBySubjectQuery,
  useAddCommentMutation,
  useLikeCommentMutation,
  useDislikeCommentMutation,
  useReplyToCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} = CommentsApi;
