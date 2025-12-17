import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Debug logging
    console.log('[API] Method:', req.method);

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        console.error('[API] Missing Supabase environment variables');
        return res.status(500).json({ error: 'Server configuration error: Missing Supabase credentials' });
    }

    if (req.method === 'GET') {
        try {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .order('timestamp', { ascending: false });

            if (error) {
                throw error;
            }

            res.status(200).json(data || []);
        } catch (error) {
            console.error('Error fetching posts:', error);
            res.status(500).json({ error: 'Failed to fetch posts' });
        }
    } else if (req.method === 'POST') {
        try {
            const { title, content, tags, author, authorAddress } = req.body;

            const newPost = {
                author: author || 'Anonymous',
                author_address: authorAddress || '',
                avatar: '/avatars/default.png',
                timestamp: new Date().toISOString(),
                title,
                content,
                tags: tags ? tags.split(',').map((tag: string) => tag.trim()) : [],
                likes: 0,
                comments: 0,
                status: 'Pending',
                verification_count: 0
            };

            const { data, error } = await supabase
                .from('posts')
                .insert([newPost])
                .select();

            if (error) {
                throw error;
            }

            const createdPost = data && data.length > 0 ? data[0] : newPost;
            res.status(201).json(createdPost);
        } catch (error) {
            console.error('Error creating post:', error);
            res.status(500).json({ error: 'Failed to save post' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
