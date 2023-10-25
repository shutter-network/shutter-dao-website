import React from "react";

import { Layout } from "../features/common/components/layout";
import { PrivacyPolicy } from "../features/common/components/privacy-policy";

export default function PrivacyPolicyPage() {
  return (
    <Layout>
      <div className="container mx-auto">
        <PrivacyPolicy />
      </div>
    </Layout>
  );
}
