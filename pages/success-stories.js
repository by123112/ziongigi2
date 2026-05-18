// pages/success-stories.js
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function SuccessStories() {
  const [stories, setStories] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('success_stories').select('*').order('created_at', { ascending: false });
      setStories(data || []);
    };
    fetch();
  }, []);
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-4xl font-bold text-center mb-4">Creator Success Stories</h1>
      <p className="text-center text-gray-600 mb-12">Real sellers who built thriving businesses on Ziongigi</p>
      <div className="grid md:grid-cols-2 gap-8">
        {stories.map(s => (
          <div key={s.id} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-4 mb-4"><img src={s.avatar || '/avatar-placeholder.png'} className="w-16 h-16 rounded-full" /><div><h3 className="font-bold text-xl">{s.name}</h3><p className="text-indigo-600">{s.role}</p></div></div>
            <p className="text-gray-600 italic">"{s.testimonial}"</p>
            <p className="mt-4 text-sm text-gray-500">🎉 {s.achievement}</p>
          </div>
        ))}
      </div>
    </div>
  );
}