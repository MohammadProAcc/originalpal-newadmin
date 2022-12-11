import { useQuery } from "@tanstack/react-query";
import { BannerForm } from "components/Form/derived/BannerForm";
import Layout from "Layouts";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { getSingleBanner } from "utils/api/REST/actions/banners/getSingleBanner";

export function EditMainPage() {
  const router = useRouter();
  const banner_id = router.query.banner_id as string;

  const { data: banner, refetch } = useQuery(
    ["banner", banner_id],
    () =>
      getSingleBanner(
        banner_id,
      ),
  );

  async function editBannerCallback() {
    refetch({});
  }

  return (
    <Layout title="ساخت بنر صفحه اصلی">
      <BannerForm
        type="slide"
        defaultValues={banner}
        callback={editBannerCallback}
      />
    </Layout>
  );
}

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const DropZoneWrapper = styled.div`
  img {
    display: none;
  }
`;
