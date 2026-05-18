// pages/status.js
import { useEffect, useState } from 'react';
export default function Status() {
  const [services, setServices] = useState([
    { name: 'Website', status: 'operational', uptime: 99.98 },
    { name: 'Database (Supabase)', status: 'operational', uptime: 99.99 },
    { name: 'File Storage (Backblaze)', status: 'operational', uptime: 99.95 },
    { name: 'Payments (Paystack)', status: 'operational', uptime: 99.97 },
    { name: 'CDN (Cloudflare)', status: 'operational', uptime: 100 },
  ]);
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">Ziongigi Status</h1>
      <p className="text-gray-500 mb-8">Current uptime and service health</p>
      <div className="space-y-3">
        {services.map(s => (
          <div key={s.name} className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
            <div><p className="font-semibold">{s.name}</p><p className="text-sm text-gray-500">Uptime {s.uptime}%</p></div>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Operational</span>
          </div>
        ))}
      </div>
      <p className="text-center text-gray-400 text-sm mt-8">Last updated: {new Date().toLocaleString()}</p>
    </div>
  );
}