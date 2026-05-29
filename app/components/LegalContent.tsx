interface LegalContentProps {
  html: string;
}

export function LegalContent({html}: LegalContentProps) {
  return (
    <div
      className="prose prose-slate max-w-none
        prose-headings:scroll-mt-20
        prose-h2:text-2xl prose-h2:font-bold prose-h2:border-l-4 prose-h2:border-red-600 prose-h2:pl-4 prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-xl prose-h3:font-semibold prose-h3:border-b prose-h3:border-gray-200 prose-h3:pb-2 prose-h3:mt-8 prose-h3:mb-4
        prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4
        prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-1
        prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-1
        prose-li:text-gray-600
        prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline
        prose-strong:font-semibold"
      dangerouslySetInnerHTML={{__html: html}}
    />
  );
}
