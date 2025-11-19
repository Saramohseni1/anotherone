import { supabase } from './_supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { groupId, userId, title, amount } = req.body;

  if (!groupId || !userId || !title || !amount) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  // ثبت هزینه جدید
  const { data, error } = await supabase
    .from('expenses')
    .insert([{ group_id: groupId, user_id: userId, title, amount }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({
    message: 'Expense added successfully',
    expense: data
  });
}
