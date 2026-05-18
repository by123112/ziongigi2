// pages/admin/tax.js
import ProtectedRoute from '../../components/ProtectedRoute';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function TaxSettings() {
  const [taxRates, setTaxRates] = useState([]);
  const [country, setCountry] = useState('');
  const [rate, setRate] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('tax_rates').select('*');
      setTaxRates(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  const addTax = async () => {
    if (!country || !rate) return;
    await supabase.from('tax_rates').insert([{ country, rate: parseFloat(rate) }]);
    setCountry('');
    setRate('');
    const { data } = await supabase.from('tax_rates').select('*');
    setTaxRates(data);
  };

  const deleteTax = async (id) => {
    await supabase.from('tax_rates').delete().eq('id', id);
    setTaxRates(taxRates.filter(t => t.id !== id));
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Tax Settings (VAT/GST)</h1>
        {loading ? <p>Loading...</p> : (
          <>
            <div className="bg-white rounded-xl shadow p-4 mb-6">
              <div className="flex gap-2 mb-4">
                <input className="input" placeholder="Country code (e.g., NG, US, GB)" value={country} onChange={e => setCountry(e.target.value)} />
                <input className="input" type="number" step="0.1" placeholder="Tax %" value={rate} onChange={e => setRate(e.target.value)} />
                <button onClick={addTax} className="btn-primary">Add</button>
              </div>
              <table className="min-w-full">
                <thead><tr><th>Country</th><th>Rate (%)</th><th>Action</th></tr></thead>
                <tbody>
                  {taxRates.map(t => <tr key={t.id}><td>{t.country}</td><td>{t.rate}%</td><td><button onClick={() => deleteTax(t.id)} className="text-red-600">Remove</button></td></tr>)}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
}