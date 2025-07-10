'use client'

export function DashboardClientPage({ 
  initialInsights,
  revenueData,
  expenseData 
}: { 
  initialInsights?: any
  revenueData?: any
  expenseData?: any
}) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Revenue Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Revenue Data</h2>
          <pre className="text-sm bg-gray-50 p-2 rounded">
            {JSON.stringify(revenueData || {}, null, 2)}
          </pre>
        </div>
        
        {/* Expense Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Expense Data</h2>
          <pre className="text-sm bg-gray-50 p-2 rounded">
            {JSON.stringify(expenseData || {}, null, 2)}
          </pre>
        </div>
        
        {/* Insights Section */}
        {initialInsights && (
          <div className="bg-white shadow rounded-lg p-6 md:col-span-2">
            <h2 className="text-lg font-semibold mb-4">AI Insights</h2>
            <div className="prose max-w-none">
              {typeof initialInsights === 'string' 
                ? initialInsights 
                : JSON.stringify(initialInsights, null, 2)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DashboardClientPage
