import { Link } from 'react-router-dom';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <div className="mb-10">
          <h1 className="text-3xl font-bold font-display mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your website content and settings</p>
        </div>

        <div className="card-grid gap-md">
          {/* Bookings Management Card */}
          <div className="bg-card rounded-2xl border border-border p-8">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
              <Calendar className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-xl font-bold mb-2 font-display">Bookings</h2>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              View and manage all session bookings and client requests.
            </p>
            <Link to="/admin/bookings">
              <Button variant="default" className="w-full">
                View Bookings
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
