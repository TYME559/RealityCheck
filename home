import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

import HeroSection from '@/components/landing/HeroSection';
import ProgressBar from '@/components/calculator/ProgressBar';
import IncomeStep from '@/components/calculator/IncomeStep';
import SpendingStep from '@/components/calculator/SpendingStep';
import TransportStep from '@/components/calculator/TransportStep';
import LifestyleStep from '@/components/calculator/LifestyleStep';
import MoveOutStep from '@/components/calculator/MoveOutStep';
import ResultsPage from '@/pages/Results';
import ResultsLocked from '@/components/results/ResultsLocked';

const RENT_ESTIMATES = {
  'New York, NY': { studio: 2800, '1br': 3500, '2br': 4500 },
  'Los Angeles, CA': { studio: 1900, '1br': 2400, '2br': 3200 },
  'Chicago, IL': { studio: 1400, '1br': 1800, '2br': 2400 },
  'Houston, TX': { studio: 1100, '1br': 1400, '2br': 1800 },
  'Phoenix, AZ': { studio: 1100, '1br': 1400, '2br': 1800 },
  'Philadelphia, PA': { studio: 1300, '1br': 1700, '2br': 2200 },
  'San Antonio, TX': { studio: 950, '1br': 1200, '2br': 1500 },
  'San Diego, CA': { studio: 1900, '1br': 2400, '2br': 3100 },
  'Dallas, TX': { studio: 1200, '1br': 1500, '2br': 1900 },
  'Austin, TX': { studio: 1400, '1br': 1800, '2br': 2300 },
  'Denver, CO': { studio: 1500, '1br': 1900, '2br': 2500 },
  'Seattle, WA': { studio: 1700, '1br': 2200, '2br': 2900 },
  'Miami, FL': { studio: 1800, '1br': 2300, '2br': 3000 },
  'Atlanta, GA': { studio: 1400, '1br': 1800, '2br': 2300 },
  'Other': { studio: 1200, '1br': 1500, '2br': 2000 },
};

export default function Home() {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("premium") === "true") {
      setIsPremium(true);
    }
  }, []);

  const [formData, setFormData] = useState({
    monthly_income: null,
    income_stability: 'stable',
    current_savings: null,
    eating_out_weekly: 3,
    coffee_snacks_weekly: 5,
    shopping_monthly: 100,
    entertainment_monthly: 100,
    subscriptions_monthly: 50,
    phone_bill: 80,
    random_spending: 100,
    owns_car: false,
    car_payment: 0,
    car_insurance: 0,
    transportation_monthly: 100,
    goes_out_weekends: false,
    travels_occasionally: false,
    social_lifestyle: false,
    target_city: '',
    living_situation: 'alone',
    apartment_type: '1br',
  });

  const steps = [
    { component: IncomeStep },
    { component: SpendingStep },
    { component: TransportStep },
    { component: LifestyleStep },
    { component: MoveOutStep },
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateResults = () => {
    const lifestyleSpending =
      ((formData.eating_out_weekly || 0) * 15 * 4) +
      ((formData.coffee_snacks_weekly || 0) * 6 * 4) +
      (formData.shopping_monthly || 0) +
      (formData.entertainment_monthly || 0) +
      (formData.subscriptions_monthly || 0) +
      (formData.phone_bill || 0) +
      (formData.random_spending || 0);

    const carCosts = formData.owns_car
      ? (formData.car_payment || 0) +
        (formData.car_insurance || 0) +
        (formData.transportation_monthly || 0)
      : (formData.transportation_monthly || 0);

    const lifestyleAddons =
      (formData.goes_out_weekends ? 300 : 0) +
      (formData.travels_occasionally ? 200 : 0) +
      (formData.social_lifestyle ? 150 : 0);

    const city = formData.target_city || 'Other';
    const apt = formData.apartment_type || '1br';
    const baseRent = RENT_ESTIMATES[city]?.[apt] || RENT_ESTIMATES.Other[apt];
    const rent =
      formData.living_situation === 'roommate'
        ? Math.round(baseRent * 0.55)
        : formData.living_situation === 'partner'
        ? Math.round(baseRent * 0.5)
        : baseRent;

    const utilities = 150;
    const internet = 60;
    const groceries = 400;
    const rentersInsurance = 20;
    const emergencyBuffer = 100;

    const totalLivingCosts =
      rent + utilities + internet + groceries + rentersInsurance + emergencyBuffer;

    const totalMonthlyExpenses =
      lifestyleSpending + carCosts + lifestyleAddons + totalLivingCosts;

    const monthlySurplus = (formData.monthly_income || 0) - totalMonthlyExpenses;

    let survivalMonths =
      monthlySurplus >= 0
        ? Infinity
        : Math.max(0, (formData.current_savings || 0) / Math.abs(monthlySurplus));

    let score = 50;
    if ((formData.monthly_income || 0) >= totalMonthlyExpenses * 1.3) score += 20;
    else if ((formData.monthly_income || 0) >= totalMonthlyExpenses) score += 10;
    else score -= 20;

    if ((formData.current_savings || 0) >= totalMonthlyExpenses * 6) score += 15;
    else if ((formData.current_savings || 0) >= totalMonthlyExpenses * 3) score += 10;
    else score -= 10;

    score = Math.max(0, Math.min(100, score));

    return {
      totalMonthlyExpenses,
      monthlySurplus,
      survivalMonths,
      readinessScore: Math.round(score),
    };
  };

  if (!started) return <HeroSection onStart={() => setStarted(true)} />;

  if (showResults) {
    const results = calculateResults();

    if (!isPremium) {
      return (
        <ResultsLocked
          readinessScore={results.readinessScore}
          onUpgrade={() =>
            (window.location.href =
              "https://buy.stripe.com/YOUR_STRIPE_LINK?premium=true")
          }
        />
      );
    }

    return <ResultsPage results={results} data={formData} onRestart={() => window.location.reload()} />;
  }

  const Step = steps[currentStep].component;

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <ProgressBar currentStep={currentStep} totalSteps={steps.length} />

      <AnimatePresence mode="wait">
        <Step key={currentStep} data={formData} onChange={handleChange} />
      </AnimatePresence>

      <div className="flex justify-between mt-8">
        <Button onClick={() => setCurrentStep(p => Math.max(0, p - 1))} disabled={currentStep === 0}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button onClick={() => currentStep === steps.length - 1 ? setShowResults(true) : setCurrentStep(p => p + 1)}>
          {currentStep === steps.length - 1 ? 'See Results' : 'Continue'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
