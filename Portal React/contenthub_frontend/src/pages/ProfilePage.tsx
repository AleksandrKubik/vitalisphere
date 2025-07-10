import { useState, useEffect } from 'react';
import { Check, X, Loader, User, Calendar, CreditCard, Package, Clock, DollarSign, Award, Info } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import VideoShortsList from '../components/video/VideoShortsList';
import TrackList from '../components/music/TrackList';

// Profile types
interface UserProfile {
  id: number;
  name: string;
  email: string;
  roles: string[];
  settings: {
    theme: string;
    language: string;
    notifications_enabled: boolean;
  };
  subscription: {
    id?: number;
    status?: string;
    end_date?: string;
    has_active_subscription: boolean;
    plan?: {
      id: number;
      name: string;
      description: string;
      price: number | string;
      duration_days: number;
      features: string[];
    };
  };
}

interface SubscriptionPlan {
  id: number;
  name: string;
  description: string;
  price: number;
  duration_days: number;
  features: string[];
}

const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [subscriptionLoading, setSubscriptionLoading] = useState<boolean>(false);
  const [plan, setPlan] = useState<SubscriptionPlan | null>(null);

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get(`/api/users/${user.id}/profile`);
        setProfile(response.data.user);
        
        // If user has an active subscription, fetch the plan details
        if (response.data.user.subscription.has_active_subscription && response.data.user.subscription.id) {
          try {
            const subscriptionResponse = await axios.get(`/api/users/${user.id}/subscriptions`);
            if (subscriptionResponse.data.active_subscription) {
              const updatedProfile = {
                ...response.data.user,
                subscription: {
                  ...response.data.user.subscription,
                  plan: subscriptionResponse.data.active_subscription.plan
                }
              };
              setProfile(updatedProfile);
            }
          } catch (err) {
            console.error('Error fetching subscription details:', err);
          }
        }
        
        // Fetch available plan from API
        try {
          const plansResponse = await axios.get('/api/subscription-plans');
          if (plansResponse.data.default_plan) {
            setPlan(plansResponse.data.default_plan);
          }
        } catch (err) {
          console.error('Error fetching subscription plans:', err);
          
          // Fallback to hardcoded plan if API fails
          setPlan({
            id: 1, // This will be overridden by the API response
            name: 'ContentHub Premium',
            description: 'Full access to all ContentHub features and content.',
            price: 49.99,
            duration_days: 30,
            features: [
              'Unlimited access to all articles',
              'Unlimited access to all videos',
              'Unlimited access to all music',
              'Unlimited access to all courses',
              'Unlimited access to all games',
              'Ad-free experience',
              'Premium support',
              'Cancel anytime'
            ]
          });
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [user]);

  // Subscription activation handler
  const handleActivateSubscription = async () => {
    if (!user || !plan) return;
    
    setSubscriptionLoading(true);
    
    try {
      // Use the plan ID from the API response
      const response = await axios.post('/api/subscriptions', {
        plan_id: plan.id, // Dynamic plan ID from API
      });
      
      // Update profile with new subscription data
      if (profile) {
        setProfile({
          ...profile,
          subscription: {
            ...response.data.subscription,
            has_active_subscription: true,
            plan: plan
          },
        });
      }
    } catch (err) {
      console.error('Error activating subscription:', err);
      setError('Failed to activate subscription. Please try again.');
    } finally {
      setSubscriptionLoading(false);
    }
  };

  // Subscription cancellation handler
  const handleCancelSubscription = async () => {
    if (!profile?.subscription.id) return;
    
    setSubscriptionLoading(true);
    
    try {
      await axios.delete(`/api/subscriptions/${profile.subscription.id}`);
      
      // Update profile with cancelled subscription
      if (profile) {
        setProfile({
          ...profile,
          subscription: {
            ...profile.subscription,
            status: 'cancelled',
            has_active_subscription: false,
          },
        });
      }
    } catch (err) {
      console.error('Error cancelling subscription:', err);
      setError('Failed to cancel subscription. Please try again.');
    } finally {
      setSubscriptionLoading(false);
    }
  };

  // Helper function to format price safely
  const formatPrice = (price: number | string | undefined): string => {
    if (price === undefined) return '0.00';
    
    if (typeof price === 'number') {
      return price.toFixed(2);
    }
    
    // If it's a string, try to convert to number first
    const numPrice = parseFloat(price.toString());
    if (!isNaN(numPrice)) {
      return numPrice.toFixed(2);
    }
    
    return '0.00';
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <div className="text-red-500 mb-4">
            <X className="h-16 w-16 mx-auto" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Error Loading Profile</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No profile data
  if (!profile) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
          <p className="text-gray-600 mb-6">Unable to load profile information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
              <User className="h-8 w-8 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{profile?.name || 'Loading...'}</h1>
              <p className="text-indigo-100">{profile?.email || ''}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto max-w-6xl px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4 dark:text-white">Account Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-indigo-600 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium dark:text-white">Member Since</h3>
                    <p className="text-sm text-gray-600 dark:text-slate-400">April 2023</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-indigo-600 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium dark:text-white">Current Plan</h3>
                    <p className="text-sm text-gray-600 dark:text-slate-400">
                      {profile?.subscription?.has_active_subscription
                        ? profile?.subscription?.plan?.name || 'Premium'
                        : 'Free Trial'}
                    </p>
                  </div>
                </div>
                
                {profile?.subscription?.has_active_subscription && (
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-indigo-600 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium dark:text-white">Next Billing Date</h3>
                      <p className="text-sm text-gray-600 dark:text-slate-400">
                        {profile?.subscription?.end_date 
                          ? new Date(profile.subscription.end_date).toLocaleDateString()
                          : 'Not available'}
                      </p>
                    </div>
                    </div>
                  )}
                </div>
                
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
                <h2 className="text-lg font-semibold mb-4 dark:text-white">Preferences</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input type="checkbox" className="sr-only" checked={profile?.settings?.notifications_enabled || false} readOnly />
                        <div className={`block w-10 h-6 rounded-full transition ${profile?.settings?.notifications_enabled ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-slate-700'}`}></div>
                        <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${profile?.settings?.notifications_enabled ? 'translate-x-4' : ''}`}></div>
                      </div>
                      <span className="ml-3 text-sm font-medium dark:text-white">Email Notifications</span>
                    </label>
                  </div>
                  
                      <div>
                    <h3 className="text-sm font-medium mb-2 dark:text-white">Theme Preference</h3>
                    <div className="flex gap-2">
                      <button className={`px-3 py-1 text-xs rounded-full ${profile?.settings?.theme === 'light' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800 dark:bg-slate-700 dark:text-white'}`}>
                        Light
                      </button>
                      <button className={`px-3 py-1 text-xs rounded-full ${profile?.settings?.theme === 'dark' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800 dark:bg-slate-700 dark:text-white'}`}>
                        Dark
                      </button>
                      <button className={`px-3 py-1 text-xs rounded-full ${profile?.settings?.theme === 'system' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800 dark:bg-slate-700 dark:text-white'}`}>
                        System
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Subscription Card */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-4">
                <h2 className="text-white font-semibold flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  {profile?.subscription?.has_active_subscription ? 'Active Subscription' : 'Subscription Options'}
                </h2>
              </div>
              
              <div className="p-6">
                {profile?.subscription?.has_active_subscription ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium dark:text-white">Plan</span>
                      <span className="text-sm dark:text-slate-300">{profile?.subscription?.plan?.name || 'Premium'}</span>
                          </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium dark:text-white">Price</span>
                      <span className="text-sm dark:text-slate-300">
                        ${formatPrice(profile?.subscription?.plan?.price)}/month
                      </span>
                      </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium dark:text-white">Status</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                        Active
                      </span>
                    </div>
                    
                    <div className="pt-4">
                      <button
                        onClick={handleCancelSubscription}
                        disabled={subscriptionLoading}
                        className="w-full px-4 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 dark:text-red-400 dark:border-red-900 dark:hover:bg-slate-700 transition-colors"
                      >
                        {subscriptionLoading ? 'Processing...' : 'Cancel Subscription'}
                      </button>
                        </div>
                          </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold mb-1 dark:text-white">{plan?.name || 'ContentHub Premium'}</h3>
                      <p className="text-sm text-gray-600 dark:text-slate-400">{plan?.description || 'Full access to all ContentHub features and content.'}</p>
                      <div className="mt-2 text-2xl font-bold text-indigo-600">${formatPrice(plan?.price)}/month</div>
                          </div>
                    
                    <div className="space-y-2">
                      {(plan?.features || [
                        'Unlimited access to all articles',
                        'Unlimited access to all videos',
                        'Unlimited access to all music',
                        'Unlimited access to all courses',
                        'Unlimited access to all games',
                        'Ad-free experience'
                      ]).map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm dark:text-slate-300">{feature}</span>
                        </div>
                      ))}
                      </div>
                    
                    <div className="pt-4">
                      <button 
                        onClick={handleActivateSubscription}
                        disabled={subscriptionLoading}
                        className="w-full px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        {subscriptionLoading ? (
                          <span className="flex items-center justify-center">
                            <Loader className="animate-spin h-4 w-4 mr-2" />
                            Processing...
                          </span>
                        ) : (
                          'Activate Subscription'
                        )}
                      </button>
                    </div>
                  </div>
                )}
                            </div>
                              </div>
                            </div>
                            
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Video Shorts */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold dark:text-white">Your Recent Video Shorts</h2>
                <a href="/videos/shorts" className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                  View All
                </a>
              </div>
              
              <VideoShortsList limit={4} />
                              </div>
            
            {/* Recent Music */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold dark:text-white">Recently Played Tracks</h2>
                <a href="/music" className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                  View All
                </a>
                              </div>
              
              <TrackList limit={5} showHeader={false} />
                            </div>
                            
            {/* API Access (for developers) */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <h2 className="text-lg font-semibold dark:text-white">API Access</h2>
                <div className="px-2 py-0.5 rounded text-xs bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
                  Developers
                              </div>
                          </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-white">Your API Key</label>
                  <div className="flex">
                    <input
                      type="text"
                      value="sk_live_xxxxxxxxxxxxxxxxxxxxx"
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-gray-50 text-sm dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300"
                    />
                    <button className="px-3 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700">
                      Copy
                        </button>
                  </div>
                </div>
                
                <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-slate-400 mt-2">
                  <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <p>This API key grants full access to your account. Keep it secure and never share it publicly.</p>
                </div>
                
                <div className="pt-2">
                  <a
                    href="/developer/docs"
                    className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                  >
                    View API Documentation
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Error state */}
      {error && (
        <div className="fixed bottom-4 right-4 px-4 py-3 bg-red-500 text-white rounded-lg shadow-lg">
          <div className="flex items-center gap-2">
            <X className="h-5 w-5" />
            <span>{error}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
