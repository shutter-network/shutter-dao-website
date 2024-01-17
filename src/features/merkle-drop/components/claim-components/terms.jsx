import React from "react";

function TermsAndConditionsParagraph(props) {
  /*
   * This is a copy of the src/view/merkle_drop/_terms-conditions.njk template.
   * As long as there is no smarter solution implemented, these both files must
   * be kept in sync with each other!
   */
  return (
    <div className="terms-and-conditions">
      <h1>Terms & Conditions of Use</h1>
      <h2>1. Scope</h2>
      <p>
      1.1. These terms and conditions govern the contractual relationship between the user and brainbot gmbh (hereinafter referred to as BB) regarding the use of the <a href="https://github.com/shutter-network/shutter-dao-website" target="_blank">front end interfacing</a> with the merkle drop smart contract [ethereum address 0x …] via <a href="https://claim.shutter.network" target="_blank">https://claim.shutter.network</a> (hereinafter referred to as the “App”). BB and the user are collectively referred to as the "parties".
      </p>
      <p>
      1.2. There are no verbal side agreements between the parties. These terms and conditions apply exclusively.
      </p>

      <h2>2. Conclusion of the contract</h2>
      <p>
      The contract between the parties is concluded when the user accesses the App.
      </p>

      <h2>3. Right of withdrawal</h2>
      <p>
      There is no right of withdrawal. However, the user is free at any time to delete or uninstall the App from the device used and/or to delete its browser cache and thus delete the accessed version of the App.
      </p>

      <h2>4. Access to the App</h2>
      <p>
      4.1. The App can be accessed via https://claim.shutter.network.
      </p>
      <p>
      4.2. The installation of the App is not part of the contract.
      </p>
      <p>
      4.3. The user may be offered updates of the App for download, which may contain bug fixes and new functionalities as long as the download offer is not discontinued. BB therefore recommends regular updates.
      </p>
      <p>
      4.4. BB is free to stop all access to download and update offers of the App via its web servers at any time.
      </p>

      <h2>5. Rights of use</h2>
      <p>
      5.1. The user may use the App on any number of computers for any lawful purposes.
      </p>
      <p>
      5.2. The user may acquire further usage rights to the App from the respective rights holders by concluding separate licence agreements with these rights holders under the conditions of the respective licence. The licence texts are included in the source code. In this case, the use of the App is not covered by this contract, but is based solely on the conditions of the respective licence. If several licences are used, these are contained in the source code that is accessible to the user in accordance with Section 4 (2).
      </p>

      <h2>6. Remuneration</h2>
      <p>
      The user receives and can use/interact with the App free of charge. Fees may be applied by other participants of the network for certain interactions.
      </p>

      <h2>7. Beta Version/Disclaimer/Liability</h2>
      <p>
      The App is a beta version of experimental open source software released as a beta version under an MIT license and may contain errors and/or bugs. No guarantee or representation whatsoever is made regarding its suitability (or its use) for any purpose or regarding its compliance with any applicable laws and regulations. Use of the App is at the user’s risk and discretion and by using the App the user warrants and represents to have read this disclaimer, understand its contents, assume all risk related thereto and hereby releases, waives, discharges and covenants not to hold liable BB or any of its officers, employees or affiliates from and for any direct or indirect damage resulting from the App or the use thereof. Such to the extent as permissible by applicable laws and regulations.
      </p>

      <h2>8. Third Party Services</h2>
      <p>
      The App gives the user the choice to interact directly with web services provided by third parties. These web services are unaffiliated with BB and carried out solely on the discretion of the user and based on the respective terms and conditions agreed between the user and the third party or web service. BB does not receive any form of remuneration or inducement from these third parties. BB gives neither express or implied representations nor express or implied warranties with regard to the applications or the services provided by third parties. This includes but is not limited to the validity of the license, suitability, quality, functionality, availability, access of/to the application or service. BB therefore cannot be held responsible or liable for these applications or services or for any damages related to using these applications or services.
      </p>

      <h2>9. Applicable law</h2>
      <p>
      The contractual relationship between the parties and all disputes that arise from or in connection with this contractual relationship are subject to the law of Germany. If the user is a consumer and does not have his habitual residence in Germany, the statutory regulations for consumer protection in the state of his habitual residence remain unaffected, if and to the extent that these regulations may not be deviated from under the law of the state of his habitual residence. The United Nations Convention on Contracts for the International Sale of Goods does not apply.
      </p>

      <h2>10. Place of jurisdiction</h2>
      <p>
      Insofar as the user is a merchant, legal entity under public law or special fund under public law or has no general place of jurisdiction in Germany, or has moved his domicile or habitual residence outside of Germany after conclusion of the contract, or his domicile or habitual residence is not known at the time the action is brought, the exclusive place of jurisdiction for all disputes arising from and in connection with the contractual relationship between the parties in all these cases is the registered office of BB.
      </p>

      <h2>11. Dispute settlement</h2>
      <p>
      11.1. The European Commission provides a platform that enables disputes between consumers and businesses to be settled online (OS platform). The OS platform can be reached under the following link: <a href="https://ec.europa.eu/consumers/odr" target="_blank">https://ec.europa.eu/consumers/odr</a>. BBs email address is: contact@brainbot.com.
      </p>
      <p>
      11.2. BB is not obliged to participate in dispute settlement procedures before consumer arbitration boards.
      </p>

      <h2>12. Severability Clause</h2>
      <p>
      Should one or more provisions of these Terms and Conditions of Use be or become ineffective, this shall not affect the validity of the remaining provisions. The ineffective provisions shall be replaced with effective provisions that match the purpose of those ineffective provisions.
      </p>
    </div>
  );
}

export default TermsAndConditionsParagraph;
