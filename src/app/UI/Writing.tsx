import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

import WritingData from "../Data/Writing.json";

const NOTES_DIR = path.join(process.cwd(), "src/NotesMD");

function readMeta(slug: string) {
    const { data } = matter(fs.readFileSync(path.join(NOTES_DIR, `${slug}.md`), "utf8"));
    return { slug, title: (data.title as string) ?? slug, date: data.date as string | undefined };
}

const formatDate = (d?: string) =>
    d ? new Date(`${d}T00:00:00`).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "";

const Writing = () => (
    <div className="space-y-10">
        {Object.entries(WritingData as Record<string, string[]>).map(([group, slugs]) => (
            <div key={group}>
                <h3 className="text-sm font-medium text-gray-900 mb-4">{group}</h3>
                <ul className="space-y-3">
                    {slugs.map(readMeta).map((note) => (
                        <li key={note.slug} className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4">
                            <span className="text-xs text-gray-500 w-20 shrink-0 tabular-nums">{formatDate(note.date)}</span>
                            <Link href={`/notes/${note.slug}`} className="text-accent-ink hover:underline underline-offset-4">
                                {note.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        ))}
    </div>
);

export default Writing;
