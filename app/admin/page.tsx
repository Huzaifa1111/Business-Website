import { Card } from "@/components/ui/Card";

export default function AdminDashboardPage() {
  const stats = [
    { label: "Total Pages", value: "4", trend: "+1 this month", icon: "📄" },
    { label: "Services Offered", value: "6", trend: "No change", icon: "⚙️" },
    { label: "Team Members", value: "4", trend: "+1 this year", icon: "👥" },
    { label: "Unread Messages", value: "12", trend: "3 new today", icon: "✉️", alert: true },
  ];

  const activities = [
    { id: 1, action: "Updated SEO Metadata", target: "Home Page", user: "Admin User", time: "2 hours ago" },
    { id: 2, action: "Added new Service", target: "Market Expansion", user: "Admin User", time: "1 day ago" },
    { id: 3, action: "Updated Office Hours", target: "Contact Page", user: "Admin User", time: "3 days ago" },
    { id: 4, action: "Modified Testimonial", target: "Sarah Mitchell", user: "Admin User", time: "1 week ago" },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Welcome Section */}
      <div>
        <h2 className="text-2xl font-bold text-neutral-900 font-display mb-1">
          Welcome back, Admin
        </h2>
        <p className="text-neutral-500">
          Here is what's happening with your website today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="flex flex-col gap-4 p-5">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-lg">
                {stat.icon}
              </div>
              {stat.alert && (
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              )}
            </div>
            
            <div>
              <p className="text-sm font-medium text-neutral-500 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-neutral-900">{stat.value}</p>
            </div>
            
            <div className="mt-auto pt-4 border-t border-neutral-100">
              <p className="text-xs font-medium text-neutral-400">{stat.trend}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-neutral-900">Recent Activity</h3>
              <button className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">
                View All
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-neutral-500 uppercase bg-neutral-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 rounded-l-lg font-medium">Action</th>
                    <th scope="col" className="px-4 py-3 font-medium">Target</th>
                    <th scope="col" className="px-4 py-3 font-medium">User</th>
                    <th scope="col" className="px-4 py-3 rounded-r-lg font-medium text-right">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity) => (
                    <tr key={activity.id} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50 transition-colors">
                      <td className="px-4 py-4 font-medium text-neutral-900">{activity.action}</td>
                      <td className="px-4 py-4 text-neutral-600">{activity.target}</td>
                      <td className="px-4 py-4 text-neutral-600">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-[10px] font-bold">
                            A
                          </div>
                          {activity.user}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-neutral-500 text-right whitespace-nowrap">{activity.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <h3 className="text-lg font-bold text-neutral-900 mb-6">Quick Actions</h3>
            
            <div className="flex flex-col gap-3">
              {[
                { label: "Edit Home Page", icon: "🏠", href: "/admin/home" },
                { label: "Add New Service", icon: "✨", href: "/admin/services/new" },
                { label: "Update Contact Info", icon: "📞", href: "/admin/contact" },
                { label: "Check SEO Meta", icon: "🔍", href: "/admin/seo" },
              ].map((action, i) => (
                <a
                  key={i}
                  href={action.href}
                  className="flex items-center gap-3 p-3 rounded-xl border border-neutral-100 hover:border-primary-200 hover:bg-primary-50 text-neutral-700 hover:text-primary-700 transition-all group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-neutral-100 group-hover:bg-white flex items-center justify-center text-lg transition-colors">
                    {action.icon}
                  </div>
                  <span className="font-medium text-sm">{action.label}</span>
                  <svg 
                    className="ml-auto w-4 h-4 text-neutral-400 group-hover:text-primary-500 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
