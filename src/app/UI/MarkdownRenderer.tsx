import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
    content: string,
    classes: string,
  }

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, classes }) => {
  return <ReactMarkdown className={classes}>{content}</ReactMarkdown>;
};

export default MarkdownRenderer;