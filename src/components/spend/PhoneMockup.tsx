export function PhoneMockup() {
  const transactions = [
    { name: 'Blue Bottle Coffee', category: 'Coffee', amount: -5.75, time: '2 min ago' },
    { name: 'Whole Foods Market', category: 'Groceries', amount: -47.32, time: '1 hr ago' },
    { name: 'Netflix', category: 'Subscription', amount: -15.99, time: '3 hrs ago' },
    { name: 'Alex M.', category: 'P2P Transfer', amount: 120.0, time: 'Yesterday' },
    { name: 'Uber Eats', category: 'Food', amount: -23.48, time: 'Yesterday' },
  ];

  return (
    <div className="relative mx-auto w-[280px] sm:w-[300px]">
      <div className="rounded-[40px] border-[3px] border-border bg-surface p-3 shadow-2xl shadow-primary/10">
        <div className="mx-auto mb-3 h-[24px] w-[100px] rounded-full bg-secondary" />
        <div className="rounded-[28px] bg-surface px-4 pb-4">
          <div className="mb-1 text-center">
            <p className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground font-sans font-medium">
              Available Balance
            </p>
            <p className="text-[32px] text-foreground font-mono font-medium">
              $4,218<span className="text-[20px] text-muted-foreground">.63</span>
            </p>
          </div>
          <p className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground mb-2 font-sans font-medium">
            Recent Activity
          </p>
          <div className="flex flex-col gap-2.5">
            {transactions.map((tx) => (
              <div key={tx.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-[12px] text-muted-foreground">
                    {tx.name[0]}
                  </div>
                  <div>
                    <p className="text-[13px] text-foreground font-sans font-medium">{tx.name}</p>
                    <p className="text-[10px] text-muted-foreground">{tx.time}</p>
                  </div>
                </div>
                <span
                  className={`text-[14px] font-mono font-medium ${tx.amount < 0 ? 'text-negative' : 'text-positive'}`}
                >
                  {tx.amount < 0 ? '-' : '+'}${Math.abs(tx.amount).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
