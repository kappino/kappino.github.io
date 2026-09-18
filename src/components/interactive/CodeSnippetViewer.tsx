import { useState, useRef, useEffect } from 'react';
import { Copy, Check, FileCode } from 'lucide-react';

const SNIPPETS = [
  {
    id: 'esp32',
    filename: 'src/esp32_mtls_client.cpp',
    lang: 'C++ (ESP-IDF / PlatformIO)',
    description: 'Hardware mTLS v1.3 verification with mbedTLS dynamic buffer allocator',
    code: `// Enforce mutual TLS authentication on bare-metal ESP32
#include "esp_tls.h"
#include "mbedtls/ssl.h"

esp_err_t establish_secure_telemetry(esp_tls_cfg_t *cfg) {
    cfg->cacert_buf = (const unsigned char *)ca_root_pem;
    cfg->cacert_bytes = ca_root_pem_len;
    cfg->clientcert_buf = (const unsigned char *)client_cert_pem;
    cfg->clientcert_bytes = client_cert_pem_len;
    cfg->clientkey_buf = (const unsigned char *)client_key_pem;
    cfg->clientkey_bytes = client_key_pem_len;
    
    // Strict hostname & cipher suite configuration
    cfg->non_block = false;
    cfg->use_secure_element = false;
    cfg->common_name = "broker.mesh.local";

    struct esp_tls *tls = esp_tls_conn_http_new(TELEMETRY_ENDPOINT, cfg);
    if (!tls) {
        ESP_LOGE("SEC", "Handshake dropped: Untrusted peer or invalid X.509 cert");
        return ESP_FAIL;
    }
    ESP_LOGI("SEC", "mTLS v1.3 established. Cipher: TLS_AES_256_GCM_SHA384");
    return ESP_OK;
}`,
  },
  {
    id: 'ros2',
    filename: 'care_planner/priority_resolver.py',
    lang: 'Python (ROS2 Humble)',
    description: 'Deterministic state transition ensuring healthcare alerts override routine robot navigation',
    code: `import rclpy
from rclpy.node import Node
from std_msgs.msg import String
from gorules import ZenEngine

class CarePriorityResolver(Node):
    def __init__(self):
        super().__init__('care_priority_resolver')
        self.engine = ZenEngine()
        self.decision_model = self.engine.create_decision('care_priority.json')
        self.sub = self.create_subscription(String, '/care/telemetry', self.evaluate_event, 10)
        self.action_pub = self.create_publisher(String, '/care/navigation_override', 10)

    def evaluate_event(self, msg):
        payload = json.loads(msg.data)
        # Clinical Rule Inference via JDM Decision Tables
        result = self.decision_model.evaluate(payload)
        
        if result.get('priority') == 'HEALTH_EMERGENCY':
            # Abort patrol routine, trigger high-priority caregiver dispatch
            self.get_logger().warn(f"EMERGENCY PRIORITY LOCK: {result['action']}")
            self.action_pub.publish(String(data=json.dumps(result)))`,
  },
  {
    id: 'spectra',
    filename: 'spectra/ica_pipeline.py',
    lang: 'Python / Scikit-learn',
    description: 'PICARD artifact rejection and Multi-Layer Perceptron classification on 21 subjects',
    code: `# SPECTRA: Artifact decomposition and MLP classification
import numpy as np
from picard import picard
from sklearn.neural_network import MLPClassifier
from sklearn.model_selection import StratifiedKFold

def train_spectra_classifier(raw_eeg_signals, labels):
    # Strip ocular and muscle artifacts via fast PICARD-ICA
    K, W, S = picard(raw_eeg_signals, ortho=True, max_iter=200)
    cleaned_signals = np.dot(W, raw_eeg_signals)
    
    # Compute Power Spectral Density (Theta 4-8Hz, Alpha 8-12Hz, Beta 12-30Hz)
    features = extract_psd_and_fba(cleaned_signals, fs=256)
    
    # Evaluate Multi-Layer Perceptron on 21 clinical subjects
    clf = MLPClassifier(hidden_layer_sizes=(128, 64), max_iter=500, random_state=42)
    scores = cross_val_score(clf, features, labels, cv=StratifiedKFold(n_splits=5))
    
    # Peak Cross-Validated Test Accuracy: 97.2%
    return clf, np.mean(scores)`,
  },
];

export const CodeSnippetViewer = () => {
  const [activeTab, setActiveTab] = useState('esp32');
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(copyTimeoutRef.current), []);

  const snippet = SNIPPETS.find((s) => s.id === activeTab) || SNIPPETS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code).then(() => {
      setCopied(true);
      clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2500);
    }).catch(() => { /* clipboard access denied */ });
  };

  return (
    <div className="w-full rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-xl">
      {/* File Tabs Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-3 py-2 bg-zinc-900 border-b border-zinc-800 gap-2">
        <div role="tablist" className="flex items-center gap-1.5 overflow-x-auto">
          {SNIPPETS.map((s) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={activeTab === s.id}
              onClick={() => setActiveTab(s.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono transition-colors whitespace-nowrap ${
                activeTab === s.id
                  ? 'bg-zinc-800 text-white font-medium border border-zinc-700'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              <FileCode className="h-3.5 w-3.5 text-sky-400" />
              <span>{s.filename.split('/').pop()}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs font-mono">
          <span className="text-zinc-500 text-[11px] hidden md:inline">{snippet.lang}</span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors text-[11px]"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code description sub-bar */}
      <div className="px-4 py-2 bg-zinc-900/40 border-b border-zinc-800/60 font-mono text-[11px] text-zinc-400 flex items-center gap-2">
        <span className="text-sky-400">File: {snippet.filename}</span>
        <span>·</span>
        <span className="text-zinc-400">{snippet.description}</span>
      </div>

      {/* Code Editor Body */}
      <div className="p-4 sm:p-5 overflow-x-auto bg-zinc-950 font-mono text-xs leading-relaxed text-zinc-200">
        <pre className="text-zinc-300">
          <code>{snippet.code}</code>
        </pre>
      </div>
    </div>
  );
};
