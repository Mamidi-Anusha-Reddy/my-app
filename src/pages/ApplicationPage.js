import React, { useState } from "react";
import CreditCardForm from "../components/CreditCardForm";
import ApplicationConfirmation from "../components/ApplicationConfirmation";

function ApplicationPage() {
  const [application, setApplication] = useState(null);

  return application ? (
    <ApplicationConfirmation
      application={application}
      onEdit={() => setApplication(null)}
      onGoBack={() => setApplication(null)}
    />
  ) : (
    <CreditCardForm onSubmit={(app) => setApplication(app)} />
  );
}

export default ApplicationPage;
