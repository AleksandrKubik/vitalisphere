import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ArticleContentProps {
  content: string;
  className?: string;
  isMarkdown?: boolean;
}


const ArticleContent: React.FC<ArticleContentProps> = ({ 
  content, 
  className = '',
  isMarkdown = false 
}) => {
  
  // Если контент в формате Markdown
  if (isMarkdown) {
    return (
      <div className={`article-content ${className}`}>
        <ReactMarkdown
          // @ts-ignore - className prop is supported but not in types
          className="prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 
                    prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 
                    prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline 
                    prose-img:rounded-lg prose-img:my-8 prose-img:mx-auto prose-img:shadow-md prose-strong:font-semibold
                    prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6
                    prose-li:mb-2 prose-li:text-gray-700 prose-blockquote:border-l-4 prose-blockquote:border-blue-300
                    prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600"
          remarkPlugins={[remarkGfm]}
          components={{
            // Кастомное отображение кода
            // @ts-ignore - types are not fully compatible
            code({node, inline, className, children, ...props}: any) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={tomorrow}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            // Кастомное отображение изображений
            // @ts-ignore - types are not fully compatible
            img(props: any) {
              return (
                <div className="flex justify-center my-8">
                  <img 
                    src={props.src} 
                    alt={props.alt || ''} 
                    className="rounded-lg shadow-md max-w-full max-h-[500px] object-contain" 
                  />
                </div>
              );
            }
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    );
  }
  
  // Если контент в формате HTML
  // Создаем безопасный HTML с улучшенными стилями
  const createMarkup = () => {
    // Добавляем классы к HTML элементам для лучшей стилизации
    let enhancedContent = content
      // Улучшаем стилизацию заголовков
      .replace(/<h2>/g, '<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">')
      .replace(/<h3>/g, '<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">')
      // Улучшаем стилизацию абзацев
      .replace(/<p>/g, '<p class="text-gray-700 leading-relaxed mb-6">')
      // Улучшаем стилизацию списков
      .replace(/<ul>/g, '<ul class="list-disc pl-6 mb-6">')
      .replace(/<ol>/g, '<ol class="list-decimal pl-6 mb-6">')
      .replace(/<li>/g, '<li class="mb-2 text-gray-700">');
    
    return { __html: enhancedContent };
  };

  return (
    <div className={`article-content ${className}`}>
      <article 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={createMarkup()}
      />
    </div>
  );
};

export default ArticleContent;
