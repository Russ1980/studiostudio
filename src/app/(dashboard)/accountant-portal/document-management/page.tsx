import React from "react";
import { getDocumentManagementData } from "@/lib/actions";
import { DocumentManagementClientPage } from "./document-management-client";

export default async function DocumentManagementPage() {
  const data = await getDocumentManagementData();

  return (
    <div className="grid gap-6">
       <div>
          <h1 className="text-3xl font-bold">Document Management</h1>
          <p className="text-muted-foreground">
            Securely store, share, and track client documents.
          </p>
        </div>
        <DocumentManagementClientPage data={data} />
    </div>
  );
}
