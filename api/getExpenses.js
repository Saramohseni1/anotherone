import { supabase } from './_supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { groupId } = req.query;

  if (!groupId) {
    return res.status(400).json({ error: 'Missing groupId' });
  }

  // دریافت هزینه‌های یک گروه
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .eq('group_id', groupId);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({
    message: 'Expenses retrieved successfully',
    expenses: data
  });
}
