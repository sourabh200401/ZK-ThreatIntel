import React from 'react';
import { TrendingUp, Shield, AlertCircle, Activity, Users, Database, Lock } from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    { name: 'Active Threats', value: '1,247', change: '+12%', icon: AlertCircle, color: 'text-red-400' },
    { name: 'ZK Proofs Verified', value: '8,521', change: '+28%', icon: Lock, color: 'text-cyan-400' },
    { name: 'Intelligence Queries', value: '15,892', change: '+18%', icon: Database, color: 'text-blue-400' },
    { name: 'Threat Analysts', value: '324', change: '+5%', icon: Users, color: 'text-green-400' },
  ];

  const recentActivity = [
    { type: 'threat', message: 'New APT group IOCs submitted via ZK proof', time: '2 min ago', severity: 'high' },
    { type: 'query', message: 'Anonymous threat query matched 3 indicators', time: '5 min ago', severity: 'medium' },
    { type: 'proof', message: 'Zero knowledge proof verified for domain reputation', time: '8 min ago', severity: 'info' },
    { type: 'threat', message: 'Malware family classification updated', time: '12 min ago', severity: 'low' },
    { type: 'query', message: 'Private hash lookup completed successfully', time: '15 min ago', severity: 'info' },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-2xl p-8 border border-slate-600/50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Threat Intelligence Overview</h2>
            <p className="text-slate-300 text-lg max-w-2xl">
              Monitor, analyze, and share threat intelligence while maintaining privacy through zero knowledge proofs.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-cyan-500/20 rounded-full">
              <Shield className="w-8 h-8 text-cyan-400" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">99.7%</div>
              <div className="text-sm text-slate-400">System Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">{stat.name}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-slate-700/50 ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-sm text-green-400">{stat.change}</span>
                <span className="text-sm text-slate-400 ml-2">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Activity Feed & Threat Level */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
            <Activity className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.severity === 'high' ? 'bg-red-400' :
                  activity.severity === 'medium' ? 'bg-amber-400' :
                  activity.severity === 'low' ? 'bg-green-400' : 'bg-blue-400'
                }`} />
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.message}</p>
                  <p className="text-slate-400 text-xs mt-1">{activity.time}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  activity.severity === 'high' ? 'bg-red-400/20 text-red-300' :
                  activity.severity === 'medium' ? 'bg-amber-400/20 text-amber-300' :
                  activity.severity === 'low' ? 'bg-green-400/20 text-green-300' : 'bg-blue-400/20 text-blue-300'
                }`}>
                  {activity.severity.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Threat Level Gauge */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-xl font-semibold text-white mb-6">Global Threat Level</h3>
          <div className="relative w-32 h-32 mx-auto mb-6">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="rgb(51, 65, 85)" strokeWidth="8" fill="none" />
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                stroke="rgb(239, 68, 68)" 
                strokeWidth="8" 
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${75 * 2.51} ${100 * 2.51}`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">HIGH</div>
                <div className="text-sm text-slate-400">75/100</div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-300 text-sm">APT Activity</span>
              <span className="text-red-400 font-medium">Critical</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300 text-sm">Malware Campaigns</span>
              <span className="text-amber-400 font-medium">Elevated</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300 text-sm">Phishing Attempts</span>
              <span className="text-green-400 font-medium">Normal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;