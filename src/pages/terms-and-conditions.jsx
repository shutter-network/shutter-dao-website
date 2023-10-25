import React from "react";

import { Layout } from "../features/common/components/layout";
import TermsAndConditionsParagraph from "../features/merkle-drop/components/claim-components/terms";

export default function TermsAndConditionsPage() {
  return (
    <Layout>
      <div className="container mx-auto">
        <TermsAndConditionsParagraph />
      </div>
    </Layout>
  );
}
