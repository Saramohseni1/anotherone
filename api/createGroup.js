import { supabase } from './_supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { groupName, creatorId } = req.body;

  if (!groupName || !creatorId) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  // ساخت گروه جدید
  const { data: group, error } = await supabase
    .from('groups')
    .insert([{ name: groupName, creator_id: creatorId }])
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  // اضافه کردن سازنده گروه به جدول members
  await supabase
    .from('members')
    .insert([{ group_id: group.id, user_id: creatorId }]);

  return res.status(200).json({
    message: 'Group created successfully',
    group: group
  });
}
