import { Alert, Divider, Flex, Text } from "@mantine/core";
import { Button, Card, CardBody, CardHeader, InputGroup } from "@paljs/ui";
import { Editor } from "components";
import Cookies from "js-cookie";
import Layout from "Layouts";
import { useRouter } from "next/router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-toastify";
import styled from "styled-components";
import { PostLink } from "types";
import { search_in, uploadBlogImage, uploadBlogVideo } from "utils";
import { handlePostLink, postLinkOptions } from "./handlePostLink";

export function CreateBlog() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [postLinkToAdd, setPostLinkToAdd] = useState<PostLink | null>(null);

  const { register, handleSubmit, control, getValues, setValue, watch } = useForm();

  const onSubmit = async (form: any) => {
    setLoading(true);

    const video = form.video;
    delete form.video;

    // FIXME: temporary
    const srcvideo = form?.srcvideo;
    delete form?.srcvideo;

    const thumb = form?.thumb[0];
    delete form?.thumb;

    const endImage = form?.endimage[0];
    delete form?.endimage;

    const response = await createBlog(form, Cookies.get(process.env.TOKEN!));
    if (response !== null) {
      const { data: blogs } = await search_in(
        "blog",
        {
          key: "title",
          type: "=",
          value: form?.title,
        },
        router?.query,
      );
      const blogId = blogs?.data[blogs?.total - 1]?.id;

      if (thumb) {
        const thumbUploadResponse = await uploadBlogImage(blogId, "thumb", thumb);
        if (thumbUploadResponse?.status === "success") {
          toast.success("تصویر بنر وبلاگ آپلود شد");
        }
      }

      if (endImage) {
        const endimageUploadResponse = await uploadBlogImage(blogId, "endimage", endImage);
        if (endimageUploadResponse?.status === "success") {
          toast.success("تصویر پایانی وبلاگ آپلود شد");
        }
      }

      if (video[0]) {
        const videoUploadResponse = await uploadBlogVideo(blogId, video[0]);
        if (videoUploadResponse?.status === "success") {
          toast.success("ویدیو وبلاگ آپلود شد");
        }
      }

      toast.success("وبلاگ با موفقیت ساخته شد");
      router.push(`/blog/edit/${blogId}`);
    } else {
      toast.error("ساخت وبلاگ موفقیت آمیز نبود");
    }

    setLoading(false);
  };

  return (
    <Layout title="انتشار مقاله">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h1>
          <span style={{ margin: "0 0 0 1rem" }}>انتشار مقاله</span>
          {/* <Controller */}
          {/*   name="is_news" */}
          {/*   control={control} */}
          {/*   render={({ field }) => ( */}
          {/*     <Checkbox */}
          {/*       style={{ color: "transparent" }} */}
          {/*       checked={field.value} */}
          {/*       onChange={(e: any) => field.onChange(e ? 1 : 0)} */}
          {/*     > */}
          {/*       اخبار */}
          {/*     </Checkbox> */}
          {/*   )} */}
          {/* /> */}
        </h1>

        <InputGroup className="col mb-4" fullWidth>
          <label>عنوان (H1)</label>
          <input {...register("title", { required: true })} placeholder="عنوان" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <Controller
            control={control}
            name="desc"
            rules={{
              required: true,
            }}
            render={({ field }) => <Editor content="محتوای مقاله..." callback={field?.onChange} title="محتوا" />}
          />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>اسلاگ</label>
          <input {...register("slug", { required: true })} placeholder="اسلاگ" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>نویسنده</label>
          <input {...register("writer")} placeholder="نویسنده" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>برچسب ها</label>
          <input {...register("labels")} placeholder="برچسب ها" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>دسته بندی ها</label>
          <input {...register("show_categories")} placeholder="دسته بندی ها" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>تصویر بنر</label>
          <input type="file" {...register("thumb")} placeholder="تصویر بنر" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>خلاصه</label>
          <Controller
            control={control}
            name="summary"
            render={({ field }) => <Editor content="خلاصه مقاله..." callback={field?.onChange} title="خلاصه" />}
          />
        </InputGroup>

        <Card>
          <CardHeader>SEO</CardHeader>
          <CardBody>
            <InputGroup className="col" fullWidth>
              <label>کلمات مترادف (meta_keywords)</label>
              <input {...register("meta_keywords")} placeholder="کلمات مترادف" />
            </InputGroup>

            <InputGroup className="col" fullWidth>
              <label>عنوان متا</label>
              <input {...register("meta_title")} placeholder="عنوان متا" />
            </InputGroup>

            <InputGroup className="col" fullWidth>
              <label>توضیحات متا</label>
              <input {...register("meta_description")} placeholder="توضیحات متا" />
            </InputGroup>

            <InputGroup className="col" fullWidth>
              <label>عنوان صفحه (title)</label>
              <input {...register("title_page")} placeholder="عنوان" />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>تصویر پایانی</CardHeader>
          <CardBody>
            <InputGroup className="col" fullWidth>
              <label>تصویر پایانی</label>
              <input type="file" {...register("endimage")} placeholder="تصویر پایانی" />
            </InputGroup>

            <InputGroup className="col" fullWidth>
              <label>عنوان پایانی</label>
              <input {...register("endtitle")} placeholder="عنوان پایانی" />
            </InputGroup>

            <InputGroup className="col" fullWidth>
              <label>تگ آلت تصویر پایانی</label>
              <input {...register("endtitle")} placeholder="تگ آلت تصویر پایانی" />
            </InputGroup>

            <InputGroup className="col" fullWidth>
              <label>متن تصویر پایانی</label>
              <input {...register("endtext")} placeholder="متن تصویر پایانی" />
            </InputGroup>
          </CardBody>
        </Card>

        {/* <InputGroup className="col" fullWidth>
          <label>is board</label>
          <Controller
            control={control}
            name="isboard"
            render={({ field }) => <Checkbox style={{ color: 'transparent' }} checked={field?.value} {...field} />}
          />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>is highlight</label>
          <Controller
            control={control}
            name="ishighlight"
            render={({ field }) => <Checkbox style={{ color: 'transparent' }} checked={field?.value} {...field} />}
          />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>is top</label>
          <Controller
            control={control}
            name="istop"
            render={({ field }) => <Checkbox style={{ color: 'transparent' }} checked={field?.value} {...field} />}
          />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>is cast</label>
          <Controller
            control={control}
            name="iscast"
            render={({ field }) => <Checkbox style={{ color: 'transparent' }} checked={field?.value} {...field} />}
          />
        </InputGroup> */}

        <InputGroup className="col" fullWidth>
          <label>ویدیو</label>
          <input type="file" placeholder="ویدیو بنر" {...register("video")} />
        </InputGroup>

        {/* <InputGroup className="col" fullWidth> */}
        {/*   <label>فایل ویدیویی</label> */}
        {/*   <input type="file" {...register('srcvideo')} placeholder="فایل ویدیویی" /> */}
        {/* </InputGroup> */}
        {/**/}
        {/* <InputGroup className="col" fullWidth> */}
        {/*   <label>هدر ها</label> */}
        {/*   <input {...register('headers')} placeholder="هدر ها" /> */}
        {/* </InputGroup> */}

        <InputGroup className="col" fullWidth>
          <label>ترند</label>
          <input {...register("trend")} placeholder="ترند" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>پیوند های پست در شبکه های اجتماعی</label>

          {watch("post_links")?.length > 0 ? (
            <>
              <Divider variant="dashed" my="md" />
              <Flex direction="column" gap="md">
                {watch("post_links")?.map((_post: PostLink, index: number) => (
                  <Flex gap="1rem" align="center">
                    <Text color="blue" fw="bolder">
                      {_post.name}
                    </Text>
                    <input {...register(`post_links[${index}].href`)} />
                    <Button
                      status="Danger"
                      type="button"
                      onClick={() =>
                        setValue(
                          "post_links",
                          getValues("post_links").filter((link: PostLink) => link.name !== _post.name),
                        )
                      }
                    >
                      حذف
                    </Button>
                  </Flex>
                ))}
              </Flex>
              <Divider variant="dashed" my="md" />
            </>
          ) : (
            <Alert color="red" variant="outline" my="md">
              پیوندی وجود ندارد
            </Alert>
          )}

          <InputGroup fullWidth className="col post-links">
            <Select
              options={postLinkOptions}
              onChange={({ value }: any) =>
                setPostLinkToAdd((_curr) =>
                  _curr
                    ? {
                        ..._curr,
                        name: value,
                      }
                    : {
                        name: value,
                        href: "",
                      },
                )
              }
            />
            <input
              placeholder="پیوند پست"
              id="post-link-name"
              onChange={(e) =>
                setPostLinkToAdd((_curr) =>
                  _curr
                    ? { ..._curr, href: e.target.value }
                    : {
                        name: "",
                        href: e.target.value,
                      },
                )
              }
            />
            <Button
              status="Success"
              type="button"
              onClick={() =>
                handlePostLink(
                  postLinkToAdd,
                  getValues,
                  (value: PostLink[]) => setValue("post_links", value),
                  () => {
                    setPostLinkToAdd((_curr: any) => ({ ..._curr, href: "" }));
                    (document.getElementById("post-link-name")! as any).value = "";
                  },
                )
              }
            >
              افزودن پیوند پست
            </Button>
          </InputGroup>
        </InputGroup>

        <Button disabled={loading} style={{ width: "10rem", marginTop: "3rem" }} status="Success" appearance="outline">
          {loading ? "..." : "ساخت وبلاگ"}
        </Button>
      </Form>
    </Layout>
  );
}

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;

  h1 {
    margin-bottom: 2rem;
  }

  .col {
    flex-direction: column;
    &.post-links {
      display: flex;
      gap: 1rem;
    }
  }

  label {
    margin-bottom: 1rem;
  }
`;
function createBlog(form: any, arg1: string | undefined) {
  throw new Error("Function not implemented.");
}
