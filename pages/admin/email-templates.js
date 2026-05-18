// pages/admin/email-templates.js
import ProtectedRoute from '../../components/ProtectedRoute';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function EmailTemplates() {
  const [templates, setTemplates] = useState([]);
  const [selected, setSelected] = useState(null);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('email_templates').select('*');
      setTemplates(data || []);
    };
    fetch();
  }, []);

  const selectTemplate = (t) => {
    setSelected(t);
    setSubject(t.subject);
    setBody(t.body);
  };

  const saveTemplate = async () => {
    await supabase.from('email_templates').update({ subject, body }).eq('id', selected.id);
    alert('Saved');
    setSelected(null);
    const { data } = await supabase.from('email_templates').select('*');
    setTemplates(data);
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Email Templates</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="font-bold mb-2">Templates</h2>
            {templates.map(t => <button key={t.id} onClick={() => selectTemplate(t)} className="block w-full text-left p-2 hover:bg-gray-100">{t.name}</button>)}
          </div>
          <div className="md:col-span-2 bg-white rounded-xl shadow p-4">
            {selected ? (
              <>
                <h2 className="font-bold mb-2">Edit: {selected.name}</h2>
                <div><label>Subject</label><input className="input mb-2" value={subject} onChange={e => setSubject(e.target.value)} /></div>
                <div><label>Body (HTML)</label><textarea rows="10" className="input font-mono text-sm" value={body} onChange={e => setBody(e.target.value)} /></div>
                <button onClick={saveTemplate} className="btn-primary mt-4">Save Template</button>
              </>
            ) : <p className="text-gray-400">Select a template to edit</p>}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}