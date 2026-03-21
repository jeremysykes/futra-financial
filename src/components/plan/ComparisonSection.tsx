import { Check, X } from 'lucide-react';

const features = [
  'Net worth tracking',
  'Budget vs actuals',
  'Cash flow projections',
  'Retirement runway',
  'Multi-account sync',
  'Investment tracking',
  'Custom categories',
  'Data export',
];

type Support = boolean;

const competitors: { name: string; support: Support[] }[] = [
  { name: 'Futra Plan', support: [true, true, true, true, true, true, true, true] },
  { name: 'Monarch', support: [true, true, true, false, true, true, true, false] },
  { name: 'YNAB', support: [false, true, false, false, true, false, true, true] },
  { name: 'Spreadsheets', support: [true, true, false, false, false, false, true, true] },
];

export function ComparisonSection() {
  return (
    <section id="compare" className="py-24 md:py-32 bg-surface">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="mb-3 uppercase text-center font-sans font-medium text-xs tracking-[0.08em] text-muted-foreground">
          How we compare
        </p>
        <h2 className="text-center mb-16 font-sans font-bold text-foreground tracking-[-0.01em] text-[clamp(28px,4vw,40px)]">
          The full picture, not a partial view
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-border">
                <th className="py-4 pr-4 text-left font-sans font-medium text-sm text-muted-foreground">
                  Feature
                </th>
                {competitors.map((c, i) => (
                  <th
                    key={c.name}
                    className={`py-4 px-4 text-center font-sans font-semibold text-sm ${
                      i === 0 ? 'text-primary bg-primary/10' : 'text-foreground'
                    }`}
                  >
                    {c.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feat, fi) => (
                <tr key={feat} className="border-b border-border">
                  <td className="py-4 pr-4 font-sans text-sm text-foreground">
                    {feat}
                  </td>
                  {competitors.map((c, ci) => (
                    <td key={c.name} className={`py-4 px-4 text-center ${ci === 0 ? 'bg-primary/10' : ''}`}>
                      {c.support[fi] ? (
                        <Check
                          size={18}
                          className={`inline-block ${
                            ci === 0 ? 'text-primary' : 'text-positive'
                          }`}
                        />
                      ) : (
                        <X
                          size={18}
                          className="inline-block text-muted-foreground opacity-40"
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
