import { CheckCircle, XCircle } from 'lucide-react';
import { CodeBlock } from './CodeBlock';

interface CodeSample {
  label?: string;
  code: string;
}

interface CodeComparisonProps {
  avoid: CodeSample;
  prefer: CodeSample;
}

export function CodeComparison({ avoid, prefer }: CodeComparisonProps): React.ReactElement {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-sm font-medium text-red-700">
          <XCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{avoid.label ?? 'Avoid'}</span>
        </div>
        <CodeBlock code={avoid.code} className="border-l-4 border-red-400" />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5 text-sm font-medium text-green-700">
          <CheckCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{prefer.label ?? 'Prefer'}</span>
        </div>
        <CodeBlock code={prefer.code} className="border-l-4 border-green-400" />
      </div>
    </div>
  );
}
