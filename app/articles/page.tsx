// app/quote/page.tsx (for App Router)
// or pages/quote.tsx (for Pages Router)

import QuoteBuilder from "../Quote/quote-builder";

export default function QuotePage() {
  return (
    <div id="articles">
      {/* You might want a simple header here, but the QuoteBuilder handles its own content */}
      <QuoteBuilder />
    </div>
  );
}
