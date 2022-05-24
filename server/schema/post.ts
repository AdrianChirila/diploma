import { object, string } from "yup";

export const createPostSchema = object({
  body: object({
    title: string().required("Title is required"),
    content: string().required("Content is required"),
    description: string().required("Description is required"),
    img: string().required("Image is required"),
  }),
});
