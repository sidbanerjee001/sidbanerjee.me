// app/notes/[slug]/page.tsx

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import remarkGfm from 'remark-gfm';

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'src/NotesMD');
  const files = fs.readdirSync(dir);

  return files.map((file) => ({
    slug: file.replace(/\.md$/, ''),
  }));
}

export default async function NotesPage({ params }: { params: { slug: string } }) {
  const p = await params;
  const filePath = path.join(process.cwd(), 'src/NotesMD', `${p.slug}.md`);

  if (!fs.existsSync(filePath)) {
    return <div className="text-red-500">Post not found.</div>;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(fileContent);

  return (
    <div id="full-wrapper" className="w-[80%] lg:w-[50%] m-auto my-24">
        <a href={"https://sidbanerjee.me"}>
            <svg viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 12H4m0 0l6-6m-6 6l6 6"></path> </g></svg>
        </a>
        <div id="header-wrapper" className="mt-8 flex flex-row items-end justify-between">
            <div>
                <div className="flex flex-row">
                    <h1 className="font-medium text-xl">{data.title || p.slug}</h1>
                </div>
                <div className="mt-4 mb-8">
                    <span className="text-xs text-gray-400">{data.date}</span>
                </div>
            </div>
        </div>

        <hr/>

        <div id="content-wrapper" className="mt-8 prose prose-sm">
            <ReactMarkdown
                remarkPlugins={[remarkMath, remarkGfm]}
                rehypePlugins={[rehypeKatex]}
                className={"text-sm"}
                components={{
                    a: ({node, ...props}) => (
                        <a
                            {...props}
                            className="text-blue-600 underline hover:text-blue-800"
                        />
                    ),
                    h1: ({node, ...props}) => (
                        <h1
                            {...props}
                            className="text-xl"
                        />
                    )
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    </div>
  );
}
