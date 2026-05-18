// pages/messages/[id].js
import ProtectedRoute from '../../components/ProtectedRoute';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function Chat() {
  const router = useRouter();
  const { id } = router.query;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [dispute, setDispute] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchDispute = async () => {
      const { data } = await supabase.from('disputes').select('*, orders(buyer_email, product_id, products(title))').eq('id', id).single();
      setDispute(data);
    };
    const fetchMessages = async () => {
      const { data } = await supabase.from('chat_messages').select('*').eq('dispute_id', id).order('created_at', { ascending: true });
      setMessages(data || []);
    };
    fetchDispute();
    fetchMessages();

    const subscription = supabase
      .channel(`dispute_${id}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages', filter: `dispute_id=eq.${id}` }, payload => {
        setMessages(prev => [...prev, payload.new]);
      })
      .subscribe();
    return () => subscription.unsubscribe();
  }, [id]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from('chat_messages').insert([{ dispute_id: id, sender_id: user.id, message: newMessage }]);
    setNewMessage('');
  };

  if (!dispute) return <div className="p-10 text-center">Loading chat...</div>;

  return (
    <ProtectedRoute allowedRoles={['buyer', 'seller', 'admin']}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-2">Dispute Chat</h1>
        <p className="text-gray-500 mb-6">Product: {dispute.orders?.products?.title}</p>
        <div className="bg-gray-100 rounded-xl p-4 h-96 overflow-y-auto space-y-3 mb-4">
          {messages.map(m => (
            <div key={m.id} className={`flex ${m.sender_id === dispute.buyer_id ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs p-3 rounded-lg ${m.sender_id === dispute.buyer_id ? 'bg-indigo-600 text-white' : 'bg-white shadow'}`}>{m.message}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input type="text" className="input flex-1" value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder="Type your message..." />
          <button onClick={sendMessage} className="btn-primary">Send</button>
        </div>
      </div>
    </ProtectedRoute>
  );
}