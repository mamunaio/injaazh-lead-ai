import React from 'react';
import clsx from 'clsx';

interface PasswordStrengthMeterProps {
  password: string;
}

export function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  let score = 0;
  if (password.length > 0) {
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
  }

  const getScoreColor = () => {
    switch (score) {
      case 0: return 'bg-border';
      case 1: return 'bg-red-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-green-400';
      case 4: return 'bg-green-500';
      default: return 'bg-border';
    }
  };

  const getLabel = () => {
    if (password.length === 0) return 'Too short';
    switch (score) {
      case 1: return 'Weak';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Strong';
      default: return 'Too short';
    }
  };

  return (
    <div className="mt-2">
      <div className="flex gap-1.5 h-1.5 mb-1.5">
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className={clsx(
              "flex-1 rounded-full transition-colors",
              score >= index ? getScoreColor() : "bg-secondary/30"
            )}
          />
        ))}
      </div>
      <p className="text-xs font-medium text-secondary-foreground text-right">
        {getLabel()}
      </p>
    </div>
  );
}
