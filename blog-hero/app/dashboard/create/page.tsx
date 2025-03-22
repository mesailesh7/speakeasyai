"use client";
import { handleSubmission } from "@/app/actions";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import React from "react";

const CreateBlogRoute = () => {
  // Like this we can implement async as a use server function
  // async function handleSubmission() {
  //   "use server;";

  //   const data = await prisma.blogPost.create({
  //     data:{

  //     }
  //   })
  // }

  return (
    <div>
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
          <CardDescription>
            Create a new post to share with the world
          </CardDescription>
          <CardContent>
            <form className="flex flex-col gap-4" action={handleSubmission}>
              <div className="flex flex-col gap-2">
                <Label>Title</Label>
                <Input
                  name="title"
                  required
                  type="text"
                  placeholder="Title"
                ></Input>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Content</Label>
                <Textarea name="content" required placeholder="Content" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Image Url</Label>
                <Input
                  name="url"
                  required
                  type="url"
                  placeholder="Image Url"
                ></Input>
              </div>
              <Button>Create Post</Button>
            </form>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default CreateBlogRoute;
