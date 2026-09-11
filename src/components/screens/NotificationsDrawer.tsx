import React, { useEffect } from 'react';
import { X, Bell, Check, Trash2 } from 'lucide-react';
import { NotificationItem } from '../../types';

interface NotificationsDrawerProps {
  notifications: NotificationItem[];
  onClose: () => void;
  onMarkAllAsRead: () => void;
  onClearNotifications: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  notifications,
  onClose,
  onMarkAllAsRead,
  onClearNotifications,
}) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div role="dialog" aria-modal="true" aria-labelledby="notifications-title" className="bg-[#F8F9FA] w-full max-w-xs sm:max-w-sm h-full shadow-2xl flex flex-col justify-between border-l border-slate-200">
        {/* Top Header */}
        <div className="p-4 bg-white border-b border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#0F8B75]" />
            <h2 id="notifications-title" className="text-sm font-extrabold text-slate-900">Notifications</h2>
          </div>

          <button
            onClick={onClose}
            id="btn-close-notifs"
            aria-label="Close notifications"
            className="p-1 rounded-full text-slate-500 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400 space-y-1">
              <p className="font-bold">No notifications</p>
              <p>You're all caught up!</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-3 rounded-2xl border transition-all space-y-1 ${
                  notif.read
                    ? 'bg-white border-slate-200/70 opacity-75'
                    : 'bg-emerald-50/50 border-emerald-200/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900">{notif.title}</h3>
                  <span className="text-[10px] text-slate-400">{notif.time}</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">{notif.message}</p>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-between text-xs">
          <button
            onClick={onMarkAllAsRead}
            disabled={notifications.length === 0 || notifications.every((notification) => notification.read)}
            id="btn-mark-all-read"
            className="text-[#0F8B75] font-bold hover:underline flex items-center gap-1 disabled:cursor-not-allowed disabled:opacity-40 disabled:no-underline"
          >
            <Check className="w-3.5 h-3.5" /> Mark all read
          </button>

          <button
            onClick={onClearNotifications}
            disabled={notifications.length === 0}
            id="btn-clear-notifs"
            className="text-slate-400 hover:text-rose-600 transition-colors flex items-center gap-1 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear
          </button>
        </div>
      </div>
    </div>
  );
};
