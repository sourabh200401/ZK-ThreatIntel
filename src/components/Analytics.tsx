import React from 'react';
import { TrendingUp, BarChart3, PieChart, Activity, Globe, Shield, AlertTriangle, Users } from 'lucide-react';

const Analytics: React.FC = () => {
  const threatStats = [
    { category: 'Malware', count: 1247, percentage: 35, trend: '+12%' },
    { category: 'Phishing', count: 892, percentage: 25, trend: '+8%' },
    { category: 'C2 Servers', count: 634, percentage: 18, trend: '+15%' },
    { category: 'APT Activity', count: 423, percentage: 12, trend: '+22%' },
    { category: 'Other', count: 356, percentage: 10, trend: '+5%' }
  ];

  const zkProofMetrics = [
    { label: 'Total Proofs Generated', value: '15,247', change: '+18%' },
    { label: 'Verification Success Rate', value: '99.2%', change: '+0.1%' },
    { label: 'Average Proof Time', value: '1.2s', change: '-15%' },
    { label: 'Privacy Preserved Queries', value: '8,521', change: '+25%' }
  ];

  const geographicData = [
    { region: 'North America', threats: 2341, color: 'bg-red-400' },
    { region: 'Europe', threats: 1897, color: 'bg-orange-400' },
    { region: 'Asia Pacific', threats: 1654, color: 'bg-amber-400' },
    { region: 'Latin America', threats: 678, color: 'bg-green-400' },
    { region: 'Middle East', threats: 432, color: 'bg-blue-400' },
    { region: 'Africa', threats: 298, color: 'bg-purple-400' }
  ];

  const topThreatActors = [
    { name: 'APT29', threats: 156, severity: 'Critical' },
    { name: 'Lazarus Group', threats: 134, severity: 'Critical' },
    { name: 'APT28', threats: 128, severity: 'High' },
    { name: 'FIN7', threats: 98, severity: 'High' },
    { name: 'Carbanak', threats: 76, severity: 'Medium' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Threat Intelligence Analytics</h2>
        <p className="text-slate-300 text-lg max-w-3xl mx-auto">
          Comprehensive analytics and insights from zero knowledge threat intelligence operations.
        </p>
      </div>

      {/* ZK Proof Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {zkProofMetrics.map((metric, index) => (
          <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <Shield className="w-8 h-8 text-cyan-400" />
              <div className="flex items-center text-sm text-green-400">
                <TrendingUp className="w-4 h-4 mr-1" />
                {metric.change}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white">{metric.value}</h3>
            <p className="text-slate-300 text-sm mt-1">{metric.label}</p>
          </div>
        ))}
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Threat Categories */}
        <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Threat Categories</h3>
            <PieChart className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-4">
            {threatStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{stat.category}</span>
                    <div className="flex items-center space-x-3">
                      <span className="text-slate-300 text-sm">{stat.count}</span>
                      <span className="text-green-400 text-sm">{stat.trend}</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${stat.percentage}%` }}
                    />
                  </div>
                  <div className="text-slate-400 text-xs mt-1">{stat.percentage}% of total</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Threat Actors */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">Top Threat Actors</h3>
            <Users className="w-5 h-5 text-slate-400" />
          </div>
          <div className="space-y-4">
            {topThreatActors.map((actor, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div>
                  <div className="text-white font-medium">{actor.name}</div>
                  <div className="text-slate-400 text-sm">{actor.threats} indicators</div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  actor.severity === 'Critical' ? 'bg-red-400/20 text-red-300' :
                  actor.severity === 'High' ? 'bg-orange-400/20 text-orange-300' :
                  'bg-amber-400/20 text-amber-300'
                }`}>
                  {actor.severity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Geographic Distribution */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Geographic Threat Distribution</h3>
          <Globe className="w-5 h-5 text-slate-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {geographicData.map((region, index) => (
            <div key={index} className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-medium">{region.region}</span>
                <span className="text-slate-300 text-sm">{region.threats}</span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-2 mb-2">
                <div
                  className={`${region.color} h-2 rounded-full transition-all duration-1000`}
                  style={{ width: `${(region.threats / 2341) * 100}%` }}
                />
              </div>
              <div className="text-slate-400 text-xs">
                {((region.threats / 2341) * 100).toFixed(1)}% of global threats
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Activity */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Real-time System Activity</h3>
          <Activity className="w-5 h-5 text-slate-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">47</div>
            <div className="text-slate-300 text-sm">Active Queries</div>
            <div className="text-green-400 text-xs mt-1">+12 this hour</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">23</div>
            <div className="text-slate-300 text-sm">ZK Proofs Being Verified</div>
            <div className="text-green-400 text-xs mt-1">+5 this hour</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-400 mb-2">156</div>
            <div className="text-slate-300 text-sm">New IOCs Submitted</div>
            <div className="text-green-400 text-xs mt-1">+28 this hour</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-400 mb-2">8</div>
            <div className="text-slate-300 text-sm">High-Priority Alerts</div>
            <div className="text-red-400 text-xs mt-1">+2 this hour</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;