import { Request, Response } from "express";
import { get } from "lodash";
import { createPost, deletePost, findAndUpdate, findPost, getPosts } from "../service";
import { log } from "../utils/logger";

export const createPostHandler = async (request: Request, response: Response) => {
  try {
    const post = await createPost(request.body);
    return response.send(post.toJSON());
  } catch (error) {
    log.error(error);
    return response.status(409).send(error);
  }
};

export async function updatePostHandler(request: Request, response: Response) {
  try {
    const postId = get(request, "params.postId");
    const update = request.body;

    const post = await findPost({ postId });

    if (!post) {
      return response.sendStatus(404);
    }
    const updatedPost = await findAndUpdate({ postId }, update, { new: true });

    return response.send(updatedPost);
  } catch (error) {
    return response.send(error);
  }
}

export async function deletePostHandler(request: Request, response: Response) {
  try {
    const postId = get(request, "params.postId");

    const post = await findPost({ postId });

    if (!post) {
      return response.sendStatus(404);
    }

    await deletePost({ postId });
    return response.sendStatus(200);
  } catch (error) {
    return response.send(error);
  }
}

export async function getPostHandler(request: Request, response: Response) {
  try {
    const postId = get(request, "params.postId");

    const post = await findPost({ postId });

    if (!post) {
      return response.sendStatus(404);
    }
    return response.send(post);
  } catch (error) {
    log.error(error);
    return response.status(409).send(error);
  }
}
export async function getPostsHandler(_: Request, response: Response) {
  try {
    const posts = await getPosts();
    return response.send(posts.map(user => user.toJSON()));
  } catch (error) {
    log.error(error);
    return response.status(409).send(error);
  }
}
