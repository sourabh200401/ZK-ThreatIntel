import React, { useState } from 'react';
import { Shield, Eye, Upload, BarChart3, Lock, Zap, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Dashboard from './components/Dashboard';
import ZKProofSystem from './components/ZKProofSystem';
import ThreatQuery from './components/ThreatQuery';
import ThreatSubmission from './components/ThreatSubmission';
import Analytics from './components/Analytics';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'zkproof', name: 'ZK Proofs', icon: Lock },
    { id: 'query', name: 'Private Query', icon: Eye },
    { id: 'submit', name: 'Submit Intel', icon: Upload },
    { id: 'analytics', name: 'Analytics', icon: Zap },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'zkproof':
        return <ZKProofSystem />;
      case 'query':
        return <ThreatQuery />;
      case 'submit':
        return <ThreatSubmission />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-cyan-500/20 rounded-lg">
                <Shield className="w-8 h-8 text-cyan-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">ZK-ThreatIntel</h1>
                <p className="text-sm text-slate-400">Zero Knowledge Threat Intelligence System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Secure Session</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-300">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>142 Active Threats</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-slate-800/30 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-cyan-400 text-cyan-400'
                      : 'border-transparent text-slate-300 hover:text-white hover:border-slate-500'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;