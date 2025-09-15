import React, { useState } from 'react';
import { Upload, Shield, Check, FileText, Hash, Globe, AlertCircle, Lock } from 'lucide-react';

const ThreatSubmission: React.FC = () => {
  const [submissionType, setSubmissionType] = useState<'manual' | 'zkproof'>('manual');
  const [threatData, setThreatData] = useState({
    type: 'hash',
    value: '',
    description: '',
    severity: 'medium',
    tags: '',
    source: ''
  });
  const [zkProof, setZkProof] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const threatTypes = [
    { id: 'hash', label: 'File Hash', icon: Hash },
    { id: 'ip', label: 'IP Address', icon: Globe },
    { id: 'domain', label: 'Domain', icon: Globe },
    { id: 'url', label: 'URL', icon: FileText }
  ];

  const severityLevels = [
    { id: 'low', label: 'Low', color: 'text-green-400' },
    { id: 'medium', label: 'Medium', color: 'text-amber-400' },
    { id: 'high', label: 'High', color: 'text-orange-400' },
    { id: 'critical', label: 'Critical', color: 'text-red-400' }
  ];

  const handleSubmission = async () => {
    setIsSubmitting(true);
    
    // Simulate submission process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      if (submissionType === 'manual') {
        setThreatData({
          type: 'hash',
          value: '',
          description: '',
          severity: 'medium',
          tags: '',
          source: ''
        });
      } else {
        setZkProof('');
      }
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Threat Intelligence Submitted</h2>
          <p className="text-slate-300 text-lg">
            Your threat intelligence has been securely submitted to the system.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Submit Threat Intelligence</h2>
        <p className="text-slate-300 text-lg max-w-3xl mx-auto">
          Contribute to the collective security knowledge base. Submit threat indicators manually or via zero knowledge proofs.
        </p>
      </div>

      {/* Submission Type Toggle */}
      <div className="flex justify-center">
        <div className="bg-slate-800/50 rounded-xl p-1 border border-slate-700/50">
          <button
            onClick={() => setSubmissionType('manual')}
            className={`px-6 py-3 rounded-lg transition-colors ${
              submissionType === 'manual'
                ? 'bg-cyan-500 text-white'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Upload className="w-4 h-4 inline mr-2" />
            Manual Submission
          </button>
          <button
            onClick={() => setSubmissionType('zkproof')}
            className={`px-6 py-3 rounded-lg transition-colors ${
              submissionType === 'zkproof'
                ? 'bg-cyan-500 text-white'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Lock className="w-4 h-4 inline mr-2" />
            ZK Proof Submission
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {submissionType === 'manual' ? (
          /* Manual Submission Form */
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
            <h3 className="text-xl font-semibold text-white mb-6">Manual Threat Submission</h3>
            
            <div className="space-y-6">
              {/* Threat Type Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">Threat Type</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {threatTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setThreatData({...threatData, type: type.id})}
                        className={`p-4 rounded-lg border transition-colors text-left ${
                          threatData.type === type.id
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

              {/* Threat Value */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Threat Indicator
                </label>
                <input
                  type="text"
                  value={threatData.value}
                  onChange={(e) => setThreatData({...threatData, value: e.target.value})}
                  placeholder="Enter the threat indicator value..."
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent font-mono"
                />
              </div>

              {/* Severity */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">Severity Level</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {severityLevels.map((severity) => (
                    <button
                      key={severity.id}
                      onClick={() => setThreatData({...threatData, severity: severity.id})}
                      className={`p-3 rounded-lg border transition-colors ${
                        threatData.severity === severity.id
                          ? 'border-cyan-500 bg-cyan-500/10'
                          : 'border-slate-600 bg-slate-700/30 hover:border-slate-500'
                      }`}
                    >
                      <div className={`text-sm font-medium ${
                        threatData.severity === severity.id ? 'text-cyan-400' : severity.color
                      }`}>
                        {severity.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Threat Description
                </label>
                <textarea
                  value={threatData.description}
                  onChange={(e) => setThreatData({...threatData, description: e.target.value})}
                  placeholder="Describe the threat, its behavior, and any relevant context..."
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={threatData.tags}
                  onChange={(e) => setThreatData({...threatData, tags: e.target.value})}
                  placeholder="malware, banking, trojan, apt29..."
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>

              {/* Source */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Source (optional)
                </label>
                <input
                  type="text"
                  value={threatData.source}
                  onChange={(e) => setThreatData({...threatData, source: e.target.value})}
                  placeholder="Internal honeypot, external feed, incident response..."
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              onClick={handleSubmission}
              disabled={!threatData.value.trim() || !threatData.description.trim() || isSubmitting}
              className="w-full mt-8 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-slate-600 disabled:to-slate-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  <span>Submit Threat Intelligence</span>
                </>
              )}
            </button>
          </div>
        ) : (
          /* ZK Proof Submission */
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
            <h3 className="text-xl font-semibold text-white mb-6">Zero Knowledge Proof Submission</h3>
            
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6 mb-6">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-purple-400 mt-0.5" />
                <div>
                  <h4 className="text-purple-400 font-medium text-sm">Enhanced Privacy</h4>
                  <p className="text-purple-300 text-sm mt-1">
                    Submit threat intelligence using zero knowledge proofs to maintain complete anonymity while proving authenticity.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Zero Knowledge Proof
                </label>
                <textarea
                  value={zkProof}
                  onChange={(e) => setZkProof(e.target.value)}
                  placeholder="Paste your zero knowledge proof here..."
                  rows={6}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none font-mono text-sm"
                />
              </div>

              <div className="bg-slate-700/30 rounded-lg p-6">
                <h4 className="text-white font-medium mb-3">Proof Validation Status</h4>
                <div className="flex items-center space-x-3">
                  {zkProof.trim() ? (
                    <>
                      <Check className="w-5 h-5 text-green-400" />
                      <span className="text-green-400 text-sm">Valid proof format detected</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-amber-400" />
                      <span className="text-amber-400 text-sm">Waiting for proof input</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmission}
              disabled={!zkProof.trim() || isSubmitting}
              className="w-full mt-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-slate-600 disabled:to-slate-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying & Submitting...</span>
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  <span>Submit via ZK Proof</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreatSubmission;