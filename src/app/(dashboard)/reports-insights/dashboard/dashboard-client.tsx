'use client';

import React from 'react';

interface DashboardClientPageProps {
  insights?: any;
  revenueData?: any;
  expenseData?: any;
}

export function DashboardClientPage({ 
  insights, 
  revenueData, 
  expenseData 
}: DashboardClientPageProps) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Insights</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Revenue Overview</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <pre className="text-sm">{JSON.stringify(revenueData, null, 2)}</pre>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Expense Overview</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <pre className="text-sm">{JSON.stringify(expenseData, null, 2)}</pre>
        </div>
      </div>

      {insights && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">AI Generated Insights</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <div dangerouslySetInnerHTML={{ __html: insights }} />
          </div>
        </div>
      )}
    </div>
  );
}