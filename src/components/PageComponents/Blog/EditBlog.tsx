import { Alert, Divider, Flex, LoadingOverlay, MultiSelect, Space, Text } from "@mantine/core";
import { Card, CardBody, CardHeader, Checkbox, InputGroup, Modal } from "@paljs/ui";
import { useQuery } from "@tanstack/react-query";
import { Button, Editor, FlexContainer, handlePostLink, HeaderButton, ModalBox, postLinkOptions } from "components";
import { MediaCard } from "components/Card";
import Cookies from "js-cookie";
import Layout from "Layouts";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-toastify";
import styled from "styled-components";
import { BlogCategory, PostLink } from "types";
import {
  $_get_categories,
  $_remove_blog_video,
  coerce,
  deleteBlog,
  editBlog,
  editBlogVideo,
  getSingleBlog,
  removeItem,
  uploadBlogImage,
  uploadBlogVideo,
} from "utils";

export const EditBlogPage: React.FC = () => {
  const router = useRouter();

  const blogQuery = useQuery(["blog"], () =>
    getSingleBlog(router.query?.blog_id as string, Cookies.get(process.env["TOKEN"]!)),
  );

  const categoriesQuery = useQuery(["categories"], () =>
    $_get_categories({
      params: {
        q: "total",
      },
    }).then((res) => res.data),
  );

  const categoryOptions = categoriesQuery.data?.data?.map((category: BlogCategory) => ({
    label: category.title,
    value: category.id,
  }));

  const [postLinkToAddName, setPostLinkToAddName] = useState<string | null>(null);
  const [postLinkToAddHref, setPostLinkToAddHref] = useState<string | null>(null);

  const [mediaToRemove, setMediaToRemove] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { dirtyFields },
    getValues,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      ...blogQuery?.data?.data,
      categories: blogQuery?.data?.data?.categories?.map((category: BlogCategory) => category.id),
    },
  });

  const onSubmit = async (form: any) => {
    setLoading(true);

    for (let key in form) {
      if (!dirtyFields[key]) delete form[key];
    }

    if (form?.length < 1) {
      toast.info("ابتدا تغییرات را اعمال کنید");
      return;
    }

    const finalForm = {
      ...form,
      post_links: getValues().post_links,
    };

    const response = await editBlog(blogQuery?.data?.data?.id, finalForm);

    if (response?.status === "success") {
      toast.success("وبلاگ  بروز شد");
      router.back();
    } else {
      toast.error("بروزرسانی وبلاگ موفقیت آمیز نبود");
    }
    setLoading(false);
  };

  const updateBlogMedia = async (form: any, source: "endimage" | "thumb") => {
    setLoading(true);

    let appendix: any = {};
    if (source == "endimage") {
      appendix.endtitle = getValues("endtitle");
      appendix.endalt = getValues("endalt");
      appendix.endtext = getValues("endtext");
    }
    const response = await editBlog(blogQuery?.data?.data?.id, {
      [source]: form,
      ...appendix,
    });

    if (response?.status === "success") {
      blogQuery.refetch();
      toast.success("وبلاگ  بروز شد");
    } else {
      toast.error("بروزرسانی وبلاگ موفقیت آمیز نبود");
    }

    setLoading(false);
  };

  const updateBlogVideo = async (form: any) => {
    setLoading(true);

    const response = await editBlogVideo(blogQuery?.data?.data?.id, form);

    if (response?.status === "success") {
      blogQuery.refetch();
      toast.success("ویدیو وبلاگ  بروز شد");
    } else {
      toast.error("بروزرسانی ویدیو وبلاگ موفقیت آمیز نبود");
    }

    setLoading(false);
  };

  const [itemToRemove, setItemToRemove] = useState<any>(null);
  const closeRemovalModal = () => setItemToRemove(false);

  const [videoToRemove, setVideoToRemove] = useState<any>(null);
  const closeVideoRemovalModal = () => setVideoToRemove(null);

  const remove = async (removeId: any) => {
    await removeItem("blog", removeId, deleteBlog, () => router.push("/blog"), [
      `وبلاگ ${removeId} با موفقیت حذف شد`,
      "حذف وبلاگ موفقیت آمیز نبود",
    ]);
  };

  const removeVideo = async (videoToRemove: any) => {
    setLoading(true);
    try {
      await $_remove_blog_video(blogQuery?.data?.data?.id, videoToRemove.u);
      blogQuery.refetch();
      setVideoToRemove(null);
      toast.success("ویدیو با موفقیت حذف شد");
    } catch (err) {
      toast.error("حذف ویدیو موفقیت آمیز نبود");
    }
    setLoading(false);
  };

  const replaceMedia = async (source: "thumb" | "endimage" | "video", file: File) => {
    setLoading(true);
    let response;
    if (source === "video") {
      response = await uploadBlogVideo(blogQuery?.data?.data?.id, file);
    } else {
      response = await uploadBlogImage(blogQuery?.data?.data?.id, source, file);
    }
    if (response?.status === "success") {
      blogQuery.refetch();
      toast.success("وبلاگ با موفقیت بروز شد");
    } else {
      toast.error("بروزرسانی وبلاگ موفقیت آمیز نبود");
    }
    setLoading(false);
  };

  return (
    <Layout title={`${blogQuery?.data?.data?.id}`}>
      <h1 style={{ marginBottom: "4rem" }}>
        ویرایش وبلاگ شماره {blogQuery?.data?.data?.id}
        <HeaderButton status="Info" href={`/blog/${blogQuery?.data?.data?.id}`}>
          مشاهده
        </HeaderButton>
        <HeaderButton status="Danger" onClick={() => setItemToRemove(blogQuery?.data?.data)}>
          حذف
        </HeaderButton>
      </h1>
      <Form onSubmit={handleSubmit(onSubmit)} style={{ position: "relative" }}>
        <LoadingOverlay visible={loading} />
        <h2>
          <span style={{ margin: "0 0 0 1rem" }}>افزودن وبلاگ</span>
          <Controller
            name="is_news"
            control={control}
            render={({ field }) => (
              <span style={{ color: "transparent", fontSize: "0" }}>
                <Checkbox
                  style={{ color: "transparent" }}
                  checked={field.value}
                  onChange={(e: any) => field.onChange(e ? 1 : 0)}
                >
                  اخبار
                </Checkbox>
              </span>
            )}
          />
        </h2>

        {/* ....:::::: Remove Modals :::::.... */}
        <Modal on={itemToRemove} toggle={closeRemovalModal}>
          <ModalBox>
            <div style={{ marginBottom: "1rem" }}>
              آیا از حذف وبلاگ
              <span className="mx-1">{itemToRemove?.id}</span>
              اطمینان دارید؟
            </div>
            <FlexContainer jc="space-between">
              <Button onClick={closeRemovalModal}>انصراف</Button>
              <Button onClick={() => remove(itemToRemove?.id)} status="Danger">
                حذف
              </Button>
            </FlexContainer>
          </ModalBox>
        </Modal>

        <Modal on={videoToRemove} toggle={closeVideoRemovalModal}>
          <ModalBox>
            <div style={{ marginBottom: "1rem" }}>آیا از حذف ویدیو زیر اطمینان دارید؟</div>
            <video src={`${process.env.VID_SRC}/${videoToRemove?.u}`} controls style={{ maxHeight: "75vh" }} />
            <FlexContainer jc="space-between">
              <Button onClick={closeVideoRemovalModal}>انصراف</Button>
              <Button onClick={() => removeVideo(videoToRemove)} status="Danger" disabled={loading}>
                حذف
              </Button>
            </FlexContainer>
          </ModalBox>
        </Modal>

        <Modal on={!!mediaToRemove} toggle={() => setMediaToRemove(null)}>
          <ModalBox>
            <div style={{ marginBottom: "1rem" }}>آیا از حذف ویدیو زیر اطمینان دارید؟</div>
            <img src={`${process.env.SRC}/${watch(mediaToRemove!)?.u}`} style={{ maxHeight: "75vh" }} />
            <FlexContainer jc="space-between">
              <Button onClick={() => setMediaToRemove(null)}>انصراف</Button>
              <Button onClick={() => removeVideo(videoToRemove)} status="Danger" disabled={loading}>
                حذف
              </Button>
            </FlexContainer>
          </ModalBox>
        </Modal>
        <InputGroup className="col mb-4" fullWidth>
          <label>H1 صفحه</label>
          <input {...register("title", { required: true })} placeholder="H1 صفحه" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <Controller
            control={control}
            name="summary"
            render={({ field }) => (
              <Editor content={blogQuery?.data?.data?.summary} callback={field?.onChange} title="خلاصه" />
            )}
          />
        </InputGroup>

        <Divider variant="dashed" size="md" my="md" />

        <InputGroup className="col" fullWidth>
          <Controller
            control={control}
            name="desc"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Editor
                content={blogQuery?.data?.data?.desc}
                callback={field?.onChange}
                title={<Text ff="IRANSansBold">محتوا</Text>}
              />
            )}
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

        <Divider my="md" />

        <Text>دسته بندی ها</Text>
        <Space my="md" />
        <Controller
          name="categories"
          control={control}
          render={({ field }) => <MultiSelect data={categoryOptions ?? []} {...field} />}
        />

        <Divider my="md" />

        <Divider variant="dashed" my="md" />

        <Card>
          <CardHeader>SEO</CardHeader>
          <CardBody>
            <InputGroup className="col" fullWidth>
              <label>title صفحه</label>
              <input {...register("title_page")} placeholder="عنوان" />
            </InputGroup>

            <InputGroup className="col" fullWidth>
              <label>عنوان سئو</label>
              <input {...register("meta_title")} placeholder="عنوان متا" />
            </InputGroup>

            <InputGroup className="col" fullWidth>
              <label>مترادف ها</label>
              <input {...register("meta_keywords")} placeholder="کلمات مترادف" />
            </InputGroup>

            <InputGroup className="col" fullWidth>
              <label>توضیحات متا</label>
              <input {...register("meta_description")} placeholder="توضیحات متا" />
            </InputGroup>
          </CardBody>
        </Card>
        {/*
                <InputGroup className="col" fullWidth>
                    <label>is board</label>
                    <Controller
                        control={control}
                        name="isboard"
                        render={({ field }) => (
                            <CheckBoxWrapper>
                                <Checkbox style={{color: "transparent"}} checked={field?.value} {...field} />
                            </CheckBoxWrapper>
                        )}
                    />
                </InputGroup>

                <InputGroup className="col" fullWidth>
                    <label>is highlight</label>
                    <Controller
                        control={control}
                        name="ishighlight"
                        render={({ field }) => (
                            <CheckBoxWrapper>
                                <Checkbox style={{color: "transparent"}} checked={field?.value} {...field} />
                            </CheckBoxWrapper>
                        )}
                    />
                </InputGroup>

                <InputGroup className="col" fullWidth>
                    <label>is top</label>
                    <Controller
                        control={control}
                        name="istop"
                        render={({ field }) => (
                            <CheckBoxWrapper>
                                <Checkbox style={{color: "transparent"}} checked={field?.value} {...field} />
                            </CheckBoxWrapper>
                        )}
                    />
                </InputGroup>

                <InputGroup className="col" fullWidth>
                    <label>is cast</label>
                    <Controller
                        control={control}
                        name="iscast"
                        render={({ field }) => (
                            <CheckBoxWrapper>
                                <Checkbox style={{color: "transparent"}} checked={field?.value} {...field} />
                            </CheckBoxWrapper>
                        )}
                    />
                </InputGroup>

                <InputGroup className="col" fullWidth>
                    <label>هدر ها</label>
                    <input {...register('headers')} placeholder="هدر ها" />
                </InputGroup>

                <InputGroup className="col" fullWidth>
                    <label>ترند</label>
                    <input {...register('trend')} placeholder="ترند" />
                </InputGroup>

                <InputGroup className="col" fullWidth>
                    <label>ویدیو دارد؟</label>
                    <Controller
                        control={control}
                        name="isvideo"
                        render={({ field }) => (
                            <CheckBoxWrapper>
                                <Checkbox style={{color: "transparent"}} checked={field?.value} {...field} />
                            </CheckBoxWrapper>
                        )}
                    />
                </InputGroup>
          */}

        {/* <InputGroup className="col" fullWidth> */}
        {/*   <label>فایل ویدیویی</label> */}
        {/*   <video controls src={`https://api.originalpal.co.uk/images/${blog.srcvideo?.u}`}></video> */}
        {/*   <label>برای جایگزینی فایل ویدیویی، فایل خود را از طریق ورودی زیر بارگذاری کنید</label> */}
        {/*   <input */}
        {/*     type="file" */}
        {/*     placeholder="فایل ویدیویی" */}
        {/*     onChange={(e: any) => replaceMedia('srcvideo', e?.target?.files[0])} */}
        {/*   /> */}
        {/* </InputGroup> */}
        <Styler>
          <InputGroup className="col" fullWidth>
            <label>پیوند های پست در شبکه های اجتماعی: </label>

            <InputGroup fullWidth className="col post-links">
              {watch("post_links")?.length > 0 ? (
                <>
                  <Divider variant="dashed" my="md" />
                  <Flex direction="column" gap="0.25rem">
                    {watch("post_links")?.map((_post: PostLink, index: number) => {
                      return (
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
                      );
                    })}
                  </Flex>
                  <Divider variant="dashed" my="md" />
                </>
              ) : (
                <Alert color="red" variant="outline" my="md">
                  پیوندی وجود ندارد
                </Alert>
              )}
              <Select options={postLinkOptions} onChange={({ value }: any) => setPostLinkToAddName(value)} />
              <input
                placeholder="پیوند پست"
                id="post-link-name"
                onChange={(e) => setPostLinkToAddHref(e.target.value)}
              />
              <Button
                status="Success"
                type="button"
                onClick={() =>
                  postLinkToAddName &&
                  postLinkToAddHref &&
                  handlePostLink(
                    { name: postLinkToAddName, href: postLinkToAddHref },
                    getValues,
                    (value: PostLink[]) => setValue("post_links", value),
                    () => {
                      setPostLinkToAddName("");
                      setPostLinkToAddHref("");
                      (document.getElementById("post-link-name")! as any).value = "";
                    },
                  )
                }
              >
                افزودن پیوند پست
              </Button>
            </InputGroup>
          </InputGroup>
        </Styler>

        <Button disabled={loading} style={{ width: "auto", margin: "3rem 0" }} status="Info" appearance="outline">
          {loading ? "..." : "بروزرسانی وبلاگ"}
        </Button>
      </Form>

      <h3 className="mb-4">رسانه</h3>

      <Card style={{ position: "relative" }}>
        <LoadingOverlay visible={loading} />
        <CardHeader>تصویر پایانی</CardHeader>
        <CardBody>
          <InputGroup className="col" fullWidth>
            <label>تصویر پایانی ( برای جایگزینی تصویر، تصویر موردنظر خود را از طریق ورودی زیر بارگزاری کنید)</label>
            <input
              type="file"
              onChange={(e: any) => replaceMedia("endimage", e?.target?.files[0])}
              placeholder="تصویر پایانی"
            />
            <MediaCard
              media={coerce.media(watch("endimage"))}
              removalCallback={() => toast.info("وضعیت نمایش را به 0 تغییر دهید")}
              updateCallback={(form: any) => updateBlogMedia(form, "endimage")}
              index={0}
            />
          </InputGroup>

          <InputGroup className="col" fullWidth>
            <label>عنوان پایانی</label>
            <input {...register("endtitle")} placeholder="عنوان پایانی" />
          </InputGroup>

          <InputGroup className="col" fullWidth>
            <label>تگ آلت تصویر پایانی</label>
            <input {...register("endalt")} placeholder="تگ آلت تصویر پایانی" />
          </InputGroup>

          <InputGroup className="col" fullWidth>
            <label>متن تصویر پایانی</label>
            <input {...register("endtext")} placeholder="متن تصویر پایانی" />
          </InputGroup>
        </CardBody>
      </Card>

      <Card style={{ position: "relative" }}>
        <LoadingOverlay visible={loading} />
        <CardHeader>
          <label>تصویر بنر ( برای جایگزینی تصویر، تصویر موردنظر خود را از طریق ورودی زیر بارگزاری کنید)</label>
        </CardHeader>
        <CardBody>
          <InputGroup className="col" fullWidth>
            <input
              type="file"
              onChange={(e: any) => replaceMedia("thumb", e?.target?.files[0])}
              placeholder="تصویر بنر"
            />

            <MediaCard
              media={coerce.media(watch("thumb"))}
              removalCallback={() => toast.info("وضعیت نمایش را به 0 تغییر دهید")}
              updateCallback={(form: any) => updateBlogMedia(form, "thumb")}
              index={0}
            />
          </InputGroup>
        </CardBody>
      </Card>

      <Card style={{ position: "relative" }}>
        <LoadingOverlay visible={loading} />
        <CardHeader>
          <label>ویدیوی بنر</label>
        </CardHeader>
        <CardBody>
          <InputGroup className="col" fullWidth>
            <input
              type="file"
              onChange={(e: any) => replaceMedia("video", e?.target?.files[0])}
              placeholder="ویدیوی بنر"
            />

            {blogQuery?.data?.data?.video?.length > 0 && (
              <>
                {blogQuery?.data?.data?.video.map((video: any, index: number) => (
                  <MediaCard
                    media={video}
                    removalCallback={setVideoToRemove}
                    updateCallback={updateBlogVideo}
                    index={index}
                    isVideo
                  />
                ))}
              </>
            )}
          </InputGroup>
        </CardBody>
      </Card>
    </Layout>
  );
};

const CheckBoxWrapper = styled.div`
  color: transparent;
  font-size: 0;
`;

const Styler = styled.div`
  .col {
    flex-direction: column;
    &.post-links {
      display: flex;
      gap: 1rem;
    }
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;

  h1 {
    margin-bottom: 2rem;
  }

  label {
    margin-bottom: 1rem;
  }
`;
