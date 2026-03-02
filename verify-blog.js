import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envContent = fs.readFileSync('.env.local', 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  if(line.trim() && !line.startsWith('#')) {
    const [k,v] = line.split('=');
    if(k) env[k.trim()] = v.trim();
  }
});

const supabase = createClient(env['VITE_SUPABASE_URL'], env['VITE_SUPABASE_ANON_KEY']);

(async () => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, slug, title, published_at, reading_time')
    .order('published_at', { ascending: false });
  
  if(error) {
    console.error('Error querying database:', error);
    process.exit(1);
  }
  
  console.log('\n✅ Blog posts in Supabase database:\n');
  console.log('─'.repeat(60));
  data.forEach(post => {
    console.log(`Title:   ${post.title}`);
    console.log(`Slug:    ${post.slug}`);
    console.log(`Reading: ${post.reading_time}`);
    console.log(`Published: ${new Date(post.published_at).toLocaleDateString()}`);
    console.log('─'.repeat(60));
  });
  
  if(data.length === 1) {
    console.log(`\n✅ Total: ${data.length} post - Ready to display!`);
  } else {
    console.log(`\n✅ Total: ${data.length} posts`);
  }
})();
