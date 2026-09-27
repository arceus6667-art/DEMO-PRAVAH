import React, { useState } from 'react';
import { usePravahState } from '../hooks/usePravahState';
import { useTranslations } from '../hooks/useTranslations';
import { DEMO_USERS } from '../data/mockData';
import { UserRole } from '../types/auth';
import { PravahLogo } from './PravahLogo';
import {
  Sparkles,
  Search,
  Bell,
  ChevronDown,
  Play,
  RotateCcw,
  Languages
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentRole,
    setCurrentRole,
    currentLanguage,
    setCurrentLanguage,
    project,
    notifications,
    markNotificationRead,
    setIsCopilotOpen,
    setIsSearchOpen,
    setIsDemoModalOpen,
    setActiveTab,
    resetAllDemoState
  } = usePravahState();

  const { t } = useTranslations();
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  const currentUser = DEMO_USERS[currentRole] || DEMO_USERS.INVESTOR;
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      <div className="h-16 px-4 md:px-6 flex items-center justify-between gap-4">
        {/* Brand & Project Info */}
        <div className="flex items-center gap-4">
          <div
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <PravahLogo variant="horizontal" size="md" />
          </div>

          <div className="h-6 w-px bg-slate-200 hidden lg:block"></div>

          {/* Project Details */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-600">
            <span className="font-semibold text-slate-800">{project.organisation}</span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-500 font-mono text-[11px]">Chakan Phase II, Pune</span>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-sm hidden md:block">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-400 pl-3 pr-3 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2 truncate">
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="text-slate-500 truncate">{t('searchPlaceholder', 'Search approvals, rules, documents (⌘K)')}</span>
            </div>
            <kbd className="font-mono text-[10px] text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded ml-2">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Actions & Switchers */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50 text-xs font-medium text-slate-600">
            <Languages className="w-3.5 h-3.5 text-slate-400 mx-1.5 hidden sm:block" />
            <button
              onClick={() => setCurrentLanguage('en')}
              className={`px-2 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                currentLanguage === 'en'
                  ? 'bg-[#1E3A8A] text-white font-bold shadow-2xs'
                  : 'hover:text-slate-900'
              }`}
              title="Switch to English"
            >
              EN
            </button>
            <button
              onClick={() => setCurrentLanguage('mr')}
              className={`px-2 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                currentLanguage === 'mr'
                  ? 'bg-[#1E3A8A] text-white font-bold shadow-2xs'
                  : 'hover:text-slate-900'
              }`}
              title="मराठीमध्ये बदला"
            >
              मराठी
            </button>
            <button
              onClick={() => setCurrentLanguage('hi')}
              className={`px-2 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                currentLanguage === 'hi'
                  ? 'bg-[#1E3A8A] text-white font-bold shadow-2xs'
                  : 'hover:text-slate-900'
              }`}
              title="हिन्दी में बदलें"
            >
              हिन्दी
            </button>
            <button
              onClick={() => setCurrentLanguage('gu')}
              className={`px-2 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                currentLanguage === 'gu'
                  ? 'bg-[#1E3A8A] text-white font-bold shadow-2xs'
                  : 'hover:text-slate-900'
              }`}
              title="ગુજરાતીમાં બદલો"
            >
              ગુજરાતી
            </button>
          </div>

          {/* Guided Demo Button */}
          <button
            onClick={() => setIsDemoModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            <Play className="w-3 h-3 text-blue-600 fill-current" />
            <span>{t('demoScenarioButton', 'Demo Tour')}</span>
          </button>

          {/* Copilot Button */}
          <button
            onClick={() => setIsCopilotOpen(true)}
            className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">{t('copilotButton', 'Copilot')}</span>
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifDropdown(!showNotifDropdown)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 relative transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full" />
              )}
            </button>

            {showNotifDropdown && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-xl shadow-lg p-3 z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-900">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-medium text-slate-500">
                      {unreadCount} unread
                    </span>
                  )}
                </div>
                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto mt-2">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        markNotificationRead(notif.id);
                        if (notif.actionURL) setActiveTab(notif.actionURL as any);
                        setShowNotifDropdown(false);
                      }}
                      className={`py-2 px-1.5 hover:bg-slate-50 cursor-pointer rounded transition-colors ${
                        !notif.read ? 'bg-blue-50/40' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1">
                        <span className="text-xs font-semibold text-slate-900 leading-tight">
                          {notif.title}
                        </span>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap">
                          {notif.createdAt}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                        {notif.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200 cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-white text-xs font-bold">
                {currentUser.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-semibold text-slate-800 leading-none">
                  {currentUser.name}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  {currentRole === 'INVESTOR' ? t('roleInvestor', 'Investor') : currentRole === 'OFFICER' ? t('roleOfficer', 'Officer') : t('roleAdmin', 'Admin')}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-lg p-2 z-50 animate-in fade-in zoom-in-95">
                <div className="p-2 border-b border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Switch Operating Role
                  </span>
                </div>
                <div className="py-1">
                  {(['INVESTOR', 'OFFICER', 'ADMIN'] as UserRole[]).map((role) => {
                    const u = DEMO_USERS[role];
                    const isSelected = currentRole === role;
                    return (
                      <button
                        key={role}
                        onClick={() => {
                          setCurrentRole(role);
                          if (role === 'OFFICER') setActiveTab('officer-center');
                          else if (role === 'ADMIN') setActiveTab('admin-governance');
                          else setActiveTab('overview');
                          setShowRoleDropdown(false);
                        }}
                        className={`w-full text-left p-2 rounded-lg flex items-center justify-between text-xs transition-colors cursor-pointer ${
                          isSelected ? 'bg-blue-50 text-blue-900 font-semibold' : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div>
                          <div>{u.name}</div>
                          <div className="text-[10px] text-slate-400 font-normal">{role}</div>
                        </div>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                      </button>
                    );
                  })}
                </div>
                <div className="pt-2 border-t border-slate-100 mt-1">
                  <button
                    onClick={() => {
                      resetAllDemoState();
                      setShowRoleDropdown(false);
                    }}
                    className="w-full text-left p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-50 text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Prototype State</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
