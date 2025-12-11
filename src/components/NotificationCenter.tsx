import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Bell, CheckCircle2, AlertCircle, Info, Clock } from 'lucide-react';
import { Badge } from './ui/badge';

interface NotificationCenterProps {
  onBack: () => void;
}

export function NotificationCenter({ onBack }: NotificationCenterProps) {
  const notifications = [
    {
      id: '1',
      type: 'success',
      title: 'Application Approved',
      message: 'Your solar installation application has been approved by CEB.',
      time: '2 hours ago',
      read: false,
    },
    {
      id: '2',
      type: 'info',
      title: 'Site Visit Scheduled',
      message: 'Your site visit is scheduled for Dec 15, 2025 at 10:00 AM.',
      time: '1 day ago',
      read: false,
    },
    {
      id: '3',
      type: 'warning',
      title: 'Payment Reminder',
      message: 'Authority fee payment of Rs 25,000 is due by Dec 20, 2025.',
      time: '2 days ago',
      read: false,
    },
    {
      id: '4',
      type: 'success',
      title: 'New Bid Received',
      message: 'Green Energy Lanka submitted a bid for Rs 655,000.',
      time: '3 days ago',
      read: true,
    },
    {
      id: '5',
      type: 'info',
      title: 'Document Verified',
      message: 'All your submitted documents have been verified successfully.',
      time: '5 days ago',
      read: true,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back
      </Button>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Notifications</CardTitle>
            <Button variant="ghost" size="sm">
              Mark all as read
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border ${
                  notification.read ? 'bg-white' : 'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">{getIcon(notification.type)}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className={!notification.read ? '' : 'text-muted-foreground'}>
                        {notification.title}
                      </h4>
                      {!notification.read && (
                        <Badge variant="default" className="ml-2">New</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{notification.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
