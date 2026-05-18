// pages/press.js
export default function Press() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Press Kit</h1>
      <p className="text-gray-600 mb-8">Resources for journalists and media partners</p>
      <div className="space-y-8">
        <div><h2 className="text-2xl font-semibold">Logo & Brand Assets</h2><div className="bg-gray-100 p-4 rounded"><p>Download logos: <a href="/logos/ziongigi-logo.zip" className="text-indigo-600">ZIP file (PNG, SVG)</a></p></div></div>
        <div><h2 className="text-2xl font-semibold">Company Fact Sheet</h2><ul className="list-disc pl-6"><li>Founded: 2025</li><li>Headquarters: Lagos, Nigeria</li><li>Active users: 10,000+</li><li>Products listed: 1,200+</li></ul></div>
        <div><h2 className="text-2xl font-semibold">Screenshots</h2><div className="grid grid-cols-2 gap-4"><div className="bg-gray-200 h-32 flex items-center justify-center">Homepage preview</div><div className="bg-gray-200 h-32 flex items-center justify-center">Seller dashboard</div></div></div>
        <div><h2 className="text-2xl font-semibold">Contact</h2><p>For press inquiries: <a href="mailto:press@ziongigi.com" className="text-indigo-600">press@ziongigi.com</a></p></div>
      </div>
    </div>
  );
}