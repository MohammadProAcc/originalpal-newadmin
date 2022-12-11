import { BannerForm } from "components/Form/derived/BannerForm";
import Layout from "Layouts";
import React from "react";

export function CreateBanner() {
  return (
    <Layout title="ساخت بنر">
      <BannerForm type="stand" />
    </Layout>
  );
}
