import { useLocalization } from '../context/LocalizationContext';
export { StatusChip } from '../components/StatusChip';

export const useTranslations = () => {
  const {
    t,
    language,
    currentLanguage,
    setLanguage,
    setCurrentLanguage,
    getStatusLabel,
    getStatusBadgeProps,
    supportedLanguages
  } = useLocalization();

  return {
    t,
    language,
    currentLanguage,
    setLanguage,
    setCurrentLanguage,
    getStatusLabel,
    getStatusBadgeProps,
    supportedLanguages
  };
};
