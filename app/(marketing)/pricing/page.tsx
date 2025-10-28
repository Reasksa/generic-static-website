export default function PricingPage() {
  return (
    <div className="container py-16">
      <h1 className="text-3xl font-semibold">Pricing</h1>
      <p className="mt-2 max-w-2xl text-ink-300">Start free. Upgrade when you’re ready. Cancel anytime.</p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <div key={p.name} className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold">{p.name}</h3>
            <p className="mt-1 text-sm text-ink-400">{p.tag}</p>
            <p className="mt-4 text-3xl font-semibold">${p.price}<span className="text-sm text-ink-400">/mo</span></p>
            <ul className="mt-4 space-y-2 text-sm text-ink-300">
              {p.features.map((f) => <li key={f}>• {f}</li>)}
            </ul>
            <button className="mt-6 w-full rounded-md bg-brand-600 px-4 py-2 text-sm font-medium hover:bg-brand-500">
              Choose {p.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const plans = [
  { name: "Starter", tag: "Up to 7 accounts", price: 9, features: ["1 Brand", "Collections", "Bulk import", "AI assistant (lite)"] },
  { name: "Pro", tag: "Up to 30 accounts", price: 29, features: ["5 Brands", "Cross‑posting", "Automations", "Calendar and Insights"] },
  { name: "Agency", tag: "Up to 100 accounts", price: 99, features: ["Unlimited Brands", "Team seats", "Client access", "Priority support"] },
];