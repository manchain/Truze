import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { id, likes } = req.body;

            if (!id) {
                return res.status(400).json({ error: 'Missing post ID' });
            }

            const { data, error } = await supabase
                .from('posts')
                .update({ likes: likes })
                .eq('id', id)
                .select();

            if (error) {
                throw error;
            }

            res.status(200).json(data[0]);
        } catch (error) {
            console.error('Error updating likes:', error);
            res.status(500).json({ error: 'Failed to update likes' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
