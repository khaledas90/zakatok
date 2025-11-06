import { mainApi } from "../api";

export interface Comment {
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
  parentCommentId: string | null;
}

export interface AddCommentRequest {
  id?: string;
  customerId: string;
  customerName: string;
  commentTitle: string;
  commentText: string;
  commentSubject: string;
  parentCommentId?: string | null;
}

export const commentsService = {
  async getBySubject(subject: string): Promise<Comment[]> {
    const { data } = await mainApi.get<Comment[]>(
      `/comments/subject/${subject}`
    );
    return data;
  },

  add: async (payload: AddCommentRequest): Promise<Comment> => {
    const { data } = await mainApi.post(`/comments`, payload);
    return data;
  },

  like: async (commentId: string): Promise<Comment> => {
    const { data } = await mainApi.post(`/comments/${commentId}/like`);
    return data;
  },

  dislike: async (commentId: string): Promise<Comment> => {
    const { data } = await mainApi.post(`/comments/${commentId}/dislike`);
    return data;
  },

  reply: async (commentId: string, commentText: string): Promise<Comment> => {
    const { data } = await mainApi.post(`/comments/${commentId}/reply`, {
      commentText,
    });
    return data;
  },

  delete: async (commentId: string): Promise<Comment> => {
    const { data } = await mainApi.delete(`/comments/${commentId}`);
    return data;
  },

  update: async (payload: AddCommentRequest): Promise<Comment> => {
    const { data } = await mainApi.put(`/comments/${payload.id}`, payload);
    return data;
  },
};
