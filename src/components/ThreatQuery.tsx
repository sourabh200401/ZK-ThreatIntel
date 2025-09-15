import React, { useState } from 'react';
import { Search, Eye, EyeOff, Hash, Globe, FileText, Shield, Clock, AlertTriangle } from 'lucide-react';

const ThreatQuery: React.FC = () => {
  const [queryType, setQueryType] = useState<'hash' | 'ip' | 'domain' | 'url'>('hash');
  const [queryValue, setQueryValue] = useState('');
  const [isPrivateQuery, setIsPrivateQuery] = useState(true);
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const queryTypes = [
    { id: 'hash', label: 'File Hash', icon: Hash, placeholder: 'SHA256, MD5, or SHA1 hash...' },
    { id: 'ip', label: 'IP Address', icon: Globe, placeholder: '192.168.1.1 or 2001:db8::1...' },
    { id: 'domain', label: 'Domain', icon: Globe, placeholder: 'example.com or subdomain.example.com...' },
    { id: 'url', label: 'URL', icon: FileText, placeholder: 'https://suspicious-site.com/path...' }
  ];

  const mockResults = {
    hash: [
      { 
        indicator: 'a4b3c2d1...', 
        type: 'SHA256', 
        threat: 'Trojan.Win32.Agent', 
        severity: 'high', 
        firstSeen: '2024-01-15',
        sources: 3,
        description: 'Banking trojan targeting financial institutions'
      },
      { 
        indicator: 'b5c4d3e2...', 
        type: 'MD5', 
        threat: 'PUA.Generic', 
        severity: 'medium', 
        firstSeen: '2024-01-10',
        sources: 1,
        description: 'Potentially unwanted application'
      }
    ],
    ip: [
      { 
        indicator: '192.168.1.100', 
        type: 'IPv4', 
        threat: 'C2 Server', 
        severity: 'critical', 
        firstSeen: '2024-01-20',
        sources: 5,
        description: 'Command and control server for APT group'
      }
    ],
    domain: [
      { 
        indicator: 'malicious-site.com', 
        type: 'Domain', 
        threat: 'Phishing', 
        severity: 'high', 
        firstSeen: '2024-01-18',
        sources: 2,
        description: 'Phishing site mimicking legitimate banking portal'
      }
    ],
    url: [
      { 
        indicator: 'https://evil.com/payload.exe', 
        type: 'URL', 
        threat: 'Malware Distribution', 
        severity: 'critical', 
        firstSeen: '2024-01-22',
        sources: 4,
        description: 'URL distributing ransomware payload'
      }
    ]
  };

  const executeQuery = async () => {
    if (!queryValue.trim()) return;
    
    setIsLoading(true);
    setResults([]);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return mock results based on query type
    setResults(mockResults[queryType] || []);
    setIsLoading(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'text-red-400 bg-red-400/20';
      case 'high': return 'text-orange-400 bg-orange-400/20';
      case 'medium': return 'text-amber-400 bg-amber-400/20';
      case 'low': return 'text-green-400 bg-green-400/20';
      default: return 'text-slate-400 bg-slate-400/20';
    }
  };

  const currentQueryType = queryTypes.find(type => type.id === queryType);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Private Threat Intelligence Query</h2>
        <p className="text-slate-300 text-lg max-w-3xl mx-auto">
          Query threat intelligence databases while maintaining privacy. Your queries are encrypted and anonymous.
        </p>
      </div>

      {/* Query Interface */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
          {/* Privacy Toggle */}
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-semibold text-white">Query Configuration</h3>
            <div className="flex items-center space-x-3">
              <span className="text-slate-300">Private Query</span>
              <button
                onClick={() => setIsPrivateQuery(!isPrivateQuery)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isPrivateQuery ? 'bg-cyan-500' : 'bg-slate-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isPrivateQuery ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              {isPrivateQuery ? (
                <EyeOff className="w-5 h-5 text-cyan-400" />
              ) : (
                <Eye className="w-5 h-5 text-slate-400" />
              )}
            </div>
          </div>

          {/* Query Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-3">Query Type</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {queryTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setQueryType(type.id as any)}
                    className={`p-4 rounded-lg border transition-colors text-left ${
                      queryType === type.id
                        ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                        : 'border-slate-600 bg-slate-700/30 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <Icon className="w-5 h-5 mb-2" />
                    <div className="text-sm font-medium">{type.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Query Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-3">
              {currentQueryType?.label} Query
            </label>
            <div className="relative">
              <input
                type="text"
                value={queryValue}
                onChange={(e) => setQueryValue(e.target.value)}
                placeholder={currentQueryType?.placeholder}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent pr-12"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>
          </div>

          {/* Privacy Notice */}
          {isPrivateQuery && (
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-cyan-400 mt-0.5" />
                <div>
                  <h4 className="text-cyan-400 font-medium text-sm">Private Query Mode</h4>
                  <p className="text-cyan-300 text-sm mt-1">
                    Your query will be encrypted and anonymized. Query details are not logged or tracked.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Query Button */}
          <button
            onClick={executeQuery}
            disabled={!queryValue.trim() || isLoading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-slate-600 disabled:to-slate-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Execute Private Query</span>
              </>
            )}
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="mt-8 bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
            <h3 className="text-xl font-semibold text-white mb-6">Query Results</h3>
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="bg-slate-700/30 rounded-lg p-6 border border-slate-600/50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(result.severity)}`}>
                          {result.severity.toUpperCase()}
                        </span>
                        <span className="text-slate-400 text-sm">{result.type}</span>
                      </div>
                      <h4 className="text-white font-medium text-lg mb-1">{result.threat}</h4>
                      <p className="text-slate-300 text-sm">{result.description}</p>
                    </div>
                    <AlertTriangle className={`w-6 h-6 ${
                      result.severity === 'critical' ? 'text-red-400' :
                      result.severity === 'high' ? 'text-orange-400' :
                      result.severity === 'medium' ? 'text-amber-400' : 'text-green-400'
                    }`} />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Indicator:</span>
                      <div className="text-white font-mono mt-1 break-all">{result.indicator}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">First Seen:</span>
                      <div className="text-white mt-1 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {result.firstSeen}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400">Sources:</span>
                      <div className="text-white mt-1">{result.sources} intelligence feeds</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreatQuery;