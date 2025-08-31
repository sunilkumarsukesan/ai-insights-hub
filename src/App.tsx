import React, { useState, useEffect } from 'react';
import { ChevronDown, Cloud, Server, Database, Zap, Shield, DollarSign, CheckCircle, ArrowRight, Menu, X } from 'lucide-react';

const Navigation = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (open: boolean) => void }) => {
  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'aws', label: 'AWS' },
    { id: 'azure', label: 'Azure' },
    { id: 'gcp', label: 'Google Cloud' },
    { id: 'scenarios', label: 'Scenarios' },
    { id: 'recommendations', label: 'Recommendations' }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Database className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">CloudScale</span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

const ProviderCard = ({ 
  provider, 
  logo, 
  primaryStorage, 
  features, 
  analytics, 
  pricing, 
  strengths,
  color
}: {
  provider: string;
  logo: React.ReactNode;
  primaryStorage: string;
  features: string[];
  analytics: string;
  pricing: string;
  strengths: string;
  color: string;
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className={`${color} p-6 text-white`}>
        <div className="flex items-center space-x-3 mb-3">
          {logo}
          <h3 className="text-2xl font-bold">{provider}</h3>
        </div>
        <p className="text-sm opacity-90">{primaryStorage}</p>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-gray-600" />
            Key Features
          </h4>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <Database className="h-5 w-5 mr-2 text-gray-600" />
            Analytics Integration
          </h4>
          <p className="text-sm text-gray-700">{analytics}</p>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-gray-600" />
            Pricing Structure
          </h4>
          <p className="text-sm text-gray-700">{pricing}</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <Zap className="h-5 w-5 mr-2 text-gray-600" />
            Strengths for Scale
          </h4>
          <p className="text-sm text-gray-700">{strengths}</p>
        </div>
      </div>
    </div>
  );
};

