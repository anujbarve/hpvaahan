interface LegalContentProps {
  html: string;
}

export function LegalContent({html}: LegalContentProps) {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="backdrop-blur-sm bg-white/50 rounded-2xl border border-gray-100/80 shadow-sm p-8 md:p-12">
        <div
          className="
            prose prose-slate max-w-none
            prose-headings:scroll-mt-24
            prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:font-bold prose-h2:text-gray-900
            prose-h2:border-l-4 prose-h2:border-red-500 prose-h2:pl-5 prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-xl prose-h3:font-semibold prose-h3:text-gray-800
            prose-h3:border-b prose-h3:border-gray-200 prose-h3:pb-2 prose-h3:mt-10 prose-h3:mb-4
            prose-h4:text-lg prose-h4:font-semibold prose-h4:text-gray-700 prose-h4:mt-8 prose-h4:mb-3
            prose-p:text-gray-600 prose-p:leading-relaxed prose-p:text-lg prose-p:mb-5
            prose-a:text-red-600 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
            prose-strong:text-gray-900 prose-strong:font-semibold
            prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2 prose-ul:my-6
            prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2 prose-ol:my-6
            prose-li:text-gray-600 prose-li:leading-relaxed
            prose-li::marker:text-red-400
            prose-blockquote:border-l-4 prose-blockquote:border-red-300
            prose-blockquote:bg-red-50/50 prose-blockquote:py-2 prose-blockquote:px-6
            prose-blockquote:rounded-r-xl prose-blockquote:text-gray-700 prose-blockquote:italic
            prose-code:text-red-600 prose-code:bg-red-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal
            prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:shadow-lg
            prose-img:rounded-xl prose-img:shadow-md prose-img:my-8
            prose-hr:border-gray-200 prose-hr:my-10
          "
          dangerouslySetInnerHTML={{__html: html}}
        />
      </div>
    </div>
  );
}
