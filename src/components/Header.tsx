import { User } from '../App';
import { Button } from './ui/button';
import { Bell, LogOut, Sun } from 'lucide-react';
import { Badge } from './ui/badge';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  notificationCount?: number;
}

export function Header({ user, onLogout, notificationCount = 3 }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-400 p-2 rounded-lg">
              <Sun className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg">Solar Installation System</h1>
              <p className="text-xs text-muted-foreground capitalize">{user.role} Portal</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right mr-4">
              <p className="text-sm">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {notificationCount}
                </Badge>
              )}
            </Button>
            
            <Button variant="ghost" size="icon" onClick={onLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
