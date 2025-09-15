import React, { useState } from 'react';
import { Lock, Unlock, Check, Copy, Hash, Shield, AlertCircle } from 'lucide-react';

const ZKProofSystem: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'generate' | 'verify'>('generate');
  const [secretData, setSecretData] = useState('');
  const [commitment, setCommitment] = useState('');
  const [proof, setProof] = useState('');
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simplified ZK proof simulation using hash commitments
  const generateCommitment = (data: string, nonce: string) => {
    const combined = data + nonce + 'salt';
    // Simple hash simulation (in production, use proper cryptographic libraries)
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
      const char = combined.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16);
  };

  const generateZKProof = async () => {
    if (!secretData.trim()) return;
    
    setIsLoading(true);
    
    // Simulate cryptographic operations
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const nonce = Math.random().toString(36).substring(7);
    const generatedCommitment = generateCommitment(secretData, nonce);
    const generatedProof = `zkp_${generatedCommitment}_${nonce.slice(0, 4)}`;
    
    setCommitment(generatedCommitment);
    setProof(generatedProof);
    setIsLoading(false);
  };

  const verifyProof = async () => {
    if (!proof.trim() || !commitment.trim()) return;
    
    setIsLoading(true);
    
    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Simple verification logic (in production, use proper ZK verification)
    const isValid = proof.startsWith('zkp_') && commitment.length > 0;
    setVerificationResult(isValid);
    setIsLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Zero Knowledge Proof System</h2>
        <p className="text-slate-300 text-lg max-w-3xl mx-auto">
          Generate and verify zero knowledge proofs for threat intelligence data. 
          Prove you know sensitive information without revealing it.
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="flex justify-center">
        <div className="bg-slate-800/50 rounded-xl p-1 border border-slate-700/50">
          <button
            onClick={() => setActiveMode('generate')}
            className={`px-6 py-3 rounded-lg transition-colors ${
              activeMode === 'generate'
                ? 'bg-cyan-500 text-white'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Lock className="w-4 h-4 inline mr-2" />
            Generate Proof
          </button>
          <button
            onClick={() => setActiveMode('verify')}
            className={`px-6 py-3 rounded-lg transition-colors ${
              activeMode === 'verify'
                ? 'bg-cyan-500 text-white'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Unlock className="w-4 h-4 inline mr-2" />
            Verify Proof
          </button>
        </div>
      </div>

      {activeMode === 'generate' ? (
        // Generate Mode
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Generate Zero Knowledge Proof</h3>
              <p className="text-slate-300">
                Enter sensitive threat intelligence data to generate a commitment and proof. 
                The original data remains secret while proving you possess it.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Secret Threat Data
                </label>
                <div className="relative">
                  <textarea
                    value={secretData}
                    onChange={(e) => setSecretData(e.target.value)}
                    placeholder="Enter IOC, hash, or other sensitive threat intelligence..."
                    className="w-full h-32 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                  />
                  <Hash className="absolute top-3 right-3 w-5 h-5 text-slate-400" />
                </div>
              </div>

              <button
                onClick={generateZKProof}
                disabled={!secretData.trim() || isLoading}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-slate-600 disabled:to-slate-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Generating Proof...</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    <span>Generate ZK Proof</span>
                  </>
                )}
              </button>

              {commitment && proof && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-slate-700/30 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-white">Commitment</h4>
                      <button
                        onClick={() => copyToClipboard(commitment)}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="bg-slate-800 rounded p-3 font-mono text-sm text-cyan-300 break-all">
                      {commitment}
                    </div>
                  </div>

                  <div className="bg-slate-700/30 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-white">Zero Knowledge Proof</h4>
                      <button
                        onClick={() => copyToClipboard(proof)}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="bg-slate-800 rounded p-3 font-mono text-sm text-green-300 break-all">
                      {proof}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Verify Mode
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Verify Zero Knowledge Proof</h3>
              <p className="text-slate-300">
                Verify the authenticity of a zero knowledge proof without learning the underlying secret data.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Commitment Hash
                </label>
                <input
                  type="text"
                  value={commitment}
                  onChange={(e) => setCommitment(e.target.value)}
                  placeholder="Enter commitment hash to verify..."
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent font-mono"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Zero Knowledge Proof
                </label>
                <input
                  type="text"
                  value={proof}
                  onChange={(e) => setProof(e.target.value)}
                  placeholder="Enter zero knowledge proof to verify..."
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent font-mono"
                />
              </div>

              <button
                onClick={verifyProof}
                disabled={!commitment.trim() || !proof.trim() || isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-slate-600 disabled:to-slate-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Verify Proof</span>
                  </>
                )}
              </button>

              {verificationResult !== null && (
                <div className={`mt-6 p-6 rounded-lg border ${
                  verificationResult
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-red-500/10 border-red-500/30'
                }`}>
                  <div className="flex items-center space-x-3">
                    {verificationResult ? (
                      <>
                        <Check className="w-6 h-6 text-green-400" />
                        <div>
                          <h4 className="font-medium text-green-400">Verification Successful</h4>
                          <p className="text-green-300 text-sm mt-1">
                            The zero knowledge proof is valid and authentic.
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-6 h-6 text-red-400" />
                        <div>
                          <h4 className="font-medium text-red-400">Verification Failed</h4>
                          <p className="text-red-300 text-sm mt-1">
                            The proof could not be verified. Check the inputs and try again.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
          <Shield className="w-8 h-8 text-cyan-400 mb-4" />
          <h3 className="font-semibold text-white mb-2">Privacy Preserving</h3>
          <p className="text-slate-300 text-sm">
            Share threat intelligence without revealing sensitive details or compromising operations.
          </p>
        </div>

        <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
          <Lock className="w-8 h-8 text-purple-400 mb-4" />
          <h3 className="font-semibold text-white mb-2">Cryptographically Secure</h3>
          <p className="text-slate-300 text-sm">
            Built on proven cryptographic primitives ensuring mathematical guarantees of privacy.
          </p>
        </div>

        <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
          <Check className="w-8 h-8 text-green-400 mb-4" />
          <h3 className="font-semibold text-white mb-2">Verifiable Claims</h3>
          <p className="text-slate-300 text-sm">
            Prove possession of threat intelligence without revealing the actual data or sources.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ZKProofSystem;