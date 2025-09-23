import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Calculator, 
  MapPin, 
  Car, 
  Utensils, 
  Ticket, 
  IndianRupee,
  TrendingUp,
  Clock
} from 'lucide-react';

const BudgetPlanner = () => {
  const [budget, setBudget] = useState('');
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = async () => {
    setIsCalculating(true);
    
    // Simulate API call for budget-based recommendations
    setTimeout(() => {
      const budgetNum = parseInt(budget);
      const mockRecommendations = [
        {
          place: "Red Fort, Delhi",
          totalCost: budgetNum * 0.4,
          transport: Math.round(budgetNum * 0.15),
          entry: Math.round(budgetNum * 0.05),
          food: Math.round(budgetNum * 0.15),
          local: Math.round(budgetNum * 0.05),
          duration: "Half day",
          distance: "12 km"
        },
        {
          place: "India Gate, Delhi",
          totalCost: budgetNum * 0.3,
          transport: Math.round(budgetNum * 0.12),
          entry: 0,
          food: Math.round(budgetNum * 0.12),
          local: Math.round(budgetNum * 0.06),
          duration: "2-3 hours",
          distance: "8 km"
        },
        {
          place: "Lotus Temple, Delhi",
          totalCost: budgetNum * 0.25,
          transport: Math.round(budgetNum * 0.10),
          entry: 0,
          food: Math.round(budgetNum * 0.10),
          local: Math.round(budgetNum * 0.05),
          duration: "2 hours",
          distance: "15 km"
        }
      ].filter(rec => rec.totalCost <= budgetNum);
      
      setRecommendations(mockRecommendations);
      setIsCalculating(false);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="space-y-4">
        <div className="flex items-center space-x-2">
          <Calculator className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl">Smart Budget Planner</CardTitle>
        </div>
        <p className="text-muted-foreground">
          Set your budget and get personalized recommendations with complete cost breakdown including transport, entry fees, and meals.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Label htmlFor="budget" className="text-base font-medium">Your Budget</Label>
            <div className="relative mt-2">
              <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="budget"
                type="number"
                placeholder="Enter your budget (e.g., 1000)"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex items-end">
            <Button 
              onClick={handleCalculate}
              disabled={!budget || isCalculating}
              size="lg"
              className="w-full sm:w-auto"
            >
              {isCalculating ? 'Calculating...' : 'Find Places'}
              <TrendingUp className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {recommendations.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-primary" />
              Recommended Places Within Your Budget
            </h3>
            
            <div className="grid gap-4">
              {recommendations.map((rec, index) => (
                <Card key={index} className="border-l-4 border-l-primary">
                  <CardContent className="p-4">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-lg">{rec.place}</h4>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            {rec.duration}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="mr-1 h-4 w-4" />
                            {rec.distance}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
                        <div className="grid grid-cols-2 lg:flex gap-2 text-xs">
                          <Badge variant="outline" className="flex items-center">
                            <Car className="mr-1 h-3 w-3" />
                            ₹{rec.transport}
                          </Badge>
                          <Badge variant="outline" className="flex items-center">
                            <Ticket className="mr-1 h-3 w-3" />
                            ₹{rec.entry}
                          </Badge>
                          <Badge variant="outline" className="flex items-center">
                            <Utensils className="mr-1 h-3 w-3" />
                            ₹{rec.food}
                          </Badge>
                          <Badge variant="outline" className="flex items-center">
                            <MapPin className="mr-1 h-3 w-3" />
                            ₹{rec.local}
                          </Badge>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">₹{Math.round(rec.totalCost)}</div>
                          <div className="text-xs text-muted-foreground">Total Cost</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="bg-gradient-heritage rounded-lg p-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Budget Utilization</h4>
                  <p className="text-sm opacity-90">
                    You can visit {recommendations.length} places within your budget
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">
                    ₹{recommendations.reduce((sum, rec) => sum + rec.totalCost, 0).toFixed(0)}
                  </div>
                  <div className="text-sm opacity-90">of ₹{budget}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BudgetPlanner;