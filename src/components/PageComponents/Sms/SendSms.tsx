import { SendSmsForm } from "components";
import Layout from "Layouts";

export function SendSms() {
  return (
    <Layout title="ارسال پیامک">
      <h1>ارسال پیامک</h1>
      <SendSmsForm />
    </Layout>
  );
}
