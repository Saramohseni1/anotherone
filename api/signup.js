import { supabase } from './_supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  // چک کردن اینکه نام کاربری تکراری نباشه
  const existing = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .maybeSingle();

  if (existing.data) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  // ساخت کاربر جدید
  const { data, error } = await supabase
    .from('users')
    .insert([{ username, password }])
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({
    message: 'Signup successful',
    user: data
  });
}