const ScenarioCard = ({ 
  title, 
  icon, 
  recommendations 
}: { 
  title: string; 
  icon: React.ReactNode; 
  recommendations: { provider: string; solution: string; benefit: string }[] 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6">
      <div className="flex items-center space-x-3 mb-4">
        {icon}
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div key={index} className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-medium text-gray-900">{rec.provider}</h4>
            <p className="text-sm text-gray-700 mb-1">{rec.solution}</p>
            <p className="text-xs text-gray-500">{rec.benefit}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const StorageTierTable = () => {
  const tiers = [
    {
      provider: 'AWS S3',
      tiers: ['Standard', 'Intelligent-Tiering', 'Standard-IA', 'One Zone-IA', 'Glacier Instant', 'Glacier Flexible', 'Glacier Deep Archive'],
      note: 'Choose based on access frequency and restore latency'
    },
    {
      provider: 'Azure Blob/ADLS Gen2',
      tiers: ['Hot', 'Cool', 'Cold', 'Archive'],
      note: 'Cold is online (cheaper than Cool), Archive requires rehydration'
    },
    {
      provider: 'Google Cloud Storage',
      tiers: ['Standard', 'Nearline', 'Coldline', 'Archive', 'Autoclass'],
      note: 'Archive is millisecond-accessible (higher access costs, 365-day min)'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b">
        <h3 className="text-lg font-semibold text-gray-900">Storage Tiers Comparison</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available Tiers</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tiers.map((tier, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{tier.provider}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {tier.tiers.map((t, i) => (
                      <span key={i} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{tier.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  const awsFeatures = [
    "11 9's durability, cross-region replication",
    "Object lock and lifecycle policies",
    "S3 Intelligent-Tiering with auto-optimization",
    "S3 Express One Zone for ultra-low latency"
  ];

  const azureFeatures = [
    "Hierarchical namespace (HNS) for file-system semantics",
    "Deep Microsoft Entra ID integration",
    "POSIX-like ACLs and RBAC",
    "Hot/Cool/Cold online tiers plus Archive"
  ];

  const gcpFeatures = [
    "Archive tier with millisecond access",
    "Autoclass for automatic tiering",
    "Regional/dual-region/multi-region placement",
    "Strong integration with BigQuery ecosystem"
  ];

  const scenarios = [
    {
      title: "Long-term Archiving",
      icon: <Server className="h-6 w-6 text-purple-600" />,
      recommendations: [
        {
          provider: "AWS",
          solution: "S3 Glacier Deep Archive or Flexible Retrieval",
          benefit: "Excellent when already on S3 and can tolerate restore time"
        },
        {
          provider: "Azure",
          solution: "Archive tier in Blob/ADLS Gen2",
          benefit: "Strong for Azure-first analytics and HNS requirements"
        },
        {
          provider: "GCP",
          solution: "Archive class with millisecond access",
          benefit: "Cold pricing with occasional fast reads capability"
        }
      ]
    },
    {
      title: "Real-time Analytics",
      icon: <Zap className="h-6 w-6 text-orange-600" />,
      recommendations: [
        {
          provider: "AWS",
          solution: "S3 + Athena/Redshift Spectrum + Glue",
          benefit: "Great for diverse formats and pay-per-query model"
        },
        {
          provider: "Azure",
          solution: "ADLS Gen2 + Synapse + Databricks",
          benefit: "Strong for Microsoft-centric analytics teams"
        },
        {
          provider: "GCP",
          solution: "GCS + BigQuery + BigLake + Dataplex",
          benefit: "Excellent for SQL-first, serverless analytics at scale"
        }
      ]
    },
    {
      title: "High-Performance Computing",
      icon: <Database className="h-6 w-6 text-green-600" />,
      recommendations: [
        {
          provider: "AWS",
          solution: "S3 + FSx for Lustre",
          benefit: "POSIX, sub-ms latencies, hundreds of GB/s throughput"
        },
        {
          provider: "Azure",
          solution: "Azure NetApp Files + HPC Cache",
          benefit: "Good for CAD/EDA, media, genomics on Azure compute"
        },
        {
          provider: "GCP",
          solution: "Parallelstore + GCS",
          benefit: "Ultra-high-throughput NFS alongside BigQuery integration"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      
      {/* Hero Section */}
      <section id="overview" className="pt-24 pb-16 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-4">
                <Cloud className="h-12 w-12 text-blue-300" />
                <Database className="h-12 w-12 text-purple-300" />
                <Server className="h-12 w-12 text-emerald-300" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Petabyte-Scale Storage
              <span className="block text-blue-300">Comparison Guide</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              A comprehensive side-by-side analysis of AWS, Azure, and Google Cloud storage solutions for 
              long-term archives, real-time analytics, and high-performance computing workloads.
            </p>
            <div className="mt-8">
              <button 
                onClick={() => document.getElementById('aws')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-all duration-200 inline-flex items-center space-x-2"
              >
                <span>Start Comparison</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Cloud Provider Sections */}
      <section id="aws" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProviderCard
            provider="Amazon Web Services"
            logo={<Cloud className="h-8 w-8" />}
            primaryStorage="Amazon S3 (object storage) with storage classes from Standard to Glacier Deep Archive"
            features={awsFeatures}
            analytics="Serverless SQL via Amazon Athena; managed Spark/Presto on EMR; Redshift Spectrum for in-place queries; governance with Lake Formation/Glue"
            pricing="Per-GB-month by class; request/operation charges; data transfer costs; minimum storage durations on IA/Glacier classes"
            strengths="Most mature object ecosystem with rich query-in-place options and extensive third-party integrations"
            color="bg-gradient-to-r from-orange-500 to-orange-600"
          />
        </div>
      </section>

      <section id="azure" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProviderCard
            provider="Microsoft Azure"
            logo={<Server className="h-8 w-8" />}
            primaryStorage="Azure Blob Storage / Azure Data Lake Storage Gen2 (ADLS Gen2) with hierarchical namespace"
            features={azureFeatures}
            analytics="Synapse Analytics serverless SQL; Azure Databricks with Delta Lake; Fabric OneLake for unified analytics"
            pricing="Per-GB-month by tier; operations priced per 10k transactions; data egress charges; rehydration costs for Archive"
            strengths="Enterprise identity/compliance integration with tight coupling to Microsoft data stack"
            color="bg-gradient-to-r from-blue-600 to-indigo-600"
          />
        </div>
      </section>

      <section id="gcp" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProviderCard
            provider="Google Cloud"
            logo={<Database className="h-8 w-8" />}
            primaryStorage="Google Cloud Storage (GCS) with Standard, Nearline, Coldline, Archive, and Autoclass"
            features={gcpFeatures}
            analytics="BigQuery with external tables and BigLake; Dataproc and Dataflow; Dataplex Universal Catalog for governance"
            pricing="Per-GB-month by class; Class A/B operations pricing; minimum storage durations; internet egress costs"
            strengths="Best-in-class serverless analytics with strong governance for multi-engine lakehouse patterns"
            color="bg-gradient-to-r from-green-500 to-emerald-600"
          />
        </div>
      </section>

      {/* Scenarios Section */}
      <section id="scenarios" className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Use Case Scenarios</h2>
            <p className="text-xl text-gray-600">Which cloud provider fits your specific requirements?</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {scenarios.map((scenario, index) => (
              <ScenarioCard
                key={index}
                title={scenario.title}
                icon={scenario.icon}
                recommendations={scenario.recommendations}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Storage Tiers Table */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Storage Tiers At-a-Glance</h2>
            <p className="text-xl text-gray-600">Quick reference for available storage classes across providers</p>
          </div>
          <StorageTierTable />
        </div>
      </section>

      {/* Quick Recommendations */}
      <section id="recommendations" className="py-16 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Quick Recommendations</h2>
            <p className="text-xl text-gray-300">Our expert picks for common enterprise scenarios</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-lg font-semibold text-white mb-3">Regulated Archives + Microsoft Integration</h3>
              <p className="text-gray-300 mb-4">Azure ADLS Gen2 + Archive with Synapse/Fabric on top. Get HNS, AD-integrated ACLs, and smooth Power BI flows.</p>
              <div className="flex items-center text-blue-300">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="font-medium">Best for: Enterprise governance</span>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-lg font-semibold text-white mb-3">Massive Data Lake + Open Formats</h3>
              <p className="text-gray-300 mb-4">GCP GCS + BigLake + BigQuery + Dataplex for unified lakehouse. Use Autoclass for varying access patterns.</p>
              <div className="flex items-center text-green-300">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="font-medium">Best for: Analytics-first architecture</span>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-lg font-semibold text-white mb-3">Broadest Ecosystem + Flexible Warehousing</h3>
              <p className="text-gray-300 mb-4">AWS S3 with Athena/Redshift Spectrum, lifecycle to Glacier classes for aging data.</p>
              <div className="flex items-center text-orange-300">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="font-medium">Best for: Multi-tool environments</span>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300">
              <h3 className="text-lg font-semibold text-white mb-3">HPC + Simulation Workloads</h3>
              <p className="text-gray-300 mb-4">AWS FSx for Lustre ↔ S3, Azure NetApp Files/HPC Cache, or GCP Parallelstore for high-throughput needs.</p>
              <div className="flex items-center text-purple-300">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="font-medium">Best for: Compute-intensive workloads</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Optimization Tips */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Cost Optimization Signals</h2>
            <p className="text-xl text-gray-600">Key factors that drive storage costs across all providers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center space-x-3 mb-4">
                <DollarSign className="h-8 w-8 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Storage Class Selection</h3>
              </div>
              <p className="text-gray-700">Choose storage classes based on access patterns. Consider minimum storage duration penalties on colder classes.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="h-8 w-8 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Operations Pricing</h3>
              </div>
              <p className="text-gray-700">Monitor PUT/GET/LIST operations. AWS and GCP price per request; Azure charges per 10k operations.</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center space-x-3 mb-4">
                <ArrowRight className="h-8 w-8 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-900">Data Egress</h3>
              </div>
              <p className="text-gray-700">Often the hidden cost driver. Check network pricing for your regions and plan data movement carefully.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pro Tip Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Pro Tip for Petabyte Designs</h2>
          <p className="text-xl text-emerald-100 leading-relaxed mb-8">
            Start with a <strong>multi-tier lifecycle</strong> per bucket/namespace: Hot → Warm → Archive. 
            Wire your analytics engines to <strong>query data in place</strong> to avoid costly copies. 
            Add governance/catalog early to keep costs predictable as your lake grows.
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-left">
            <h3 className="text-lg font-semibold text-white mb-3">Need a Custom Analysis?</h3>
            <p className="text-emerald-100 mb-4">
              Share your regions, access patterns (hot %, monthly read GB), and analytics stack preferences 
              for a concrete class/lifecycle plan with back-of-the-envelope cost modeling.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <Database className="h-6 w-6 text-blue-400" />
              <span className="text-white font-semibold">CloudScale</span>
            </div>
            <p className="text-gray-400">
              Enterprise cloud storage comparison and recommendations
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;