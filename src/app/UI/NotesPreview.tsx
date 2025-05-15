'use client'

import { useRouter } from "next/navigation";

import AccordionItem from "./Components/Accordion";
import { useState } from "react";
import Link from "next/link";

interface NotesPreviewRenderProps {
    data: Object;
}

type Article = {
  title: string;
  link: string;
};

const NotesPreviewRender: React.FC<NotesPreviewRenderProps> = ({ data }) => {
    const router = useRouter();

    const sections = Object.entries(data).map(([sectionKey, section]) => ({
        key: sectionKey,
        title: section.title,

        articles: Object.entries(section.articles as Record<string, Article>).map( ([articleKey, article]) => ({
                key: articleKey,
                title: article.title,
                link: article.link
            })
        ),
    }));

    const [openItems, setOpenItems] = useState<string[]>([]);
    
    const handleToggle = (id: string) => {
        setOpenItems(prevOpenItems => {
        if (prevOpenItems.includes(id)) {
            return prevOpenItems.filter(item => item !== id);
        } else {
            return true 
            ? [...prevOpenItems, id] 
            : [id];
        }
        });
    };
    

    return (
        <div>
            {sections.map((section) => (
                <AccordionItem
                    key={section.key}
                    title={section.title}
                    isOpen={openItems.includes(section.key)}
                    onToggle={() => handleToggle(section.key)}
                >
                    {section.articles.map((article) => (
                        <li key={article.key} className={"list-none"}>
                                <Link href={{pathname: article.link}} className="text-blue-500 hover:underline decoration-none">
                                    <span className={"text-md"}>{article.title}</span>
                                </Link>
                        </li>
                    ))}
                </AccordionItem>
            ))}
        </div>
    )
}

export default NotesPreviewRender;