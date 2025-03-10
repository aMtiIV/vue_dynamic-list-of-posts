export type Post = {
  id: number,
  createdAt: string,
  updatedAt: string,
  userId: number,
  title: string,
  body: string,
}

export type PostPostBody = {
  userId: number,
  title: string,
  body: string,
}

export type PatchPostBody = {
  userId?: number,
  title?: string,
  body?: string,
}

export type Comment = {
  id: number,
  postId: number,
  name: string,
  email: string,
  body: string,
  createdAt: string,
  updatedAt: string,
}

export type PostCommentBody = {
  postId: number,
  name: string,
  email: string,
  body: string,
}
