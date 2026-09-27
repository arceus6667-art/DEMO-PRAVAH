import React from 'react';
import { useLocalization } from '../context/LocalizationContext';
import { CheckCircle2, AlertTriangle, Clock, Sparkles, XCircle, ShieldCheck, HelpCircle } from 'lucide-react';

export interface StatusChipProps {
  status: string | undefined | null;
  size?: 'xs' | 'sm' | 'md';
  showDot?: boolean;
  showIcon?: boolean;
  className?: string;
  customLabel?: string;
}

export const StatusChip: React.FC<StatusChipProps> = ({
  status,
  size = 'sm',
  showDot = true,
  showIcon = false,
  className = '',
  customLabel
}) => {
  const { getStatusBadgeProps } = useLocalization();
  const { label, bgClass, borderClass, dotClass, variant } = getStatusBadgeProps(status);

  const displayLabel = customLabel || label;

  const sizeClasses = {
    xs: 'text-[9px] px-1.5 py-0.5 gap-1',
    sm: 'text-[10px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-1.5'
  }[size];

  const dotSizes = {
    xs: 'w-1 h-1',
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2'
  }[size];

  const iconSizes = {
    xs: 'w-2.5 h-2.5',
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5'
  }[size];

  // Optional icon renderer based on status variant
  const renderIcon = () => {
    if (!showIcon) return null;
    switch (variant) {
      case 'emerald':
        return <CheckCircle2 className={`${iconSizes} text-emerald-600 shrink-0`} />;
      case 'amber':
        return <AlertTriangle className={`${iconSizes} text-amber-600 shrink-0`} />;
      case 'red':
        return <XCircle className={`${iconSizes} text-red-600 shrink-0`} />;
      case 'purple':
        return <Sparkles className={`${iconSizes} text-purple-600 shrink-0`} />;
      case 'blue':
        return <Clock className={`${iconSizes} text-blue-600 shrink-0`} />;
      default:
        return <HelpCircle className={`${iconSizes} text-slate-500 shrink-0`} />;
    }
  };

  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full border ${bgClass} ${borderClass} ${sizeClasses} shadow-2xs transition-colors ${className}`}
      title={displayLabel}
    >
      {showDot && !showIcon && (
        <span
          className={`rounded-full shrink-0 ${dotSizes} ${dotClass} ${
            variant === 'red' || variant === 'amber' ? 'animate-pulse' : ''
          }`}
        />
      )}
      {renderIcon()}
      <span className="truncate">{displayLabel}</span>
    </span>
  );
};
