import { SpendTransactions } from '../../mocks/spend.mock';

export function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[280px] sm:w-[300px]">
      {/* Outer phone body */}
      <div className="rounded-[48px] bg-[#1E1E24] p-[6px] shadow-[0_0_60px_rgba(108,111,228,0.3),0_0_120px_rgba(108,111,228,0.1)] ring-1 ring-white/[0.08]">
        {/* Inner bezel */}
        <div className="rounded-[42px] bg-background overflow-hidden relative">
          {/* Status bar */}
          <div className="flex items-center justify-between px-7 pt-3 pb-1">
            <span className="text-[11px] text-foreground/60 font-sans font-medium">
              9:41
            </span>
            {/* Dynamic Island */}
            <div className="w-[90px] h-[28px] rounded-full bg-black absolute left-1/2 -translate-x-1/2 top-2.5" />
            <div className="flex items-center gap-1">
              <div className="w-[15px] h-[10px] rounded-sm border border-foreground/50 relative">
                <div className="absolute inset-[1.5px] bg-foreground/60 rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* Screen content */}
          <div className="px-5 pb-6 pt-4">
            {/* Balance */}
            <div className="mb-5 text-center">
              <p className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground mb-1 font-sans font-medium">
                Available Balance
              </p>
              <p className="text-[36px] text-foreground leading-none font-mono font-medium">
                $4,218
                <span className="text-[22px] text-muted-foreground">.63</span>
              </p>
            </div>

            {/* Card preview */}
            <div className="mb-5 rounded-xl bg-gradient-to-br from-primary to-primary-hover p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/10 -translate-y-8 translate-x-8" />
              <p className="text-[10px] uppercase tracking-[0.1em] text-white/60 mb-2 font-sans font-medium">
                Futra Debit
              </p>
              <p className="text-[14px] text-white/90 tracking-[0.12em] font-mono font-medium">
                •••• •••• •••• 4291
              </p>
            </div>

            {/* Transactions */}
            <p className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground mb-3 font-sans font-medium">
              Recent Activity
            </p>
            <div className="flex flex-col gap-3">
              {SpendTransactions.map((tx) => (
                <div
                  key={tx.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-[11px] text-muted-foreground font-sans font-semibold">
                      {tx.name[0]}
                    </div>
                    <div>
                      <p className="text-[13px] text-foreground leading-tight font-sans font-medium">
                        {tx.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground leading-tight">
                        {tx.time}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-[13px] font-mono font-medium ${tx.amount < 0 ? 'text-negative' : 'text-positive'}`}
                  >
                    {tx.amount < 0 ? '-' : '+'}${Math.abs(tx.amount).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Home indicator */}
          <div className="flex justify-center pb-2">
            <div className="w-[120px] h-[4px] rounded-full bg-foreground/20" />
          </div>
        </div>
      </div>

      {/* Side buttons (volume + power) */}
      <div className="absolute left-[-2px] top-[100px] w-[3px] h-[28px] rounded-l bg-[#2A2A32]" />
      <div className="absolute left-[-2px] top-[145px] w-[3px] h-[44px] rounded-l bg-[#2A2A32]" />
      <div className="absolute left-[-2px] top-[195px] w-[3px] h-[44px] rounded-l bg-[#2A2A32]" />
      <div className="absolute right-[-2px] top-[135px] w-[3px] h-[55px] rounded-r bg-[#2A2A32]" />
    </div>
  );
}
