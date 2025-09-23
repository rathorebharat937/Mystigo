import Header from '@/components/Header';
import BudgetPlanner from '@/components/BudgetPlanner';

const Budget = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container py-10 space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold">Smart Budget Planning</h1>
        <BudgetPlanner />
      </section>
    </div>
  );
};

export default Budget;


