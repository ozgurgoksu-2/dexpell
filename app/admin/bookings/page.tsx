'use client';

import * as React from 'react';
import { AdminLayout } from '@/components/admin/admin-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Package, 
  RefreshCw,
  Search,
  Filter,
  MapPin,
  Calendar,
  DollarSign,
  Truck,
  CheckCircle,
  Clock,
  AlertTriangle,
  Eye,
  Download
} from 'lucide-react';

interface Booking {
  id: string;
  booking_number: string;
  customer_name: string;
  customer_tc: string;
  customer_contact: string;
  customer_email?: string;
  route: string;
  destination: string;
  receiver_name: string;
  carrier: string;
  chargeable_weight: number;
  price: number;
  content_description: string;
  status: 'confirmed' | 'in_transit' | 'delivered' | 'cancelled';
  tracking_number: string;
  booking_date: string;
  estimated_delivery?: string;
  created_from_request_id: string;
}

export default function BookingsPage() {
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<string>('all');

  React.useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Fetch accepted form submissions (these are our bookings)
      const response = await fetch('/api/admin/form-submissions?pageSize=1000');
      const data = await response.json();
      
      if (response.ok) {
        const allSubmissions = data.submissions || [];
        
        // Convert accepted submissions to bookings
        const confirmedBookings = allSubmissions
          .filter((submission: any) => submission.status === 'accepted')
          .map((submission: any) => ({
            id: submission.id,
            booking_number: `BK-${submission.id.slice(0, 8).toUpperCase()}`,
            customer_name: submission.sender_name,
            customer_tc: submission.sender_tc,
            customer_contact: submission.sender_contact,
            customer_email: submission.user_email,
            route: `Turkey → ${submission.destination}`,
            destination: submission.destination,
            receiver_name: submission.receiver_name,
            carrier: determineCarrier(submission.destination), // Logic to assign carrier
            chargeable_weight: estimateWeight(submission.content_value),
            price: parseFloat(submission.content_value),
            content_description: submission.content_description,
            status: 'confirmed' as const,
            tracking_number: `TRK-${submission.id.slice(0, 8).toUpperCase()}`,
            booking_date: submission.created_at,
            estimated_delivery: calculateEstimatedDelivery(submission.destination),
            created_from_request_id: submission.id
          }));
        
        setBookings(confirmedBookings);
      } else {
        setError(data.error || 'Failed to load bookings');
      }
    } catch (error) {
      console.error('Error loading bookings:', error);
      setError('Failed to connect to database');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper functions
  const determineCarrier = (destination: string): string => {
    const dest = destination.toLowerCase();
    if (dest.includes('germany') || dest.includes('france') || dest.includes('europe')) {
      return 'DHL Express';
    } else if (dest.includes('usa') || dest.includes('america')) {
      return 'UPS Worldwide';
    } else if (dest.includes('spain') || dest.includes('italy')) {
      return 'Aramex International';
    }
    return 'DHL Express'; // Default
  };

  const estimateWeight = (value: string): number => {
    // Simple estimation: higher value items tend to be lighter per dollar
    const val = parseFloat(value);
    return Math.round((val / 25) * 10) / 10; // Rough estimation
  };

  const calculateEstimatedDelivery = (destination: string): string => {
    const today = new Date();
    const dest = destination.toLowerCase();
    let daysToAdd = 5; // Default
    
    if (dest.includes('germany') || dest.includes('france')) {
      daysToAdd = 3;
    } else if (dest.includes('usa') || dest.includes('america')) {
      daysToAdd = 7;
    } else if (dest.includes('spain') || dest.includes('italy')) {
      daysToAdd = 4;
    }
    
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + daysToAdd);
    return deliveryDate.toISOString();
  };

  // Filter bookings
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.receiver_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.booking_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.tracking_number.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    in_transit: bookings.filter(b => b.status === 'in_transit').length,
    delivered: bookings.filter(b => b.status === 'delivered').length,
    totalRevenue: bookings.reduce((sum, b) => sum + b.price, 0)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'in_transit':
        return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      case 'delivered':
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'cancelled':
        return 'bg-red-500/10 text-red-600 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return CheckCircle;
      case 'in_transit':
        return Truck;
      case 'delivered':
        return CheckCircle;
      case 'cancelled':
        return AlertTriangle;
      default:
        return Clock;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
            <p className="text-muted-foreground">
              Confirmed shipments and booking management
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" onClick={loadBookings}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                All confirmed bookings
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
              <CheckCircle className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.confirmed}</div>
              <p className="text-xs text-muted-foreground">
                Ready for shipping
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Transit</CardTitle>
              <Truck className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.in_transit}</div>
              <p className="text-xs text-muted-foreground">
                Currently shipping
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delivered</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.delivered}</div>
              <p className="text-xs text-muted-foreground">
                Successfully delivered
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                From all bookings
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search bookings, customer, tracking..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-background"
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="in_transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Bookings Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Bookings</CardTitle>
            <CardDescription>
              Confirmed bookings with detailed shipping information ({filteredBookings.length} of {bookings.length})
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <RefreshCw className="animate-spin h-8 w-8 mx-auto mb-2" />
                  <p className="text-muted-foreground">Loading bookings...</p>
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-500 mb-2">{error}</p>
                <Button onClick={loadBookings}>
                  Try Again
                </Button>
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  {searchTerm || statusFilter !== 'all' ? 'No bookings found matching your filters' : 'No confirmed bookings yet'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Booking #</th>
                      <th className="text-left p-3 font-medium">Customer</th>
                      <th className="text-left p-3 font-medium">Route</th>
                      <th className="text-left p-3 font-medium">Carrier</th>
                      <th className="text-left p-3 font-medium">Weight</th>
                      <th className="text-left p-3 font-medium">Price</th>
                      <th className="text-left p-3 font-medium">Status</th>
                      <th className="text-left p-3 font-medium">Date</th>
                      <th className="text-left p-3 font-medium">Tracking</th>
                      <th className="text-left p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((booking) => {
                      const StatusIcon = getStatusIcon(booking.status);
                      return (
                        <tr key={booking.id} className="border-b hover:bg-muted/50">
                          <td className="p-3">
                            <div className="font-medium">{booking.booking_number}</div>
                          </td>
                          <td className="p-3">
                            <div>
                              <div className="font-medium">{booking.customer_name}</div>
                              <div className="text-sm text-muted-foreground">{booking.customer_contact}</div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3 text-muted-foreground" />
                              <span className="text-sm">{booking.route}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">To: {booking.receiver_name}</div>
                          </td>
                          <td className="p-3">
                            <div className="text-sm">{booking.carrier}</div>
                          </td>
                          <td className="p-3">
                            <div className="text-sm">{booking.chargeable_weight} kg</div>
                          </td>
                          <td className="p-3">
                            <div className="font-medium">${booking.price.toFixed(2)}</div>
                          </td>
                          <td className="p-3">
                            <Badge className={getStatusColor(booking.status)}>
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {booking.status}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3 text-muted-foreground" />
                              <span className="text-sm">
                                {new Date(booking.booking_date).toLocaleDateString()}
                              </span>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="text-xs text-muted-foreground font-mono">
                              {booking.tracking_number}
                            </div>
                          </td>
                          <td className="p-3">
                            <Button variant="outline" size="sm">
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
